'use strict';

var xls = require('xls-to-json');
// var fs = require('fs');

module.exports = {

  /**
   * Procesa el archivo xls y lo convierte a json para ser devuelto inmediatamente
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  processCalendario: function (callback) {
    xls({
      input: '.tmp/uploads/calendario.xls',  // input xls 
      output: '.tmp/calendario.json' // output json 
    }, function (err, result) {
      if (err) {+
        console.error(err);
        return callback(null, {status: 409, message: 'No es posible leer al archivo apropiadamente. Verifique que el documento contiene el formato y los campos correctos.'});
      }

      var calendario = [];
      var rowLast = {};
      var index;
      var inserted = 1;
      var len = result.length;
      // var finalizar = false;
      for (index = 0; index < len; ++index) {
        var rowCurrent = result[index];
        
        var tarea = {};
      
        
        tarea = {
          tarea:rowCurrent['PROGRAMACION'],
          fecha:rowCurrent['FECHA'],
          horario:rowCurrent['HORA'],
          auxiliar:rowCurrent['AUXILIARES'],
          perfil:rowCurrent['PERFIL'],
          observacion:rowCurrent['OBSERVACION'],
          cedulaaux:rowCurrent['CEDULA'],
          id:index,         
        };  
/*
        // Si la linea siguiente tiene campos vacios, es porque hay varios profesores, aulas u horarios.
        // Estos son adicionados a la asignacion actual.
        var rowNext = result[index + 1];
        if (rowNext && rowNext['MAT'].length === 0){
          var data = CalendarioService.concatCalendarizacion(index + 1, result, asignacion);
          asignacion = data.asignacion;          
          index = data.index;
        }

        if (asignacion.materia.length > 0){
          console.log('Inserted: ', inserted);
          inserted += 1;
          calendario.push(asignacion);
          rowLast = asignacion;
        }
      
      */
      if(tarea.auxiliar.length > 0){
        inserted += 1;
        calendario.push(tarea);
        rowLast= tarea; 
      }
      
    }

      CalendarioService.saveCalendario(calendario);

      return callback(null, {status: 200, size: calendario.length, file: calendario});
    });

  },

  saveCalendario: function(calendario) {
    // Elimina todos los registros de la bd
    Calendario.destroy({})
      .then(function () {

        // Inserta todos los nuevos registos
        Calendario.create(calendario)
          .then(function (res) {
            // console.log(res);
          })
          .catch(function (err) {
            console.log('ERROR: ', err);
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  },

/*
  concatCalendarizacion: function (index, result, asignacion) {
    var lastIndex = index;
    var aula = asignacion.calendarizacion[0].aula;
    var horario = asignacion.calendarizacion[0].horario;
    var profesor = asignacion.calendarizacion[0].profesor;

    while(true) {
      var current = result[index];

      if (!current || current['MAT'].length > 0){
        return {
          index: lastIndex,
          asignacion: asignacion, 
          finalizar: false
        };
      }

      if (current['AULA'].length === 0 && current['HORARIO'].length === 0 && current['PROFESOR'].length === 0){
        return {
          index: lastIndex,
          asignacion: asignacion,
          finalizar: true
        };
      }
      
      if (current['AULA'].length === 0 && current['HORARIO'].length === 0) {
        profesor = current.PROFESOR;
        asignacion.calendarizacion.filter(function (element) {
          if (element.aula === aula) {
            element.profesor.push(profesor);
          }
        });
      } else if (current['AULA'].length === 0 && current['HORARIO'].length > 0) {
        horario = current['HORARIO'];
        asignacion.calendarizacion.filter(function (element) {
          if (element.aula === aula) {
            element.horario.push(horario);
          }
        });
      } else if (current['AULA'].length > 0 && current['HORARIO'].length === 0) {
        aula = current['AULA'];
        var calendarizacion = {
          aula: aula,
          horario: [horario],
          profesor: profesor
        };
        asignacion.calendarizacion.push(calendarizacion);
      } else { // Ninguno de los dos es vacio
        aula = current['AULA'];
        horario = current['HORARIO'];
        var calendarizacion = {
          aula: aula,
          horario: [horario],
          profesor: profesor
        };
        asignacion.calendarizacion.push(calendarizacion);
      }
      
      lastIndex = index;
      index += 1;
    }
  }
*/
};