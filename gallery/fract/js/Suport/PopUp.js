class PopUp {

	constructor(type, titleText, messageText, extra, callback) {
		this.container = document.createElement('DIV');
		this.title = titleText;
		this.text = messageText;

		this.container.classList.add('promp');
		this.container.classList.add('scroll');
		this.addBasicInfo();
		if (type == "info") this.addCloseButton();
		if (type == "multioption") this.addOptions(extra, callback);
		document.body.appendChild(this.container);

		return this.response;
	}
	
	addOptions(list, callback) {
		list.forEach(option => {
			const o = document.createElement('BUTTON');
			o.innerText = option;
			const that = this;
			o.addEventListener('click', function(){
				that.close();
				callback(option);
			});
			this.container.appendChild(o);
		});
	}
	
	addBasicInfo() {
		const t = document.createElement('P');
		const h = document.createElement('H2');
		t.innerText = this.text;
		h.innerText = this.title;
		this.container.appendChild(h);
		this.container.appendChild(t);
	}
	
	addCloseButton() {
		const cb = document.createElement('BUTTON');
		cb.classList.add('btn-close');
		cb.addEventListener('click', this.close);
		this.container.appendChild(cb);
	}
	
	close() {
		this.container.remove();
		//eliminar l'objecte?
	}

}