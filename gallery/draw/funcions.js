var fillColor = [0, 80, 35]; // var fillColor = [0, 80, 25];

function setStyle() {
	colorMode(HSL);
	angleMode(RADIANS);
}

function clearCanvas() {
	background(12);
}

function changeArwork(id) {
	window.location.href = "./" + id + '.html';
}

/*function initializeSliderVars( sliderVars ) {
	sliderVars.forEach(var => {
		XXX = document.getElementById(var);
	});
}*/
