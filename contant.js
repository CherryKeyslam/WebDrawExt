var setup = false;
var mode = false;

var canvasEl;
var art_piece;

function readyUp() {
canvasEl = document.createElement('CANVAS'); 

document.body.appendChild(canvasEl);
canvasEl.style.background = "rgba(255, 255, 255, 0)";
canvasEl.style.position = "absolute";
canvasEl.style.top = 0;
canvasEl.style.left = 0;

art_piece = canvasEl.getContext("2d");

canvasEl.style.pointerEvents = "none";
canvasEl.width = document.body.clientWidth;
canvasEl.height = 0;

 setTimeout(function(){ 
	canvasEl.height = document.body.scrollHeight;
	art_piece.lineWidth = 1;
	art_piece.lineCap = "round";
	art_piece.strokeStyle = "#000000";
 }, 1500);

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
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.message == "setupDaStuff") {
			if(setup == false) {
				readyUp();
				setup = true;
			}
			sendResponse({respondance: "Sure sure."});
		}
		else if(request.message == "gimme info") {
			sendResponse({bmessage: [art_piece.strokeStyle,art_piece.lineWidth]});
		}
		else if(request.message.endsWith(" change_brush_size")) {
			art_piece.lineWidth = parseInt(request.message.split(" change_brush_size")[0]);
			sendResponse({respondance: "Sure sure."});
		}
		else if (request.message == "change mode") {
			if(mode == false) {
				mode = true;
				canvasEl.style.pointerEvents = "auto";
			}
			else if(mode == true) {
				mode = false;
				canvasEl.style.pointerEvents = "none";
			}
			sendResponse({respondance: "Sure sure."});
		}
		else if(request.message == "clearTheCanvas") {
			art_piece.clearRect(0, 0, canvasEl.width, canvasEl.height);
			sendResponse({respondance: "Sure sure."});
		}
		else {
			art_piece.strokeStyle = request.message;	
			sendResponse({respondance: "Sure sure."});
		}
	}
);
