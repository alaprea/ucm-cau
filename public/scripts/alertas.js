function crearAlerta(alerta) {
  $("#alerta-dinamica").animate({
    height: '+=72px'
  }, 300);
  $('<div class="alert alert-' + alerta.color + ' alert-dismissible fade show" role="alert">' +
  '<strong>' + alerta.tipo + '</strong> ' + alerta.mensaje + 
  '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
  '</div>').hide().appendTo('#alerta-dinamica').fadeIn(1000);

  $(".alert").delay(3000).fadeOut(
    "normal",
    function () {
      $(this).remove();
    });

  $("#alerta-dinamica").delay(4000).animate({
    height: '-=72px'
  }, 300);

}