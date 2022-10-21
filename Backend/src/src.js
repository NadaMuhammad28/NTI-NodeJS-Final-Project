const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
require("../db/connect");
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//
app.use(cors());

const adminRoutes = require("../routes/admin.routes");
const userRoutes = require("../routes/user.routes");
const articleRoutes = require("../routes/article.routes");
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/article", articleRoutes);

module.exports = app;
