var setup = false;
var mode = false;

var canvasEl;
var art_piece;

var mEventMove;
var mEventDown;
var mEventUp;
var mEventLeave;

function readyUp() {
canvasEl = document.createElement('CANVAS'); 

if(document.body.style.height != "0px") {
	document.body.style.position = "relative";
}
document.body.appendChild(canvasEl);
canvasEl.style.background = "rgba(255, 255, 255, 0)";
canvasEl.style.position = "absolute";
canvasEl.style.top = 0;
canvasEl.style.left = 0;
//some crazy number
canvasEl.style.zIndex = "1000000";

art_piece = canvasEl.getContext("2d");

canvasEl.style.pointerEvents = "none";
canvasEl.width = document.body.clientWidth;
canvasEl.height = document.body.scrollHeight;

art_piece.lineWidth = 1;
art_piece.lineCap = "round";
art_piece.strokeStyle = "#000000";

var bounds = canvasEl.getBoundingClientRect();
var difY = bounds.y + window.scrollY;
var difX = bounds.x;

var clicking = false;
var previousX = 0;
var previousY = 0;

mEventMove = function(e) {
	if(clicking == true)
	{
		draw(e);
	}
}
canvasEl.addEventListener("mousemove", mEventMove);

mEventDown = function(e) {
	previousX = e.clientX - difX;
	previousY = (window.scrollY + e.clientY) - difY;
	draw(e);
	clicking = true;
}
canvasEl.addEventListener("mousedown", mEventDown);

mEventUp = function() {
	clicking = false;
}
canvasEl.addEventListener("mouseup", mEventUp);

mEventLeave = function() {
	clicking = false;
}
canvasEl.addEventListener("mouseleave", mEventLeave);

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
			sendResponse({bmessage: [art_piece.strokeStyle,art_piece.lineWidth,mode,art_piece.globalCompositeOperation == "source-over"]});
		}
		else if(request.message.endsWith(" change_brush_size")) {
			art_piece.lineWidth = parseInt(request.message.split(" change_brush_size")[0]);
			sendResponse({respondance: "Sure sure."});
		}
		else if (request.message == "Refresh") {
			canvasEl.remove();
			canvasEl.removeEventListener("mousemove",mEventMove);
			canvasEl.removeEventListener("mousedown",mEventDown);
			canvasEl.removeEventListener("mouseup",mEventUp);
			canvasEl.removeEventListener("mouseleave",mEventLeave);
			readyUp();
			if(mode == true) {
				canvasEl.style.pointerEvents = "auto";
				console.log("1");
			}
			else{
				canvasEl.style.pointerEvents = "none";
				console.log("2");
			}
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
		else if(request.message == "toggle eraser") {
			if(art_piece.globalCompositeOperation == "source-over") {
				art_piece.globalCompositeOperation = "destination-out";
			}
			else {
				art_piece.globalCompositeOperation = "source-over";
			}
			sendResponse({respondance: "Sure sure."});
		}
		else {
			art_piece.strokeStyle = request.message;	
			sendResponse({respondance: "Sure sure."});
		}
	}
);
