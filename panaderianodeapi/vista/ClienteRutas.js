const express = require('express');
const CRutas = require('../../controlador/cliente/ClienteControlador');
const router = express.Router();

router.post('/usuarios', CRutas.crearCliente);
module.exports = router; 