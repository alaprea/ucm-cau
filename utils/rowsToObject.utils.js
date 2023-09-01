//rowsToObject.js

function tiposToObject(rows,callback){
  const tipos = rows.reduce((ac, aviso) => {
    if (ac[aviso.categoria]) {
      ac[aviso.categoria].push({ id: aviso._ID, tipo: aviso.tipo })
      return ac;
    }
    else {
      ac[aviso.categoria] = [{ id: aviso._ID, tipo: aviso.tipo }];
      return ac;
    }

  }, {});
  const lista = Object.keys(tipos).filter(a => a != 'Felicitación');
  callback(tipos, lista);
}

function userProfileToObject(rows,callback){
  let response = rows.reduce((ac,row)=>{
    ac[row.categoria] = row.nTipo;
    if(!ac.nAvisos)
      ac.nAvisos = row.nTipo;
    else
      ac.nAvisos += row.nTipo;
    return ac;
  },{});

  if(!response.Sugerencia)
    response.Sugerencia = response.Queja;
  else if(response.Queja)
    response.Sugerencia += response.Queja;
  
  delete response.Queja;
  response.email = rows[0].email;
  response.fecha = rows[0].fecha;
  callback(response);
}

module.exports = {
  tiposToObject,
  userProfileToObject,
}