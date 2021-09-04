var gameSelectorEl, gameControllersEl, gameTitleEl, gameScreenEl, gameLabelsEl;

window.onload = function() {
	gameSelectorEl = document.getElementById('gameSelector');
	gameControllersEl = document.getElementById('gameControllers');
	gameLabelsEl = document.getElementById('gameLabels');
	gameTitleEl = document.getElementById('gameTitle');
	gameScreenEl = document.getElementById('gameScreen');

	const g = new URL(window.location.href).searchParams.get("g");
	modifyDOM2SelectedGame( g == null ? 0 : g );
	setInterval(updateLabels, 1000);

	createGameSelectorButtons();
}

function createGameSelectorButtons() {
	var index = 0;
	games.forEach(game => {
		if (game.info.visible || MODE_DEBUG) {
			const btn = document.createElement('BUTTON');
			btn.innerText = game.info.shortName;
			btn.setAttribute('game-id', index);
			btn.addEventListener('click', changeselectedGame);
			gameSelectorEl.appendChild(btn);
			if (index == selectedGame) btn.classList.add('selected');
			index++
		}
	});
}

function changeselectedGame(ev) {
	focusSelectedmButton('#gameSelector>button.active', 'active', [ev.target]);
	gameControllersEl.innerHTML = "";
	gameLabelsEl.innerHTML = "";
	const newSelectedGame = ev.target.getAttribute('game-id');
	modifyDOM2SelectedGame( newSelectedGame );
}

function modifyDOM2SelectedGame(ind) {
	setupSelectedGame(ind);
	modifyAppTitle();
	loadGameControls();
}

function focusSelectedmButton (desFosusedQuery, focusClass, newFosussedElements) {
	document.querySelectorAll(desFosusedQuery).forEach(el => {
		el.classList.remove(focusClass);
	});
	newFosussedElements.forEach(el => {
		el.classList.add(focusClass);
	});
}

function setupSelectedGame(gameIndex) {
	selectedGame = games[gameIndex];
	selectedGame.setup();
}

function modifyAppTitle() {
	const newTitle = selectedGame.info.title;
	gameTitleEl.innerText = newTitle;
}

function loadGameControls() {
	selectedGame.inputs.forEach(input => {
		const b = document.createElement('BUTTON');
		b.innerText = input.label;
		b.addEventListener('click', function() {
			if (input.pushable) b.classList.toggle("pushed");
			input.callback();
		});
		gameControllersEl.appendChild(b);
	});
	selectedGame.outputs.forEach(output => {
		const p = document.createElement('P');
		const l = document.createElement('SPAN');
		const t = document.createElement('SPAN');
		output['element'] = t;
		l.innerText = output.label + ': ';
		p.appendChild(l);
		p.appendChild(t);
		gameLabelsEl.appendChild(p);
	});
	//gameScreenEl.replaceWith(gameScreenEl.cloneNode(true));// ToDo: eliminar els eventlisteners anteriors
	selectedGame.events.forEach(event => {
		gameScreenEl.addEventListener(event.event, event.callback);
	});
	gameScreenEl.focus()
}

function updateLabels() {
	selectedGame.outputs.forEach(output => {
		output.element.innerText = output.model();
	});
}

function showModal(title, text, buttonText, buttonCallback ) {
	const el = document.getElementById('dialog');
	el.classList.add('shown');
	document.getElementById('dialog-title').innerText = title;
	document.getElementById('dialog-text').innerText = text;
	const btn = document.getElementById('dialog-btn');
	btn.innerText = buttonText;
	btn.addEventListener('click', function() {
		el.classList.remove('shown');
		buttonCallback();
		gameScreenEl.focus();
	});
}
