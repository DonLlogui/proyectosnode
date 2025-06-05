const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();

const correoRuta = require('./vista/CorreoRutas');
const app = express();
const PORT = 3333;

// Habilitar CORS con configuración
app.use(cors({
  origin: '*', // Cambiar a ['http://localhost:5500'] si quieres limitar
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use('/', correoRuta);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
