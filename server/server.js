const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ser = require("./ser.json");
const data = require("./data.json");
const products = require("./products.json");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
// console.log(process.env)
// Chemin vers le fichier JSON
const productsFilePath = path.join(__dirname, "products.json");

//parse les url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Permission cors
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

// Fonction pour lire les produits depuis le fichier JSON
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

const config = require("./config");
console.log("infos config database : ", config);

app.get("/ser", function (req, res) {
  res.json(ser);
});
// Route GET pour récupérer tous les produits
app.get("/fakestoreapi/products", function (req, res) {
  res.json(products);
});
// Route GET pour récupérer un produit par son id
app.get("/fakestoreapi/products/:id", function (req, res) {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  console.log("🚀 ~ product:", product);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
// Route POST pour ajouter un nouveau produit
app.post("/fakestoreapi/products", function (req, res) {
  const product = req.body;
  console.log("🚀 ~ product:", product);
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(newProduct);
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error writing file:", err);
  }
});
// Route PUT pour modifier un produit existant
app.put("/fakestoreapi/products/:id", function (req, res) {
  const products = readProducts();
  console.log("🚀 ~ products:", products);
  const productId = parseInt(req.params.id);
  console.log("🚀 ~ productId:", productId);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );
  console.log("🚀 ~ productIndex:", productIndex);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Mise à jour des champs du produit
  products[productIndex] = { ...products[productIndex], ...req.body };
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(200).json(products[productIndex]);
  } catch (error) {
    console.error("Error writing file:", err);
  }
});

// Route DELETE pour supprimer un produit par son id
app.delete("/fakestoreapi/products/:id", function (req, res) {
  const products = readProducts();
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId,
  );

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Supprimer le produit du tableau
  products.splice(productIndex, 1);

  // Écrire les produits mis à jour dans le fichier JSON
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/data", function (req, res) {
  res.json(data);
});

const PORT = process.env.PORT;
console.log("🚀 ~ port:", PORT);
app.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
