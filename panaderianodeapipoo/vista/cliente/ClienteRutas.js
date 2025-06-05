const express = require('express');
const conCliente = require('../../controlador/cliente/ClienteControlador');

class ClienteRutas {
  constructor() {
    this.router = express.Router();
    this.controlador = new conCliente();
    this.configurarRutas();
  }

  configurarRutas() {
    this.router.post('/usuarios', (req, res) => this.controlador.crearCliente(req, res));
  }

  mostrarRutas() {
    return this.router;
  }
}

module.exports = new ClienteRutas().mostrarRutas();
