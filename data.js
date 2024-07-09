const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));

app.get('/', (req, res) => {
    const data = {
        title: 'Sitio web de articulos electronicos',
        message: 'Bienvenidos',
        products: [{ nombre: 'Notebook', precio: 720 },
        { nombre: 'Mouse', precio: 15 },
        { nombre: 'Teclado', precio: 45 },
        { nombre: 'Monitor', precio: 120 },
        { nombre: 'Disco duro', precio: 100 },
        { nombre: 'Pantalla', precio: 80 },
        { nombre: 'Cargador', precio: 30 },
        { nombre: 'Mousepad', precio: 10 },
        { nombre: 'Cables', precio: 20 },
        { nombre: 'Tableta', precio: 50 },
        { nombre: 'Consola', precio: 60 },
        { nombre: 'Auriculares', precio: 35 },
        { nombre: 'Mouse inalambrico', precio: 25 }

        ]
    };
    res.render('index', data);
});
exports = data;