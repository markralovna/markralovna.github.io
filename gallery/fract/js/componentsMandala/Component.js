class Component {
	
	/* ┌──────────────────────────────┐
	   │          Constructor         │
	   └──────────────────────────────┘ */

	constructor() {
		this.name = "...";
		this.selected = false;
		this.ringProperties = {
			"radi": {
				"v":  0,
				"name": "Ring Radius",
				"default": 0,
				"min": 0,
				"max": 1000,
				"integer": false
			},
			"numNodes": {
				"v": 8,
				"name": "Number of Nodes",
				"default": 8,
				"min": 1,
				"max": 32,
				"step": 1
			},
			"desplacamentNode": {
				"v": 0,
				"name": "Node displacment",
				"default": 0,
				"min": 0,
				"max": QUARTER_PI,
				"step": QUARTER_PI / 12,
			}
		}
		this.nodeProperties = {
			"radi": {
				"v": 100,
				"name": "Node Radius",
				"default": 100,
				"min": 5,
				"max": 750,
				"integer": false
			}
		}
		this.fase = 0;
		this.incr = 0.01;
		this.min = 0;
		this.max = TAU;
	}



	/* ┌──────────────────────────────┐
	   │       Getters & Setters      │
	   └──────────────────────────────┘ */

	toggleSelected () {
		return this.selected = !this.selected;
	}

	getName () {
		return this.name;
	}

	getProperties () {
		return [this.ringProperties, this.nodeProperties];
	}

	setRingProperty (propertyKey, value) {
		this.ringProperties[propertyKey].v= value;
		if (propertyKey == 'numNodes') {
			this.ringProperties['desplacamentNode'].max = TAU / value;
			this.ringProperties['desplacamentNode'].step = TAU / value / 12;
		}
	}

	setNodeProperty (propertyKey, value) {
		this.nodeProperties[propertyKey].v= value;
	}



	/* ┌──────────────────────────────┐
	   │    Importació i exportació   │
	   └──────────────────────────────┘ */

	import(json) {
		Object.keys(json[1]).forEach(propertyKey => {
			const value = json[1][propertyKey];
			this.ringProperties[propertyKey]['v'] = value;
		});
		Object.keys(json[2]).forEach(propertyKey => {
			const value = json[2][propertyKey];
			this.nodeProperties[propertyKey]['v'] = value;
		});
	}

	export() {
		const exp = [this.name, {}, {}];
		Object.keys(this.ringProperties).forEach(propertyKey => {
			const prop = this.ringProperties[propertyKey];
			exp[1][propertyKey] = prop['v'];
		});
		Object.keys(this.nodeProperties).forEach(propertyKey => {
			const prop = this.nodeProperties[propertyKey];
			exp[2][propertyKey] = prop['v'];
		});
		return exp;
	}



	/* ┌──────────────────────────────┐
	   │       Mètodes de suport      │
	   └──────────────────────────────┘ */

	rotateViewAndDrawnComponent() {
		const n = this.ringProperties["numNodes"].v;
		const d = this.ringProperties["desplacamentNode"].v;
		for (let i = 0; i < n; i++) {
			let a = TAU / n * i + d;
			push();
			rotate(a);
			this.drawComponent(i);
			pop();
		}
	}



	/* ┌──────────────────────────────┐
	   │   Mètodes per Sobrescriure   │
	   └──────────────────────────────┘ */

	update() {
		this.fase = this.fase + this.incr;
		if (this.fase >= this.max || this.fase <= this.min) this.incr *= -1;
	}

	display() {
		if (this.selected) stroke(documentStyle['selected']);
		this.rotateViewAndDrawnComponent();
		if (this.selected) stroke(documentStyle['foreground']);
	}

	drawComponent(index) {
		circle(0, 0, this.nodeProperties["radi"].v);
	}

}