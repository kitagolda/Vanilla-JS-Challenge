const copyEl = document.getElementById('copy');
const pwEl = document.getElementById('pw');
const lenEl = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getUpperLetter() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowerLetter() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    let pass = '';

    for (let i = 0; i < lenEl.value; i++) {
        pass += generateSymbol();
    }

    pwEl.innerText = pass;
}

function generateSymbol() {
    const allFns = [
        { isSelected: upperEl.checked, fn: getUpperLetter },
        { isSelected: lowerEl.checked, fn: getLowerLetter },
        { isSelected: numberEl.checked, fn: getNumber },
        { isSelected: symbolEl.checked, fn: getSymbol }
    ];

    const selectedFns = [];
    allFns.map((f) => {
        if (f.isSelected === true) {
            selectedFns.push(f);
        }
    });

    return (selectedFns[Math.floor(Math.random() * selectedFns.length)]).fn();
}

copyEl.addEventListener('click', () => {
    const texarea = document.createElement('textarea');
    const password = pwEl.innerText;

    if (!password) { return; }

    texarea.value = password;
    document.body.appendChild(texarea);
    texarea.select();
    document.execCommand('copy');
    texarea.remove();
    alert('Password copied');
});

generateEl.addEventListener('click', () => {
    generatePassword();
});
