setupDaStuff();
requestInfo();


document.getElementById('modeToggle').addEventListener('click',modeChange);

document.getElementById('clearCanvas').addEventListener('click',clearCanvas);

document.getElementById('eraserToggle').addEventListener('click',eraserToggle);

document.getElementById('multicolour').addEventListener('change',function() {
	colourSend(document.getElementById('multicolour').value);
});

var slider = document.getElementById('sl');
var slDisplay = document.getElementById('brushSize');
var brshTimer;
slider.oninput = brushSizeChange;

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
function brushSizeChange() {
	try {
		clearTimeout(brshTimer);
	}
	catch { }
	slDisplay.innerHTML = slider.value;
	brshTimer = setTimeout(brushSizeMessage, 500);
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
  		});
	});
}
function eraserToggle() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "toggle eraser"}, function() {
			console.log("Success");
  		});
	});	
}
