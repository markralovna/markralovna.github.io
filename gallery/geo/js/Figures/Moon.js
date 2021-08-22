class Moon extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Moon";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * 0.7,
				min: c * 0.1,
				max: c * 1.5,
				integer: false
			},
			'dimRatio': {
				v: 0,
				default: 0.75,
				min: 0.00001,
				max: 0.99999,
				integer: false
			},
			'iniciObertura': {
				v: 0,
				default: PI,
				min: 0,
				max: TAU,
				integer: false
			},
			'desplacamentRatio': {
				v: 0,
				default: 0.25,
				min: 0.00001,
				max: 0.99999,
				integer: false
			}
		}
	}

	display() {
		angleMode(RADIANS);
		const io = this.vars['iniciObertura'].v;
		const dr = this.vars['desplacamentRatio'].v;

		const dim1 = this.vars['dim'].v;
		const rad1 = dim1 * .5;
		const dim2 = (dim1 * this.vars['dimRatio'].v);
		const rad2 = dim2 * .5;
		const pos1 = createVector(this.posX, this.posY);
		const pos2 = createVector(
			this.posX + (cos(io) * (rad1 - rad2)) + (cos(io)) * dim2 * dr,
			this.posY + (sin(io) * (rad1 - rad2)) + (sin(io)) * dim2 * dr
		);

		const int = getIntersectionCircles(pos1, rad1, pos2, rad2);

		const alpha1 = getAngleFromPoint( pos1, int[1] );
		const beta1  = getAngleFromPoint( pos1, int[0] );
		const alpha2 = getAngleFromPoint( pos2, int[1] );
		const beta2  = getAngleFromPoint( pos2, int[0] );

		if (MODE_DEBUG) {
			stroke('#ffff0040');
			strokeWeight(10);
			point(pos1.x, pos1.y);
			stroke('#ffff0020');
			strokeWeight(4);
			var v = p5.Vector.fromAngle(alpha1, rad1);
			line(pos1.x, pos1.y, pos1.x+v.x, pos1.y+v.y);
		}

		if (MODE_DEBUG) { stroke('#ff00ff40');circle(pos1.x, pos1.y, dim1);stroke('#ff00ff80'); }
		arc(pos1.x, pos1.y, dim1, dim1, alpha1, beta1, OPEN);
		if (MODE_DEBUG) { stroke('#00ffff50');circle(pos2.x, pos2.y, dim2);stroke('#00ffff80'); }
		arc(pos2.x, pos2.y, dim2, dim2, alpha2, beta2, OPEN);
	}

}

function getIntersectionCircles(pos1, rad1, pos2, rad2) {
	//Function borrowed from https://editor.p5js.org/Sachiko-Nakajima/sketches/ryM2w-E9X
	const p1 = createVector(0, 0);
	const p2 = createVector(0, 0);

	let dx = pos2.x - pos1.x;
	let dy = pos2.y - pos1.y;
	let d2 = dx*dx + dy*dy;
	let di = sqrt(d2);
	let r2 = rad1 * rad1;
	let R2 = rad2 * rad2;
	
	if(di < rad1 + rad2 && di > abs(rad1 - rad2)) {
		let K = r2-R2+d2; 
		let K2 = K * K;
		let h = sqrt(4 * r2 * d2 - K2);
		p1.x = pos1.x + (dx * K + dy * h)/(2*d2);
		p2.x = pos1.x + (dx * K - dy * h)/(2*d2);
		p1.y = pos1.y + (dy * K - dx * h)/(2*d2);
		p2.y = pos1.y + (dy * K + dx * h)/(2*d2);
	}
	if (MODE_DEBUG) { stroke('#ffff00');strokeWeight(10);point(p1.x, p1.y);point(p2.x, p2.y);strokeWeight(4); }
	return [p1, p2];
}

function getAngleFromPoint(center, point) {
	const b = center.x - point.x;
	const h = center.y - point.y;

	var alpha = PI + atan(h/b);
	if (center.x < point.x) alpha += PI;

	return alpha;
}
