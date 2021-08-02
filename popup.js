document.getElementById('modeToggle').addEventListener('click',modeChange);
document.getElementById('clearCanvas').addEventListener('click',clearCanvas);

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
	console.log("Changing Colour.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: hexCode}, function() {
			console.log("Success");
  		});
	});
}
function clearCanvas(hexCode) {
	console.log("Clearing Canvas.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "clearTheCanvas"}, function() {
			console.log("Success");
  		});
	});
}
