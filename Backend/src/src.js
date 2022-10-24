const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
require("../db/connect");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const adminRoutes = require("../routes/admin.routes");
const userRoutes = require("../routes/user.routes");
const articleRoutes = require("../routes/article.routes");
//shop
const productRoutes = require("../routes/product.routes");

const categoryRoutes = require("../routes/category.routes");
const cartRoutes = require("../routes/cart.routes");

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/article", articleRoutes);

//shop
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
