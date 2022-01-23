class TxtRotate extends Anim {

	// This sketch borrows heavily from https://codepen.io/CheeseTurtle/pen/jzdgI

	setAttributes() {
		this.props = [ 'data-rotate', 'data-period' ];
		this.targetQuery = ".txt-rotate";
		this.additionalCss = ".txt-rotate > .wrap { border-right: 0.08em solid #666; }";
	}

	initAnim() {
		this.iterateTargetElements( el => {
			const toRotate = el.getAttribute( 'data-rotate' );
			const period   = el.getAttribute( 'data-period' );
			if (toRotate)
				new TxtRotateEl( el, JSON.parse(toRotate), period );
		} );
	}

}

class TxtRotateEl {

	constructor( el, toRotate, period ) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	}

	tick() {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];

		if (this.isDeleting)
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		else
			this.txt = fullTxt.substring(0, this.txt.length + 1);

		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

		const that = this;
		var delta = 300 - Math.random() * 100;

		if (this.isDeleting) delta /= 2;

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

}
