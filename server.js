const express = require('express');
const app = express();
const port = process.env.PORT ?? 3000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const Productos = require("./productos.js");
const connectDB = require("./database.js");
connectDB();


//Middleware
app.use(express.json());
app.use(morgan('dev'));

//Ruta principal
app.get('/', (req, res) => {
    res.json('Bienvenidos a la API de Productos Electronicos')
})

//Ruta para obtener todos los productos
app.get('/electronicos', async (req, res) => {
    try {
        const products = await Productos.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar los productos' })
    }
})

// Ruta para mostrar los productos de una categoria
app.get("/electronicos/categorias/:categoria", async (req, res) => {
    const { categoria } = req.params;
    const query = categoria
        ? { categorias: { $regex: categoria, $options: "i" } }
        : {};
    try {
        const productos = await Productos.find(query);
        productos.length > 0
            ? res.json(productos)
            : res.status(404).json({ message: "No se encontraron productos" });
    } catch (error) {
        res.status(500).send("Error al buscar los productos");
    }
});


//Ruta para mostrar un producto por ID
app.get("/electronicos/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Productos.findById(id);
    product
        ? res.json(product)
        : res.status(404).json({ message: "Producto no encontrado" });
});

//Ruta para crear un nuevo producto
app.post("/electronicos/", async (req, res) => {
    const nuevoProducto = new Productos(req.body);
    try {
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: "No se pudo añadir el producto" });
    }
});

//Ruta para actualizar un producto parcialmente
app.patch("/electronicos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const productoModificado = await Productos.findByIdAndUpdate(id, req.body, {
            new: true,

        });
        if (!productoModificado) {
            return res
                .status(404)
                .json({ message: "Producto no encontrado para modificar" });
        } else {
            res.json({
                message: "Producto actualizado parcialmente con exito",
                productoModificado,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Hubo un error al modificar el producto" });
    }
});

//Ruta para actualizar un producto totalmente
app.put("/electronicos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const productoModificado = await Productos.findByIdAndUpdate(id, req.body, {
            new: true,
            overwrite: true,
        });
        if (!productoModificado) {
            return res
                .status(404)
                .json({ message: "Producto no encontrado para modificar" });
        } else {
            res.json({
                message: "Producto actualizado completo con exito",
                productoModificado,
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Hubo un error al modificar el producto" });
    }
});


//Ruta para eliminar un producto

app.delete("/electronicos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await Productos.findByIdAndDelete(id);
        resultado
            ? res.json({ message: "Producto borrado con exito" })
            : res
                .status(404)
                .json({ message: "No se encontro el producto para borrar" });
    } catch (error) {
        return res.status(500).json({ message: "Error al borrar el producto" });
    }
});

//Devuelve productos que coinciden con el nombre especificado (busqueda parcial)
app.get("/electronicos/nombre/:nombre", async (req, res) => {
    const { nombre } = req.params;

    try {
        const nombreBuscado = await Productos.find({
            nombre: new RegExp(nombre, "i"),
        });
        nombreBuscado
            ? res.json(nombreBuscado)
            : res.status(404).json({ message: "Error al buscar el producto" });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto" });
    }
});

//Devuelve productos que coinciden con el codigo especificado (busqueda parcial)
app.get("/electronicos/codigo/:codigo", async (req, res) => {
    const codigo = parseFloat(req.params.codigo);
    try {
        const products = await Productos.find({ codigo });
        products
            ? res.json(products)
            : res.status(404).json({ message: "Error al encontrar el codigo" });
    } catch (error) {
        res.status(500).json({ message: "Error al encontrar el codigo" });
    }
});
//Devuelve productos con un precio mayor al especificado
app.get("/electronicos/precio/mayor/:precio", async (req, res) => {
    const precio = parseFloat(req.params.precio);
    try {
        const products = await Productos.find({ precio: { $gt: precio } });
        products
            ? res.json(products)
            : res.status(404).json({ message: "Error al encontrar los productos" });
    } catch (error) {
        res.status(500).json({ message: "Error al encontrar los productos" });
    }
});

//Devuelve productos con un precio menor al especificado
app.get("/electronicos/precio/menor/:precio", async (req, res) => {
    const precio = parseFloat(req.params.precio);
    try {
        const products = await Productos.find({ precio: { $lt: precio } });
        products
            ? res.json(products)
            : res.status(404).json({ message: "Error al encontrar los productos" });
    } catch (error) {
        res.status(500).json({ message: "Error al encontrar los productos" });
    }
});


//Error 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' })
})

//Error 500

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})


app.listen(port, () => {
    console.log(`App listenig on http://localhost:${port}`)
})