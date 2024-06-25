const { PassThrough } = require("nodemailer/lib/xoauth2");
const ProductModel = require("../Models/productModel");
const addProduct = async ({ title, description, price, category, images }) => {
  try {
    const newProduct = new ProductModel({
      title,
      description,
      price,
      category,
      images,
    });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Failed to add product: " + error.message);
  }
};

const readProduct = async () => {
  try {
    const productData = await ProductModel.find({});
    const data = productData.map((data) => {
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        images: data.images,
      };
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch product data: " + error.message);
  }
};

const updateProduct = async ({
  title,
  description,
  price,
  category,
  _id,
  path,
}) => {
  console.log("iamgeeeeeeeeee",path);
  try {
    // const _id = updateData._id;
    const updatedData = await ProductModel.findByIdAndUpdate(_id, {
      title: title,
      description: description,
      price: price,
      category: category,
      images: path,
    });
    return updatedData;
  } catch (error) {
    throw new Error("Failed to update product: " + error.message);
  }
};

const removeProduct = async (productId) => {
  try {
    const _id = productId;
    const removeProduct = await ProductModel.findByIdAndDelete(_id);
    return removeProduct;
  } catch (e) {
    throw new Error("Failed to error produc" + e.message);
  }
};

const details = async (_id) => {
  try {
    const productDetails = await ProductModel.findById(_id);
    return productDetails;
  } catch (error) {
    throw new Error("Failed to fetch product details: " + error.message);
  }
};

const productPage = async (category) => {
  try {
    const categoryData = await ProductModel.find({ category });
    return categoryData;
  } catch (error) {
    throw new Error("Failed to fetch products by category: " + error.message);
  }
};

const search = async (query) => {
  const results = await ProductModel.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { price: query },
    ],
  }).select("title description price");
  return results;
};


module.exports = {
  addProduct,
  readProduct,
  updateProduct,
  removeProduct,
  details,
  productPage,
  search,
};
