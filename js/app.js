var canvas = document.getElementById('canvas');
var colorpicker = document.getElementById('color-picker');
var undob = document.getElementById('undo-btn');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var redob = document.getElementById('redo-btn');
var
color = "white",
currentstroke,
currentt = 0,
currentu = 0,
mostrar = false,
mostrart = false,
dibujando = false,
herramienta = "paintb",
strokes = [],
redo = [],
grosor = 15;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener('touchstart', function(e){
if(herramienta !== "paintb"){
dibujando = true;
currentstroke = {
color: color,
grosor: grosor,
points: [],
}

currentstroke.points.push({
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top,
});
strokes.push(currentstroke);
dibujar();
redo = [];
}else{
var posicion = {
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top,
};
new Fill(canvas, posicion, color);
}
});

canvas.addEventListener('touchmove', function(e){
if(dibujando){
currentstroke.points.push({
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top,
});
dibujar();
redo = [];
}
});

canvas.addEventListener('touchend', function(e){
if(dibujando){
currentstroke.points.push({
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top,
});
dibujar();
redo = [];
dibujando = false;
}
});

function dibujar(){
ctx.fillRect(0, 0, canvas.width, canvas.height);
for(var i = 0; i < strokes.length; i++){
s = strokes[i];
ctx.strokeStyle = s.color;
ctx.lineCap = "round";
ctx.lineWidth = s.grosor;
ctx.beginPath();
ctx.moveTo(s.points[0].x, s.points[0].y);
for(var j = 0; j < s.points.length; j++){
var p = s.points[j];
ctx.lineTo(p.x, p.y);
}
ctx.stroke();
}
}

function deshacer(){
redo.push(strokes[strokes.length - 1]);
strokes.pop();
dibujar();
}

function rehacer(){
strokes.push(redo[redo.length - 1]);
redo.pop();
dibujar();
}

function mostrarEOcultar(){
mostrar = true;
}

setInterval(function(){
if(mostrar){
colorpicker.style.display = "block";
document.querySelector(".disp").style.background = "#333333";
}else{
colorpicker.style.display = "none";
document.querySelector(".disp").style.background = "#444444";
}

if(strokes.length === 0){
undob.disabled = true;
}else{
undob.disabled = false;
}
if(redo.length === 0){
redob.disabled = true;
}else{
redob.disabled = false;
}
rect = canvas.getBoundingClientRect();
if(herramienta === "pincel"){
document.getElementById('currenttool').innerHTML = '<i class="fa fa-paint-brush"></i>';
}else{
document.getElementById('currenttool').innerHTML = '<i class="fa fa-eraser"></i>';
}
if(mostrart){
document.querySelector('.toolbase').style.display = "block";
document.querySelector("#currenttool").style.background = "#333333";
}else{
document.querySelector('.toolbase').style.display = "none";
document.querySelector("#currenttool").style.background = "#444444";
}
});

function defcolor(c){
if(herramienta === "borrador"){
color = "white";
}else{
color = c;
}
}

function defgrosor(g){
grosor = g;
}

window.onclick = function(){
currentt ++;
currentu ++;
if(currentt === 2){
mostrar = false;
currentt = 0;
}
if(currentu === 2){
mostrart = false;
currentu = 0;
}
};

function mostrarTools(){
mostrart = true;
}