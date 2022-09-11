// Fetch, para consumir json local llamado datos.json
const pedirBaseDatos = async () => {
    const resp = await
        fetch('./scripts/datos.json')
    const data = await resp.json()

    data.forEach((el) => {
        productos.push(new Celular(...Object.values(el)))
    })

    ordenarProductos();
    renderizarProductos();
    mostrarListaBusqueda();
}

// Definición de una Clase Celular, con características y método de puntuación
class Celular {
    constructor(nombre,
        fLanzamiento,
        precio,
        caracteristicas) {
        this.nombre = nombre;
        this.fLanzamiento = fLanzamiento;
        this.precio = precio;
        this.caracteristicas = caracteristicas;
        this.puntuacion = this.puntuar();
    }
    puntuar() {
        let puntuacion = 0;
        for (let car in this.caracteristicas) {
            puntuacion += this.caracteristicas[car];
        }
        puntuacion /= Object.keys(this.caracteristicas).length;
        return Math.round(puntuacion);
    }
}

// Definición de variables
const productos = [];
const DOMProductos = document.querySelector("#productos");
const DOMBotonComparar = document.querySelector("#boton__comparar")
DOMBotonComparar.disabled = true;
const productosAComparar = [];

// Función del boton de comparar
DOMBotonComparar.addEventListener("click", () => window.open('./paginas/comparador.html', '_self'))

pedirBaseDatos();

function ordenarProductos() {
    const seleccion = document.getElementById('ordenar');
    seleccion.oninput = () => {
        const caso = parseInt(seleccion.value);
        switch (caso) {
            case 0:
                productos.splice(0, productos.length); console.log(productos);
                pedirBaseDatos();
                break;
            case 1:
                productos.sort(function (a, b) {
                    return a.puntuacion - b.puntuacion
                })
                break;
            case 2:
                productos.sort(function (a, b) {
                    return b.puntuacion - a.puntuacion
                })
                break;
            case 3:
                productos.sort(function (a, b) {
                    return a.precio - b.precio
                })
                break;
            case 4:
                productos.sort(function (a, b) {
                    return b.precio - a.precio
                })
                break;
            case 5:
                productos.sort(function (a,b){
                    const fecha1 = a.fLanzamiento.split('/');
                    const date1 = new Date(fecha1[2],fecha1[1]-1,fecha1[0]);
                    const fecha2 = b.fLanzamiento.split('/');
                    const date2 = new Date(fecha2[2],fecha2[1]-1,fecha2[0]);
                    return date2 - date1
                })
                break;
        }
        renderizarProductos();
    }
}

function renderizarProductos() {
    DOMProductos.innerHTML = '';
    productos.forEach(el => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'p-1');
        miNodo.innerHTML = `<h5>${el.nombre}</h5>`;
        const divImgPunt = document.createElement('div');
        divImgPunt.classList.add('w-100', 'text-center', 'm-auto', 'd-flex', 'justify-content-between', 'align-items-start');
        const imagen = document.createElement('img');
        imagen.src = `./multimedia/celulares/${el.nombre.toLowerCase()}.webp`;

        const puntaje = document.createElement('span');
        puntaje.innerHTML = `${el.puntuacion} puntos`;
        const listaCaracteristicas = document.createElement('ul');
        for (let car in el.caracteristicas) {
            const elementoLista = document.createElement('li');
            const divIndicador = document.createElement('div');
            divIndicador.classList.add('barra');
            divIndicador.style.width = `${el.caracteristicas[car]}%`;

            elementoLista.innerHTML = car + ': ' + el.caracteristicas[car];
            elementoLista.appendChild(divIndicador);
            listaCaracteristicas.appendChild(elementoLista);
        }

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn-comparacion')

        miBoton.innerText = 'Compara';
        miBoton.addEventListener("click", function () { elegirParaComparacion(el) }, false);

        // // Mezclamos nodos
        divImgPunt.appendChild(graficaPuntaje(el.puntuacion));
        divImgPunt.appendChild(imagen);
        divImgPunt.appendChild(miBoton);
        miNodo.appendChild(divImgPunt);
        miNodo.appendChild(listaCaracteristicas);
        DOMProductos.appendChild(miNodo);
    })
}

