class CorreoModelo {
  constructor(nombre, email, contenido) {
    this.nombre = nombre;
    this.email = email;
    this.mensaje = contenido;
  }

  esValido() {
    return (
      typeof this.nombre === 'string' && this.nombre.trim() &&
      typeof this.email === 'string' && this.email.trim() &&
      typeof this.mensaje === 'string' && this.mensaje.trim()
    );
  }
}

module.exports = CorreoModelo;