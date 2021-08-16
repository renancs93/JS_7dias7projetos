window.addEventListener("load", function(event) {
    initEventsMobile();
    initEventsDesktop();
});

// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector("#tela");
let ctx = screen.getContext('2d');

function isMobile() {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
  }else{
    return false;
  }
}

// Events
document.querySelectorAll('.colorArea .color').forEach(item =>{
  item.addEventListener('click', colorClickEvent)
});

function initEventsDesktop(){
  // Desktop
  screen.addEventListener('mousedown', mouseDownEvent);
  screen.addEventListener('mousemove', mouseMoveEvent);
  screen.addEventListener('mouseup', mouseUpEvent);
}

function initEventsMobile(){
  // Mobile
  screen.addEventListener('touchstart', touchStartEvent);
  screen.addEventListener('touchend', touchEndEvent);
  screen.addEventListener('touchmove', touchMoveEvent);
}

document.querySelector('.clear').addEventListener('click', clearScreen);

// Functions
function colorClickEvent(event){
  let color = event.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  event.target.classList.add('active');
}

// Desktop
function mouseDownEvent(event){
  canDraw = true;
  mouseX = event.pageX - screen.offsetLeft;
  mouseY = event.pageY - screen.offsetTop;
}

function mouseUpEvent(event){
  canDraw = false;
}

function mouseMoveEvent(event){
  if(canDraw){
    draw(event.pageX, event.pageY);
  }
}

// Mobile
function touchStartEvent(event){
  canDraw = true;
  mouseX = event.touches[0].pageX - screen.offsetLeft;
  mouseY = event.touches[0].pageY - screen.offsetTop;
}

function touchEndEvent(event){
  canDraw = false;
}

function touchMoveEvent(event){
  if(canDraw){
    draw(event.touches[0].pageX,  event.touches[0].pageY);
  }
}

// Draw in Canvas
function draw(x, y){
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  // Config
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineJoin = 'round';
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  // desenhar
  mouseX = pointX;
  mouseY = pointY;

}

function clearScreen(){
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}