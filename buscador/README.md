# Buscador de Productos - Test MercadoLibre

Este proyecto consiste en un buscador de productos que simula el consumo de la API de
MercadoLibre utilizando un servidor mock en Node.js con Express. El frontend está desarrollado en
React con Vite y los estilos en Sass.

## Requisitos previos

- Node.js v18 o superior - npm v9 o superior

## Instalación

Clonar el repositorio y posicionarse en la carpeta del proyecto:
git clone 
cd buscador

Instalar las dependencias:
npm install

## Estructura del proyecto
buscador/ 
 public/ # Imágenes y/o recursos 
 --assets
 server/ # Backend mock con Express
 --server.js
 --mocks/
  ---data.js
 src/ # Código fuente del frontend
 --components/ # Componentes de React
 --pages/ # Vistas principales
 --styles/ # Estilos en Sass y CSS compilado
 --App.jsx
 --main.jsx
package.json
vite.config.js

## Scripts disponibles

En el directorio del proyecto, se pueden ejecutar los siguientes comandos:
- npm run dev Inicia el frontend en modo desarrollo con Vite en http://localhost:5173.
- npm run server Inicia el servidor backend mock con Nodemon en http://localhost:3001.
- npm run build Genera el build de producción del frontend en la carpeta styles/.
- npm run preview Sirve el build de producción localmente para ver el resultado final.

## Ejecución del servidor backend

El servidor Express levanta los endpoints mock en el puerto 3001:
npm run server
Endpoints disponibles:
- /api/items?q=:query Retorna un listado de productos en el formato especificado.
- /api/items/:id Retorna el detalle de un producto, incluyendo descripción y categorías.

## Ejecución del frontend

El frontend se levanta con Vite en el puerto 5173 por defecto:
npm run dev
Abrir en el navegador:
http://localhost:5173

## Estilos

Los estilos están organizados en src/styles/ utilizando Sass. El archivo principal es main.scss, que
importa variables, componentes y páginas.
Para compilar Sass a CSS, Vite lo hace automáticamente durante la ejecución de npm run dev y
npm run build.
Si se desea generar el build de producción:
npm run build
Los archivos compilados quedarán en la carpeta styles/.

## Rutas de la aplicación

- /items?search=:query Vista de resultados de búsqueda.
- /items/:id Vista de detalle del producto.

## Notas

- El proyecto no se conecta a la API real de MercadoLibre, sino a un mock definido en el backend
(server/mocks/data.js). - Las imágenes utilizadas en los mocks se encuentran en la carpeta
public/assets/