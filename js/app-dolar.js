const calcularDolar = document.querySelector('#calcularDolar');
const inputPesos = document.querySelector('#inputPesos');
const inputDolar = document.querySelector('#inputDolar');


document.addEventListener('DOMContentLoaded', () => {
  peticion();
});

function peticion(){
  $.ajax({
    url: 'https://api.exchangerate-api.com/v4/latest/ARS',
    success: function (data, status, JQxhr) {
      dolar = data;
      console.log(dolar);
      const infoDolar = document.querySelector('#infoDolar');
      const p = document.createElement('p');
      const actualizacion = dolar.date;
      p.innerHTML = `
        <p>
          Valores consultados en <a href="https://api.exchangerate-api.com">https://api.exchangerate-api.comgit</a> y actualizado: ${actualizacion}
        </p>
      `
      infoDolar.appendChild(p);

    },
    error: function (JQxhr, status, errorThrown) {
      console.log(JQxhr);
      console.log(status);
      console.log(errorThrown);
    }
  });
}

inputDolar.addEventListener('input', function() {
  calcular(inputDolar.value, '/', '#inputPesos');
})
inputPesos.addEventListener('input', function() {
  calcular(inputPesos.value, '*', '#inputDolar');
})

function calcular(valor, operacion,salida) {
    if (isNaN(valor)) {
      console.log('isNaN')
      document.querySelector(salida).value = ''
      return
    } else {
      let resultado = Number;
      if (operacion === '/') {
        resultado = valor / dolar.rates.USD;
      } else if (operacion === '*') {
        resultado = valor * dolar.rates.USD;
      }

      if (resultado >= 1) {
        document.querySelector(salida).value = resultado.toFixed(2);
      } else if (resultado < 1 && resultado >= 0) {
        document.querySelector(salida).value = resultado.toFixed(4);
      } else {
        document.querySelector(salida).value = '';
      }
    }
}
