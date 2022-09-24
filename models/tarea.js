const { v4: idRamdon } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {
        this.id = idRamdon();
        this.desc = desc; 
    }
}

module.exports = Tarea;