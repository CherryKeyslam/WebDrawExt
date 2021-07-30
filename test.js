var canvasEl = document.getElementById("le_canvas");
canvasEl.width = window.innerWidth - 10;
canvasEl.height = window.innerHeight - 10;

var art_piece = canvasEl.getContext("2d");

var clicking = false;
var previousX = 0;
var previousY = 0;

art_piece.lineWidth = 20;
art_piece.lineCap = "round";

canvasEl.addEventListener("mousemove", function(e) {
	if(clicking == true)
	{
		art_piece.beginPath();
		art_piece.moveTo(previousX,previousY);
		art_piece.lineTo(e.clientX,e.clientY);
		art_piece.stroke();
		previousX = e.clientX;
		previousY = e.clientY;
	}
})
canvasEl.addEventListener("mousedown", function(e) {
	previousX = e.clientX;
	previousY = e.clientY;
	clicking = true;
})
canvasEl.addEventListener("mouseup", function(e) {
	clicking = false;
})
canvasEl.addEventListener("mouseleave", function(e) {
	clicking = false;
})
