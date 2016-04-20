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
		elem: undefined,
		parent: undefined,
		startCords: undefined,
		lastCords: {x: 0, y: 0},
		callBack: undefined
	},
	init(selector, cb) {
		this.settings.elem = document.querySelector(selector);
		this.settings.parent = document.querySelector(selector).parentElement;
		this.settings.parent.addEventListener('mousedown', this.enableDraging);
		this.settings.parent.addEventListener('touchstart', this.enableDraging);
		if (cb) {
			this.settings.callBack = cb;
		}
	},
	enableDraging(e) {
		dragelem.settings.startCords = e.clientY === undefined ? {x: e.touches[0].pageX, y: e.touches[0].pageY}	: {x: e.pageX, y: e.pageY};
		dragelem.settings.parent.addEventListener('mousemove', dragelem.drag);
		dragelem.settings.parent.addEventListener('touchmove', dragelem.drag);
		dragelem.settings.elem.style.willChange = 'transform';
		document.body.addEventListener('mouseup', dragelem.removeEventListeners);
		document.body.addEventListener('touchend', dragelem.removeEventListeners);
	},
	drag(e) {
		const cords = e.clientY === undefined ? e.touches[0] : e;
		const xCords = (cords.pageX - dragelem.settings.startCords.x) + dragelem.settings.lastCords.x;
		const yCords = (cords.pageY - dragelem.settings.startCords.y) + dragelem.settings.lastCords.y;
		
		e.preventDefault();
		requestAnimationFrame( () => dragelem.settings.elem.style.transform = `translateY(${yCords}px) translateX(${xCords}px)`);	
	},
	removeEventListeners(e) {
		const cords = e.clientY === undefined ? e.changedTouches[0] : e;
		
		dragelem.settings.parent.removeEventListener('mousemove', dragelem.drag);
		document.body.removeEventListener('mouseup', dragelem.removeEventListeners);
		document.body.removeEventListener('touchend', dragelem.removeEventListeners);
		dragelem.settings.parent.removeEventListener('touchmove', dragelem.drag);
		dragelem.settings.elem.style.willChange = '';
		dragelem.settings.lastCords.x += (cords.pageX - dragelem.settings.startCords.x);
		dragelem.settings.lastCords.y += (cords.pageY - dragelem.settings.startCords.y);

		if (dragelem.settings.callBack !== undefined) {
			dragelem.settings.callBack.call(dragelem.settings.elem, e);
		}
	}
};
