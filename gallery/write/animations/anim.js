class Anim {

	constructor() {
		this.setAttributes();
		this.setup();
		this.initAnim();
		this.injectCss();
	}

	setAttributes() {
		this.props = [ ];
		this.targetQuery = "";
		this.additionalCss = "";
	}

	setup() {
		// ...
	}

	initAnim() {
		// ...
	}

	injectCss() {
		injectCss ( this.additionalCss )
	}

	getTargetElements() {
		return document.querySelectorAll( this.targetQuery );
	}

	iterateTargetElements( callback ) {
		this.getTargetElements().forEach( callback );
	}

}
