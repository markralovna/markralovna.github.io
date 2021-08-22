var selectedComponentIndex = -1;
let LONG_SIDE_SCREEN;
var componentsInfo = ["Umbrella", "Circles", "Raids", "Bezier", "Fishes", "IceCreams", "Arcs", "Diamond", "Line", "Star"];

window.onload = function() {
	loadComponentsScript();
	setTimeout(function(){importCreation('[["Ice Creams",{"radi":350,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":115,"ple":false}],["Fishes",{"radi":300,"numNodes":8,"desplacamentNode":0},{"radi":115,"ple":true,"numPisos":3}],["Bezier",{"radi":250,"numNodes":8,"desplacamentNode":0.39269908169872414},{"height":180,"width":120,"ple":false}],["Bezier",{"radi":250,"numNodes":8,"desplacamentNode":0.39269908169872414},{"height":120,"width":80,"ple":false}],["Raids",{"radi":160,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":35,"numRaids":2}],["Circles",{"radi":200,"numNodes":8,"desplacamentNode":0},{"radi":50,"ple":false}],["Circles",{"radi":200,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":45,"ple":false}],["Circles",{"radi":160,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":35,"ple":false}],["Circles",{"radi":160,"numNodes":8,"desplacamentNode":0},{"radi":35,"ple":false}],["Circles",{"radi":149,"numNodes":16,"desplacamentNode":0},{"radi":19,"ple":true}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":147,"ple":false}],["Umbrella",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":143,"numRaids":24}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":120,"ple":false}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":81,"ple":false}],["Umbrella",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":77,"numRaids":24}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":54,"ple":false}]]');}, 500);
	//importCreation('[["Ice Creams",{"radi":350,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":115,"ple":false}],["Fishes",{"radi":300,"numNodes":8,"desplacamentNode":0},{"radi":115,"ple":true,"numPisos":3}],["Bezier",{"radi":250,"numNodes":8,"desplacamentNode":0.39269908169872414},{"height":180,"width":120}],["Bezier",{"radi":250,"numNodes":8,"desplacamentNode":0.39269908169872414},{"height":120,"width":80}],["Raids",{"radi":160,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":35,"numRaids":2}],["Circles",{"radi":200,"numNodes":8,"desplacamentNode":0},{"radi":50,"ple":false}],["Circles",{"radi":200,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":45,"ple":false}],["Circles",{"radi":160,"numNodes":8,"desplacamentNode":0.39269908169872414},{"radi":35,"ple":false}],["Circles",{"radi":160,"numNodes":8,"desplacamentNode":0},{"radi":35,"ple":false}],["Circles",{"radi":145,"numNodes":16,"desplacamentNode":0},{"radi":15,"ple":true}],["Umbrella",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":140,"numRaids":24}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":120,"ple":false}],["Umbrella",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":80,"numRaids":24}],["Circles",{"radi":0,"numNodes":1,"desplacamentNode":0},{"radi":50,"ple":false}]]');
};

function loadComponentsScript() {
	componentsInfo.forEach(component => {
		addScript2DOM( 'js/componentsMandala/' + component + '.js' );
	});
}

function addScript2DOM(path) {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.src = path;
	const b = document.querySelector('script:last-child');
	document.head.insertBefore(s, b);
}

function loadProperties(componentId) {
	const properties = userLayers[componentId].getProperties();
	const lc = document.getElementById('layerPropertiesContainer');
	createPropertiesElements(componentId, lc, properties[0]);
	const oc = document.getElementById('objectPropertiesContainer');
	createPropertiesElements(componentId, oc, properties[1]);
}

function createPropertiesElements(componentId, container, propertiesArray) {/* MILLORAR EL NOM */
	container.innerHTML = "";
	Object.keys(propertiesArray).forEach(propertyKey => {
		const p = propertiesArray[propertyKey];
		const l = document.createElement('LABEL');
		l.innerText = p['name'];
		const s = document.createElement('INPUT');
		if (p['type'] == "bool") {
			s.type = "checkbox";
			s.checked = p['v'];
		}
		else {
			s.type = "range";
			s.min = p['min'] /*/ 1000 * LONG_SIDE_CANVAS*/;
			s.max = p['max'] /*/ 1000 * LONG_SIDE_CANVAS*/;
			s.step = p['step'];
			s.value = p['v'] /*/ 1000 * LONG_SIDE_CANVAS*/;
		}
		s.setAttribute('id-component', componentId);
		s.setAttribute('id-property', propertyKey);
		s.addEventListener('change', sliderClicked);
		container.appendChild(l);
		container.appendChild(s);
	});
}

function loadLayers() {
	const c = document.getElementById('layersContainer');
	c.innerHTML = '';
	for (let i = 0; i < userLayers.length; i++) {
		const l = document.createElement('LI');
		l.innerText = (i+1) + ' - ' + userLayers[i].getName();
		if (i == selectedComponentIndex) l.classList.add('selected');
		l.setAttribute('layer-index', i);
		l.addEventListener('click', layerClicked);
		c.appendChild(l);
	}
}

