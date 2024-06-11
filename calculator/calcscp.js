
let calculation = localStorage.getItem('calculation') || '';

showCalc()

function updateCalculation(value) {
   calculation += value;  
   showCalc(); 
   localStorage.setItem('calculation', calculation);
}

function showCalc() {
   document.querySelector('.js-show-result')
      .innerHTML = calculation;
}


