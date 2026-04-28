const mainInputs = document.querySelector('.inputs');
const emptyResult = document.querySelector('.empty-result');
const completedResult = document.querySelector('.completed-result');
const clear = document.querySelector('#clear');
const amount = document.querySelector('#amount');
const term = document.querySelector('#term');
const rate = document.querySelector('#rate');
const monthlyPayment = document.querySelector('#monthlyPay');
const totalPayment = document.querySelector('#totalPay');
const radioButtons = document.querySelectorAll('.radio-type input');
const calculate = document.querySelector('#calculate');

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

function calculateMonthlyPaymentRepayment(p, r, n) {
    return p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calculateMonthlyPaymentInterest(p, r) {
    return p * r;
}

function handleForm() {
    validateInput(amount);
    validateInput(term);
    validateInput(rate);
    validateRadio(radioButtons);

    const hasErrors = mainInputs.querySelector('.input-container.error') !== null;

    if (!hasErrors) {
        emptyResult.classList.add('hidden');

        const p = Number(amount.value); // principalAmount 
        const r = parseFloat((rate.value / 100 / 12).toFixed(6)); // interestRate 
        const n = Number(term.value) * 12; // numberOfMontlyPayments

        const selectedType = [...radioButtons].find(r => r.checked)?.value;

        let monthly = 0;
        let total = 0;

        if (selectedType === "Repayment") {
            monthly = calculateMonthlyPaymentRepayment(p, r, n);
            total = monthly * n;
        } else if (selectedType === "Interest") {
            monthly = calculateMonthlyPaymentInterest(p, r);
            total = monthly * n;
        }

        function formatNumber(value) {
            return value
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }

        monthlyPayment.textContent = formatNumber(monthly);
        totalPayment.textContent = formatNumber(total);

        completedResult.classList.remove('hidden');
    }
}

const textInputs = document.querySelectorAll('input[type="text"]');

textInputs.forEach(input => {
    input.addEventListener('input', function () {
        let value = this.value.replace(/[^0-9.]/g, '');

        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }

        this.value = value;
    });
});

clear.addEventListener('click', () => {
    amount.value = '';
    term.value = '';
    rate.value = '';
    radioButtons.forEach(button => button.checked = false);

    if (!completedResult.classList.contains('hidden')) {
        completedResult.classList.add('hidden');
        emptyResult.classList.remove('hidden');
    }
});

calculate.addEventListener('click', handleForm);

document.querySelectorAll('.radio-type').forEach(container => {
    container.addEventListener('click', () => {
        container.querySelector('input').checked = true;
    });
});


