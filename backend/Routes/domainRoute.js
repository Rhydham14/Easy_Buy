const express = require("express");
const domainRouter = express.Router();
const route = require("../Routes/routes");

domainRouter.use("/api/users", route);
domainRouter.use("/api/product", route);

module.exports = domainRouter;
