const calcularDolar = document.querySelector('#calcularDolar');
const inputPesos = document.querySelector('#inputPesos');
const inputDolar = document.querySelector('#inputDolar');


document.addEventListener('DOMContentLoaded', () => {
  peticion();
});

function peticion(){
  $.ajax({
    url: 'https://api.exchangerate-api.com/v4/latest/USD',
    success: function (data, status, JQxhr) {
      dolar = data;
      console.log(dolar);

    },
    error: function (JQxhr, status, errorThrown) {
      console.log(JQxhr);
      console.log(status);
      console.log(errorThrown);
    }
  });
}

inputDolar.addEventListener('input', function() {
  calcular(inputDolar.value, '*', '#inputPesos');
})
inputPesos.addEventListener('input', function() {
  calcular(inputPesos.value, '/', '#inputDolar');
})

function calcular(valor, operacion,salida) {
    if (isNaN(valor)) {
      console.log('isNaN')
      document.querySelector(salida).value = ''
      return
    } else {
      let resultado = Number;
      if (operacion === '/') {
        resultado = valor / dolar.rates.ARS;
      } else if (operacion === '*') {
        resultado = valor * dolar.rates.ARS;
      }

      if (resultado !== 0) {
        document.querySelector(salida).value = resultado.toFixed(2);
      } else {
        document.querySelector(salida).value = 'U$';
      }
    }
     
}
