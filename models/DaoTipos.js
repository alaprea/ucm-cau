//DaoTipos.js
'use strict';
const pool = require('./pool');



module.exports = class DaoTipos {
  getTiposAvisos(usuPefil, callback){
    pool.getConnection((err, connection) => {
  
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'SELECT TIP.categoria, TIP.tipo, TIP._ID FROM `ucm_aw_cau_tip_tipo`TIP WHERE TIP.' + usuPefil + ' = 1 ORDER BY TIP.categoria', (err, rows) => {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else {
              callback(null,rows);
            }
          });
      }
    });
  }
  
  validarTipo(usuPefil, tipo, callback){
    pool.getConnection((err, connection) => {
      if (err)
        callback(new Error('Error de conexión a la base de datos'));
      else {
        connection.query(
          'SELECT * FROM `ucm_aw_cau_tip_tipo` TIP WHERE TIP.' + usuPefil + ' = 1 AND TIP._ID = ?', tipo,(err, rows) => {
            connection.release();
            if (err)
              callback(new Error('Error de acceso a la base de datos'));
            else if(rows.length===0)
              callback(null, false);
            else
              callback(null,true);
          });
      }
    });
  }
}
