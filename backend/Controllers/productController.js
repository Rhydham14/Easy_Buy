const productService = require('../Services/productService'); // Import your productService module

readProduct = async(req, res)=> {
  try {
    const productData = await productService.readProduct();
    res.status(200).json(productData);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
}

addProduct = async(req, res)=> {
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

updateProduct = async(req, res)=> {
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
    res.status(500).json({ error: "Failed to edit product" });
  }
}

details = async(req, res)=> {
  try {
    const { _id } = req.query;
    const details = await productService.details(_id);
    res.status(200).json(details);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

productPage = async(req, res)=> {
  try {
    const { category } = req.query;
    const categoryData = await productService.productPage(category);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ error: "productPage error" });
  }
}

module.exports = {
  readProduct,
  addProduct,
  updateProduct,
  details,
  productPage,
};
