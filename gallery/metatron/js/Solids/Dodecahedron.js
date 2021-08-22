class Dodecahedron extends Solid {

	constructor(c) {
		super(c);
		this.name = "Dodecahedron";
		this.color[0] = 25;
	}

	getPoints() {
		let res = {};
		res['center'] = {'x': this.posX, 'y':this.posY};
		res['int'] = [];
		for (let i = 0; i < 3; i++) {
			const a = TAU / 3 * i + PI/6;
			res['int'][i] = {};
			res['int'][i]['x'] = this.size * cos(a) * 0.24 + this.posX;
			res['int'][i]['y'] = this.size * sin(a) * 0.24 + this.posY;        
		}
		res['ext'] = [];
		for (let i = 0; i < 6; i++) {
			const a1 = TAU / 6 * i + HALF_PI;
			const a2 = TAU / 6 * (i+1) + HALF_PI;
			let p1 = {};
			let p2 = {};
			p1['x'] = this.size * cos(a1) * 0.4 + this.posX;
			p1['y'] = this.size * sin(a1) * 0.4 + this.posY;   
			p2['x'] = this.size * cos(a2) * 0.4 + this.posX;
			p2['y'] = this.size * sin(a2) * 0.4 + this.posY;
			let b = this.divideLine(p1, p2, 3);
			res['ext'].push(b[0]);
			res['ext'].push(b[1]);
		}
		if (MODE_DEBUG) {
			stroke("#ffff00"); strokeWeight(10);
			point(res['center']['x'],res['center']['y']);
			Object.keys(res['int']).forEach(p => {let P = res['int'][p]; point(P['x'], P['y']);});
			Object.keys(res['ext']).forEach(p => {let P = res['ext'][p]; point(P['x'], P['y']);});
		}
		return res;
	}

	drawLines(points) {
		if (MODE_DEBUG) {stroke("#00ffff40"); strokeWeight(4);}
		const p2 = points['center'];
		for (let i = 0; i < 3; i++) {
			const p1 = points['int'][i];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		}
		for (let i = 1; i <= 12; i++) {
			const p1 = points['ext'][i-1];
			const p2 = i != 12 ? points['ext'][i] : points['ext'][0];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		}
		var v = 8;
		for (let i = 0; i < 3; i++) {
			const p1 = points['int'][i];
			const p2 = points['ext'][v];
			const p3 = points['ext'][(v+3)%12];
			v = (v+4)%12;
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p3['x'], p3['y']);
		}
	}

	divideLine(p1, p2, devisions) {
		var res = [];
		let lineVector = new p5.Vector( (p2['x'] - p1['x']) , (p2['y'] - p1['y']) );
		let subVector = p5.Vector.div(lineVector, devisions);
		res.push(p1);
		for (let i = 0; i < devisions; i++) {
			let p0 = createVector(res[i]['x'], res[i]['y']);
			let p = p5.Vector.add(subVector, p0);
			res.push({'x': p.x, 'y': p.y });
		}
		return [res[1], res [2]];
	}

}