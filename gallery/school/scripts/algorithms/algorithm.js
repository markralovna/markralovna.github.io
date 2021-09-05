class AlgorithmController {
	constructor () {
		this.info = {
			name: '',
			shortName: '',
			visible: true,
			infolink: ''
		};
		this.currentStepIndex = 0;
		this.steps = [];
		this.inputs = [];
	}

	get title () {
		return this.info.name;
	}

	setStep (stepIndex) {
		this.currentStepIndex = stepIndex;
	}

	setup () {
		this.algorithm.setup();
	}

	draw () {
		this.algorithm.update();
		for (let i = 0; i <= this.currentStepIndex; i++)
			this.steps[i].displayFunction();
	}
}

class Algorithm {
	setup () {}
	draw () {
		this.display();
		this.update();
	}
	display () {}
	update () {}
}
