var canvasEl = document.createElement('CANVAS'); 
document.body.appendChild(canvasEl);
canvasEl.style.background = "rgba(255, 255, 255, 0)";
canvasEl.style.position = "absolute";
canvasEl.style.top = 0;
canvasEl.style.left = 0;

var art_piece = canvasEl.getContext("2d");

canvasEl.width = document.body.clientWidth;
canvasEl.height = 100;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
sleep(1500).then(() => {
	canvasEl.height = document.body.scrollHeight;
	art_piece.lineWidth = 20;
	art_piece.lineCap = "round";
	art_piece.strokeStyle = "#ff0000";
});
var bounds = canvasEl.getBoundingClientRect();
var difY = bounds.y + window.scrollY;
var difX = bounds.x;

var clicking = false;
var previousX = 0;
var previousY = 0;

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
