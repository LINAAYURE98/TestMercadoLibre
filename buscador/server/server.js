// server/server.js
const express = require("express");
const cors = require("cors");
const { getSearchMock, getItemMock, getItemsByIds } = require("./mocks/data");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint requerido por el test: /api/items?q=:query
app.get("/api/items", (req, res) => {
  const q = req.query.q;
  if (!q) {
    // si quieres, puedes devolver 400; aquí devolvemos resultados por defecto si no llegara query
    return res.json(getSearchMock(""));
  }
  const data = getSearchMock(q);
  return res.json(data);
});

// Endpoint requerido por el test: /api/items/:id
app.get("/api/items/:id", (req, res) => {
  const id = req.params.id;
  const data = getItemMock(id);
  if (!data) return res.status(404).json({ error: "Item not found" });
  return res.json(data);
});

// Endpoint extra para simular un multiget: POST /api/items/multiget { ids: ["MLA1001","MLA1002"] }
app.post("/api/items/multiget", (req, res) => {
  const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
  const items = getItemsByIds(ids);
  return res.json({
    author: { name: "Lina", lastname: "Ayure" },
    items
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
