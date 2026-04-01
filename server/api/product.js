import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "data/products.json");

export default function handler(req, res) {
  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

  const { method } = req;
  const { id } = req.query; // récupère /api/products?id=1 ou /api/products/1

  if (method === "GET") {
    if (id) {
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(product);
    }
    return res.status(200).json(products);
  }

  // if (method === "POST") {
  //   const newProduct = { id: products.length + 1, ...req.body };
  //   products.push(newProduct);
  //   fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  //   return res.status(201).json(newProduct);
  // }

  // if (method === "PUT") {
  //   const productIndex = products.findIndex((p) => p.id === parseInt(id));
  //   if (productIndex === -1)
  //     return res.status(404).json({ error: "Product not found" });
  //   products[productIndex] = { ...products[productIndex], ...req.body };
  //   fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  //   return res.status(200).json(products[productIndex]);
  // }

  // if (method === "DELETE") {
  //   const productIndex = products.findIndex((p) => p.id === parseInt(id));
  //   if (productIndex === -1)
  //     return res.status(404).json({ error: "Product not found" });
  //   products.splice(productIndex, 1);
  //   fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  //   return res.status(200).json({ message: "Product deleted successfully" });
  // }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
