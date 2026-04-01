// /api/ser.js
import ser from "../ser.json";

export default function handler(req, res) {
  res.status(200).json(ser);
}
