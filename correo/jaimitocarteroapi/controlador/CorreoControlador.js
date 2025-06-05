const nodemailer = require('nodemailer');
const Mensaje = require('../modelo/CorreoModelo');

class CorreoControlador {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async enviarCorreo(req, res) {
    const { nombre, email, mensaje } = req.body;
    const mensajeObj = new Mensaje(nombre, email, mensaje);

    if (!mensajeObj.esValido()) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mensajeObj.email,
      subject: 'Correo desde Node.js (con POO)',
      text: `Hola ${mensajeObj.nombre},\n\nGracias por tu mensaje:\n${mensajeObj.mensaje}`,
      html: `<h2>Hola ${mensajeObj.nombre}</h2><p>Gracias por tu mensaje:</p><p>${mensajeObj.mensaje}</p>`
    };

    try {
      await this.transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
  }
}

module.exports = new CorreoControlador();