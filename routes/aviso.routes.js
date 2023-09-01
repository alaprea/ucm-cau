//aviso.routes.js
'use strict';

const express = require('express');
const router = express.Router();
const checkTecnico = require("../middlewares/checkTecnico");

const toObject = require('../utils/rowsToObject.utils');
const DaoTipos = require("../models/DaoTipos");
const DaoAvisos = require('../models/DaoAvisos');

const daoT = new DaoTipos();
const daoA = new DaoAvisos();

router.route('/mostrar')
  .get((req, res) => {
    let terminado = req.query.tipo === 'MisAvisos' ? 0 : 1;
    daoA.getAvisos(req.session.currentUser._ID, terminado, (err, avisos) => {
      if (err) {
        console.error(err);
        res.render('avisos', { avisos: {}, alertMsg: { tipo: 'danger', mensaje: '<strong>Aviso</strong> ' + err.message } });
      }
      else {
        if (terminado) {
          res.locals.ventana = 'Historico';
          res.render('avisos', { avisos, alertMsg: null });
        }
        else {
          res.locals.ventana = 'MisAvisos';
          if (req.query.resultado) {
            if (req.query.resultado === 'exito')
              res.render('avisos', { avisos, alertMsg: { tipo: 'success', mensaje: '<strong>¡Exito!</strong> ' + req.query.mensaje } });
            else
              res.render('avisos', { avisos, alertMsg: { tipo: 'danger', mensaje: '<strong>¡Error!</strong> ' + req.query.mensaje } });
          }
          else
            res.render('avisos', { avisos, alertMsg: null });
        }
      }

    });
  });

router.route('/leerAviso')
  .post((req, res) => {
    daoA.getAvisoCompleto(req.body.id, (req.session.currentUser.rol === 'Técnico') ? null : req.session.currentUser._ID, (err, aviso) => {
      if (err) {
        res.status(400);
        res.end();
      }
      else
        res.json(aviso);
    })
  });

router.route('/formAviso')
  .post((req, res) => {
    daoT.getTiposAvisos(req.session.currentUser.perfil, (err, rows) => {
      if (err) {
        res.status(400);
        res.end();
      }
      else{
        toObject.tiposToObject(rows, (tipos, listaCat) => res.render('partials/modal-crear', { tipos, listaCat }));
      }
    });
  })

router.route('/nuevoAviso')
  .post((req, res) => {
    daoT.validarTipo(req.session.currentUser.perfil, req.body.tipo, (err, valido) => {
      if (err || !valido) {
        console.error(err);
        res.redirect('/avisos/mostrar?tipo=MisAvisos&resultado=fallo&mensaje=' + err.message);
      } else {
        daoA.crearAviso(req.session.currentUser._ID, req.body.aviso, req.body.tipo, req.body.observaciones, (err) => {
          if (err) {
            console.error(err);
            res.redirect('/avisos/mostrar?tipo=MisAvisos&resultado&mensaje=' + err.message);
          }
          else
            res.redirect('/avisos/mostrar?tipo=MisAvisos&resultado=exito&mensaje=Aviso creado con exito');
        })
      }

    })
  });

router.route('/buscar')
  .get((req, res) => {
    daoA.buscarAvisoPorTexto(req.query.texto, (req.session.currentUser.rol === 'Técnico') ? null : req.session.currentUser._ID, (err, avisos) => {
      if (err) {
        console.log(err);
        res.render('avisos', { avisos: {}, alertMsg: { tipo: 'danger', mensaje: '<strong>Aviso</strong> ' + err.message } });
      }
      else {
        res.locals.ventana = 'Busqueda';
        res.render('avisos', { avisos, alertMsg: null });
      }
    })
  });

router.use(checkTecnico);

router.route('/entrantes')
  .get((req, res) => {
    daoA.getAvisosEntrantes((err, avisos) => {
      res.locals.ventana = 'Entrantes';
      if (err) {
        console.error(err.message);
        res.render('avisos', { avisos: {}, alertMsg: { tipo: 'danger', mensaje: '<strong>Aviso</strong> ' + err.message } });
      }
      else {
        if (req.query.resultado) {
          if (req.query.resultado === 'exito')
            res.render('avisos', { avisos, alertMsg: { tipo: 'success', mensaje: '<strong>¡Exito!</strong> ' + req.query.mensaje } });
          else
            res.render('avisos', { avisos, alertMsg: { tipo: 'danger', mensaje: '<strong>¡Error!</strong> '  + req.query.mensaje } });
        }
        else
          res.render('avisos', { avisos, alertMsg: null });
      }
    });
  });

router.route('/asignarTecnico/:id')
  .post((req, res) => {
    daoA.setTecnico(req.body.tecnico, req.params.id, (err) => {
      if (err) {
        console.error(err);
        res.redirect('/avisos/entrantes?resultado=fallo&mensaje=' + err.message);
      }
      else
        res.redirect('/avisos/entrantes?resultado=exito&mensaje=Aviso asignado correctamente');
    });
  });

router.route('/terminarAviso/:id')
  .post((req, res) => {
    daoA.terminarAviso(req.params.id, req.body.comentario, (err) => {
      if (err) {
        console.error(err);
        res.redirect('/avisos/entrantes?resultado=fallo&mensaje=' + err.message);
      }
      else
        res.redirect('/avisos/entrantes?resultado=exito&mensaje=Aviso terminado con exito');
    })
  })

router.route('/cerrarAviso/:id')
  .post((req, res) => {
    daoA.cerrarAviso(req.session.currentUser._ID, req.params.id, req.body.comentario, (err) => {
      if (err) {
        console.error(err);
        res.redirect('/avisos/entrantes?resultado=fallo&mensaje=' + err.message);
      }
      else
        res.redirect('/avisos/entrantes?resultado=exito&mensaje=Aviso cerrado con exito');
    });
  })

module.exports = router;