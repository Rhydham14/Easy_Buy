import axiosInstance from "../axios/instance";
export const GET_IS_LOGIN = localStorage.getItem("isLogin");
export const SET_IS_LOGIN = (value) => {
  localStorage.setItem("isLogin", value);
};

export const SET_IS_USER = (value) => {
  localStorage.setItem("user", JSON.stringify(value));
};
export const GET_IS_USER = JSON.parse(localStorage.getItem("user"));

export const REMOVE_IS_USER = () => {
  localStorage.removeItem("user");
  console.log("Logout");
};
export const REMOVE_IS_LOGIN = () => localStorage.removeItem("user");

export const SET_PRODUCT = (value) => {
  localStorage.setItem("addProduct", JSON.stringify(value));
};
export const EMPTY_PRODUCT = () => {
  const hh = localStorage.removeItem("addProduct");
};
export const GET_PRODUCT = JSON.parse(localStorage.getItem("addProduct"));

export const REMOVE_PRODUCT = (id) => {
  let products = JSON.parse(localStorage.getItem("addProduct")) || [];

  products = products.filter((product) => product._id !== id);

  localStorage.setItem("addProduct", JSON.stringify(products));
};

export const PAID_PAYMENT = (value) => {
  localStorage.setItem("status", JSON.stringify(value));
};

export const GOT_PAYMENT = () => {
  JSON.parse(localStorage.getItem("status"));
};

export const ADD_PRODUCT = async (formData) => {
  const response = await axiosInstance.post(
    "/easyBuy.com/api/product/addProduct",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("add p", response.data);
  return response.data;
};

export const FETCH_DATA = async () => {
  const response = await axiosInstance.get(
    "/easyBuy.com/api/product/readProduct"
  );
  console.log("FETCH_DATA p", response.data);
  return response.data;
};

export const UPDATE_PRODUCT = async (productId, formData) => {
  try {
    const response = await axiosInstance.patch(
      `/easyBuy.com/api/product/updateProduct?_id=${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("formData title", formData.get("title"));
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};


export const REMOVE_PRODUCT_DATA = async (productId) => {
  const response = await axiosInstance.delete(
    `/easyBuy.com/api/product/removeProduct?_id=${productId}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const UPDATE_USER_PROFILE = async (userId, email, fullname) => {
  const response = await axiosInstance.patch(
    `/easyBuy.com/api/users/updateUserProfile?_id=${userId}`,
    { email, fullname }
  );
  return response.data;
};

export const LOGIN_USER = async (email, password) => {
  const response = await axiosInstance.post("/easyBuy.com/api/users/login", {
    email,
    password,
  });
  return response.data;
};

export const FETCH_PRODUCT_DETAILS = async (productId) => {
  const response = await axiosInstance.get(
    `/easyBuy.com/api/product/details?_id=${productId}`
  );
  return response.data;
};

export const FETCH_PRODUCT_CATEGORY = async (category) => {
  const response = await axiosInstance.get(
    `/easyBuy.com/api/product/productPage?category=${category}`
  );
  return response.data;
};

export const FETCH_ALL_PRODUCT = async () => {
  const response = await axiosInstance.get(
    "/easyBuy.com/api/product/readProduct"
  );
  return response.data;
};

export const REGISTER_USER = async (data) => {
  const response = await axiosInstance.post(
    "/easyBuy.com/api/users/register",
    data
  );
  return response.data;
};

export const SEARCH = async (query) => {
  const response = await axiosInstance.post("/easyBuy.com/api/product/search", {
    query,
  });
  return response.data;
};

export const PAYMENT = async (totalPrice) => {
  try {
    const response = await axiosInstance.post(
      "/easyBuy.com/api/payment/create-payment-intent",
      {
        amount: totalPrice * 100,
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch client secret");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const PAYMENT_DETAILS = async (paymentIntent, fullname, deliveryAddress) => {
  try {
    const response = await axiosInstance.post(
      "/easyBuy.com/api/payment/paymentDetials",
      {
        paymentIntent, fullname, deliveryAddress
      }
    );
    console.log("Payment saved", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to save payment:", error);
    throw new Error(error.message);
  }
};

export const SHOW_TRANSACTIONS = async () => {
  try {
    const response = await axiosInstance.get(
      "/easyBuy.com/api/payment/showTransactions"
    );
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("fail to show tansaction", error);
  }
};


export const ORDER_LIST = async (productDetails) => {
  console.log("oder frontend",productDetails);
  try {
      const response = await axiosInstance.post(
        "/easyBuy.com/api/orderlist/orderlist", productDetails
      );
      return response;
  } catch (error) {
    console.error("Failed to show transaction", error);
  }
};

export const ORDER_DATA = async() => {
  try{
    const response = await axiosInstance.get("/easyBuy.com/api/orderlist/orderlist");
    return response
  }catch(error){
    console.error("Failed to show transaction", error);

  }
}

