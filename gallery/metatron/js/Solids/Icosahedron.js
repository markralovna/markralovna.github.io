class Icosahedron extends Solid {

	constructor(c) {
		super(c);
		this.name = "Icosahedron";
		this.color[0] = 210;
	}

	getPoints() {
		let res = {};
		res['exterior'] = [];
		for (let i = 0; i < 6; i++) {
			const a = TAU / 6 * i + HALF_PI;
			res['exterior'][i] = {};
			res['exterior'][i]['x'] = this.size * cos(a) * 0.4 + this.posX;
			res['exterior'][i]['y'] = this.size * sin(a) * 0.4 + this.posY;
		}
		res['interior'] = [];
		for (let i = 0; i < 3; i++) {
			const a = TAU / 3 * i + HALF_PI;
			res['interior'][i] = {};
			res['interior'][i]['x'] = this.size * cos(a) * 0.2 + this.posX;
			res['interior'][i]['y'] = this.size * sin(a) * 0.2 + this.posY;
		}
		if (MODE_DEBUG) {
			stroke("#ffff00"); strokeWeight(10);
			Object.keys(res['exterior']).forEach(p => {let P = res['exterior'][p]; point(P['x'], P['y']);});
			Object.keys(res['interior']).forEach(p => {let P = res['interior'][p]; point(P['x'], P['y']);});
		}
		return res;
	}

	drawLines(points) {
		if (MODE_DEBUG) {stroke("#00ffff40"); strokeWeight(4);}
		for (let i = 0; i < 6; i++) {
			const p1 = points['exterior'][i];
			const p2 = i == 5 ? points['exterior'][0] : points['exterior'][i+1];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		}
		for (let i = 1; i < 6; i+=2) {
			const p1 = points['exterior'][i];
			const p2 = i == 5 ? points['exterior'][1] : points['exterior'][i+2];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		}
		for (let i = 0; i < 3; i++) {
			const p1 = points['interior'][i];
			const p2 = i == 2 ? points['interior'][0] : points['interior'][i+1];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);
		}
		for (let i = 0; i < 3; i++) {
			const p1 = points['interior'][i];
			const p2 = points['exterior'][i*2];
			this.updateGradienColor(1);
			line(p1['x'], p1['y'], p2['x'], p2['y']);    
		}
	}

}