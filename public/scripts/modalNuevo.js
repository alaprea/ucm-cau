//modalAviso.js
'use strict';

let loadtipos = false;

function mostrarNuevo(tipo) {
  if (loadtipos)
    updateForm(tipo);
  else {
    loadtipos = true
    $.ajax({
      type: 'POST',
      url: '/avisos/formAviso',
      data: { tipo: tipo },
      success: function (form) {
        $('#nuevoForm').html(form);
        updateForm(tipo);
      },
      error: function () {
        crearAlerta({color:'danger',tipo: 'Error!',mensaje:'No se ha podido cargar el formulario de avisos, intentelo más tarde'});
      }
    })
  }
}

$('.nuevo').click(function () {
  mostrarNuevo(this.id)
}
);