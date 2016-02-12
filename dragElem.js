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
		yPos: 0,
		opts: undefined,
		elem: undefined
	},
	init(selector, opts = {'stay' : false, 'accelerateHardware' : false, 'callBack' : undefined}) {
		this.settings.opts = opts;
		this.settings.elem = document.querySelector(selector);
		if (opts.accelerateHardware) {
			this.settings.elem.style.willChange = 'transform';
		}
		//mouse down or touch start
		this.settings.elem.addEventListener('mousedown', this.allowDragging);
		this.settings.elem.addEventListener('touchstart', this.allowDragging);
	},
	allowDragging(e) {
		const cords = e.clientY === undefined ? e.touches[0] : e;
		if (dragelem.settings.opts.stay === false || dragelem.settings.elem.style.transform === '') {
			dragelem.settings.xPos = cords.clientX;
			dragelem.settings.yPos = cords.clientY;
		}
		dragelem.settings.draggingAllowed = true;
		//add all event listeners
		dragelem.settings.elem.addEventListener('mousemove', dragelem.drag);
		dragelem.settings.elem.addEventListener('touchmove', dragelem.drag);
		document.body.addEventListener('mouseup', dragelem.preventDragging);
		document.body.addEventListener('touchend', dragelem.preventDragging);
		dragelem.settings.elem.addEventListener('mouseleave', dragelem.preventDragging);
	},
	preventDragging(e) {
		if (dragelem.settings.opts.stay === false) {
			if (dragelem.settings.elem !== document.body) {
				dragelem.settings.elem.style.transform = 'translateY(0) translateX(0)';
			}
			dragelem.settings.xPos = 0;
			dragelem.settings.yPos = 0;
		}
		dragelem.settings.draggingAllowed = false;
		//remove all event listeners
		dragelem.settings.elem.removeEventListener('mousemove', dragelem.drag);
		dragelem.settings.elem.removeEventListener('touchmove',dragelem.drag);
		document.body.removeEventListener('mouseup', dragelem.preventDragging);
		document.body.removeEventListener('touchend', dragelem.preventDragging);
		dragelem.settings.elem.removeEventListener('mouseleave', dragelem.preventDragging);
		if (dragelem.settings.opts.callBack !== undefined) {
			dragelem.settings.opts.callBack.apply(dragelem.settings.elem);
		}
	},
	drag(e) {
		const cords = e.clientY === undefined ? e.touches[0] : e;
		requestAnimationFrame(() => {
			dragelem.settings.elem.style.transform = `translateY(${Math.floor(cords.clientY - dragelem.settings.yPos)}px) translateX(${Math.floor(cords.clientX - dragelem.settings.xPos)}px)`;
		});	
	}
};
