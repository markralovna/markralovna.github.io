var drawElement, drawMetaElement, radius, center;
const n = 6;
const PI = 3.141592;
const TAU = PI * 2;

window.addEventListener( 'load', initMetatron );

function initMetatron() {
	drawElement = document.getElementById('draw');
	drawMetaElement = drawElement.getElementById('draw-metatron');
	initVars();
	initSvg();
	initButtons();
}

function initVars ( ) {
	radius = drawElement.clientHeight * .1;
	center = {
		x: drawElement.clientWidth  * .5,
		y: drawElement.clientHeight * .5
	};
}

function initSvg ( ) {
	const centerCricleEl = createSvgCircle( radius, center.x, center.y, [] );
	centerCricleEl.appendChild( createFadeAnimation( "ar0", "0" ) );
	drawMetaElement.appendChild( centerCricleEl );
	
	drawCricleOfCircles( 1, createOffsetAnimation( "ar1", "ar0.end" ) );
	drawCricleOfCircles( 2, createOffsetAnimation( "ar2", "ar1.end" ) );
	drawLinesBetweenCircles( createOffsetAnimation( "l",  "ar2.end" ) );

	drawElement.classList.add( "responsive" );
}

function initButtons ( ) {
	const cont = document.getElementById("buttonRow");
	Object.keys(solids).forEach(s => {
		const solid = solids[s];
		buttonEl = document.createElement("button");
		buttonEl.innerText = solid.name;
		buttonEl.classList.add( s );
		buttonEl.addEventListener( 'click', ev => { displaySolid( s ); } );
		buttonEl.addEventListener( 'click', ev => { toggleSelectedSolid( s ); } );
		cont.appendChild( buttonEl );
	});
}

function displaySolid ( solidName ) {
	const cont = drawElement.getElementById( "draw-solid" );
	while (cont.lastChild)
		cont.removeChild(cont.lastChild);
	cont.appendChild( drawSolid( solidName ) )
}

function drawCricleOfCircles ( l, anim ) {
	for (var i = 0; i < n; i++) {
		const p = findCircleCoords( i, l );
		const el = createSvgCircle( radius, p.x, p.y, [ "offsetAnimation" ] );
		el.style = `--n:${i}`;
		el.appendChild( anim.cloneNode(true) );
		drawMetaElement.appendChild( el );
	}
}

function findCircleCoords ( i, l ) {
	const a = TAU / n * ( i + .5 );
	const x = center.x + Math.cos(a) * radius * 2 * l;
	const y = center.y + Math.sin(a) * radius * 2 * l;
	return { x: x ,y: y };
}

function drawLinesBetweenCircles ( anim ) {
	const els = drawMetaElement.querySelectorAll('circle');
	els.forEach( circleEl1 => {
		els.forEach( circleEl2 => {
			const lineEl = createSvgLine ( circleEl1.getAttribute('cx'), circleEl1.getAttribute('cy'), circleEl2.getAttribute('cx'), circleEl2.getAttribute('cy'), ["offsetAnimation"] );
			lineEl.appendChild( anim.cloneNode(true) );
			drawMetaElement.appendChild( lineEl );
		});
	});
}

function createSvgElement ( tag, classes, attributes ) {
	const svgns = "http://www.w3.org/2000/svg";
	const el = document.createElementNS(svgns, tag);
	Object.keys(attributes).forEach( attr => {
		el.setAttributeNS( null, attr, attributes[attr] );
	} );
	classes.forEach( className => {
		el.classList.add( className );
	} );
	return el;
}

function createSvgCircle ( r, cx, cy, classes ) {
	return createSvgElement( "circle", classes, { cx: cx, cy: cy, r: r } );
}

function createSvgLine ( x1, y1, x2, y2, classes ) {
	return createSvgElement( "line", classes, { x1: x1, y1: y1, x2: x2, y2: y2 } );
}

function createSvgPath ( d, classes ) {
	return createSvgElement( "path", classes, { d: d } );
}

function createAnimation ( id, attributeName, begin, from, to ) {
	return createSvgElement( "animate", [], {
		"id": id,
		"attributeName": attributeName,
		"begin": begin,
		"dur": "2s",
		"from": from,
		"to": to,
		'fill': 'freeze'
	} );
}

function createOffsetAnimation ( id, begin ) {
	return createAnimation ( id, "stroke-dashoffset", begin, "500", "0" );
}

function createFadeAnimation ( id, begin ) {
	return createAnimation ( id, "stroke-opacity", begin, "0", "1" );
}



const solids = {
	cube: {
		name: "Cube",
		points: [ [3,2],[4,2],[5,2],[0,0],[3,2],[2,2],[1,2],[0,2],[5,2],[0,0],[1,2] ]
	},
	tetrahedron: {
		name: "Tetrahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[0,0],[4,2],[2,2],[0,0] ]
	},
	octahedron: {
		name: "Octahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2] ]
	},
	icosahedron: {
		name: "Icosahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2],[2,2],[3,1],[5,1],[1,1],[3,1] ]
	},
}

function drawSolid ( name ) {
	const p = solids[name].points;
	var d = `m ${q(p[0]).x} ${q(p[0]).y}`;
	for (let i = 1; i < p.length; i++) {
		const p1 = q(p[i]);
		const p2 = q(p[i-1]);
		d += ` l ${p1.x-p2.x} ${p1.y-p2.y}`;
	}
	return createSvgPath ( d, [ "solid", name ] );
}

function q ( z ) {
	return findCircleCoords( z[0], z[1] );
}
