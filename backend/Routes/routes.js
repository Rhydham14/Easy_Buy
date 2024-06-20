// routes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const productController = require("../Controllers/productController");
const upload = require("../Middlewear/multer");
const paymentController = require("../Controllers/paymentContoller");


//Users
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verify/:userId/:token", userController.verifyEmail);
router.patch("/updateUserProfile",userController.updateUserProfile);
router.post("/refresh", userController.refreshToken);


//Products
router.post("/addProduct", upload.single('image'), productController.addProduct);
router.get("/readProduct",  productController.readProduct);
router.patch("/updateProduct",productController.updateProduct);
router.delete("/removeProduct",productController.removeProduct);
router.get("/details", productController.details);
router.get("/productPage",productController.productPage);
router.post("/search",productController.search);

//Payment gatwaye
router.post("/create-payment-intent",paymentController.createPayment)
router.post("/paymentDetials",paymentController.paymentDetials);
router.get("/showTransactions", paymentController.showTransactions);
module.exports = router;
    