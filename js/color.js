class Picker {
constructor(target, width, height){
this.target = target;
this.width = width;
this.height = height;
this.target.width = width;
this.target.height = height;
this.context = this.target.getContext("2d");
this.pickerCircle = {x: 0, y: 0, width: 6};
this.listenForEvents();
}

draw(){
this.build();
}

build(){
let gradient = this.context.createLinearGradient(0, 0, this.width, 0);
gradient.addColorStop(0, "rgb(255, 0, 0)");
gradient.addColorStop(0.15, "rgb(255, 255, 0)");
gradient.addColorStop(0.33, "rgb(0, 255, 0)");
gradient.addColorStop(0.49, "rgb(0, 255, 255)");
gradient.addColorStop(0.67, "rgb(0, 0, 255)");
gradient.addColorStop(0.84, "rgb(255, 0, 255)");
gradient.addColorStop(1, "rgb(255, 0, 0)");
this.context.fillStyle = gradient;
this.context.fillRect(0, 0, this.width, this.height);

gradient = this.context.createLinearGradient(0, 0, 0, this.height);
gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
this.context.fillStyle = gradient;
this.context.fillRect(0, 0, this.width, this.height);

this.context.beginPath();
this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
this.context.strokeStyle = "black";
this.context.stroke();
this.context.closePath();

}

listenForEvents(){

const onTouchstart = (e) => {
let currentX = e.touches[0].clientX - this.target.offsetLeft;
let currentY = e.touches[0].clientY - this.target.offsetTop;
if(currentX < this.target.width && currentX > 0 && currentY < this.target.height && currentY > 0){
this.pickerCircle.x = currentX;
this.pickerCircle.y = currentY;
}
}

const onTouchmove = (e) => {

let currentX = e.touches[0].clientX - this.target.offsetLeft;
let currentY = e.touches[0].clientY - this.target.offsetTop;
if(currentX < this.target.width && currentX > 0){
this.pickerCircle.x = currentX;
}else{
if(this.pickerCircle.x > this.target.width/2){
this.pickerCircle.x = this.target.width - 1;
}else{
this.pickerCircle.x = 0;
}
}
if(currentY < this.target.height && currentY > 0){
this.pickerCircle.y = currentY;
}else{
if(this.pickerCircle.y > this.target.height/2){
this.pickerCircle.y = this.target.height - 1;
}else{
this.pickerCircle.y = 0;
}
}
}

this.target.addEventListener("touchstart", onTouchstart);
this.target.addEventListener("touchmove", onTouchmove);
this.target.addEventListener("touchstart", () => this.onChangeCallback(this.getPickedColor()));
this.target.addEventListener("touchmove", () => this.onChangeCallback(this.getPickedColor()));

}

getPickedColor(){
let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
return {r: imageData.data[0], g: imageData.data[1], b: imageData.data[2]};
}

onChange(callback){
this.onChangeCallback = callback;
}

}

let picker = new Picker(document.getElementById("color-picker"), 300, 150);
setInterval(() => picker.draw());
picker.onChange((color) => {
document.getElementById('color').style.background = `rgb(${color.r}, ${color.g}, ${color.b})`;
function oHexa(value){
var hexa = parseInt(value).toString(16);
return hexa.length == 1 ? "0" + hexa : hexa;
}

var code = "#" + oHexa(color.r) + oHexa(color.g) + oHexa(color.b);
document.getElementById('hex').innerHTML = code;
defcolor(code);
});
