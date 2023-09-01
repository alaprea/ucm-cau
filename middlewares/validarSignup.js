'use strict';
const { body } = require("express-validator");

module.exports = [
  body('passwordAgain').custom((value, { req }) => {
    if (value !== req.body.password) {
      return false;
    }
    return true;
  }).withMessage('Las contraseñas no coinciden'),
  body('username',)
    .not().isEmpty().withMessage('El nombre de usuario no puede estar vacío'),
  body('perfil', 'Tipo de usuario no valido').isIn(['Alumno', 'PAS', 'PDI', 'A.A']),
];