
const aComparar = JSON.parse(sessionStorage.getItem("prods"));
console.log(aComparar)
const DOMComparador = document.querySelector("#comparador");
renderizarProductos();
function renderizarProductos() {
    aComparar.forEach(el => {
        const ancla = document.createElement('a');
        ancla.href = 'index.html';
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'p-2');
        // miNodo.classList.add('list-group-item', 'text-right', 'd-flex', 'justify-content-between');
        miNodo.innerHTML = `<h5>${el.nombre}</h5>`;
        const divImgPunt = document.createElement('div');
        divImgPunt.classList.add('w-100','text-center', 'm-auto', 'd-flex', 'justify-content-between', 'align-items-start');
        const imagen = document.createElement('img');
        imagen.src = `../multimedia/celulares/${el.nombre.toLowerCase()}.webp`;

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
        // miBoton.classList.add('btn', 'btn-secondary');
        miBoton.innerText = 'Compara';
        miBoton.addEventListener("click", function () { alert("boton") }, false);

        // // Mezclamos nodos
        // miNodo.appendChild(miBoton);
        // divImgPunt.appendChild(graficaPuntaje(el.puntuacion));
        divImgPunt.appendChild(imagen);
        divImgPunt.appendChild(miBoton);
        miNodo.appendChild(divImgPunt);
        miNodo.appendChild(listaCaracteristicas);
        ancla.appendChild(miNodo);
        DOMComparador.appendChild(ancla);
    })
}
