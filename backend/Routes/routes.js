// routes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const productController = require("../Controllers/productController");
const upload = require("../Middlewear/multer");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verify/:userId/:token", userController.verifyEmail);
router.post("/addProduct", upload.single('image'), productController.addProduct);
router.get("/readProduct",  productController.readProduct);
router.patch("/updateProduct",productController.updateProduct);
router.get("/details", productController.details);
router.get("/productPage",productController.productPage);


module.exports = router;
    