// Usuario.js
/** Clase que representa a un usuario de la plataforma*/
/* class Usuario {
    constructor(id, username, nombre, apellido, email, password, ubicacion, telefono, bio, fotos, tipo) {
      this.id = id;
      this.username = username;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
      this.ubicacion = ubicacion;
      this.telefono = telefono;
      this.bio = bio;
      this.fotos = fotos;
      this.tipo = tipo; // tipo normal o anunciante
    }
  }
  
  module.exports = Usuario; */

// Usuario.js
const mongoose = require('mongoose'); //Importando mongoose.
//Definiendo el objeto UsuarioSchema con el constructor Schema.
//Definiendo cada campo con su respectivo tipo de dato.
const UsuarioSchema = new mongoose.Schema({
  username: String,
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  ubicacion: String,
  telefono: String,
  bio: String,
  foto: String,
  tipo: String,
}, {
  timestamps: true
});

//Define el modelo Usuario, utilizando el esquema UsuarioSchema.
mongoose.model("Usuario", UsuarioSchema);



// Usuario.js
const mongoose = require('mongoose'); //Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.

//Definiendo cada campo con sus tipo sde datos y las validaciones sobre este.
const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "no puede estar vacío"],
    match: [/^[a-zA-Z0-9]+$/, "es inválido"],
    index: true,
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true, //este campo no se puede repetir
    lowercase: true,
    required: [true, "no puede estar vacío"],
    match: [/\S+@\S+\.\S+/, "es inválido"],
    index: true,
  },
  ubicacion: String,
  telefono: String,
  bio: String,
  foto: String,
  tipo: {
    type: String,
    enum: ['normal', 'anunciante']
  },
  hash: String, //este campo se utilizará para la sesión
  salt: String, //este campo se utilizará para la sesión
}, {
  timestamps: true
});

// usando plugin de validación para que no se repitan correos ni usernames
UsuarioSchema.plugin(uniqueValidator, {
  message: "Ya existe"
});
mongoose.model("Usuario", UsuarioSchema); //Define el modelo Usuario, utilizando el esquema UsuarioSchema.