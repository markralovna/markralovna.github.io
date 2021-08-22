class WebDataGetter {

	constructor(animations, defaultSelected=0) {
		this.inputs = [];
		this.currentAnimation = defaultSelected;
		var C = document.createElement("div");
		C.id = "controllersContainer";
		this.createInputRanges(animations[defaultSelected], C);
		this.createSelectButtons(animations, C, defaultSelected);
		document.body.appendChild(C);
	}

	changeNumberInputSliders(animation) {
		var container = document.getElementById('controllersContainer');
		container.removeChild(container.childNodes[0]);
		this.createInputRanges(animation, container);
	}

	createInputRanges(animation, container) {
		var c = document.createElement("div");
		this.inputs = [];
		c.id = "sliderContainer";
		for (let i = 1; i <= animation.getNumSliders(); i++) {
			var r = document.createElement("input");
			r.type = "range";
			r.id = "ip" + i;
			r.min = 0;
			r.max = 127;
			r.step = 1;
			r.value = animation.getDefaultValue(i-1);
			this.inputs.push(r);
			c.appendChild(r);
		}
		container.insertBefore(c, container.firstChild);
	}

	createSelectButtons(animations, container, idselcted) {
		var c = document.createElement("div");
		c.id = "buttonContainer";
		for (let i = 0; i < animations.length; i++) {
			var b = document.createElement("button");
			b.innerText = animations[i].getName();
			b.classList.add('art-deco-button');
			if(i ==idselcted) b.classList.add('selected');
			b.animIndx = i;
			var self = this;
			b.addEventListener('click', function(ev) {
				self.currentAnimation = ev.target.animIndx;
				self.changeNumberInputSliders(animations[i]);
				document.querySelector(".selected").classList.remove('selected');
				ev.target.classList.add('selected');
			});
			c.appendChild(b);
		}
		container.appendChild(c);
	}

	getCurrentAnimation() {
		return this.currentAnimation;
	}

	getSlideValues() {
		var res = [];
		for (let i = 0; i < this.inputs.length; i++) {
			const element = this.inputs[i];
			res.push(element.value);
		}
		return res;
	}

}