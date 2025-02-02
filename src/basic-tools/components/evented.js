import Util from '../tools/util.js';

/**
 * Evented class
 * @class
 */
export default class Evented { 

	constructor() {
		this.listeners = {};
	}

	addEventListener(type, callback, once){
		if (!(type in this.listeners)) this.listeners[type] = [];
		
		var h = { target:this, type:type, callback:callback, once:!!once };
		
		this.listeners[type].push(h);
		
		return h;
	}
	
	removeEventListener(type, callback){
		if (!(type in this.listeners)) return;

		var stack = this.listeners[type];

		for (var i = 0, l = stack.length; i < l; i++){
			if (stack[i].callback === callback){
				stack.splice(i, 1);
				
				return this.removeEventListener(type, callback);
			}
		}
	}
	
	dispatchEvent(event){
		if (!(event.type in this.listeners)) return;

		var stack = this.listeners[event.type];

		for (var i = 0; i < stack.length; i++) {
			stack[i].callback.call(this, event);
		}
		
		for (var i = stack.length - 1; i >= 0; i--) {
			if (!!stack[i].once) this.removeEventListener(event.type, stack[i].callback);
		}
	}
	
	Emit(type, data) {
		// Let base event properties be overwritten by whatever was provided.	
		var event = { bubbles:true, cancelable:true };
	
		Util.Mixin(event, data);
		
		// Use the type that was specifically provided, target is always this.
		event.type = type;
		event.target = this;
		
		this.dispatchEvent(event);
	}
	
	On(type, callback) {
		return this.addEventListener(type, callback, false);
	}

	Once(type, callback) {
		return this.addEventListener(type, callback, true);
	}

	Off(type, callback) {
		this.removeEventListener(type, callback);
	}
}