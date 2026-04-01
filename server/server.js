const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const productsRoutes = require("./api/product");
const dataRoutes = require("./api/data");
const serRoutes = require("./api/ser");

app.use("/fakestoreapi/products", productsRoutes);
app.use("/data", dataRoutes);
app.use("/ser", serRoutes);

// Dossier public (images, etc.)
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log("Server running on port " + PORT));
