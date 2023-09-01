//DaoAvisos.js
'use strict';
const pool = require('./pool');

module.exports = class DaoAvisos {
  crearAviso(idUser, categoria, tipo, observaciones, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('INSERT INTO `ucm_aw_cau_avi_avisos`(`idUsuario`, `categoria`, `tipo`, `observaciones`) VALUES (?,?,?,?)', [idUser, categoria, tipo, observaciones], (err, rows) => {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else
            callback(null);
        });
      }
    });
  }
  
  getAvisosEntrantes(callback){
    pool.getConnection((err, connection) => {
      if (err) callback(new Error("Error de conexión a la base de datos"));
      else {
        connection.query(
          'SELECT AVI._ID as id, DATE_FORMAT(AVI.fecha, "%d/%m/%Y") AS fecha, AVI.categoria, ' +
          'IF(LENGTH( AVI.observaciones) > 200, CONCAT(LEFT( AVI.observaciones,200),"..."), AVI.observaciones) AS observaciones_reducido, ' +
          '(SELECT username FROM  `ucm_aw_cau_usu_usuarios`  WHERE _ID = AVI.idTecnico) AS tecnico ' +
          'FROM `ucm_aw_cau_avi_avisos` AVI ' +
          'WHERE AVI.comentarios IS NULL'
          , function (err, rows) {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else
              callback(null, rows);
          });
      }
    });
  }
  
  getAvisos(id, tipo, callback){
    pool.getConnection((err, connection) => {
      if (err) callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'SELECT AVI._ID as id,  DATE_FORMAT(AVI.fecha, "%d/%m/%Y") AS fecha, AVI.categoria, ' +
          'IF(LENGTH( AVI.observaciones) > 200, CONCAT(LEFT( AVI.observaciones,200),"..."), AVI.observaciones) AS observaciones_reducido, ' +
          '(SELECT username FROM  `ucm_aw_cau_usu_usuarios`  WHERE _ID = AVI.idTecnico) AS tecnico ' +
          'FROM `ucm_aw_cau_usu_usuarios` USU ' +
          'JOIN `ucm_aw_cau_avi_avisos` AVI ON AVI.`idUsuario` = USU.`_ID` OR AVI.`idTecnico` = USU.`_ID` ' +
          'WHERE USU._ID = ? AND (CASE WHEN ? THEN AVI.comentarios IS NOT NULL ELSE AVI.comentarios IS NULL END)', [id, tipo], (err, rows) => {
            connection.release();
            if (err) callback
              (new Error('Error de acceso a la base de datos'));
            else
              callback(null, rows);
          });
      }
    });
  }
  
  getAvisoCompleto(aviID, usuID, callback){
    pool.getConnection((err, connection) => {
      if (err) callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'SELECT USU.username, USU.perfil_universitario as perfil, AVI._ID, DATE_FORMAT(AVI.fecha, "%d/%m/%Y") as fecha, ' +
          'AVI.observaciones, AVI.comentarios, AVI.categoria as grupo, AVI.cerrado, TIP.categoria, TIP.tipo, ' +
          '(SELECT username FROM  `ucm_aw_cau_usu_usuarios`  WHERE _ID = AVI.idTecnico) AS tecnico ' +
          'FROM `ucm_aw_cau_usu_usuarios` USU ' +
          'JOIN `ucm_aw_cau_avi_avisos` AVI ON AVI.`idUsuario` = USU.`_ID` ' +
          'JOIN `ucm_aw_cau_tip_tipo` TIP ON AVI.`tipo` = TIP.`_ID` ' +
          'WHERE (CASE WHEN ? IS NULL THEN USU._ID=USU._ID ELSE USU._ID=? END) AND AVI._ID = ?', [usuID, usuID, aviID], (err, rows) => {
            connection.release();
            if (err)
              callback(new Error('No se ha podido encontrar el aviso'))
            else if (rows.length === 0) {
              callback(new Error('No existe el aviso solicitado'));
            }
            else
              callback(null, rows[0]);
          });
      }
    });
  }
  
  buscarAvisoPorTexto(text, usuID, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'SELECT AVI._ID as id, DATE_FORMAT(AVI.fecha, "%d/%m/%Y") AS fecha, AVI.categoria, ' +
          'IF(LENGTH( AVI.observaciones) > 200, CONCAT(LEFT( AVI.observaciones,200),"..."), AVI.observaciones) AS observaciones_reducido, ' +
          '(SELECT username FROM  `ucm_aw_cau_usu_usuarios`  WHERE _ID = AVI.idTecnico) AS tecnico ' +
          'FROM `ucm_aw_cau_usu_usuarios` USU ' +
          'JOIN `ucm_aw_cau_avi_avisos` AVI ON AVI.`idUsuario` = USU.`_ID`' +
          'WHERE (CASE WHEN ? IS NULL THEN USU._ID=USU._ID ELSE USU._ID=? END) AND AVI.observaciones LIKE(?)', [usuID, usuID, '\%' + text + '\%'], (err, rows) => {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else
              callback(null, rows);
          });
      }
    });
  }
  
  setTecnico(idTecnico, idAviso, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('UPDATE `ucm_aw_cau_avi_avisos` AVI SET `idTecnico`= ? WHERE AVI._ID = ?', [idTecnico, idAviso], (err) => {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else
            callback(null);
        });
      }
    });
  }
  
  terminarAviso(idAviso, comentario, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query('UPDATE `ucm_aw_cau_avi_avisos` AVI SET AVI.comentarios = ?  WHERE AVI._ID = ?', [comentario, idAviso], (err) => {
          connection.release();
          if (err)
            callback(new Error('Error de acceso a la base de datos'));
          else
            callback(null);
        });
      }
    });
  }
  
  cerrarAviso(idTecnico, idAviso, comentario, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'UPDATE `ucm_aw_cau_avi_avisos` AVI SET ' +
          'AVI.idTecnico = IF(AVI.idTecnico IS NULL, ?, AVI.idTecnico), ' +
          'AVI.comentarios = ?, AVI.cerrado = 1  ' +
          'WHERE AVI._ID = ?', [idTecnico, comentario, idAviso], (err) => {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else
              callback(null);
          });
      }
    });
  }
  
}
