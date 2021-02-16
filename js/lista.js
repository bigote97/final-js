function elemento(nombre,tipo,items) {
  this.nombre = nombre
  this.items = items
  this.tipo = tipo
};

const contenedorLista = document.querySelector('#lista');
const boton = document.querySelector('#crearLista');
const crearItem = document.querySelector('#crearItem');
const listaItems = document.querySelector('#listaItems');
const botonModal = document.querySelector("#botonModal");
const modal = document.querySelector("#modal");
const botonBorrar = document.querySelector('#botonBorrar');
const cerrarModal = document.querySelector("#cerrarModal");
const child1Modal = document.querySelector("#modalH2");
const child2Modal = document.querySelector("#modalp");
const child3Modal = document.querySelector("#modalp2");
let items = [];
let lista = [];
let modalOpen = false;


document.addEventListener('DOMContentLoaded', () => {
  
  lista = JSON.parse(localStorage.getItem('listaJSON')) || [];
  show();
});

document.querySelector('#inputItem').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    inputItems();
  }
})

crearItem.addEventListener('click', function(){
  inputItems();
})

function inputItems() {
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
}



boton.addEventListener('click', function () {
  crearLista();
})

document.querySelector('#inputTitulo').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('#inputTipo').focus();
  }
})
document.querySelector('#inputTipo').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('#inputItem').focus();
  }
})

function crearLista(){
  const nombre = document.querySelector('#inputTitulo');
  if (nombre.value === ''){
    nombre.focus();
    nombre.style.border = '3px solid red';
    nombre.placeholder = 'campo obligatorio';
    return
  }
  nombre.style.border = '0.8px solid black';
  nombre.placeholder = 'titulo';
  const tipo = document.querySelector('#inputTipo').value;  
  set(nombre.value, tipo, items);
  while (listaItems.firstChild) {
    listaItems.removeChild(listaItems.firstChild);
  };
  items = [];
  document.querySelector('#inputItem').value = '';
  document.querySelector('#inputTitulo').value = '';
}

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
    card.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'col-xl-4');
    
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
    const itemsCard = document.querySelector(concat);
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

botonModal.addEventListener('click', function() {
  modal.style.display = "block";
  modalOpen = true;
})
cerrarModal.addEventListener('click', function() {
  modal.style.display = "none";
  modalOpen = false;
})
window.onclick = function(event) {
  
  if (event.target !== modal && event.target !== child1Modal && event.target !== child2Modal && event.target !== child3Modal && event.target !== botonModal )  {
    modal.style.display = "none";
  }
}

function borrarLista() {  
  while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  };
  lista = [];
  listaJSON = JSON.stringify(lista);
  localStorage.setItem('listaJSON', listaJSON);
  modal.style.display = "none"
  modalOpen = false;
};