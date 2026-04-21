const mainInputs = document.querySelector('.inputs');
const emptyResult = document.querySelector('.empty-result');
const completedResult = document.querySelector('.completed-result');
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

function validateInput(input) {
    if (input.value === undefined || input.value === "") {
        input.closest('.input-container').classList.add('error');
    }
    else {
        input.closest('.input-container').classList.remove('error');
    }
}

function validateRadio(inputs) {
    const hasChecked = [...inputs].some(radio => radio.checked);
    if (hasChecked) {
        inputs[0].closest('.input-container').classList.remove('error');
    }
    else {
        inputs[0].closest('.input-container').classList.add('error');
    }
}

function handleForm() {
    validateInput(amount);
    validateInput(term);
    validateInput(rate);
    validateRadio(radioButtons);

    if (mainInputs.querySelector('.input-container.error') === null) {
        emptyResult.classList.add('hidden');
        completedResult.classList.remove('hidden');
    }
}

clear.addEventListener('click', () => {
    amount.value = '';
    term.value = '';
    rate.value = '';
    radioButtons.forEach(button => button.checked = false);
});
calculate.addEventListener('click', handleForm);
radioButtons.forEach(button => button.addEventListener('click', handleRadio));