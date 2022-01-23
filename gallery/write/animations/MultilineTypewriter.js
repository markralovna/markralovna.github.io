class MultilineTypewriter extends Anim {

	// This sketch borrows heavily from https://codepen.io/daviddcarr/pen/XVyQMM

	setAttributes() {
		this.props = [ 'data-texts' ];
		this.targetQuery = ".multiline-typewriter";
	}

	initAnim() {
		this.i = 0,
		this.a = 0,
		this.isBackspacing = false,
		this.isParagraph = false;
		this.iterateTargetElements( el => {
			const a = JSON.parse( el.getAttribute( "data-texts" ) );
			el.appendChild( document.createElement("h1") );
			el.appendChild( document.createElement("p")  );
			this.typeWriter(el, a);
		} );
	}

	setup() {
		this.speedForward = 100;
		this.speedWait = 1000;
		this.speedBetweenLines = 1000;
		this.speedBackspace = 25;
	}

	typeWriter(element, ar) {
		const that = this;

		const aString = ar[this.a];
		const eHeader = element.querySelector("h1");
		const eParagraph = element.querySelector("p");

		if (!this.isBackspacing) {
			if (this.i < aString.length) {
				if (aString.charAt(this.i) == "|") {
					this.isParagraph = true;
					eHeader.classList.remove("cursor");
					eParagraph.classList.add("cursor");
					this.i++;
					setTimeout( ev => { that.typeWriter(element, ar); }, this.speedBetweenLines );
				} else {
					if (!this.isParagraph)
						eHeader.innerText = eHeader.innerText + aString.charAt(this.i);
					else
						eParagraph.innerText = eParagraph.innerText + aString.charAt(this.i);
					this.i++;
					setTimeout( ev => { that.typeWriter(element, ar); }, this.speedForward );
				}
			} else if (this.i == aString.length) {
				this.isBackspacing = true;
				setTimeout( ev => { that.typeWriter(element, ar); }, this.speedWait );
			}
		} else {
			if (eHeader.innerText.length > 0 || eParagraph.innerText.length > 0) {
				if (eParagraph.innerText.length > 0) {
					eParagraph.innerText = eParagraph.innerText.substring(0, eParagraph.innerText.length - 1);
				} else if (eHeader.innerText.length > 0) {
					eParagraph.classList.remove("cursor");
					eHeader.classList.add("cursor");
					eHeader.innerText = eHeader.innerText.substring(0, eHeader.innerText.length - 1);
				}
				setTimeout( ev => { that.typeWriter(element, ar); }, this.speedBackspace );
			} else { 
				this.isBackspacing = false;
				this.i = 0;
				this.isParagraph = false;
				this.a = (this.a + 1) % ar.length;
				setTimeout( ev => { that.typeWriter(element, ar); }, 50 );
			}
		}
	}

	injectCss() { injectCss ( `
		.cursor::after {
			content:'';
			display:inline-block;
			margin-left:3px;
			background-color:white;
			animation-name:blink;
			animation-duration:0.5s;
			animation-iteration-count: infinite;
		}

		h1.cursor::after {
			height:24px;
			width:13px;
		}
		p.cursor::after {
			height:13px;
			width:6px;
		}

		@keyframes blink {
			0%   { opacity:1; }
			49%  { opacity:1; }
			50%  { opacity:0; }
			100% { opacity:0; }
		}
	` ); }

}
