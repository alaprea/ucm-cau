//user.routes.js
'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validationResult } = require("express-validator");
const toObject = require('../utils/rowsToObject.utils');

const checkLogged = require("../middlewares/checkLogged");
const checkTecnico = require("../middlewares/checkTecnico");
const uploadImage = require("../middlewares/uploadImage");
const imageUtil = require('../utils/image.utils');
const validarLogin = require('../middlewares/validarLogin');
const validarSignup = require('../middlewares/validarSignup');
const DaoUsers = require("../models/DaoUsers");

const daoU = new DaoUsers();

router.route('/login')
  .get((req, res) => {
    res.locals.ventana = 'Login';
    if (req.session.currentUser)
      res.redirect('/');
    else
      res.render('login', { alertMsg: null, errList: null, valores: null });
  })
  .post(multer().none(), validarLogin, (req, res) => {
    const errList = validationResult(req);
    res.locals.ventana = 'Login';
    if (errList.isEmpty()) {
      daoU.loginValidation(req.body, (err, user) => {

        if (err)
          res.render('login', { alertMsg: { tipo: 'danger', mensaje: err.message }, errList: null, valores: null });
        else {
          if (user) {
            req.session.currentUser = user;
            res.redirect('/');
          }
          else {
            res.render('login', { alertMsg: null, errList: { 'email': { 'value': req.body.email, 'msg': 'Correo y/o contraseña no validos' }, 'password': { 'msg': '' } }, valores: null });
          }
        }
      });
    }
    else
      res.render('login', { alertMsg: null, errList: errList.mapped(), valores: { email: req.body.email } });
  });

router.route('/signup')
  .get((req, res) => {
    res.locals.ventana = 'Signup';
    res.render('signup', { alertMsg: null, errList: null, valores: null });
  })
  .post(uploadImage.single('image'), validarLogin, validarSignup, (req, res) => {
    if (req.body.perfil === 'PAS' && req.body.tecnico)
      req.body.perfil = 'Técnico';
    else
      req.body.nEmpleado = '';

    daoU.validarTecnico(req.body.nEmpleado, req.body.perfil, (err, valido) => {
      res.locals.ventana = 'Signup';
      if (err) {
        res.render('signup', { alertMsg: { tipo: 'danger', mensaje:'<strong>¡Error!</strong>' + err.message }, errList: null, valores: { email: req.body.email, username: req.body.username, nEmpleado: req.body.nEmpleado } });
      }
      else {
        const rawList = validationResult(req);
        const errList = rawList.mapped();
        if (!valido) {
          errList.nEmpleado =
          {
            value: req.body.nEmpleado,
            msg: "Introduce un número de empleado válido",
            param: "nEmpleado",
            location: "body",
          }
        }
        if (rawList.isEmpty() && valido) {
          daoU.signupValidation(req.body, (err, exists) => {
            if (err) {
              imageUtil.borrarImagen(req.file, (err => console.log(err)));
              res.render('signup', { alertMsg: { tipo: 'danger', mensaje: err.message }, errList: null, valores: { email: req.body.email, username: req.body.username, nEmpleado: req.body.nEmpleado } });
            }
            else {
              if (exists) {
                res.render('signup', { alertMsg: null, errList: { 'email': { 'value': req.body.email, 'msg': 'El correo introducido ya existe' } }, valores: { email: req.body.email, username: req.body.username, nEmpleado: req.body.nEmpleado } });
              }
              else {
                imageUtil.guardarImagen(req.file, req.body.email.split('@')[0], (err => console.log(err)));
                res.locals.ventana = 'Login';
                res.render('login', { alertMsg: { tipo: 'success', mensaje: '<strong>¡Registro correcto!</strong> Ya puedes iniciar sesión.' }, errList: null, valores: null });
              }
            }
          });
        }
        else
          res.render('signup', { alertMsg: null, errList: errList, valores: { email: req.body.email, username: req.body.username, nEmpleado: req.body.nEmpleado } });

      }
    });
  });

router.route('/validarTecnico')
  .post((req, res) => {
    daoU.validarTecnico(req.body.nEmpleado, 'Técnico', (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        res.end();
      }
      else {
        res.json({ valido: result });
      }
    });
  });


//middleware que no permite que el resto de rutas sean accedidas por usarios no loggeados
router.use(checkLogged);

router.route('/loadProfile')
  .post((req, res) => {
    daoU.getUserProfile(req.session.currentUser._ID, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        res.end();
      }
      else
        toObject.userProfileToObject(rows, perfil => res.json(perfil))
    })
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy(
      res.redirect('/user/login')
    );
  });

//middleware que no permite que el resto de rutas sean accedidas por usarios no loggeados como tecnicos
router.use(checkTecnico);

router.route('/tecnicos')
  .post((req, res) => {
    daoU.getTecnicos((err, tecnicos) => {
      if (err) {
        console.error(err.message);
        res.status(400);
        res.end(err.message);
      }
      else
        res.json(tecnicos);
    })
  })

router.route('/todos')
  .get((req, res) => {
    daoU.buscarUser('', (err, users) => {
      if (err) {
        console.error(err.message);
        res.render('usuarios', { users: {}, alertMsg: { tipo: 'danger', mensaje: '<strong>¡Error!</strong> ' + err.message } });
      }
      else {
        res.locals.ventana = 'Usuarios';
        if (req.query.resultado) {
          if (req.query.resultado === 'exito')
            res.render('usuarios', { users, alertMsg: { tipo: 'success', mensaje: '<strong>Aviso</strong> ' + req.query.mensaje } });
          else
            res.render('usuarios', { users, alertMsg: { tipo: 'danger', mensaje: '<strong>Aviso</strong> ' + req.query.mensaje } });
        }
        else
          res.render('usuarios', { users, alertMsg: null });
      }
    });
  });

router.route('/buscar')
  .get((req, res) => {
    daoU.buscarUser(req.query.texto, (err, users) => {
      if (err) {
        console.error(err.message);
        res.render('usuarios', { users: {}, alertMsg: { tipo: 'danger', mensaje: '<strong>¡Error!</strong> ' + err.message } });
      }
      else {
        res.locals.ventana = 'Busqueda';
        res.render('usuarios', { users, alertMsg: null })
      }
    })
  });

router.route('/baja/:id')
  .get((req, res) => {
    daoU.setActivo(req.params.id, 0, err => {
      if (err) {
        console.error(err.message);
        res.redirect('/user/todos?resultado=fallo&mensaje=' + err.message);
      }
      else
        res.redirect('/user/todos?resultado=exito&mensaje=Dado de baja con exito');
    });
  });

router.route('/alta/:id')
  .get((req, res) => {
    daoU.setActivo(req.params.id, 1, err => {
      if (err) {
        console.error(err.message);
        res.redirect('/user/todos?resultado=fallo&mensaje=' + err.message);
      }
      else
        res.redirect('/user/todos?resultado=exito&mensaje=Dado de alta con exito');
    });
  });

module.exports = router;