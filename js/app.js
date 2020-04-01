var canvas = document.getElementById('canvas');
var colorpicker = document.getElementById('color-picker');
var undob = document.getElementById('undo-btn');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var redob = document.getElementById('redo-btn');
var
color = "#ffffff",
guardado,
herramienta = "bucket",
grosor = 15,
currentt = 0,
currentu = 0,
destack = [],
limitedes = 20,
restack = [],
x = 0,
y = 0
cx = 0,
sx = 0,
sy = 0,
cy = 0;

ctx.fillText("buena", 50, 300);

function deshacer(){
guardado = ctx.getImageData(0, 0, canvas.width, canvas.height);
restack.push(guardado);
ctx.putImageData(destack[destack.length - 1], 0, 0);
destack.pop();
}

function rehacer(){
guardado = ctx.getImageData(0, 0, canvas.width, canvas.height);
destack.push(guardado);
ctx.putImageData(restack[restack.length - 1], 0, 0);
restack.pop();
}

function defcolor(c){
color = c;
}

function defgrosor(g){
grosor = g;
}

function linea(e){
ctx.putImageData(guardado, 0, 0);
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = grosor;
ctx.lineCap = "round";
ctx.moveTo(cx, cy);
ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
ctx.stroke();
ctx.closePath();
}

function dibujar(e){
ctx.beginPath();
ctx.lineWidth = grosor;
ctx.strokeStyle = color;
ctx.lineCap = "round";
ctx.moveTo(x, y);
ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
ctx.stroke();
ctx.closePath();
}

function borrar(e){
ctx.clearRect(e.touches[0].clientX - rect.left - grosor/2, e.touches[0].clientY - rect.top - grosor/2, grosor, grosor);
}

function mostrarTools(){
document.querySelector(".toolbase").style.display = "block";
}

function rectangular(e){
ctx.putImageData(guardado, 0, 0);
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = grosor;
sx = e.touches[0].clientX - rect.left;
sy = e.touches[0].clientY - rect.top;
ctx.rect(cx, cy, sx, sy);
ctx.stroke();
ctx.closePath();
}

function circular(e){
sx = e.touches[0].clientX - rect.left;
sy = e.touches[0].clientY - rect.top;
ctx.putImageData(guardado, 0, 0);
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = grosor;
posicion = {
x: cx,
y: cy,
};
currentposition = {
x: sx,
y: sy,
};
var distancia = obtenerDistancia(posicion, currentposition);
ctx.arc(cx, cy, distancia, 0, 2 * Math.PI, false);
ctx.stroke();
ctx.closePath();
}

function mostrarEOcultar(){
colorpicker.style.display = "block";
}

function obtenerDistancia(coord1, coord2){
var exp1 = Math.pow(coord2.x - coord1.x, 2);
var exp2 = Math.pow(coord2.y - coord1.y, 2);

var distancia = Math.sqrt(exp1 - exp2);

return distancia;
}

canvas.addEventListener("touchstart", function(e){
restack = [];
guardado = ctx.getImageData(0, 0, canvas.width, canvas.height);
if(destack.length >= limitedes){
destack.shift();
}
destack.push(guardado);
dibujando = true;
x = e.touches[0].clientX - rect.left;
y = e.touches[0].clientY - rect.top;
if(herramienta === "pincel"){
dibujar(e);
}else if(herramienta === "borrador"){
borrar(e);
}else if(herramienta === "linea"){
cx = e.touches[0].clientX - rect.left;
cy = e.touches[0].clientY - rect.top;
linea(e);
}else if(herramienta === "rectangulo"){
cx = e.touches[0].clientX - rect.left;
cy = e.touches[0].clientY - rect.top;
}else if(herramienta === "circulo"){
cx = e.touches[0].clientX - rect.left;
cy = e.touches[0].clientY - rect.top;
}else if(herramienta === "bucket"){
cx = e.touches[0].clientX - rect.left;
cy = e.touches[0].clientY - rect.top;
var emposicion = {
x: Math.round(cx),
y: Math.round(cy),
}
new Fill(canvas, emposicion, color);
}
});

canvas.addEventListener("touchmove", function(e){
if(dibujando){
restack = [];
if(herramienta === "pincel"){
dibujar(e);
}else if(herramienta === "borrador"){
borrar(e);
}else if(herramienta === "linea"){
linea(e);
}else if(herramienta === "rectangulo"){
rectangular(e);
}else if(herramienta === "circulo"){
circular(e);
}
x = e.touches[0].clientX - rect.left;
y = e.touches[0].clientY - rect.top;
}
});

canvas.addEventListener("touchend", function(e){
guardado = ctx.getImageData(0, 0, canvas.width, canvas.height);
if(dibujando){
restack = [];
if(herramienta === "pincel"){
dibujar(e);
}else if(herramienta === "borrador"){
borrar(e);
}else if(herramienta === "linea"){
linea(e);
cx = 0;
cy = 0;
}else if(herramienta === "rectangulo"){
rectangular(e);
cx = 0;
cy = 0;
}else if(herramienta === "circulo"){
circular(e);
cx = 0;
cy = 0;
}
dibujando = false;
x = 0;
y = 0;
}
});

setInterval(function(){
rect = canvas.getBoundingClientRect();
if(destack.length > 0){
undob.disabled = false;
}else{
undob.disabled = true;
}
if(restack.length > 0){
redob.disabled = false;
}else{
redob.disabled = true;
}
});

window.onclick = function(){
currentt++;
currentu++;
if(currentt === 2){
currentt = 0;
colorpicker.style.display = "none";
}
if(currentu === 2){
currentu = 0;
document.querySelector(".toolbase").style.display = "none";
}
}
