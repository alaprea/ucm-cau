//modalMostrarAviso.js
'use strict';

function mostrarAviso(id, accion) {
  $.ajax({
    type: 'POST',
    url: '/avisos/leerAviso',
    data: { id },
    success: function (aviso) {
      $('#usuario').text(aviso.username);
      $('#idAviso').text(aviso._ID);
      $('#grupo').text(aviso.grupo);
      $('#fechaAviso').text(aviso.fecha);
      $('#categoria').text(aviso.categoria);
      $('#tipo').text(aviso.tipo);
      $('#perfil').text(aviso.perfil);
      $('#observaciones').text(aviso.observaciones);

      if (aviso.cerrado) {
        $('#avisoCerrado').removeClass('d-none');
        $('#cerradoPor').text(aviso.tecnico);
      }
      else
        $('#avisoCerrado').addClass('d-none');

      if (aviso.comentarios) {
        $('#comentario').text(aviso.comentarios);
        $('#mostrarComentario').removeClass('d-none');
      }
      else
        $('#mostrarComentario').addClass('d-none');

      $('#formAsignar').addClass('d-none');
      $('#formCerrar').addClass('d-none');
      $('#btnCerrar').addClass('d-none');
      $('#btnResponder').addClass('d-none');
      $('#formResponder').addClass('d-none');

      if (!accion) {
        terminarAviso(id);
      }
      else if (accion === 'asg') {
        asignarTecnico(id);
      }
      else {
        cerrarAviso(id);
      }


    },
    error: function () {
      crearAlerta({color:'danger',tipo: 'Error!',mensaje:'No se puede cargar el aviso en estos momentos, intentelo más tarde'});
    }
  })
}

function terminarAviso(id) {
  $('#btnResponder').removeClass('d-none');
  $('#formResponder').removeClass('d-none');
  $('#formResponder').attr('action', '/avisos/terminarAviso/' + id);
  $('#avisoModal').modal('show');
}

function asignarTecnico(id) {
  $.ajax({
    type: 'POST',
    url: '/user/tecnicos',
    success: function (tecnicos) {
      $('#formAsignar').attr('action', '/avisos/asignarTecnico/' + id);
      $('#inputTecnicos').empty().append('<option selected>Elige uno...</option>');
      tecnicos.forEach(t => {
        $('#inputTecnicos').append($('<option>', {
          value: t._ID,
          text: t.username
        }));
      });
      $('#formAsignar').removeClass('d-none');
      $('#avisoModal').modal('show');
    },
    error: function () {
      crearAlerta({color:'danger',tipo: 'Error!',mensaje:'No se ha podido cargar el listado de técnicos, intentelo más tarde'});
    }
  })
}

function cerrarAviso(id) {
  $('#formCerrar').attr('action', '/avisos/cerrarAviso/' + id);
  $('#formCerrar').removeClass('d-none');
  $('#btnCerrar').removeClass('d-none');
  $('#avisoModal').modal('show');
}

$('.aviso').click(function () {
  mostrarAviso(this.id);
})

$('.eliminar').click(function (e) {
  e.stopPropagation();
  mostrarAviso($(this).closest('.aviso').attr('id'), 'elm')
  console.log('eliminar');
})

$('.asignar').click(function (e) {
  e.stopPropagation();
  mostrarAviso($(this).closest('.aviso').attr('id'), 'asg')
  console.log('asignar');
})