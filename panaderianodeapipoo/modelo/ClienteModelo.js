const dbService = require('./bd/Conexion');
const bcrypt = require('bcrypt');

class Cliente {
  constructor({ documento, nombres, telefono, correo, contrasena }) {
    this.documento = documento;
    this.nombres = nombres;
    this.telefono = telefono;
    this.correo = correo;
    this.contrasena = contrasena;
  }

  async guardar() {
    const query = `
      INSERT INTO usuarios 
      (documento, nombres, telefono, correo, contrasena, fechaCreacion)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      const hash = await bcrypt.hash(this.contrasena, 10);
      const valores = [
        this.documento,
        this.nombres,
        this.telefono,
        this.correo,
        hash,
        new Date().toISOString()
      ];

      return await dbService.query(query, valores);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Cliente;



