const baseDatos = [{
    nombre: "Vivo Y77e (T1)",
    fLanzamiento: "18/8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "Huawei Nova 10",
    fLanzamiento: "8/7/2022",
    precio: 1100000,
    caracteristicas: {
        diseno: 47,
        pantalla: 46,
        camaras: 71,
        bateria: 51
    }
}, {
    nombre: "infinix note 12 pro 4g",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 100,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "honor x8 5G",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "TCL 201",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "iqoo 9t",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "samsung galaxy a23 5g",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "xiaomi redmi k50 extreme edition",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "oneplus ace pro",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "lenovo legion y70",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "Motorola Edge (2022)",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}, {
    nombre: "Oppo Reno8 4G",
    fLanzamiento: "8/2022",
    precio: 1080000,
    caracteristicas: {
        diseno: 45,
        pantalla: 33,
        camaras: 64,
        bateria: 48
    }
}]

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

const productos = [];
const DOMProductos = document.querySelector("#productos");
const DOMBotonComparar = document.querySelector("#boton__comparar")
DOMBotonComparar.disabled = true;
DOMBotonComparar.addEventListener("click", () => window.open('./paginas/comparador.html', '_self'))

baseDatos.forEach(el => {
    productos.push(new Celular(...Object.values(el)))
})



renderizarProductos();



function renderizarProductos() {
    productos.forEach(el => {
        // const ancla = document.createElement('a');
        // ancla.href = 'index.html';
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'p-1');
        // miNodo.classList.add('list-group-item', 'text-right', 'd-flex', 'justify-content-between');
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
            // divIndicador.style.height = '3px'
            // divIndicador.style.background = 'linear-gradient(134deg,rgba(255,109,32,.733),rgba(255,219,3,.733) 30%,rgba(114,197,27,.733))';

            elementoLista.innerHTML = car + ': ' + el.caracteristicas[car];
            elementoLista.appendChild(divIndicador);
            listaCaracteristicas.appendChild(elementoLista);
        }

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn-comparacion')
        // miBoton.classList.add('btn', 'btn-secondary');
        miBoton.innerText = 'Compara';
        miBoton.addEventListener("click", function () { elegirParaComparacion(el) }, false);

        // // Mezclamos nodos
        // miNodo.appendChild(miBoton);
        divImgPunt.appendChild(graficaPuntaje(el.puntuacion));
        divImgPunt.appendChild(imagen);
        divImgPunt.appendChild(miBoton);
        miNodo.appendChild(divImgPunt);
        miNodo.appendChild(listaCaracteristicas);
        // ancla.appendChild(miNodo);
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

const productosAComparar = [];

function elegirParaComparacion(el) {
    if (productosAComparar.length < 2){
        if(!productosAComparar.includes(el)){
            const DOMeleccion = document.getElementById('eleccion');
        DOMeleccion.style.display = "block";
        // muestraOpciones();
        // DOMeleccion.children[1].style.display = "none";
        DOMeleccion.children[1].children[0].innerHTML += `<li><h6>${el.nombre}</h6></li>`;
        productosAComparar.push(el);
        DOMeleccion.children[0].addEventListener("click", muestraOpciones);
        sessionStorage.setItem("prods", JSON.stringify(productosAComparar));
        } else {
            Swal.fire('No puedes elegir el mismo producto 2 veces')
        }
    } else {
        Swal.fire('No puedes elegir más de 2 dispositivos');
    }
    
    if (productosAComparar.length == 2) DOMBotonComparar.disabled = false
    else DOMBotonComparar.disabled = true;
}

function muestraOpciones() {
    const DOMeleccion = document.getElementById('eleccion');
    if (DOMeleccion.children[1].style.display == "none") {
        DOMeleccion.children[1].style.display = "block";
        DOMeleccion.children[0].children[0].textContent = "Seleccionados    |     v";

    } else {
        DOMeleccion.children[1].style.display = "none";
        DOMeleccion.children[0].children[0].textContent = "Seleccionados    |     ^"
    }
}