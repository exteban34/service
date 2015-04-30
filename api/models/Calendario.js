/**
 * Calendario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    tarea: {
      type: 'string', 
      required: true
    },
    fecha: {
      type: 'string', 
      required: true
    },
    horario: {
      type: 'string', 
      required: true
    },
    auxiliar: {
      type: 'string', 
      required: true
    },
    
    observacion: {
      type: 'string'
    },
    perfil: {
      type: 'string'
    },
    cedulaaux: {
      type:'string',
      required: true
    },
    id: {
      type:'string',
      required: true
    }
  }
};