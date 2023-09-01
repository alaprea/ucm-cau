//modalUsuario.js
'use strict';

let userInfo = false;

$('.mostraPerfil').click(function () {
  //Se pide la información del perfil una única vez
  if(!userInfo){
    $.ajax({
      type: 'POST',
      url: '/user/loadProfile',
      success: function (data) {
        userInfo = true;
        $('#normalImg').attr('src','/img/userImages/profile/' + data.email.split('@')[0] + '_normal.jpg');
        $('#fecha').text(data.fecha);
        $('#email').text(data.email);
        $('#nAvisos').text(data.nAvisos);
        $('#nIncidencias').text(data.Incidencia || 0);
        $('#nSugerencias').text(data.Sugerencia || 0);
        $('#nFelicitaciones').text(data.Felicitación || 0);
        $('#userModal').modal('show');
      },
      error: function () {
        crearAlerta({color:'danger',tipo: 'Error!',mensaje:'No se ha podido cargar los datos de usuario, intentelo más tarde'});
      }
    })
  }
  else {
    $('#userModal').modal('show');
  }
})