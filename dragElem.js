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

const dragElem = {
	settings: {
		draggingAllowed: false,
		xPos: 0,
		yPos: 0
	},
	init(selector) {
		const s = document.querySelector(selector);
		s.addEventListener('mousedown', this.allowDragging.bind(this));
		s.addEventListener('touchstart', this.allowDragging.bind(this));
		s.addEventListener('mouseup', this.preventDragging.bind(this, s));
		s.addEventListener('touchend', this.preventDragging.bind(this, s));
		s.addEventListener('mousemove', this.drag.bind(this, s));
		s.addEventListener('touchmove', this.drag.bind(this, s));
		s.addEventListener('mouseleave', this.preventDragging.bind(this, s));
	},
	allowDragging(cords) {
		cords = cords.clientX !== undefined ? cords : cords.touches[0];
		this.settings.xPos = cords.clientX;
		this.settings.yPos = cords.clientY;
		return this.settings.draggingAllowed = true;
	},
	preventDragging(elem) {
		elem.style.transform = 'translateY(0) translateX(0)';
		this.settings.xPos = 0;
		this.settings.yPos = 0;
		this.settings.draggingAllowed = false;
	},
	drag(elem, cords) {
		cords = cords.clientX !== undefined ? cords : cords.touches[0];
		if (this.settings.draggingAllowed) {
			requestAnimationFrame(() => {
				elem.style.transform = `translateY(${Math.floor(cords.clientY - this.settings.yPos)}px) translateX(${Math.floor(cords.clientX - this.settings.xPos)}px)`;
			});
		}
	}
}
