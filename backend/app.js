// app.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const domainRouter = require("./Routes/domainRoute");
require("./Connection/database");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://192.168.2.126:3000","https://easy-buy-qeqn.vercel.app/","https://easy-buy-qeqn.vercel.app","https://easy-buy-5.onrender.com","https://easy-buy-5.onrender.com/","*"],
  // origin: ["*"],

  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use("/easyBuy.com", domainRouter);

app.use("/", (req, res) => {
  res.send("temp api");
});

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