function newLayer() {
	new PopUp('multioption', "Add new layer", "What kind of element do you need to add?", componentsInfo, function(type){
		if (selectedComponentIndex > -1) userLayers[selectedComponentIndex].toggleSelected();
		userLayers.push(string2layer(type));
		setSelectedIndx(selectedComponentIndex+1);
		loadLayers();
		loadProperties(selectedComponentIndex);
	});
}

function string2layer(string) {
	var layer;
	switch (string) {
		case "Circles":     layer = new Circles();      break;
		case "Fishes":      layer = new Fishes();       break;
		case "Bezier":      layer = new Bezier();       break;
		case "Raids":       layer = new Raids();        break;
		case "Umbrella":    layer = new Umbrella();     break;
		case "Ice Creams":  layer = new IceCreams();    break;
		case "Diamond":     layer = new Diamond();      break;
		case "Line":        layer = new Line();         break;
		case "Star":        layer = new Star();         break;
	}
	return layer;
}

function layerClicked(ev) {
	const inx = ev.target.getAttribute('layer-index');
	document.querySelector('.selected').classList.remove('selected');
	if (selectedComponentIndex > -1) userLayers[selectedComponentIndex].toggleSelected();
	setSelectedIndx(inx);
	ev.target.classList.add('selected');
	loadProperties(inx);
}

function sliderClicked(ev) {    
	const propertyKey = ev.target.getAttribute('id-property');
	const componentIndex = ev.target.getAttribute('id-component');
	var valor = ev.target.value;
	if (ev.target.type == 'range') valor = Number(valor);
	else if (ev.target.type == 'checkbox') valor = ev.target.checked;

	switch (ev.target.parentNode.id) {
		case "layerPropertiesContainer":
			userLayers[componentIndex].setRingProperty(propertyKey, valor);
			break;
		case "objectPropertiesContainer":
			userLayers[componentIndex].setNodeProperty(propertyKey, valor);
			break;
	}
}

function clearCanvas() {
	userLayers = [];
	setSelectedIndx('none');
	loadLayers();
}

function setSelectedIndx(newSelectedIndx) {
	//if (selectedComponentIndex > -1) userLayers[selectedComponentIndex].toggleSelected();
	var inx = 0;
	if (newSelectedIndx == "last") inx = userLayers.length - 1;
	else if (newSelectedIndx == "none") inx = -1;
	else inx = parseInt(newSelectedIndx);
	selectedComponentIndex = inx;
	const v = selectedComponentIndex > -1 ? 'block' : 'none';
	document.querySelector('.button-row').style.display = v;
	if (selectedComponentIndex > -1) userLayers[selectedComponentIndex].toggleSelected();
}

function moveLayer(dir) {
	userLayers[selectedComponentIndex].toggleSelected();
	userLayers = arrayMove(userLayers, selectedComponentIndex, dir);
	selectedComponentIndex += dir;
	userLayers[selectedComponentIndex].toggleSelected();
	loadLayers();
}

function duplicateElement() {
	const imp = userLayers[selectedComponentIndex].export();
	const l = string2layer(imp[0]);
	l.import(imp);
	userLayers.push(l);
	userLayers[selectedComponentIndex].toggleSelected();
	setSelectedIndx(selectedComponentIndex+1);
	loadProperties(selectedComponentIndex);
	loadLayers();
}

function deleteElement() {
	userLayers.splice(selectedComponentIndex, 1);
	if (selectedComponentIndex >= userLayers.length) setSelectedIndx("last");
	else if (selectedComponentIndex > -1) userLayers[selectedComponentIndex].toggleSelected();
	loadProperties(selectedComponentIndex);
	loadLayers();
}

function importCreation(code) {
	if (code == '' || code == undefined)
		var code = prompt("Please the code exported of your previus creation", "[]");
	const exp = JSON.parse(code);
	exp.forEach(layer => {
		const l = string2layer(layer[0]);
		l.import(layer);
		userLayers.push(l);
	});
	setSelectedIndx("last");
	loadProperties(selectedComponentIndex);
	loadLayers();
}

function exportCreation() {
	const res = [];
	userLayers.forEach(layer => {
		res.push(layer.export());
	});
	alert(JSON.stringify(res));
	console.log(JSON.stringify(res));
}

function toogleSidebar(button, sidebarId) {
	if (CANVAS_WIDTH <= 750)
		if (button.id == 'canvas') {
			document.getElementById('layersSidebar').style.display = "none";
			document.getElementById('toolSidebar').style.display = "none";
			document.getElementById('layerButton').style.display = "block";
			document.getElementById('propertiesButton').style.display = "block";
		}
		else {
			document.getElementById(sidebarId).style.display = "block";
			button.style.display = 'none';
		}
}

function arrayMove(arr, old_index, moved_indexes) {
	const new_index = old_index + moved_indexes;
	while (old_index < 0)
		old_index += arr.length;
	while (new_index < 0)
		new_index += arr.length;
	if (new_index >= arr.length) {
		var k = new_index - arr.length;
		while ((k--) + 1)
			arr.push(undefined);
	}
	 arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}