setupDaStuff();
requestInfo();


document.getElementById('modeToggle').addEventListener('click',modeChange);

document.getElementById('clearCanvas').addEventListener('click',clearCanvas);

document.getElementById('eraserToggle').addEventListener('click',eraserToggle);

var waitColour;
document.getElementById('multicolour').oninput = function() {
	try {
		clearTimeout(waitColour);	
	} 
	catch{}
	waitColour = setTimeout(function() {
		colourSend(document.getElementById('multicolour').value);
	},200);
};

var slider = document.getElementById('sl');
var slDisplay = document.getElementById('brushSize');
var brshTimer;
slider.oninput = function() {slDisplay.innerHTML = slider.value; };
slider.addEventListener('change',brushSizeMessage);

document.getElementById('red').addEventListener('click',function() { colourSend("#fc0324"); });
document.getElementById('yellow').addEventListener('click',function() { colourSend("#fcf403"); });
document.getElementById('green').addEventListener('click',function() { colourSend("#07fc03"); });
document.getElementById('blue').addEventListener('click',function() { colourSend("#03dffc"); });
document.getElementById('pink').addEventListener('click',function() { colourSend("#ff00d4"); });
document.getElementById('purple').addEventListener('click',function() { colourSend("#a6028a"); });
document.getElementById('orange').addEventListener('click',function() { colourSend("#ffa203"); });
document.getElementById('indigo').addEventListener('click',function() { colourSend("#4b0082"); });
document.getElementById('black').addEventListener('click',function() { colourSend("#000000"); });
document.getElementById('gray').addEventListener('click',function() { colourSend("#756c6c"); });

function modeChange() {
	toggleDisplay(document.getElementById('modeToggle'));
	console.log("Changing Mode.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "change mode"}, function() {
			console.log("Success");
  		});
	});
}
function colourSend(hexCode) {
	document.getElementById('multicolour').value = hexCode;
	console.log("Changing Colour.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: hexCode}, function() {
			console.log("Success");
  		});
	});
}
function clearCanvas() {
	console.log("Clearing Canvas.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "clearTheCanvas"}, function() {
			console.log("Success");
  		});
	});
}

function setupDaStuff() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "setupDaStuff"}, function() {
			console.log("Success");
  		});
	});
}
function brushSizeMessage() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: slider.value + " change_brush_size"}, function() {
			console.log("Success");
  		});
	});
}
function requestInfo() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "gimme info"}, function(response) {
			document.getElementById('multicolour').value = response.bmessage[0];
			slider.value = response.bmessage[1];
			slDisplay.innerHTML = response.bmessage[1].toString();
			let modeE = document.getElementById('modeToggle');
			let eraserE = document.getElementById('eraserToggle');
			if(response.bmessage[2] == true) {
				modeE.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
			}
			else {
				modeE.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
			}
			if(response.bmessage[3] == true) {
				eraserE.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
			}
			else {
				eraserE.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
			}
  		});
	});
}
function eraserToggle() {
	toggleDisplay(document.getElementById('eraserToggle'));
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "toggle eraser"}, function() {
			console.log("Success");
  		});
	});	
}

function toggleDisplay(elem) {
	if(elem.style.backgroundColor == "rgba(255, 0, 0, 0.5)") {
		elem.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
	}
	else if(elem.style.backgroundColor == "rgba(0, 255, 0, 0.5)"){
		elem.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
	}
	else {
		elem.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
	}
}
