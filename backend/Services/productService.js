const ProductModel = require('../Models/productModel');

const addProduct = async({ title, description, price, category, images })=> {
  try {
    const newProduct = new ProductModel({
      title,
      description,
      price,
      category,
      images
    });
    
    await newProduct.save();
    console.log("add data////////////",newProduct);
    return newProduct;
  } catch (error) {
    throw new Error('Failed to add product: ' + error.message);
  }
}

const readProduct = async()=> {
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

const updateProduct = async(updateData)=> {
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

const removeProduct = async(productId)=>{
  try{
    const _id = productId;
    const removeProduct = await ProductModel.findByIdAndDelete(_id);
    return removeProduct;
  }catch(e){
    throw new Error('Failed to error produc'+ e.message);
  }
}

  const details = async(_id)=> {
    try {
      const productDetails = await ProductModel.findById(_id);
      return productDetails;
    } catch (error) {
      throw new Error('Failed to fetch product details: ' + error.message);
    }
  }

const productPage = async(category)=> {
  try {
    const categoryData = await ProductModel.find({ category });
    return categoryData;
  } catch (error) {
    throw new Error('Failed to fetch products by category: ' + error.message);
  }
}

const search = async (query) => {
  const results = await ProductModel.find({
    $or: [
      { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for title
      { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for description
      { price: query } // Exact match for price (if price is a string)
    ]
  }).select('title description price');
  // console.log("result", results);
  return results;
};

module.exports = {
  addProduct,
  readProduct,
  updateProduct,
  removeProduct,
  details,
  productPage,
  search
};
