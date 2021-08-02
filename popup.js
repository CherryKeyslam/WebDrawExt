document.getElementById('modeToggle').addEventListener('click',modeChange);
function modeChange() {
	console.log("Changing Mode.");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "change mode"}, function() {
			console.log("Success");
  		});
	});
}
function colorSend(cIndex) {
	console.log("Changing Colour.");
	var hex = "ffff";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: hex}, function() {
			console.log("Success");
  		});
	});
}