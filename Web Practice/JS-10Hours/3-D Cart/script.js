//Movement to Animation Happend
const card = document.querySelector('.card');
const container = document.querySelector('.container');
//Items
const title = document.querySelector('.title');
const sneaker = document.querySelector('.sneaker img');
const purchase = document.querySelector('.purchase button');
const descrption = document.querySelector('.info h3');
const sizes = document.querySelector('.sizes');

//Movement to Animation Event
container.addEventListener('mousemove', (e) =>{
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

});
//Animation In
container.addEventListener('mouseenter', e=>{
    card.style.transition = "none";
    //Popout
    title.style.transform = 'translateZ(150px)';
    sneaker.style.transform = 'translateZ(200px) rotateZ(-45deg)';
    descrption.style.transform = 'translateZ(125px)';
    sizes.style.transform = 'translateZ(100px)';
    purchase.style.transform = 'translateZ(75px)';
});



//Animation out
container.addEventListener('mouseleave', e=>{
    card.style.transition = "all .5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    

    //Popin
    title.style.transform = "translateZ(0px)";
    sneaker.style.transform = 'translateZ(0px) rotateZ(0deg)';
    descrption.style.transform = 'translateZ(0px)';
    sizes.style.transform = 'translateZ(0px)';
    purchase.style.transform = 'translateZ(0px)';
});
