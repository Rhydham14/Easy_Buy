const { updateProduct, details } = require('../Controllers/productController');
const ProductModel = require('../Models/productModel');

const productService = {
  addProduct: async ({ title, description, price, category, images}) => {
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
  },
  readProduct: async () => {
    try {
      const productData = await ProductModel.find({});
      const data = productData.map((data)=>{
        return{
          _id: data._id,
          title: data.title,
          description:data.description,
          price:data.price,
          category:data.category,
          images:data.images
        }
      })
      return data;
    } catch (error) {
      throw new Error('Failed to fetch product data: ' + error.message);
    }
  },
  updateProduct: async(updataData)=>{
    try{
      const _id = updataData._id;
      const updateData = await ProductModel.findByIdAndUpdate(
        {_id},
        {title:updataData.title,
          description:updataData.description,
          price:updataData.price,
          category:updataData.category,
          images:updataData.images
        }
      );
      return updateData;
    }catch(e){
      
    }
  },
  details: async (_id) => {
    try {
      console.log(_id);
      const details = await ProductModel.findById(_id);

      console.log("data",details);
      return details;
    } catch (error) {
      console.error('Failed to fetch product data:', error);
      throw new Error('Failed data: ' + error.message);
    }
  },
  productPage: async (category)=>{
    try{
    const categoryData = await ProductModel.find({category:category});
    console.log("CCCC",categoryData);
    return categoryData;
    }catch(e){
      throw new Error("Not able to get the data"+e.message)
    }
  }
};

module.exports = productService;