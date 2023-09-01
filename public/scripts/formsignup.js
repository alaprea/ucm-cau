function validarSignUp() {
  let err = validarMailPass();

  //validar username
  if (!$('#inputUsername').val().length) {
    $('#validationUsername').addClass('is-invalid');
    $('#inputUsername').addClass('is-invalid');
    $('#feedbackUsername').text('El campo nombre no puede estar vacío');
    err = true;
  }
  else {
    $('#validationUsername').removeClass('is-invalid');
    $('#inputUsername').removeClass('is-invalid');
    $('#feedbackUsername').text('');
  }

  //validar passwordAwaing
  if (!$('#inputPasswordAgain').val().length) {
    $('#validationPasswordAgain').addClass('is-invalid');
    $('#inputPasswordAgain').addClass('is-invalid');
    $('#feedbackPasswordAgain').text('El campo repetir contraseña no puede estar vacío');
    err = true;
  }
  else if ($('#inputPasswordAgain').val() !== $('#inputPasswordAgain').val()) {
    $('#validationPassword').addClass('is-invalid');
    $('#inputPassword').addClass('is-invalid');
    $('#validationPasswordAgain').addClass('is-invalid');
    $('#inputPasswordAgain').addClass('is-invalid');
    $('#feedbackPasswordAgain').text('Las contraseñas no coinciden');
    err = true;
  }
  else {
    $('#validationPasswordAgain').removeClass('is-invalid');
    $('#inputPasswordAgain').removeClass('is-invalid');
    $('#feedbackPasswordAgain').text('');
  }

  if ($('#inputPerfil').val() === 'PAS' && $('#inputTecnico')[0].checked) {
    $.ajax({
      type: 'POST',
      url: '/user/validarTecnico',
      data: { nEmpleado: $('#inputEmpleado').val() },
      success: function (response) {
        if (!err && response.valido) {
          $("form").first().submit();
        }
        else {
          if (!response.valido) {
            $('#validationEmpleado').addClass('is-invalid');
            $('#inputEmpleado').addClass('is-invalid');
            $('#feedbackEmpleado').text('Número de empleado no valido');
          }
          else {
            $('#validationEmpleado').removeClass('is-invalid');
            $('#inputEmpleado').removeClass('is-invalid');
          }

        }
      },
      error: function () {
        $('#validationEmpleado').addClass('is-invalid');
        $('#inputEmpleado').addClass('is-invalid');
        $('#feedbackEmpleado').text('No se ha podido validar el número de empleado, intentelo más tarde');
      }
    })
  }
  else {
    if (!err)
      $("form").first().submit();
  }

}


$('[value="Enviar"]').click(function () {
  validarSignUp();
});

$('#inputPerfil').change(function () {
  if (this.value === 'PAS') {
    $('#form-pas').removeClass("d-none");
  }
  else {
    $('#form-pas').addClass("d-none");
    $('#form-tec').addClass('d-none');
    $('#inputTecnico').prop('checked', false);
  }
});

$('#inputTecnico').change(function () {
  if (this.checked !== true) {
    $('#form-tec').addClass('d-none');
    $('#inputEmpleado').attr('value','')
  }
  else
    $('#form-tec').removeClass('d-none');
});

$(document).ready(() => {
  if ($('#inputEmpleado').attr('value')) {
    $('#form-pas').removeClass("d-none");
    $('#form-tec').removeClass('d-none');
    $('#inputTecnico').prop('checked', true);
    $('#inputPerfil  option[value=PAS]').prop('selected', true);
  }
  else {
    $('#inputTecnico').prop('checked', false);
    $('#inputPerfil  option[value=Alumno]').prop('selected', true);
  }
});