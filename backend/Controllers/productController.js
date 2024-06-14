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
    const images = req.file.path; // Cloudinary URL
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

const updateProduct = async(req, res)=> {
  try {
    const { title, description, price, category, image } = req.body;
    const { _id } = req.query;
    await productService.updateProduct({
      title,
      description,
      price,
      category,
      _id,
      image,
    });
    res.status(200).json({ message: "Product edit successfully" });
  } catch (e) {
    res.status(500).json({ e: "Failed to edit product" });
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
    console.log("search query:", query); // Log the search query for debugging
    const searchData = await productService.search(query);
    res.status(200).json(searchData);
    console.log("Searching result======================================================================", searchData);
  } catch (e) {
    console.error('Error searching:', e); // Log the error for debugging  
    res.status(500).json({ error: "searching error" });
  }
};

module.exports = {
  readProduct,
  addProduct,
  updateProduct,
  details,
  productPage,
  search
};
