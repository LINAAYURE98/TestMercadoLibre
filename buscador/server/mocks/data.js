// server/mocks/data.js
const AUTHOR = { name: "Lina", lastname: "Ayure" }; // firma en el JSON (modificalo si quieres)

const ITEMS = [
  {
    id: "MLA1001",
    title: "iPhone 12 - 64GB",
    price: { currency: "ARS", amount: 120000, decimals: 0 },
    picture: "https://via.placeholder.com/150",
    condition: "new",
    free_shipping: true
  },
  {
    id: "MLA1002",
    title: "Samsung Galaxy S20",
    price: { currency: "ARS", amount: 85000, decimals: 0 },
    picture: "https://via.placeholder.com/150",
    condition: "used",
    free_shipping: false
  },
  {
    id: "MLA1003",
    title: "Xiaomi Redmi Note 9",
    price: { currency: "ARS", amount: 45000, decimals: 0 },
    picture: "https://via.placeholder.com/150",
    condition: "new",
    free_shipping: true
  },
  {
    id: "MLA1004",
    title: "Motorola G9",
    price: { currency: "ARS", amount: 39000, decimals: 0 },
    picture: "https://via.placeholder.com/150",
    condition: "new",
    free_shipping: false
  }
];

// detalle por id (más campos)
const ITEM_DETAILS = {
  MLA1001: {
    id: "MLA1001",
    title: "iPhone 12 - 64GB",
    price: { currency: "ARS", amount: 120000, decimals: 0 },
    picture: "https://via.placeholder.com/600x600",
    condition: "new",
    free_shipping: true,
    sold_quantity: 25,
    description: "iPhone 12 en excelente estado. Características: pantalla 6.1\", 64GB."
  },
  MLA1002: {
    id: "MLA1002",
    title: "Samsung Galaxy S20",
    price: { currency: "ARS", amount: 85000, decimals: 0 },
    picture: "https://via.placeholder.com/600x600",
    condition: "used",
    free_shipping: false,
    sold_quantity: 10,
    description: "Samsung Galaxy S20 usado, batería revisada, con caja."
  },
  MLA1003: {
    id: "MLA1003",
    title: "Xiaomi Redmi Note 9",
    price: { currency: "ARS", amount: 45000, decimals: 0 },
    picture: "https://via.placeholder.com/600x600",
    condition: "new",
    free_shipping: true,
    sold_quantity: 40,
    description: "Xiaomi Redmi Note 9, garantía 6 meses."
  },
  MLA1004: {
    id: "MLA1004",
    title: "Motorola G9",
    price: { currency: "ARS", amount: 39000, decimals: 0 },
    picture: "https://via.placeholder.com/600x600",
    condition: "new",
    free_shipping: false,
    sold_quantity: 5,
    description: "Motorola G9, libre de fábrica."
  }
};

function getSearchMock(q) {
  // simulamos búsqueda simple (match por título)
  const qLow = (q || "").toLowerCase();
  const items = ITEMS.filter(it => it.title.toLowerCase().includes(qLow)).slice(0, 4);
  // si no hay coincidencias devolvemos los primeros 4
  const resultItems = items.length ? items : ITEMS.slice(0, 4);

  // categorias: (según el enunciado: breadcrumb basada en la categoría con más resultados)
  const categories = ["Celulares y Teléfonos", "Smartphones"];

  return {
    author: AUTHOR,
    categories,
    items: resultItems
  };
}

function getItemMock(id) {
  const detail = ITEM_DETAILS[id];
  if (!detail) return null;
  return {
    author: AUTHOR,
    item: detail
  };
}

function getItemsByIds(ids = []) {
  // retorna un array de items (útil para multiget)
  return ids
    .map(id => ITEM_DETAILS[id] || ITEMS.find(it => it.id === id))
    .filter(Boolean);
}

module.exports = {
  getSearchMock,
  getItemMock,
  getItemsByIds
};
