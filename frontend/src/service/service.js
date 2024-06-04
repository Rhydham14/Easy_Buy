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