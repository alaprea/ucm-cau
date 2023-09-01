const express = require('express');
const router = express.Router();
const bodyParse = require("body-parser");

const userRouter = require('./user.routes');
const avisoRouter = require('./aviso.routes');
const checkLogged = require("../middlewares/checkLogged");

router.use(bodyParse.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  res.redirect('/avisos/mostrar?tipo=MisAvisos')
});

//Rutas de usuarios
router.use('/user', userRouter);

router.use(checkLogged);

//Rutas de avisos
router.use('/avisos', avisoRouter);

//En caso de que no se encuentre una image de usuario se devuelve la imagen por defecto
router.route('/img/userImages/profile/*')
  .get((req, res) => { res.redirect('/img/noUser_normal.jpg') })

router.route('/img/userImages/avatar/*')
  .get((req, res) => { res.redirect('/img/noUser_icon.jpg') })

// ------------------- ERRORES -------------------

// Si no se ha encontrado la ruta se envía la pagina de error 404
router.route('/*')
  .get((req, res) => {
    res.status(404);
    res.locals.ventana = 'Error 404';
    res.render('error', { errMsg: { tipo: 404, mensaje: 'No se ha podido encontrar la página buscada' } });
  })
  .post((req, res) => {
    res.status(404);
    res.locals.ventana = 'Error 404';
    res.render('error', { errMsg: { tipo: 404, mensaje: 'No se ha podido encontrar la página buscada' } });
  });

// En caso de excepción no controlada mostrar página de de error 500
router.use((err, req, res, next) => {
  res.status(500);
  console.error(err.stack);
  res.locals.ventana = 'Error 500';
  res.render('error', { errMsg: { tipo: 500, mensaje: 'Se ha producido un error interno en el servidor', stack: err.stack } });
});

module.exports = router;