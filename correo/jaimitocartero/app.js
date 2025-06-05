const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = 3000; // configurar el puerto en 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // para convertir json a html
app.use(express.static('public'));// crear una carpeta estatica 

// Ruta para enviar correo
app.post('/send-email', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configurar el correo con el .env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // configurar que dira el correo 
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Correo desde Node.js',
    text: `Hola ${nombre},\n\nGracias por tu mensaje:\n${mensaje}`,
    html: `<h2>Hola ${nombre}</h2><p>Gracias por tu mensaje:</p><p>${mensaje}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
});
// este crear el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
