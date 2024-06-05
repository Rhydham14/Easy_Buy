import axiosInstance from '../axios/instance'; // Adjust the import path based on your project structure


export const GET_IS_LOGIN = localStorage.getItem("isLogin");
export const SET_IS_LOGIN = (value) => {
    localStorage.setItem("isLogin", value);
  };

export const SET_IS_USER = (value)=>{
    localStorage.setItem("user", JSON.stringify(value));
}
export const GET_IS_USER= JSON.parse(localStorage.getItem("user")); 

export const REMOVE_IS_USER = () =>localStorage.removeItem('user');
export const REMOVE_IS_LOGIN = () =>localStorage.removeItem('user');

export const SET_PRODUCT = (value)=>{
  localStorage.setItem("addProduct", JSON.stringify(value));
}
export const GET_PRODUCT = JSON.parse(localStorage.getItem("addProduct"));

export const REMOVE_PRODUCT = (id) => {
  // Retrieve the current list of products from localStorage
  let products = JSON.parse(localStorage.getItem("addProduct")) || [];

  // Filter out the product with the given id
  products = products.filter(product => product._id !== id);

  // Update the localStorage with the new list
  localStorage.setItem("addProduct", JSON.stringify(products));
};

export const ADD_PRODUCT = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/product/addProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const FETCH_DATA = async () => {
  try {
    const response = await axiosInstance.get('/api/product/readProduct');
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const UPDATE_PRODUCT = async (productId, formData) => {
  try {
    const response = await axiosInstance.patch(`/api/product/updateProduct?_id=${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const UPDATE_USER_PROFILE = async (userId, email, fullname) => {
  try {
    const response = await axiosInstance.patch(`/api/users/updateUserProfile?_id=${userId}`, { email, fullname });
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const LOGIN_USER = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/users/login", { email, password });
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const FETCH_PRODUCT_DETAILS = async (productId) => {
  try {
    const response = await axiosInstance.get(`/api/product/details?_id=${productId}`);
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const FETCH_PRODUCT_CATEGORY = async (category) => {
  try {
    const response = await axiosInstance.get(`/api/product/productPage?category=${category}`);
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const FETCH_ALL_PRODUCT = async () => {
  try {
    const response = await axiosInstance.get("/api/product/readProduct");
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const REGISTER_USER = async (data) => {
  try {
    const response = await axiosInstance.post("/api/users/register", data);
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function
  }
};