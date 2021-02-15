function elemento(nombre,tipo,items) {
  this.nombre = nombre
  this.items = items
  this.tipo = tipo
};

const contenedorLista = document.querySelector('#lista');
const boton = document.querySelector('#crearLista');
const crearItem = document.querySelector('#crearItem');
const botonBorrar = document.querySelector('#botonBorrar');
const listaItems = document.querySelector('#listaItems');
let items = [];
let lista = [];


document.addEventListener('DOMContentLoaded', () => {
  lista = JSON.parse(localStorage.getItem('listaJSON')) || [];
  show();
});


crearItem.addEventListener('click', function(){
  let item = document.querySelector('#inputItem').value;
  if (item === ''){  
    return
  } else {
    items.push(item);
    const mostrar = document.createElement('li');
    mostrar.innerHTML=`
      ${item}
    `
    listaItems.appendChild(mostrar);
    document.querySelector('#inputItem').value = '';
  }
})

boton.addEventListener('click', function () {
  const nombre = document.querySelector('#inputTitulo').value;
  const tipo = document.querySelector('#inputTipo').value;  
  set(nombre, tipo, items);
  while (listaItems.firstChild) {
    listaItems.removeChild(listaItems.firstChild);
  };
  items = [];
  document.querySelector('#inputItem').value = '';
  document.querySelector('#inputTitulo').value = '';
})


function set(name, tipo, item) {
  if (name === '') {
    return
  } else {
    nuevoElemento = new elemento(name, tipo, item);
    lista.push(nuevoElemento);
    show();
    const listaJSON = JSON.stringify(lista);
    localStorage.setItem('listaJSON', listaJSON);
  }
};

function show(){
  limpiarLista();
  lista.forEach(function callback(element, index){
    const card = document.createElement('div');
    card.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'col-xl-3');
    
    if (element.tipo === '0'){
      card.innerHTML = `
      <div class="info-card" id="${index}">
      <div>
      <h3>${element.nombre}</h3>
      <ol id="itemsCard${index}"></ol>
      </div>
      <button class="eliminaCard" id="btnCard${index}" onclick="borrarCard(id)"><img src="icons/trash.svg" /></button>
      </div>
      `
    } else if (element.tipo === '1'){
      card.innerHTML = `
      <div class="info-card" id="${index}">
      <div>
      <h3>${element.nombre}</h3>
      <ul id="itemsCard${index}"></ul>
      </div>
      <button class="eliminaCard" id="btnCard${index}" onclick="borrarCard(id)"><img src="icons/trash.svg" alt="eliminar tarjeta"/></button>
      </div>
      `
    }
    contenedorLista.appendChild(card);
    let concat = '#itemsCard' + index;
    const itemsCard = document.querySelector(concat)
    element.items.forEach( item =>{
      const ul = document.createElement('li');
      ul.innerHTML = `
        ${item}
      `
      itemsCard.appendChild(ul)
    })
  });
};


function limpiarLista() {
	while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  }
}

botonBorrar.addEventListener('click', function () {
  borrarLista()
})

function borrarCard(id) {
  const concat = '#' + id;
  const pos = document.querySelector(concat).parentNode.id;
  lista.splice(pos, 1);
  listaJSON = JSON.stringify(lista);
  localStorage.setItem('listaJSON', listaJSON);
  show();
}




function borrarLista() {  
  while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  };
  lista = [];
  listaJSON = JSON.stringify(lista);
  localStorage.setItem('listaJSON', listaJSON);
};