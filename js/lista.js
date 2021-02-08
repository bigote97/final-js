function elemento(nombre,tipo,items) {
  this.nombre = nombre
  this.items = items
  this.tipo = tipo
};

const contenedorLista = document.querySelector('#lista');
const boton = document.querySelector('#crearLista');
const crearItem = document.querySelector('#crearItem');
const botonBorrar = document.querySelector('#botonBorrar');

let items = [];
let lista = [];


document.addEventListener('DOMContentLoaded', () => {
  lista = JSON.parse(localStorage.getItem('listaJSON')) || [];
  show();
});


crearItem.addEventListener('click', function(){
  let item = document.querySelector('#inputItem').value;
  items.push(item);
  item = '';
})

boton.addEventListener('click', function () {
  const nombre = document.querySelector('#inputTitulo').value;
  const tipo = document.querySelector('#inputTipo').value;  
  set(nombre, tipo, items);
  items = [];
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
    card.innerHTML = `
      <div class="info-card">
        <h3>${element.nombre}</h3>
        <ul id="itemsCard${index}"></ul>
      </div>
    `
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

function borrarLista() {  
  while (contenedorLista.firstChild) {
    contenedorLista.removeChild(contenedorLista.firstChild);
  };
  lista = [];
  listaJSON = JSON.stringify(lista);
  localStorage.setItem('listaJSON', listaJSON);
};