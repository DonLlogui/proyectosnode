class ValidadorCliente {
  validarTodos(doc, name, tel, email, contra) {
    const errores = [];

    const campos = this.verCampos(doc, name, tel, email, contra);
    if (campos) errores.push(campos);

    const ide = this.verIde(doc);
    if (ide) errores.push(ide);

    const nom = this.verNombres(name);
    if (nom) errores.push(nom);

    const telefono = this.verTel(tel);
    if (telefono) errores.push(telefono);

    const correo = this.verEmail(email);
    if (correo) errores.push(correo);

    const clave = this.verContrasena(contra);
    if (clave) errores.push(clave);

    return errores;
  }

  verCampos(doc, name, tel, email, contra) {
    if (!doc || !name || !tel || !email || !contra) {
      return 'Todos los campos son obligatorios.';
    }
    return null;
  }

  verIde(doc) {
    if (!/^\d{8,10}$/.test(doc)) {
      return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
    }
    return null;
  }

  verNombres(name) {
    const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
    if (!nom.test(name)) {
      return 'Nombres y apellidos inválidos. Solo letras (3-100 caracteres).';
    }
    return null;
  }

  verTel(tel) {
    if (!/^\d{10}$/.test(tel)) {
      return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
    }
    return null;
  }

  verEmail(email) {
    const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!er.test(email) || email.length > 200) {
      return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
    }
    return null;
  }

  verContrasena(contra) {
    const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!key.test(contra)) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
    }
    return null;
  }
}

module.exports = ValidadorCliente;

