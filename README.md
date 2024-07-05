# API de productos

Este proyecto implementa una API RESTful para la gestión de productos electronicos almacenados en una base de datos JSON denominada productos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos, así como consultas avanzadas como filtrado por categoría, búsqueda por nombre, busqueda por ID y filtrado por rango de importe.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB (con Mongoose para la integración)
- Morgan
- dotenv


## Instalación

1. Clonar el repositorio:
   git clone https://github.com/Cazuzavive/backend-modulo-1
3. Instalar dependencias:
   npm install express mongoose dotenv morgan
4. Configuración de la base de datos:
   La configuracion de la conexión a la base de datos mondoDB esta en el archivo database.js.
5. Ejecutar la aplicación:
   npm start
   La aplicación estará disponible en [http://localhost:3000].

## Uso
Endpoints
* GET /electronicos
  Devuelve todos los productos.
  GET [http://localhost:3000/electronicos](http://localhost:3000/electronicos)
 
* GET /electronicos/categorias/:categoria
Devuelve todos los productos de una categoría.
GET [http://localhost:3000/electronicos/categoria/:categoria](http://localhost:3000/electronicos/Hogar)

* GET /electronicos/
  Devuelve un producto por su ID.
  GET [http://localhost:3000/electronicos/:id](http://localhost:3000/electronicos/667dc1dd77b70f342b0759aa)

* POST /electronicos/
  Crea un nuevo producto.
  POST [http://localhost:3000/electronicos/](http://localhost:3000/electronicos/)
  Content-Type: application/json
  {
    "codigo": "codigo"
  "nombre": "Nuevo Producto",
  "precio": 399.99,
  "categoria": "Electrónica"
  
  }

* PATCH /electronicos/
  Actualiza parcialmente un producto por su ID.
  PATCH [http://localhost:3000/electronicos/:id](http://localhost:3000/electronicos/67dc1dd77b70f342b0759aa)
  Content-Type: application/json
  {
  "precio": 449.99
  }

* PUT /electronicos/
  Actualiza completamente un producto por su ID.
  PUT [http://localhost:3000/electronicos/:id](http://localhost:3000/electronicos/6667dc1dd77b70f342b0759aa)
  Content-Type: application/json
  {
  "codigo": "codigo",
  "nombre": "Producto Actualizado",
  "precio": 449.99,
  "categorias": "Electrónicos"  
  }

* DELETE /electronicos/
  Elimina un producto por su ID.
  DELETE [http://localhost:3000/electronicos/:id](http://localhost:3000/electronicos/6688621eeefa83b6ecfec266)

* GET /electronicos/nombre/
  Devuelve los productos con un nombre especificado.
  GET [http://localhost:3000/electronicos/nombre/:nombre](http://localhost:3000/electronicos/nombre/Router WiFi)

* GET /electronicos/codigo/
  Devuelve los productos con un importe menor al especificado.
  GET [http://localhost:3000/electronicos/codigo/:codigo](http://localhost:3000/electronicos/codigo/27)

* GET /electronicos/precio/mayor/
  Devuelve todos los productos con precio mayor al especificado.
  GET [http://localhost:3000/electronicos/precio/mayor/:precio](http://localhost:3000/electronicos/precio/mayor/300)

* GET /electronicos/precio/menor/
  Devuelve todos los productos con precio menor al especificado.
  GET [http://localhost:3000/electronicos/precio/menor/:precio](http://localhost:3000/electronicos/precio/menor/300)

