const ProductModel = require('../Models/productModel');

addProduct = async({ title, description, price, category, images })=> {
  try {
    const newProduct = new ProductModel({
      title,
      description,
      price,
      category,
      images
    });

    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error('Failed to add product: ' + error.message);
  }
}

readProduct = async()=> {
  try {
    const productData = await ProductModel.find({});
    const data = productData.map((data) => {
      return {
        _id: data._id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        images: data.images
      }
    })
    return data;
  } catch (error) {
    throw new Error('Failed to fetch product data: ' + error.message);
  }
}

updateProduct = async(updateData)=> {
  try {
    const _id = updateData._id;
    const updatedData = await ProductModel.findByIdAndUpdate(
      _id,
      {
        title: updateData.title,
        description: updateData.description,
        price: updateData.price,
        category: updateData.category,
        images: updateData.images
      }
    );
    return updatedData;
  } catch (error) {
    throw new Error('Failed to update product: ' + error.message);
  }
}

  details = async(_id)=> {
  try {
    const productDetails = await ProductModel.findById(_id);
    return productDetails;
  } catch (error) {
    throw new Error('Failed to fetch product details: ' + error.message);
  }
}

  productPage = async(category)=> {
  try {
    const categoryData = await ProductModel.find({ category });
    return categoryData;
  } catch (error) {
    throw new Error('Failed to fetch products by category: ' + error.message);
  }
}

module.exports = {
  addProduct,
  readProduct,
  updateProduct,
  details,
  productPage
};
