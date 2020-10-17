const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const colorEl = document.getElementById('color');
const sizeEl = document.getElementById('size');

let size = 15;
let x = undefined;
let y = undefined;

let isPressed = false

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = x.offsetX;
    y = y.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});


increaseBtn.addEventListener('click', () => {
    size += 1;

    if(size >= 50){
        size = 50;
    }

    showSize();
});

decreaseBtn.addEventListener('click', () => {
    size -= 1;

    if(size <= 1){
        size = 1;
    }

    showSize();
});

function showSize(){
    sizeEl.innerText = size;
}

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.lineWidth = size * 2;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
