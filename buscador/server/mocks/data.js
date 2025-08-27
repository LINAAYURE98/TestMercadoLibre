const AUTHOR = { name: "Lina", lastname: "Ayure" }; 

const ITEMS = [
  {
    id: "MLA1001",
    title: "iPhone 12 - 64GB",
    price: { currency: "ARS", amount: 120000, decimals: 0 },
    picture: "/assets/iPhone12-64GB.PNG",
    condition: "new",
    free_shipping: true,
    categories: ["Celulares y Teléfonos", "Apple"]  
  },
  {
    id: "MLA1002",
    title: "Samsung Galaxy S20",
    price: { currency: "ARS", amount: 85000, decimals: 0 },
    picture: "/assets/Samsung-Galaxy-S20.PNG",
    condition: "used",
    free_shipping: false,
    categories: ["Celulares y Teléfonos", "Samsung"] 
  },
  {
    id: "MLA1003",
    title: "Xiaomi Redmi Note 9",
    price: { currency: "ARS", amount: 45000, decimals: 0 },
    picture: "/assets/Xiaomi-Redmi-Note-9.PNG",
    condition: "new",
    free_shipping: true,
    categories: ["Celulares y Teléfonos", "Xiaomi"]
  },
  {
    id: "MLA1004",
    title: "Motorola G9",
    price: { currency: "ARS", amount: 39000, decimals: 0 },
    picture: "/assets/Motorola-G9.PNG",
    condition: "new",
    free_shipping: false,
    categories: ["Celulares y Teléfonos", "Motorola"]
  },
  {
    id: "MLA1005",
    title: "iPhone 13 - 128GB",
    price: { currency: "ARS", amount: 160000, decimals: 0 },
    picture: "/assets/iphone13.png",
    condition: "new",
    free_shipping: true,
    categories: ["Celulares y Teléfonos", "Apple"]
  },
  {
    id: "MLA1006",
    title: "iPhone 14 Pro - 256GB",
    price: { currency: "ARS", amount: 220000, decimals: 0 },
    picture: "/assets/iphone14pro.png",
    condition: "new",
    free_shipping: true,
    categories: ["Celulares y Teléfonos", "Apple"]
  },
  {
    id: "MLA1007",
    title: "iPhone SE (2022) - 64GB",
    price: { currency: "ARS", amount: 100000, decimals: 0 },
    picture: "/assets/iphonese.png",
    condition: "new",
    free_shipping: false,
    categories: ["Celulares y Teléfonos", "Apple"]
  }
];

const ITEM_DETAILS = {
  MLA1001: {
    id: "MLA1001",
    title: "iPhone 12 - 64GB",
    price: { currency: "ARS", amount: 120000, decimals: 0 },
    picture: "/assets/iPhone12-64GB.PNG",
    condition: "new",
    free_shipping: true,
    sold_quantity: 25,
    description: "iPhone 12 en excelente estado. Características: pantalla 6.1\", 64GB.",
    categories: ["Celulares y Teléfonos", "Apple"]  
  },
  MLA1002: {
    id: "MLA1002",
    title: "Samsung Galaxy S20",
    price: { currency: "ARS", amount: 85000, decimals: 0 },
    picture: "/assets/Samsung-Galaxy-S20.PNG",
    condition: "used",
    free_shipping: false,
    sold_quantity: 10,
    description: "Samsung Galaxy S20 usado, batería revisada, con caja.",
     categories: ["Celulares y Teléfonos", "Samsung"] 
  },
  MLA1003: {
    id: "MLA1003",
    title: "Xiaomi Redmi Note 9",
    price: { currency: "ARS", amount: 45000, decimals: 0 },
    picture: "/assets/Xiaomi-Redmi-Note-9.PNG",
    condition: "new",
    free_shipping: true,
    sold_quantity: 40,
    description: "Xiaomi Redmi Note 9, garantía 6 meses.",
    categories: ["Celulares y Teléfonos", "Xiaomi"]
  },
  MLA1004: {
    id: "MLA1004",
    title: "Motorola G9",
    price: { currency: "ARS", amount: 39000, decimals: 0 },
    picture: "/assets/Motorola-G9.PNG",
    condition: "new",
    free_shipping: false,
    sold_quantity: 5,
    description: "Motorola G9, libre de fábrica.",
    categories: ["Celulares y Teléfonos", "Motorola"]
  },
  MLA1005: {
    id: "MLA1005",
    title: "iPhone 13 - 128GB",
    price: { currency: "ARS", amount: 160000, decimals: 0 },
    picture: "/assets/iphone13.png",
    condition: "new",
    free_shipping: true,
    sold_quantity: 18,
    description: "iPhone 13 con 128GB, pantalla Super Retina XDR de 6.1\" y chip A15 Bionic.",
    categories: ["Celulares y Teléfonos", "Apple"]
  },
  MLA1006: {
    id: "MLA1006",
    title: "iPhone 14 Pro - 256GB",
    price: { currency: "ARS", amount: 220000, decimals: 0 },
    picture: "/assets/iphone14pro.png",
    condition: "new",
    free_shipping: true,
    sold_quantity: 12,
    description: "iPhone 14 Pro con 256GB, Dynamic Island, cámara de 48MP y chip A16 Bionic.",
    categories: ["Celulares y Teléfonos", "Apple"]
  },
  MLA1007: {
    id: "MLA1007",
    title: "iPhone SE (2022) - 64GB",
    price: { currency: "ARS", amount: 100000, decimals: 0 },
    picture: "/assets/iphonese.png",
    condition: "new",
    free_shipping: false,
    sold_quantity: 30,
    description: "iPhone SE (3ra generación) con chip A15 Bionic y diseño compacto de 4.7\".",
    categories: ["Celulares y Teléfonos", "Apple"]
  }
};

function getSearchMock(q) {
  const qLow = (q || "").toLowerCase()
  const items = ITEMS.filter(it => it.title.toLowerCase().includes(qLow)).slice(0, 4)

  const categories = items.length > 0 ? items[0].categories : []

  return {
    author: AUTHOR,
    categories,
    items
  }
}


function getItemMock(id) {
  const detail = ITEM_DETAILS[id];
  if (!detail) return null;
  return {
    author: AUTHOR,
    item: detail,
    categories: detail.categories || [] 
  };
}

function getItemsByIds(ids = []) {
  return ids
    .map(id => ITEM_DETAILS[id] || ITEMS.find(it => it.id === id))
    .filter(Boolean);
}

module.exports = {
  getSearchMock,
  getItemMock,
  getItemsByIds
};
