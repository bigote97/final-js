const calcularDolar = document.querySelector('#calcularDolar');
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

calcularDolar.addEventListener('click', function() {
  const pesos = document.querySelector('#inputDolar').value;
  if (isNaN(pesos)) {
    showDolar('calcularDolar', 'solo numeros')
    return
  }
  showDolar('calcularDolar', 'solo numeros')
  const resultado = pesos * dolar.rates.ARS;
  if (resultado !== 0) {
    showDolar('calcularDolar', resultado.toFixed(2))
  } else {
    showDolar('calcularDolar', 'calcular')
  }
})

function showDolar(buttonId, text){
  if (document.getElementById)
  {
    var button=document.getElementById(buttonId);
    if (button)
    {
      if (button.childNodes[0]){
        button.childNodes[0].nodeValue = text;
      }
      else if (button.value){
        button.value = text;
      }
      else{
        button.innerHTML = text;
      }
    }
  }
}