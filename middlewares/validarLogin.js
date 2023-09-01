'use strict';

const { body } = require("express-validator");

module.exports = [
  body('email','El campo email no puede estar vacío').not().isEmpty().bail()
    .isEmail().withMessage('No es un correo valido').bail()
    .matches('^[a-zA-Z0-9._-]+@ucm\.es$')
    .withMessage('Introduce un correo UCM'),
  body('password','El campo contraseña no puede estar vacío').not().isEmpty().bail()
    .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,16}$')
    .withMessage('Contraseña no valida debe tener entre 8 y 16 caracteres, al menos un caracter especial, un número y una mayuscula'),
]
