class Figure {
	
	/* ┌──────────────────────────────┐
	   │          Constructor         │
	   └──────────────────────────────┘ */

	constructor(pX, pY) {

		this.name = "Figure";
		
		const c = pX > pY ? pX : pY;

		this.vars = {
			'radius': {
				v: 350,
				default: c * 0.35,
				min: c * 0.05,
				max: c * 0.75,
				integer: false
			}
		}

		this.posX = pX;
		this.posY = pY;
		
		if (MODE_DEBUG) console.log ('Carregada la  figura' + this.name);
	}


	
	/* ┌──────────────────────────────┐
	   │       Getters & Setters      │
	   └──────────────────────────────┘ */

	getName() {
		return this.name;
	}

	getNumSliders() {
		return Object.keys(this.vars).length;
	}

	setValues(values) {
		const v = Object.keys(this.vars);
		for (let i = 0; i < values.length; i++) {
			const p = this.vars[v[i]];
			p.v = map(values[i], 0, 127, p.min, p.max);
			if (p.integer) p.v = parseInt(p.v);
			if (p.pair) p.v = parseInt(p.v * 0.5) * 2;
		}
	}

	getDefaultValue(i) {
		const v = Object.keys(this.vars);
		const e = this.vars[v[i]];
		return map(e.default, e.min, e.max, 0, 127);
	}



	/* ┌──────────────────────────────┐
	   │        Mètodes comuns        │
	   └──────────────────────────────┘ */

	update() { }

	display() {
		if (MODE_DEBUG) stroke('#00ffff88');
		angleMode(RADIANS);
		const r = this.vars['radius'].v
		ellipse(this.posX, this.posY, r, r);
	}



	/* ┌──────────────────────────────┐
	   │          Eines útils         │
	   └──────────────────────────────┘ */

	displayPolygonInCircle(centerX, centerY, dim, sides) {
		var a = 0;
		var points = [];
		for (let i = 0; i < sides; i++) {
			a += TAU/sides;
			var p = {};
			p['x'] = centerX + cos(a) * dim * 0.5;
			p['y'] = centerY + sin(a) * dim * 0.5;
			points.push(p);
		}
		this.displayPolygonWithPoints(points, sides);
		return points;
	}

	displayPolygonWithPoints(points, sides) {
		if (MODE_DEBUG) points.forEach(p => {stroke('#ffff00'); strokeWeight(10); point(p['x'], p['y']); strokeWeight(4);stroke('#ff00ff50');});
		for (let i = 0; i < sides; i++) {
			const p1 = points[i];
			const p2 = i < points.length-1 ? points[i+1] : points[0];
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		};
	}

}