// Libraries
require('colors');

// Helpers
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa, 
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
        } = require('./helpers/inquirer');

// Models
const Tareas = require('./models/tareas');

//mostrar opciones de manera manual
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

        if (tareasDB) {//Establecer
            tareas.cargarTareasFromArray( tareasDB );
        }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);

            break;

            case '2':// Mostrar listado de tareas
                    tareas.listadoCompleto();
            break;

            case '3':// Mostrar listado de tareas Completadas
                    tareas.listarCompletadasPendientes(true);
            break;

            case '4':// Mostrar listado de tareas Pendientes
                    tareas.listarCompletadasPendientes(false);
            break;

            case '5':// Cambiar estado Completado | Pendiente
                    const ids = await mostrarListadoChecklist( tareas.listadoArr );
                    tareas.toogleCompletadas( ids );
            break;

            case '6':// Mostrar listado de tareas para eliminar
                    const id = await listadoTareasBorrar(tareas.listadoArr);
                    if (id !== '0') {
                        const  ok = await confirmar('¿Estas seguro de eliminar?');
                        if ( ok ) {
                            tareas.eliminarTarea( id );
                            console.log(`Se elimino correctamente la tarea!!`);
                        }
                    }
            break;
        
        }

        guardarDB( tareas.listadoArr );
        await pausa();

    } while (opt !== '0');

    //pausa();

}

main();