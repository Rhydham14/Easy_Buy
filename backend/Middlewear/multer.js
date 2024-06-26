const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "di9x5hgjq",
  api_key: "692344319378278",
  api_secret: "twHIJ0yaSYJZHf62B-yPgzCZ-sk",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "easyBuy_product",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
