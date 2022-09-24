const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado
    }

    constructor() {
        this._listado = {};
    }

    //Funcion o metodo para borrar alguna tarea
    eliminarTarea ( id = '') {

        if ( this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
            console.log(tarea.id);

        })
    }

    //Creamos el metodo para crear unanueva tarea
    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    // Mostrar las tareas en una lista ordenada
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = i+1;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });
    }

    // Funcion o metodo para listar las tareas pendientes y las completadas
    listarCompletadasPendientes( completadas = true) {
        
        let contador = 0;
        console.log();

        this.listadoArr.forEach( (tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            if ( completadas ) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${ contador.toString().green } - ${ desc } :: ${ estado.blue } :: ${ completadoEn.blue}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${ contador.toString().red } - ${ desc } :: ${ estado }`);
                    }    
                }
        });
    }

    // Cambiarle el estado a la tarea Completada | Pendiente
    toogleCompletadas ( ids = [] ) {
        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;