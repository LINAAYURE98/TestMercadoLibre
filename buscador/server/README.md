# TestMercadoLibre

## MercadoLibre Mock Server

Este proyecto implementa un backend simulado (mock) con Node.js y Express para poder desarrollar el frontend sin depender de la API real de MercadoLibre.

El mock sigue la firma de respuesta indicada en el test técnico y expone los siguientes endpoints:

## Instalación

```bash
cd server
npm install
```

## Ejecutar el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001` por defecto.

## Endpoints disponibles

### 1. Búsqueda de productos

**GET** `/api/items?q=:query`

Retorna un máximo de 4 resultados de búsqueda.

**Ejemplo de uso:**
```bash
curl http://localhost:3001/api/items?q=iphone
```

**Respuesta:**
```json
{
  "author": { 
    "name": "Lina", 
    "lastname": "Ayure" 
  },
  "categories": ["Celulares y Teléfonos", "Smartphones"],
  "items": [
    {
      "id": "MLA1001",
      "title": "iPhone 12 - 64GB",
      "price": { 
        "currency": "ARS", 
        "amount": 120000, 
        "decimals": 0 
      },
      "picture": "https://via.placeholder.com/150",
      "condition": "new",
      "free_shipping": true
    }
    // ... más items
  ]
}
```

### 2. Detalle de un producto

**GET** `/api/items/:id`

Retorna información completa de un item específico.

**Ejemplo de uso:**
```bash
curl http://localhost:3001/api/items/MLA1001
```

**Respuesta:**
```json
{
  "author": { 
    "name": "Lina", 
    "lastname": "Ayure" 
  },
  "item": {
    "id": "MLA1001",
    "title": "iPhone 12 - 64GB",
    "price": { 
      "currency": "ARS", 
      "amount": 120000, 
      "decimals": 0 
    },
    "picture": "https://via.placeholder.com/600x600",
    "condition": "new",
    "free_shipping": true,
    "sold_quantity": 25,
    "description": "iPhone 12 en excelente estado. Características: pantalla 6.1\", 64GB."
  }
}
```

### 3. Multiget (opcional)

**POST** `/api/items/multiget`

Permite obtener varios productos a la vez enviando un array de IDs.

**Ejemplo de uso:**
```bash
curl -X POST http://localhost:3001/api/items/multiget \
  -H "Content-Type: application/json" \
  -d '{"ids":["MLA1001","MLA1003"]}'
```

**Respuesta:**
```json
{
  "author": { 
    "name": "Lina", 
    "lastname": "Ayure" 
  },
  "items": [
    { 
      "id": "MLA1001", 
      "title": "iPhone 12 - 64GB"
      // ... resto de campos
    },
    { 
      "id": "MLA1003", 
      "title": "Xiaomi Redmi Note 9"
      // ... resto de campos
    }
  ]
}
```