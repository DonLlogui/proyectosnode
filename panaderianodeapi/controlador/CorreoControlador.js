const nodemailer = require('nodemailer');

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

  async enviarBienvenida(nombre, emailUsuario) {
    const asunto = '¡Bienvenido a la panadería!';
    const texto = `Hola ${nombre}, gracias por registrarte.\n\nTu usuario para acceder al sistema es: ${emailUsuario}`;
    const html = `
      <h2>¡Hola ${nombre}!</h2>
      <p>Gracias por registrarte en nuestra panadería.</p>
      <p><strong>Tu usuario para acceder:</strong> ${emailUsuario}</p>
      <p>¡Te esperamos pronto!</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailUsuario,
      subject: asunto,
      text: texto,
      html: html
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar correo de bienvenida:', error.message);
      throw new Error('No se pudo enviar el correo de bienvenida');
    }
  }
}

module.exports = new CorreoControlador();
