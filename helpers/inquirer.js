const inquirer = require("inquirer");
require("colors");

// Construir el listado de opciones
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que deseas hacer?",
    choices: [
      {
        value: '1',
        name: `${'1'.red}. Crear tarea'`
      },
      {
        value: '2',
        name: `${'2'.red}. Listar tareas`
      },
      {
        value: '3',
        name: `${'3'.red}- Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4'.red}- Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5'.red}- Completar tarea(s)`
      },
      {
        value: '6',
        name: `${'6'.red}- Borrar tarea`
      },
      {
        value: '0',
        name: `${'0'.red}- Salir`
      },
    ],
  },
];

// Header de la app
const inquirerMenu = async () => {
  console.clear();
  console.log("=================================".red);
  console.log("   Seleccione una opción   ".green);
  console.log("=================================\n".red);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
}

const pausa = async() => {

    const question = [
      {
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'enter'.green } para continuar`
      }
    ];
    console.log('\n');

    await inquirer.prompt(question);
}

// Leer la nueva tarea
const leerInput = async( message ) => {

    const question = [
      {
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
          if ( value.length === 0 ) {
              return 'Por favor ingrese un valor';
          }
            return true;
        }
      }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

//Mostrar el listado en la opcion de borrar tarea
const listadoTareasBorrar = async( tareas = []) => {

  const choices = tareas.map( (tarea, i) => {
    console.log();
    const idx = `${ i + 1}.`.green;

    return {
        value: tarea.id,
        name: `${ idx } ${ tarea.desc }`
    }
  });

  choices.unshift({
    value: '0',
    name: '0-'.green + 'Regresar al menu principal'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas);
  
  return id;

}

//Confirmar accion
const confirmar = async(mensaje) => {

    const pregunta = [
      {
        type: 'confirm',
        name: 'ok',
        message: mensaje
      }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

//cambiarle el estado a una tarea por un checklist
const mostrarListadoChecklist = async( tareas = []) => {

  const choices = tareas.map( (tarea, i) => {
    
    const idx = `${ i + 1}.`.green;

    return {
        value: tarea.id,
        name: `${ idx } ${ tarea.desc }`,
        checked: ( tarea.completadoEn ) ? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciono:',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(pregunta);
  
  return ids;

}

// Exportacion
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
};
