const clear = document.querySelector('#clear');
const amount = document.querySelector('#amount');
const term = document.querySelector('#term');
const rate = document.querySelector('#rate');
const radioButtons = document.querySelectorAll('.radio-type input');
const calculate = document.querySelector('#calculate');
let rateValue = 0;
function handleRadio(e) {
    radioButtons.forEach(button => button.checked = false);
    e.target.checked = true;
}

function handleForm() {
    validatePercent(rate);
    console.log(rateValue);
}

// function validatePercent(input) {
    
// }

clear.addEventListener('click', () => {
    amount.value = '';
    term.value = '';
    rate.value = '';
    radioButtons.forEach(button => button.checked = false);
});
calculate.addEventListener('click', handleForm);
radioButtons.forEach(button => button.addEventListener('click', handleRadio));