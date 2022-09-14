

const aComparar = JSON.parse(sessionStorage.getItem("prods"));
aComparar.sort((a, b) => {
    return b.puntuacion - a.puntuacion
})
const DOMComparador = document.querySelector("#comparador");

renderizarProductos();

function renderizarProductos() {
    aComparar.forEach(el => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'p-2');
        // miNodo.classList.add('list-group-item', 'text-right', 'd-flex', 'justify-content-between');
        miNodo.innerHTML = `<h5>${el.nombre}</h5>`;
        const divImgPunt = document.createElement('div');
        divImgPunt.classList.add('w-100', 'text-center', 'm-auto', 'd-flex', 'justify-content-between', 'align-items-start');
        const imagen = document.createElement('img');
        imagen.src = `../multimedia/celulares/${el.nombre.toLowerCase()}.webp`;
        const divPrecio = document.createElement('div');
        divPrecio.classList.add('fs-3','row','text-start','position-absolute', 'bottom-50');
        divPrecio.innerHTML = `<p>$${Intl.NumberFormat('es-CO').format(el.precio)}</p>`
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



        // // Mezclamos nodos
        // miNodo.appendChild(miBoton);
        const divSemi = document.createElement('div');
        divSemi.classList.add('container-fluid');
        
        divSemi.appendChild(graficaPuntaje(el.puntuacion));
        divSemi.append(divPrecio)

        divImgPunt.append(divSemi);
        divImgPunt.appendChild(imagen);

        miNodo.appendChild(divImgPunt);
        miNodo.appendChild(listaCaracteristicas);

        DOMComparador.appendChild(miNodo);
    })
}

renderizarRadar(aComparar);

function renderizarRadar(aComparar) {
    const valores1 = Object.values(aComparar[0].caracteristicas).map((num) => { return (num * 1.35).toFixed(2) });


    const coordenada11 = [(0).toFixed(4), (-valores1[0]).toFixed(4)];

    const coordenada12 = [(valores1[1] * (Math.cos(0.314159))).toFixed(4), (valores1[1] * (-Math.sin(0.314159))).toFixed(4)];

    const coordenada13 = [(valores1[2] * (Math.cos(0.942478))).toFixed(4), (valores1[2] * (Math.sin(0.942478))).toFixed(4)];

    const coordenada14 = [(valores1[3] * (-Math.cos(0.942478))).toFixed(4), (valores1[3] * (Math.sin(0.942478))).toFixed(4)];
    const coordenada15 = [(valores1[4] * (-Math.cos(0.314159))).toFixed(4), (valores1[4] * (-Math.sin(0.314159))).toFixed(4)];

    const poligono1 = document.querySelector("#poligono1");
    poligono1.innerHTML = `<path d="M${coordenada11[0]},${coordenada11[1]}L${coordenada12[0]},${coordenada12[1]}L${coordenada13[0]},${coordenada13[1]}L${coordenada14[0]},${coordenada14[1]}L${coordenada15[0]},${coordenada15[1]}z"
    class="poligono" stroke="gray" fill="blue"></path>`

    const valores2 = Object.values(aComparar[1].caracteristicas).map((num) => { return (num * 1.35).toFixed(2) });


    const coordenada21 = [(0).toFixed(4), (-valores2[0]).toFixed(4)];

    const coordenada22 = [(valores2[1] * (Math.cos(0.314159))).toFixed(4), (valores2[1] * (-Math.sin(0.314159))).toFixed(4)];

    const coordenada23 = [(valores2[2] * (Math.cos(0.942478))).toFixed(4), (valores2[2] * (Math.sin(0.942478))).toFixed(4)];

    const coordenada24 = [(valores2[3] * (-Math.cos(0.942478))).toFixed(4), (valores2[3] * (Math.sin(0.942478))).toFixed(4)];
    const coordenada25 = [(valores2[4] * (-Math.cos(0.314159))).toFixed(4), (valores2[4] * (-Math.sin(0.314159))).toFixed(4)];

    const poligono2 = document.querySelector("#poligono2");
    poligono2.innerHTML = `<path d="M${coordenada21[0]},${coordenada21[1]}L${coordenada22[0]},${coordenada22[1]}L${coordenada23[0]},${coordenada23[1]}L${coordenada24[0]},${coordenada24[1]}L${coordenada25[0]},${coordenada25[1]}z"
    class="poligono" stroke="gray" fill="purple"></path>`

}

function graficaPuntaje(puntaje) {
    const divPpal = document.createElement('div');
    divPpal.classList.add('row','puntaje__fondo', 'd-flex', 'justify-content-center', 'align-items-center', 'text-center');
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
darInfoComparacion();
function darInfoComparacion() {
    const divInfoComparacion = document.querySelector('#info_comparacion');
    divInfoComparacion.innerHTML = `<h6>Por qué es mejor <strong>${aComparar[0].nombre}</strong> que <strong>${aComparar[1].nombre}</strong></h6>`
    const lista1 = document.createElement('ul');
    lista1.classList.add('lista1');
    const lista2 = document.createElement('ul');
    lista2.classList.add('lista2');
    for (const propiedad in aComparar[0].caracteristicas) {
        if (aComparar[0].caracteristicas[propiedad] > aComparar[1].caracteristicas[propiedad]) {

            const elementoLista1 = document.createElement('li');
            const porcentaje = (100 * ((aComparar[0].caracteristicas[propiedad] - aComparar[1].caracteristicas[propiedad]) / aComparar[0].caracteristicas[propiedad])).toFixed(0);
            elementoLista1.innerHTML = `<svg class="chulo" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>   En ${propiedad}, tiene una valoración ${porcentaje}% mayor`;
            lista1.append(elementoLista1);

        } else if (aComparar[0].caracteristicas[propiedad] == aComparar[1].caracteristicas[propiedad]) {
            const elementoLista1 = document.createElement('li');
            elementoLista1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>   En ${propiedad}, tiene una valoración igual`;
            lista1.append(elementoLista1);
        } else {

            const elementoLista2 = document.createElement('li');
            const porcentaje = (100 * ((aComparar[1].caracteristicas[propiedad] - aComparar[0].caracteristicas[propiedad]) / aComparar[1].caracteristicas[propiedad])).toFixed(0);
            elementoLista2.innerHTML = `<svg class="equis" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>   En ${propiedad}, tiene una valoración ${porcentaje}% mayor`;
            lista2.append(elementoLista2);
        }
    }

    divInfoComparacion.append(lista1);
    if(lista2.innerHTML!=""){
        divInfoComparacion.innerHTML+=`<br><h6><strong>${aComparar[1].nombre}</strong> es mejor que <strong>${aComparar[0].nombre}</strong> en:</h6>`
        divInfoComparacion.append(lista2);
    }
}
