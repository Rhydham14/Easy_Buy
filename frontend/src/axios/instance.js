import axios from "axios";
import { useNavigate } from "react-router-dom";

// const axiosInstance = axios.create({
//   baseURL: "https://tetime.onrender.com/"
// });


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
    console.log("Reqqqq",config);

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Res",response);
    if (response.data.token) {
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
    }
    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const refreshResponse = await axios.get(
            "https://tetime.onrender.com/refresh/refreshtoken",
            {
              headers: { "refresh-token": refreshToken }
            }
          );

          const newToken = refreshResponse.data.token;
          localStorage.setItem("token", newToken);

          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);

          if (refreshError.response && refreshError.response.status === 401) {
            // Redirect to login or handle token expiration
            const navigate = useNavigate();
            navigate("/home");
          }

          return Promise.reject(refreshError);
        }
      } else {
        console.error("No refresh token available");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
