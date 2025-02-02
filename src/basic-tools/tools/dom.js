import Util from './util.js';

/**
 * Dom class - A collection of methods for manipulating content in a Document Object Model (DOM).
 * @class
 */
export default class Dom {
	
	/**
	* Retrieve an Element using a selector
	*
	* @param {HTML Element} pNode - the parent node where to begin the search
	* @param {string} selector - a selector statement
	* @returns {HTML Element} The Element found, null otherwise
	*/
	static Node(pNode, selector) {
		return pNode.querySelectorAll(selector).item(0) || null;
	}

	/**
	* Create an Element appended to specified parent node
	*
	* @param {string} tagName - the type of Element to be created (div, span, label, input, etc.)
	* @param {object} options - a dictionary type object containing the options to assign to the created Element
	* @param {HTML Element} pNode - the parent Element where the created Element will be apended
	* @returns {HTML Element} the Element created
	*/
	static Create(tagName, options, pNode) {
		var elem = document.createElement(tagName);
		
		Util.Mixin(elem, options);
		
		this.Place(elem, pNode);
		
		return elem
	}

	/**
	* Create an SVG Element and append it to parent node.
	*
	* @param {string} tagName - the type of SVG Element to be created (rect, path, etc.)
	* @param {object} options - a dictionary type object containing the options to assign to the created SVG Element
	* @param {HTML Element} pNode - the parent Element where the created SVG Element will be apended
	* @returns {HTML Element} The SVG Element created
	*/
	static CreateSVG(tagName, options, pNode) {
		var elem = document.createElementNS("http://www.w3.org/2000/svg", tagName);
		
		for (var id in options) elem.setAttribute(id, options[id]);
		
		this.Place(elem, pNode);
		
		return elem;
	}

	/**
	* Create an Element from a namespace
	*
	* Valid Namespaces are : 
	*	HTML : http://www.w3.org/1999/xhtml
	*	SVG  : http://www.w3.org/2000/svg
	*	XBL  : http://www.mozilla.org/xbl
	*	XUL  : http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
	*
	* @param {string} ns - the URI namespace containing the Element to create 
	* @param {string} tagName - the type of Element to be created (rect, path, etc.)
	* @param {object} options - a dictionary type object containing the options to assign to the created Element
	* @param {HTML Element} pNode - the parent Element where the created Element will be apended
	* @returns {HTML Element} The SVG Element created
	*/
	static CreateNS(ns, tagName, options, pNode) {
		var elem = document.createElementNS(ns, tagName);
		
		for (var id in options) elem.setAttribute(id, options[id]);
		
		this.Place(elem, pNode);
		
		return elem;
	}

	/**
	* Append an Element to another Element
	*
	* @param {HTML Element} elem - the Element to append
	* @param {HTML Element} pNode - the parent Element where the Element will be apended
	*/
	static Place(elem, pNode) {
		if (!!pNode) pNode.appendChild(elem);
	}

	/**
	* Remove all children of an Element
	*
	* @param {HTML Element} elem - The DOM Element being emptied
	*/
	static Empty(elem) {
		while (elem.firstChild) {
			elem.removeChild(elem.firstChild);
		}
	}

	/**
	* Add classes to an Element
	*
	* @param {HTML Element} elem - the Element to modify
	* @param {string} elemClasses - the class names to add to the Element
	*/
	static AddClasses(elem, elemClasses) {
		var c1 = elem.className.split(" ");
		
		elemClasses.split(" ").forEach(function(c) {
			if (c1.indexOf(c) == -1) c1.push(c);
		})
		
		elem.className = c1.join(" "); 
	}

	/**
	* Remove a class from an Element
	*
	* @param {HTML Element} elem - the Element to modify
	* @param {string} elemClass - the class to be removed from the Element
	*/
	static RemoveClass(elem, elemClass) {				
		var c1 = elem.className.split(" ");
		var c2 = elemClass.split(" ");
		
		elem.className = c1.filter(function(c) { return c2.indexOf(c) == -1; }).join(" ");
	}

	/**
	* Verify that an Element contains a class
	*
	* @param {HTML Element} elem - the Element to verify
	* @param {string} elemClass - the class to verify
	* @returns {boolean} true if the Element contains the class, false otherwise
	*/
	static HasClass(elem, elemClass) {
		return (' ' + elem.className + ' ').indexOf(' ' + elemClass + ' ') > -1;
	}

	/**
	* Set the class of an Element
	*
	* @param {HTML Element} elem - the Element to modify
	* @param {string} elemClass - set the class of the Element
	*/
	static SetClass(elem, elemClass) {
		elem.className = elemClass; 
	}

	/**
	* Toggle a class on or off for an Element
	*
	* @param {HTML Element} elem - the Element to modify
	* @param {string} elemClass - the class to add/remove from the Element
	* @param {boolean} enabled - true to add the class, or false to remove class
	*/
	static ToggleClass(elem, elemClass, enabled) {
		if (enabled) {
			this.AddClasses(elem, elemClass);
		} else {
			this.RemoveClass(elem, elemClass);
		}
	}
	
	/**
	* Get an attribute value from an Element
	*
	* @param {HTML Element} elem - the Element to retrieve the attribute from
	* @param {string} attr - the name of the attribute to retrieve
	* @returns {string} - the value of the attribute if found, null otherwise
	*/
	static GetAttribute(elem, attr) {
		var attr = elem.attributes.getNamedItem(attr);
		
		return attr ? attr.value : null;
	}
	
	/**
	* Set an attribute value on an Element
	*
	* @param {HTML Element} elem - the Element to set the attribute on
	* @param {string} attr - the name of the attribute to set
	* @param {string} value - the value of the attribute to set
	*/
	static SetAttribute(elem, attr, value) {
		elem.setAttribute(attr, value);
	}
	
	/**
	* Get the size of an Element
	*
	* @param {HTML Element} elem - the Element to retrieve the size
	* @returns {object} An object literal containing the size of the Element
	* { 
	*	w: width of the Element, 
	*	h: height of the Element 
	* }
	*/
	static Size(elem) {
		var style = window.getComputedStyle(elem);
		
		var h = +(style.getPropertyValue("height").slice(0, -2));
		var w = +(style.getPropertyValue("width").slice(0, -2));
		var pL = +(style.getPropertyValue("padding-left").slice(0, -2));
		var pR = +(style.getPropertyValue("padding-right").slice(0, -2));
		var pT = +(style.getPropertyValue("padding-top").slice(0, -2));
		var pB = +(style.getPropertyValue("padding-bottom").slice(0, -2));
		
		var w = w - pL - pR;
		var h = h - pT - pB;
		
		// Use smallest width as width and height for square grid that fits in container
		// var s = w < h ? w : h;
		
		return { w : w , h : h }
	}
	
	/**
	* Get the siblings of an Element
	*
	* @param {HTML Element} elem - the Element to retrieve the siblings
	* @returns {array} An array of elements containing the siblings of the input element
	*/
	static Siblings(elem) {
		var elements = [];
		
		for (var i = 0; i < elem.parentNode.children.length; i++) elements.push(elem.parentNode.children[i]);
		
		elements.splice(elements.indexOf(elem), 1);
		
		return elements;
	}
}