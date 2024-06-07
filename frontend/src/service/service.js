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
export const EMPTY_PRODUCT = ()=>{
  localStorage.removeItem("addProduct");
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
    const response = await axiosInstance.post('/easyBuy.com/api/product/addProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("add p",response.data);
    return response.data; // Return the data from the response

};

export const FETCH_DATA = async () => {
    const response = await axiosInstance.get('/easyBuy.com/api/product/readProduct');
    return response.data; // Return the data from the respons
};

export const UPDATE_PRODUCT = async (productId, formData) => {
    const response = await axiosInstance.patch(`/easyBuy.com/api/product/updateProduct?_id=${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the data from the response
};

export const UPDATE_USER_PROFILE = async (userId, email, fullname) => {
    const response = await axiosInstance.patch(`/easyBuy.com/api/users/updateUserProfile?_id=${userId}`, { email, fullname });
    return response.data; // Return the data from the response
};

export const LOGIN_USER = async (email, password) => {
    const response = await axiosInstance.post("/easyBuy.com/api/users/login", { email, password });
    return response.data; // Return the data from the response
};

export const FETCH_PRODUCT_DETAILS = async (productId) => {
    const response = await axiosInstance.get(`/easyBuy.com/api/product/details?_id=${productId}`);
    return response.data; // Return the data from the response
};

export const FETCH_PRODUCT_CATEGORY = async (category) => {
    const response = await axiosInstance.get(`/easyBuy.com/api/product/productPage?category=${category}`);
    return response.data; // Return the data from the response
};

export const FETCH_ALL_PRODUCT = async () => {
    const response = await axiosInstance.get("/easyBuy.com/api/product/readProduct");
    return response.data; // Return the data from the response
};

export const REGISTER_USER = async (data) => {
    const response = await axiosInstance.post("/easyBuy.com/api/users/register", data);
    return response.data; // Return the data from the response
};

export const SEARCH = async (query) => { // Change parameter name to query
  const response = await axiosInstance.post("/easyBuy.com/api/product/search", { query: query }); // Pass query to the request body
  return response.data;
};