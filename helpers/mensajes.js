const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {

    return new Promise( resolve =>{
        //console.clear();
        console.log('================================='.red);
        console.log('   Seleccione una opción   '.green);
        console.log('=================================\n'.red);
        
        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir\n`);

        // Importamos el paquete que nos permite recibir interacciones
        const readline = require('readline').createInterface({
            input: process.stdin, //permite recibir interacciones y dar enter
            output: process.stdout //da una respuesta en consola
        });

        readline.question('Selecciona una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    })
}

const pausa = () => {
    return new Promise(resolve =>{
        const readline = require('readline').createInterface({
            input: process.stdin, //permite recibir interacciones y dar enter
            output: process.stdout //da una respuesta en consola
        });

        readline.question(`Presione ${'Enter'.blue} para continuar.`, (opt) => {
            readline.close();
            resolve();
        })
    })
}


module.exports = {
    mostrarMenu,
    pausa
}