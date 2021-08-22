function createAlgorithmSelectorButtons() {
	const cont = document.getElementById('algorithmSelectors');
	var index = 0;
	algorithms.forEach(algorithm => {
		if (algorithm.info.visible || MODE_DEBUG) {
			const btn = document.createElement('BUTTON');
			btn.innerText = algorithm.info.shortName;
			btn.setAttribute('algorithm-id', index);
			btn.addEventListener('click', changeSelectedAlgorithm);
			cont.appendChild(btn);
			if (index == selectedAlgorithm) btn.classList.add('selected');
			index++
		}
	});
}

function changeSelectedAlgorithm(ev) {
	focusSelectedmButton('#algorithmSelectors>button.active', 'active', [ev.target]);
	document.getElementById('algorithmInputs').innerHTML = "";
	modifyDOM2SelectedAlgorithm( ev.target.getAttribute('algorithm-id') );
	createStepInputs(0);
}

function modifyDOM2SelectedAlgorithm(ind) {
	setupSelectedAlgorithm(ind);
	modifyAppTitle(ind);
	createStepsSelectorsContainer();
}

function focusSelectedmButton (desFosusedQuery, focusClass, newFosussedElements) {
	document.querySelectorAll(desFosusedQuery).forEach(el => {
		el.classList.remove(focusClass);
	});
	newFosussedElements.forEach(el => {
		el.classList.add(focusClass);
	});
}

function setupSelectedAlgorithm(algorithmIndex) {
	selectedAlgorithm = algorithms[algorithmIndex];
	selectedAlgorithm.setup();
}

function modifyAppTitle() {
	const newTitle = selectedAlgorithm.title;
	document.getElementById('algorithmTitle').innerText = newTitle;
}

function updateSelectedAlgorithmStep(ev) {
	const newSelectedStepIndex = ev.target.getAttribute('step-index');
	selectedAlgorithm.setStep(newSelectedStepIndex);
	focusSelectedmButton('#stepsSelectors>button.active', 'active', [ev.target]);
	const previusStepButtons = Array.prototype.slice.call(document.querySelectorAll('#stepsSelectors>button'), 0).slice(0, newSelectedStepIndex);
	focusSelectedmButton('#stepsSelectors>button.selected', 'selected', previusStepButtons);
	createStepInputs(newSelectedStepIndex);
}

function createStepInputs(step) {
	const cont = document.getElementById('algorithmInputs');
	cont.innerHTML = '';
	selectedAlgorithm.inputs.forEach(inputInfo => {
		if (inputInfo.minStep <= step) {
			const input = document.createElement('INPUT');
			input.type = inputInfo.type;
			input.min = inputInfo.min;
			input.max = inputInfo.max;
			input.value = inputInfo.initValue;
			input.onchange = inputInfo.callback;
			cont.appendChild(input);
		}
	});
}

function createStepsSelectorsContainer() {
	const cont = document.getElementById('stepsSelectors');
	cont.innerHTML = "";
	for (let i = 0; i < selectedAlgorithm.steps.length; i++) {
		const button = document.createElement('button');
		if (i == 0) button.classList.add('active');
		button.setAttribute('step-index', i);
		button.onclick = updateSelectedAlgorithmStep;
		cont.appendChild(button);
	}
}
