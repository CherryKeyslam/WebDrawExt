var canvasEl = document.createElement('CANVAS'); 
document.body.appendChild(canvasEl);
canvasEl.style.background = "rgba(255, 255, 255, 0)";
canvasEl.style.position = "absolute";
canvasEl.style.top = 0;
canvasEl.style.left = 0;

canvasEl.width = document.body.clientWidth;
var bounds = canvasEl.getBoundingClientRect()
var difY = bounds.y + window.scrollY;
var difX = bounds.x;
canvasEl.height = document.body.scrollHeight - difY;

var art_piece = canvasEl.getContext("2d");

var clicking = false;
var previousX = 0;
var previousY = 0;

art_piece.lineWidth = 20;
art_piece.lineCap = "round";
art_piece.strokeStyle = "#ff0000";

canvasEl.addEventListener("mousemove", function(e) {
	if(clicking == true)
	{
		draw(e);
	}
})
canvasEl.addEventListener("mousedown", function(e) {
	previousX = e.clientX - difX;
	previousY = (window.scrollY + e.clientY) - difY;
	draw(e);
	clicking = true;
})
canvasEl.addEventListener("mouseup", function(e) {
	clicking = false;
})
canvasEl.addEventListener("mouseleave", function(e) {
	clicking = false;
})

function draw(e){
	art_piece.beginPath();
	art_piece.moveTo(previousX,previousY);
	art_piece.lineTo(e.clientX - difX, (window.scrollY + e.clientY) - difY);
	art_piece.stroke();	
	previousX = e.clientX - difX;
	previousY = (window.scrollY + e.clientY) - difY;
}