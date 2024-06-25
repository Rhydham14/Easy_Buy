const productService = require('../Services/productService'); // Import your productService module

const readProduct = async(req, res)=> {
  try {
    const productData = await productService.readProduct();
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

const addProduct = async(req, res)=> {
  try {
    const { title, description, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }
    const images = req.file.path; 
    await productService.addProduct({
      title,
      description,
      price,
      category,
      images,
    });
    res.status(200).json({ message: "Product added successfully" });
  } catch (e) { 
    console.error(e);
    res.status(500).json({ message: "Failed to add product" });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { _id } = req.query;
    const { title, description, price, category } = req.body
    const { path } = req.file;
    console.log("updt query controller", req.query);
    console.log("updt body controller", req.body);

    await productService.updateProduct({
      title,
      description,
      price,
      category,
      _id,
      path,
    });
    res.status(200).json({ message: "Product edited successfully" });
  } catch (e) {
    res.status(500).json({ e: "Failed to edit product" });
  }
};

const removeProduct = async(req, res)=>{
  try{
    const {_id} = req.query;
    await productService.removeProduct(_id);
    res.status(200).json({message:"Product remove"});
  }catch(e){
    res.status(500).json({ e: "Failed to remove product" });

  }
}

const details = async(req, res)=> {
  try {
    const { _id } = req.query;
    const details = await productService.details(_id);
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const productPage = async(req, res)=> {
  try {
    const { category } = req.query;
    const categoryData = await productService.productPage(category);
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json({ error: "productPage error" });
  }
}

const search = async (req, res) => {
  try {
    const query = req.body.query;
    const searchData = await productService.search(query);
    res.status(200).json(searchData);
  } catch (e) {
    console.error('Error searching:', e); 
    res.status(500).json({ error: "searching error" });
  }
};



module.exports = {
  readProduct,
  addProduct,
  updateProduct,
  removeProduct,
  details,
  productPage,
  search,

};
