function elemento(nombre,tipo,items) {
  this.nombre = nombre
  this.items = items
  this.tipo = tipo
};

const contenedorLista = document.querySelector('#lista');
const boton = document.querySelector('#crearLista');
const crearItem = document.querySelector('#crearItem');
const botonBorrar = document.querySelector('#botonBorrar');

let lista = [];


document.addEventListener('DOMContentLoaded', () => {
  lista = JSON.parse(localStorage.getItem('listaJSON')) || [];
  show();
});

boton.addEventListener('click', function () {
  const nombre = document.querySelector('#inputTitulo').value;
  const tipo = document.querySelector('#inputTipo').value;
  let items = [];
  crearItem.addEventListener('click', function(){
    const item = document.querySelector('#inputItem').value;
    items.push(item);
  })
  set(nombre, tipo, items);
})

function set(name, tipo, item) {
  if (name === '' && item === '') {
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
  lista.forEach(element =>{
    const card = document.createElement('div');
    card.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'col-xl-3');
    card.innerHTML = `
      <div class="info-card">
        <h3>${element.nombre}</h3>
        <div id="items"></div>
        <ul>
          <li>${element.items}</li>
        </ul>
      </div>
    `
    contenedorLista.appendChild(card);
    element.items.forEach(item =>{
      const nuevoItem = document.createElement('ul');
      nuevoItem.innerHTML = `
        <li>${item}</li>
      `
      card.appendChild(nuevoItem);
    })
  });
};

function limpiarLista() {
  // contenedorCarrito.innerHTML = '';
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