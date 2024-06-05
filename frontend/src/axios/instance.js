import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    'Content-Type': 'application/json',
  },  
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
    }
    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const refreshResponse = await axiosInstance.post(
            "/refresh",
            { token: refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);

          // If refreshing the token fails, redirect to login
          const navigate = useNavigate();
          navigate("/login");
        }
      } else {
        console.error("No refresh token available");

        // No refresh token, redirect to login
        const navigate = useNavigate();
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
