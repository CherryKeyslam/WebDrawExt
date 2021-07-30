var canvasEl = document.getElementById("le_canvas");
canvasEl.width = window.innerWidth - 10;
canvasEl.height = window.innerHeight - 10;

var art_piece = canvasEl.getContext("2d");

var previousX = 0;
var previousY = 0;

art_piece.lineWidth = 20;

canvasEl.addEventListener("mousemove", function(e) {
	art_piece.beginPath();
	art_piece.moveTo(previousX,previousY);
	art_piece.lineTo(e.clientX,e.clientY);
	art_piece.stroke();
	console.log("X: " + e.clientX.toString() + " Y: " + e.clientY.toString())
	previousX = e.clientX;
	previousY = e.clientY;
})