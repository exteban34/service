$(document).ready(function () {
  console.log('Ready');

  $('#calendarioCursos').on('change', function () {
    var file = $('#calendarioCursos')[0].files[0];
    console.log('File', file);
    
    $('#filename').text(file.name);
    $('#filename').show();
    $('#seleccionar').hide();
    // var myFile = $('#calendarioCursos').files[0];

  });
});
