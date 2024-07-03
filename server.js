const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT ?? 3000
const morgan = require('morgan')
const mongoose = require('mongoose')


//Obtener la URI desde las variables de entorno
const URI = process.env.MONGODB_URLSTRING
const DATABASE_NAME = process.env.DATABASE_NAME

//Conectar a MongoDB usando Mongoose
mongoose
    .connect(URI + '/' + DATABASE_NAME)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error(err))

//Definir el esquema con el que va a trabajar Mongoose
const productosSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    precio: Number,
    categorias: [String]
})
const Productos = mongoose.model('productos', productosSchema)

//Middleware
app.use(express.json())
app.use(morgan('dev'))

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
app.get("/electronicos/:nombre", async (req, res) => {
    const { categorias } = req.query;
    const query = !categorias
        ? {}
        : { categorias: { $regex: categorias, $options: "i" } };
    try {
        const categorias = await Productos.find(query);
        Productos
            ? res.json(Productos)
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
app.post("/electronicos", async (req, res) => {
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
    const { codigo } = req.params;
    try {
        const codigoBuscado = await Productos.find({
            codigo: new RegExp(codigo, "i"),
        });
        codigoBuscado
            ? res.json(codigoBuscado)
            : res.status(404).json({ message: "Error al buscar el producto" });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el producto" });
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

//Devuelve una lista de todas las categorias disponibles
app.get("/electronicos/categorias", async (req, res) => {
    try {
        const categorias = await Productos.distinct('categoria');
        categorias
            ? res.json(categorias)
            : res.status(404).json({ message: "Error al buscar las categorias de productos" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al encontrar las categorias de productos" });
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