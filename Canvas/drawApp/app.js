const canvas = document.getElementById("canvas");
const rectBtn = document.getElementById("rect");
const ctx = canvas.getContext("2d");
const pen = document.getElementById("pen");
const allBtn = document.querySelectorAll(".btn");

const thin = document.querySelector(".thin");

canvas.setAttribute("width", canvas.offsetWidth);
canvas.setAttribute("height", canvas.offsetHeight);

const board = {
    type: "none",
    isDraw: false,
    beginX: 0,
    beginY: 0,
    lineWidth: 6,
    imageData: null,
    color: "#000",
    penFn: function (e) {
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;

        // ctx.beginPath();
        // ctx.arc(x, y, 3, 0, 2 * Math.PI);
        // ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineTo(x, y);
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        // ctx.closePath();
    },
    rectFn: function (e) {
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;

        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        if (board.imageData!=null) {
            ctx.putImageData(board.imageData,0,0,0,0,canvas.offsetHeight,canvas.offsetWidth);
        }
        ctx.beginPath();
        ctx.rect(this.beginX, this.beginY, x - this.beginX, y - this.beginY);
        // ctx.fill();
        ctx.strokeStyle = board.color;
        ctx.stroke();
        ctx.closePath();
    }
}

pen.onclick = function () {
    allBtn.forEach((item) => {
        item.classList.remove("active");
    });
    pen.classList.add("active");
    thin.classList.add("active");
    board.type = "pen";
}
rectBtn.onclick = function () {
    allBtn.forEach((item) => {
        item.classList.remove("active");
    });
    rectBtn.classList.add("active");
    board.type = "rect";
}

// Set the thickness of the line for pen
const lineDivs = document.querySelectorAll(".line");
lineDivs.forEach(function (item, i) {
    item.onclick = function () {
        lineDivs.forEach(function (lineItem) {
            lineItem.classList.remove("active");
        })
        item.classList.add("active");

        switch (i) {
            case 0:
                board.lineWidth = 6;
                break;
            case 1:
                board.lineWidth = 16;
                break;
            case 2:
                board.lineWidth = 32;
                break;
            default:
                break;
        }
    }
});

// Listen the color setting event

const colorInput = document.getElementById("color");
colorInput.onchange = function (e) {
    board.color = colorInput.value;
}

const downloadBtn = document.querySelector(".download");
const aDom = document.querySelector(".href a"); 
downloadBtn.onclick = function () {
    const url = canvas.toDataURL();
    const img = new Image();
    img.src = url;
    aDom.setAttribute("href", url);
    aDom.click();
}

// 监听鼠标事件 listen the mouse event

canvas.onmousedown = function (e) {
    board.isDraw = true;
    if (board.type === "rect") {
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;
        board.beginX = x;
        board.beginY = y;
    }
    if (board.type === "pen") {
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;
        board.beginX = x;
        board.beginY = y;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}
canvas.onmouseup = function () {
    // if (board.type === "rect" && board.imageData) {
    //     board.imageData = ctx.getImageData(0,0,canvas.offsetLeft, canvas.offsetTop);
    // }
    board.imageData = ctx.getImageData(0,0,canvas.offsetWidth, canvas.offsetWidth);

    board.isDraw = false;
    if (board.type === "pen") {
        ctx.closePath();
    }
}
canvas.onmousemove = function (e) {
    if (board.isDraw) {
        let str = board.type + 'Fn';
        board[str](e);
    }
}