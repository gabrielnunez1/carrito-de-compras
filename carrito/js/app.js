//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//listenes
cargarEventListeners();

function cargarEventListeners() {
    //dispara cuando se preciona agregar carrito
    cursos.addEventListener('click', comprarCuso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento, mostrar el localstorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//funciones
//funcion que añade el curso al carrito
function comprarCuso(e) {
    e.preventDefault();
    // delegation para agregar-carrito
    //   console.log(e.target.classList);
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //enviamos el curso seleccionado para tomar sus datos a la funcion leerDatosCursos
        leerDatosCurso(curso);
    }
}
// lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

// insertar curso seleccionado al carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    //se agrego para que funcione para que agrege dos veces al carrito el curso
    // let cursosLS = obtenerCursos();

    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
        <a href='#' class='borrar-curso' data-id='${curso.id}'>X</a>
        </td>
    `;
    // como hizo en el video
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);

    //para que no agrege si ya esta en el local storage o carrito
    // if (cursosLS.length == 0||cursosLS.every(cur => { return cur.id != curso.id;})) {
    //     listaCursos.appendChild(row);
    //     guardarCurso(curso); //reemplazar por su funcion de guardar al local storage
    // } else {
    //     cursosLS.forEach(cur => {
    //         console.log(cur.id, row.id)
    //     })
    //     alert('El curso ya fue anadido');
    // }


}
//elimina los cursos del carrito en el DOm
function eliminarCurso(e) {
    e.preventDefault();
    let curso,
        cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        console.log(cursoId);
    }
    eliminarCursoLocalStorage(cursoId);

}


//vacia el carrito
function vaciarCarrito() {
    //forma lenta
    // listaCursos.innerHTML="";
    //forma más rapida
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
   

    // vaciar localstorage
    vaciarLocalStorage();
    return false;

}

//guardar curso a local storage

function guardarCursoLocalStorage(curso) {
    let cursos;
    // toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}
//comprueba si hay algo en localstorage
function obtenerCursosLocalStorage() {
    let cursosLS;
    //comprobamos si hay algo en el local storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// imprime los crsos del local starage en el carrito

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (curso) {
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
            <a href='#' class='borrar-curso' data-id='${curso.id}'>X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });

}

//borra el curso por el id en local storage

function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    //obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // itereamos comparando el id del curso borrado con los del localstorage
    cursosLS.forEach(function (cursoLS, index) {
        if(cursoLS.id===curso){
            cursosLS.splice(index, 1);
        }
    });
    //añadimos el arreglo actual al local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina todas los cursos de local storage

function vaciarLocalStorage(){
    localStorage.clear();
}