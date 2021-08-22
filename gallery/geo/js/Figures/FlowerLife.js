class FlowerLife extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Flower of Life";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * 0.7,
				min: c * 0.1,
				max: c * 1.5,
				integer: false
			},
			'iteracions': {
				v: 3,
				default: 3,
				min: 1,
				max: 5,
				integer: true
			}
		}
	}

	display() {
		angleMode(RADIANS);
		if (MODE_DEBUG) stroke('#00FFFF50');
		circle(this.posX, this.posY, this.vars['dim'].v);
		if (MODE_DEBUG) stroke('#FF00FF50');
		this.drawFlower(this.posX, this.posY, this.vars['iteracions'].v);
		this.mask(this.posX, this.posY);
	}


	/* ┌──────────────────────────────┐
	   │        Mètodes pròpis        │
	   └──────────────────────────────┘ */

	drawFlower(posX, posY, iteracio) {
		const a = TAU / 6;
		const d = this.vars['dim'].v / this.vars['iteracions'].v;
		if ( iteracio > 0 )
			for (let i = 0; i < 6; i++) {
				const x = posX + cos(a*i) * d * .5;
				const y = posY + sin(a*i) * d * .5;
				this.drawFlower(x, y, iteracio-1);
			}
		else circle(posX, posY, d);
	}

	mask(x, y) {
		const bgColor    = 12;//----------------------------------------[Aconseguir algorismicament]
		const strkWeight =  6;//----------------------------------------[Aconseguir algorismicament]

		const d = this.vars['dim'].v;
		const r = d / this.vars['iteracions'].v;
		
		var s = r * .5 + strkWeight + 1;
		stroke(bgColor);
		if (MODE_DEBUG) stroke('#FFFF0030');
		strokeWeight(s - strkWeight);
		circle(x, y, d+s);
	}

}