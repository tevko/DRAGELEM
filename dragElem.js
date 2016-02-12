/**
*
* ~~ DRAGELEM ~~
*
* A simple ES6 library that allows click/touch
* & drag on dom elements
*
* by @tevko
*
**/

window.dragelem = {
	settings: {
		draggingAllowed: false,
		xPos: 0,
		yPos: 0
	},
	init(selector, opts = {'stay' : false, 'accelerateHardware' : false}) {
		this.settings.opts = opts;
		const s = document.querySelector(selector);
		if (opts.accelrateHardware) {
			s.style.willChange = 'transform';
		}
		//mouse down or touch start
		s.addEventListener('mousedown', this.allowDragging.bind(this, s));
		s.addEventListener('touchstart', this.allowDragging.bind(this, s));
		//mouse or touch move
		s.addEventListener('mousemove', this.drag.bind(this, s));
		s.addEventListener('touchmove', this.drag.bind(this, s));
		s.addEventListener('mouseleave', this.preventDragging.bind(this, s));
		//mouseup or touch end
		document.body.addEventListener('mouseup', this.preventDragging.bind(this, s));
		document.body.addEventListener('touchend', this.preventDragging.bind(this, s))
	},
	allowDragging(elem, e) {
		const cords = e.clientY === undefined ? e.touches[0] : e;
		if (this.settings.opts.stay === false || elem.style.transform === '') {
			this.settings.xPos = cords.clientX;
			this.settings.yPos = cords.clientY;
		}
		this.settings.draggingAllowed = true;
	},
	preventDragging(elem, e) {
		if (this.settings.opts.stay === false) {
			if (elem !== document.body) {
				elem.style.transform = 'translateY(0) translateX(0)';
			}
			this.settings.xPos = 0;
			this.settings.yPos = 0;
		}
		this.settings.draggingAllowed = false;
	},
	drag(elem, e) {
		const cords = e.clientY === undefined ? e.touches[0] : e;
		if (this.settings.draggingAllowed) {
			requestAnimationFrame(() => {
				elem.style.transform = `translateY(${Math.floor(cords.clientY - this.settings.yPos)}px) translateX(${Math.floor(cords.clientX - this.settings.xPos)}px)`;
			});	
		}
	}
};
