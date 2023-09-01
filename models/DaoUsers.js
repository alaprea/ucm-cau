//DaoUsers.js
'use strict';
const pool = require('./pool');
const crypto = require('../utils/crypto.utils');

module.exports = class DaoUsers {
  loginValidation(userInfo, callback){
    pool.getConnection(function (err, connection) {
      if (err) callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('SELECT _ID, username, password, activo, SUBSTRING_INDEX(email,"@",1) AS imagen, IF(USU.perfil_universitario = "Técnico", "Técnico","Usuario") AS rol, USU.perfil_universitario AS perfil FROM UCM_AW_CAU_USU_Usuarios USU  WHERE USU.email = ?', userInfo.email, function (err, rows) {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else if (rows.length === 0) {
            callback(null, null);
          }
          else if (!rows[0].activo) {
            callback(new Error('La cuenta ha sido suspendida por los técnicos'));
          }
          else {
            crypto.validarPassword(userInfo.password, rows[0].password, (err, valido) => {
              if (err)
                callback(new Error('Error en la validación de la contraseña'))
              else if (!valido)
                callback(null, null);
              else
                callback(null, rows[0]);
            })
          }
        });
      }
    });
  }
  
  signupValidation(userInfo, callback){
    pool.getConnection(function (err, connection) {
      if (err) callback(new Error('Error de conexión a la base de datos'));
      else {
        crypto.hashPassword(userInfo.password, null, (err, hash) => {
          if (err) {
            callback(new Error('No se ha podido crear el nuevo usuario, intentelo más tarde'))
          }
          else {
            connection.beginTransaction(err => {
              if (err)
                callback(new Error("Error de conexión a la base de datos"));
              else {
                connection.query("INSERT INTO UCM_AW_CAU_USU_Usuarios (email,username,password,perfil_universitario) VALUES (?,?,?,?)", [userInfo.email, userInfo.username, hash, userInfo.perfil], function (err, result) {
                  connection.release();
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      if (err.errno !== 1062)
                        callback(new Error("No se ha podido a"));
                      else
                        callback(null, true);
                    });
                  }
                  else if (userInfo.nEmpleado) {
                    connection.query('UPDATE `ucm_aw_cau_nem_numempleado` NEM SET `idUsuario`= ? WHERE NEM.nEmpleado = ?', [result.insertId, userInfo.nEmpleado], err => {
                      if (err) {
                        connection.rollback(() => {
                          connection.release();
                          callback(new Error("Error de acceso a la base de datos"));
                        });
                      }
                      else {
                        connection.commit(err => {
                          connection.release();
                          if (err)
                            callback(new Error("Error de acceso a la base de datos"));
                          else
                            callback(null, false);
                        });
                      }
                    });
                  }
                  else {
                    connection.commit(err => {
                      connection.release();
                      if (err)
                        callback(new Error("Error de acceso a la base de datos"));
                      else
                        callback(null, false);
                    });
                  }
                });
              }
            });
          }
        })
      }
    });
  }
  
  getUserProfile(_id, callback){
    pool.getConnection((err, connection) => {
      if (err) callback(new Error("Error de conexión a la base de datos"));
      else {
        connection.query(
          'SELECT USU.email, DATE_FORMAT(USU.fecha, "%d/%m/%Y %H:%i:%s") AS fecha, USU.username,  AVI.categoria, COUNT(AVI.categoria) AS nTipo, ' +
          'IF(USU.perfil_universitario = "Técnico", "Técnico","Usuario") AS rol ' +
          'FROM `ucm_aw_cau_usu_usuarios` USU ' +
          'LEFT JOIN `ucm_aw_cau_avi_avisos` AVI ON USU._ID = AVI.idTecnico OR USU._ID = AVI.idUsuario ' +
          'WHERE USU._ID = ? ' +
          'GROUP BY AVI.categoria', [_id, _id], (err, rows) => {
            connection.release();
            if (err) callback(new Error("Error de acceso a la base de datos"));
            else {
              callback(null, rows)
            }
          });
      }
    });
  }
  
  validarTecnico(nEmpleado, perfil, callback){
    if (perfil !== 'Técnico') {
      callback(null, true);
    }
    else if (!/^\d{4}-[a-z]{3}$/.test(nEmpleado))
      callback(null, false);
    else
      pool.getConnection((err, connection) => {
        if (err) callback(new Error("Error de conexión a la base de datos"));
        else {
          connection.query('SELECT * FROM `ucm_aw_cau_nem_numempleado` NEM WHERE NEM.nEmpleado = ? AND NEM.idUsuario IS NULL', [nEmpleado], (err, rows) => {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else
              callback(null, !(rows.length === 0));
          });
        }
      });
  }
  
  buscarUser(texto = '', callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('SELECT USU._ID as id, USU.activo, DATE_FORMAT(fecha, "%d/%m/%Y") AS fecha,username,IF(USU.perfil_universitario = "Técnico", "Técnico","Usuario") AS rol FROM UCM_AW_CAU_USU_Usuarios USU WHERE USU.username LIKE ?', '\%' + texto + '\%', function (err, rows) {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else
            callback(null, rows);
        });
      }
    });
  }
  
  getTecnicos(callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('SELECT USU._ID, USU.username FROM UCM_AW_CAU_USU_Usuarios USU WHERE USU.perfil_universitario="Técnico"', function (err, rows) {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else
            callback(null, rows);
        });
      }
    });
  }
  
  setActivo(id, estado, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.beginTransaction(err => {
          if (err)
            callback(new Error("Error de conexión a la base de datos"));
          else {
            connection.query('UPDATE `ucm_aw_cau_usu_usuarios` USU SET USU.activo= ? WHERE USU._ID = ?', [estado, id], err => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  callback(new Error("Error de acceso a la base de datos"));
                });
              }
              else if (!estado) {
                connection.query('SELECT USU.perfil_universitario AS perfil FROM `ucm_aw_cau_usu_usuarios` USU WHERE USU._ID = ?', id, (err, rows) => {
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      callback(new Error("Error de acceso a la base de datos"));
                    });
                  }
                  else if (rows[0].perfil === 'Técnico') {
                    connection.query('UPDATE `ucm_aw_cau_avi_avisos` AVI SET AVI.idTecnico = NULL WHERE AVI.idTecnico = ? AND AVI.comentarios IS NULL', id, err => {
                      if (err) {
                        connection.rollback(() => {
                          connection.release();
                          callback(new Error("Error de acceso a la base de datos"));
                        });
                      }
                      else{
                        connection.commit(err => {
                          connection.release();
                          if (err)
                            callback(new Error("Error de acceso a la base de datos"));
                          else
                            callback(null);
                        });
                      }  
                    })
                  }
                  else {
                    connection.commit(err => {
                      connection.release();
                      if (err)
                        callback(new Error("Error de acceso a la base de datos"));
                      else
                        callback(null);
                    });
                  }
                });
              }
              else {
                connection.commit(err => {
                  connection.release();
                  if (err)
                    callback(new Error("Error de acceso a la base de datos"));
                  else
                    callback(null);
                });
              }
            });
          }
        });
      }
    });
  }
};