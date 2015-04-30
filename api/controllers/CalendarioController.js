var fs = require('fs');

/**
 * CalendarioController
 *
 * @description :: Server-side logic for managing calendarios
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  upload: function (req, res) {
    // Call to /upload via GET is error
    if (req.method !== 'POST') {
      return res.json({'status': req.method + ' not allowed'});
    }

    var calendario = req.file('calendarioCursos');
    var headers = calendario._files[0].stream.headers;

    // Check file type - Allowed xsl, xslx
    var allowedTypes = ['application/vnd.ms-excel'];
    if (_.indexOf(allowedTypes, headers['content-type']) === -1) {
      return res.json({'status': 'Tipo de archivo (' + headers['content-type'] + ') incorrecto. Sólo se permiten archivos .xls'});
    }

    // Upload file
    calendario.upload({saveAs: 'calendario.xls'}, function onUploadComplete(err, files) {
      // Files will be uploaded to .tmp/uploads

      // IF ERROR Return and send 500 error with error
      if (err) {
        return res.serverError(err);
      }

      CalendarioService.processCalendario(function calendarioProcessed(err, response) {
        if (err) {
          return res.serverError(err);
        }

        return res.json(response);
      });

    });

  },

};

