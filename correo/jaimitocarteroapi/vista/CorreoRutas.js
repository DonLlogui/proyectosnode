const express = require('express');
const router = express.Router();
const correoControlador = require('../controlador/CorreoControlador');

router.post('/send-email', (req, res) => correoControlador.enviarCorreo(req, res));

module.exports = router;