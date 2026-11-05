import { query } from "./db.js";
import cors from "cors";
import express from "express";
import multer from "multer";
import NodeCache from "node-cache";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cache = new NodeCache({ stdTTL: 600 }); // Cache con TTL de 10 minutos

// Crea una instancia Express con las rutas ya montadas.
export function createApp(app = express()) {
  app.use(cors());
  app.use(express.json());
  app.use(router);
  return app;
}

router.get("/menu", async (req, res) => {
  const cacheKey = "menuData";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const drinksSql = "SELECT * FROM drinks";
    const foodsSql = "SELECT * FROM food";

    const [resultDR] = await query(drinksSql);
    const [resultFD] = await query(foodsSql);

    const data = { resultDR, resultFD };
    cache.set(cacheKey, data);

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post(`/new/:type`, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "image is required" });
  }

  const { type } = req.params;
  const { name, price, description } = req.body;
  const image = req.file.buffer;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "name, price, description are required" });
  }

  let table;
  if (type === "bebida") {
    table = "drinks";
  } else if (type === "comida") {
    table = "food";
  } else {
    return res.status(400).json({ error: "Invalid item type" });
  }

  try {
    const sql = `INSERT INTO ${table} (name, price, description, image) VALUES (?, ?, ?, ?)`;
    const [result] = await query(sql, [name, price, description, image]);

    // Invalidate cache after creating a new item
    cache.del("menuData");

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;