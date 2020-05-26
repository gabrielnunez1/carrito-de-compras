//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');

//listenes
cargarEventListeners();

function cargarEventListeners() {
    //dispara cuando se preciona agregar carrito
    cursos.addEventListener('click', comprarCuso);
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
}