const progressDom = document.querySelector(".progress");
const textDom = document.querySelector(".text");

function rotateCircle(percent) {
    const circleLength = Math.floor(2 * Math.PI * parseFloat(progressDom.getAttribute("r")));

    const value = percent * circleLength / 100;
    let red = 255 + parseInt((0 - 255) / 100 * percent);
    let green = 0 + parseInt((191 - 0) / 100 * percent);
    let blue = 0 + parseInt((255 - 0) / 100 * percent);
    // console.log(`rgb(${red},${green}),${blue})`);
    progressDom.setAttribute("stroke-dasharray", value + ", 10000");
    progressDom.setAttribute("stroke", `rgb(${red},${green},${blue})`);

    textDom.innerHTML = percent + '%';
    textDom.setAttribute("fill", `rgb(${red},${green},${blue})`);
}
let num = 0;
setInterval(() => {
    num++;
    if (num > 100) {
        num = 0;
    }
    rotateCircle(num);
}, 30);