function graficaPuntaje(puntaje) {
    const divPpal = document.createElement('div');
    divPpal.classList.add('puntaje__fondo', 'd-flex', 'justify-content-center', 'align-items-center', 'text-center');
    divPpal.style.background = `conic-gradient(rgba(73, 32, 255, 0.733), rgba(51, 245, 125, 0.733) ${puntaje / 3}%, rgba(197, 27, 132, 0.733) ${2 * puntaje / 3}%,rgba(197, 27, 132, 0.733) ${puntaje - 0.1}%, white ${puntaje}%, white)`;
    const divLlenador = document.createElement('div');
    divLlenador.classList.add('puntuacion', 'd-flex', 'justify-content-center');
    const divOrganizador = document.createElement('div');
    const divNumPuntos = document.createElement('div');
    divNumPuntos.classList.add('puntaje_num')
    divNumPuntos.textContent = puntaje;
    const divPalabraPuntos = document.createElement('div');
    divPalabraPuntos.classList.add('palabra__puntos');
    divPalabraPuntos.textContent = 'PUNTOS';

    divOrganizador.append(divNumPuntos, divPalabraPuntos);
    divLlenador.appendChild(divOrganizador);
    divPpal.appendChild(divLlenador);

    return divPpal;
}



function elegirParaComparacion(el) {
    if (productosAComparar.length < 2) {
        if (!productosAComparar.includes(el)) {
            productosAComparar.push(el);
            renderizarListaComp();
        } else {
            Swal.fire('No puedes elegir el mismo producto 2 veces')
        }
    } else {
        Swal.fire('No puedes elegir más de 2 dispositivos');
    }
}
function renderizarListaComp() {

    const DOMeleccion = document.getElementById('eleccion');

    if (DOMeleccion.style.display != "block") {
        DOMeleccion.style.display = "block";
        DOMeleccion.children[1].style.display = "none";
    }

    if (DOMeleccion.children[1].style.display == "none") {
        DOMeleccion.children[0].children[0].textContent = `Seleccionados (${productosAComparar.length})   |     ^`;
    } else {
        DOMeleccion.children[0].children[0].textContent = `Seleccionados (${productosAComparar.length})   |     v`
    }

    DOMeleccion.children[1].children[0].innerHTML = '';
    productosAComparar.forEach((el) => {
        const li = document.createElement('li');
        const h6 = document.createElement('h6');
        h6.textContent = `${el.nombre}`
        const botonBorrar = document.createElement('button');
        botonBorrar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>`;
        botonBorrar.classList.add('btn', 'btn-danger', 'm-1', 'p-1')

        botonBorrar.addEventListener("click", function () { borrarElemento(el) }, false)
        h6.append(botonBorrar);
        li.append(h6);
        DOMeleccion.children[1].children[0].append(li);

    })
    // DOMeleccion.children[1].children[0].innerHTML += `<li><h6>${el.nombre}</h6></li>`;

    DOMeleccion.children[0].addEventListener("click", muestraOpciones);
    sessionStorage.setItem("prods", JSON.stringify(productosAComparar));
    if (productosAComparar.length == 2) DOMBotonComparar.disabled = false
    else DOMBotonComparar.disabled = true;
}
function muestraOpciones() {
    const DOMeleccion = document.getElementById('eleccion');
    if (DOMeleccion.children[1].style.display == "none") {
        DOMeleccion.children[1].style.display = "block";
        DOMeleccion.children[0].children[0].textContent = `Seleccionados (${productosAComparar.length})   |     v`;

    } else {
        DOMeleccion.children[1].style.display = "none";
        DOMeleccion.children[0].children[0].textContent = `Seleccionados (${productosAComparar.length})   |     ^`
    }
}

function borrarElemento(el) {
    const posicion = productosAComparar.indexOf(el);
    console.log("Está en la posición " + posicion);
    productosAComparar.splice(posicion, 1);
    renderizarListaComp();
}

function mostrarListaBusqueda() {
    const divLista = document.getElementById('resultados-busqueda');
    const inputBuscar = document.getElementById('buscarCel');

    inputBuscar.oninput = () => {
        const arreglo = [];
        const filtro = inputBuscar.value.toLowerCase();
        divLista.innerHTML = '';

        productos.forEach(el => {
            if (el.nombre.toLowerCase().indexOf(filtro) > -1 && filtro != '') {
                arreglo.push(el);
                const li = document.createElement('li');
                li.classList.add('list-item');
                if (arreglo[0] == el) {
                    li.classList.add('fw-bold')
                }
                console.log('si se da enter se elige ' + arreglo[0].nombre);
                li.innerText = el.nombre;
                li.addEventListener("click", function () { elegirParaComparacion(el) }, false)
                divLista.append(li);

            }
        })

        inputBuscar.onkeyup = function (tecla) {
            if (tecla.key === 'Enter' || tecla.keyCode === 13) {

                elegirParaComparacion(arreglo[0]);
            }
        }
    }

}

