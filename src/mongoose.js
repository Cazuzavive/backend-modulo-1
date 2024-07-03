const mongoose = require("mongoose");
require("dotenv").config();

//Obtenemos la URI desde las variables de entorno (archivo .env)
const URI = process.env.MONGODB_URLSTRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

// Conectar a MongoDB usando Mongoose
const connectDB = () => {
    return mongoose
        .connect(URI + DATABASE_NAME)
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.log("Error al conectarse : ", err));
};

module.exports = connectDB;
