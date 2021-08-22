let anim;
var comptadorsValue;


function setup() {
	frameRate(10);

	anim = new Tree(window.innerWidth, 800, 400, 10);
	comptadorsValue = [0, 0, 0];

	createCanvas(window.innerWidth, window.innerHeight);
}


function draw() {
	anim.update();
	anim.display();
}


function contenidorActivat(target) {
	switch (target.alt) {
		case "Orgànic":
			sumarComptador(0);
			anim.doMakeMoreBranhces(comptadorsValue[0]);
			break;
		case "Plàstic":
			sumarComptador(1);
			anim.doColorfy(comptadorsValue[1]);
			break;
		case "Paper":
			sumarComptador(2);
			anim.doGrow(comptadorsValue[2]);
			break;
	}
}

function sumarComptador(c){
	comptadorsValue[c]++;
}

