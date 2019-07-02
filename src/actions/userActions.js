// importamos los paquetes que vamos a utilizar
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
  UserModel,
} = require('../dataBase/models');

// creamos una funcion para Date que nos regresa un nuevo date con N numero de dias agregados.
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// creamos una funcion que recive la data del usuario y genera un token nuevo con fecha de expiracion
// paso 1 - crea una fecha de expiracion
// paso 2 - crea un payload para el token con base a la informacion del usuario
// paso 3 - regresa un token firmado por nuesto servidor con base en una clave secreta
const createToken = (userData) => {
  const exp = new Date().addDays(2).getTime();
  const payload = {
    _id: userData._id,
    email: userData.email,
    name: userData.name,
    exp,
  };

  return jwt.sign(payload, process.env.SECRET);
}

// sigupAction - funcion que registra un usuario en la base de datos
// Paso 1 - creamos una promesa.
// Paso 2 - registramos el usuario en la base de datos
// Paso 3 - si registra el usuario crea un token con los datos del nuevo usuario
// Paso 4 - retorna el objeto esperado
const signupAction = (userData) => {
  return new Promise((resolve, reject) => {
    UserModel.create(userData)
      .then(user => {
        console.log("TCL: signupAction -> user", user)
        const token = createToken(user);
        resolve({ token, message: `se ha registrado el usuario ${user.name}` })
      })
      .catch(reject);
  });
}

// loginAction - funcion que loguea al usuario, si sus credenciales son correctas te envia un login de autenticacion.
// Paso 1 - creamos una promesa.
// Paso 2 - buscamos en la base de datos un usario con un email en especifico
// Paso 3 - si existe el usuario comparamos el password ingresado con el password en la base de datos(encriptada)
// Paso 4 - si es valida la comparacion regresa un token con un mensaje
// Paso 5 - si alguna validacion falla o hay algun error regresa un error
const loginAction = (email, password) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: email })
      .then(user => {
        bcrypt.compare(
          password, // esta es el password que mandamos, poner como primer argumento
          user.password, // este es el password que guardamos en la base de datos, poner como segundo argumento
          (err, isValid) => {
            if (err) reject(error);
            isValid
              ? resolve({ token: createToken(user), message: `se ha logueado correctamente` })
              : reject({ token: '', message: 'credenciales invalidas' });
          })
      })
      .catch(error => reject(error));
  });
}

// exportamos los actions del usuario
module.exports = {
  loginAction,
  signupAction
}