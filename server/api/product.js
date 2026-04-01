// pages/api/products.js
import products from "../../data/products.json";

export default function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  if (method === "GET") {
    if (id) {
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(product);
    }
    return res.status(200).json(products);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
