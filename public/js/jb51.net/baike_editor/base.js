//download by http://www.jb51.net
window.onerror = function() {
	return true
};
var Fe = Fe || {
	version: "20080809",
	emptyFn: function() {}
};
if (Object.prototype.propertyIsEnumerable) {
	Fe.propertyIsEnumerable = function(A, B) {
		return Object.prototype.propertyIsEnumerable.call(A, B)
	}
} else {
	Fe.propertyIsEnumerable = function(A, C) {
		if (C in A) {
			for (var B in A) {
				if (B == C) {
					return true
				}
			}
		}
		return false
	}
}
Fe.isArray = function(A) {
	return (A && typeof A.length == "number" && typeof A.splice != "undefined" && !Fe.propertyIsEnumerable(A, "length"))
};
Fe.isObject = function(A) {
	return (A && (typeof(A) == "object" || typeof(A) == "function")) || false
};
Fe.trim = function(A) {
	return A.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.format = function(I, K) {
	if (arguments.length > 1) {
		var E = Fe.format,
		H = /([.*+?^=!:${}()|[\]\/\\])/g,
		F = (E.left_delimiter || "{").replace(H, "\\$1"),
		A = (E.right_delimiter || "}").replace(H, "\\$1");
		var C = E._r1 || (E._r1 = new RegExp("#" + F + "([^" + F + A + "]+)" + A, "g")),
		B = E._r2 || (E._r2 = new RegExp("#" + F + "(\\d+)" + A, "g"));
		if (typeof(K) == "object") {
			return I.replace(C,
			function(L, N) {
				var M = K[N];
				if (typeof M == "function") {
					M = M(N)
				}
				return typeof(M) == "undefined" ? "": M
			})
		} else {
			if (typeof(K) != "undefined") {
				var J = Array.prototype.slice.call(arguments, 1);
				var D = J.length;
				return I.replace(B,
				function(L, M) {
					M = parseInt(M, 10);
					return (M >= D) ? L: J[M]
				})
			}
		}
	}
	return I
};
Fe.format.delimiter = function(C, A) {
	var B = Fe.format;
	B.left_delimiter = C || "{";
	B.right_delimiter = A || C || "}";
	B._r1 = B._r2 = null
};
Fe.each = function(E, A) {
	if (typeof A != "function") {
		return E
	}
	if (E) {
		if (E.length === undefined) {
			for (var B in E) {
				A.call(E[B], E[B], B)
			}
		} else {
			for (var C = 0,
			D = E.length; C < D; C++) {
				A.call(E[C], E[C], C)
			}
		}
	}
	return E
};
Fe.extend = function(F, D) {
	if (F && D && typeof(D) == "object") {
		for (var E in D) {
			F[E] = D[E]
		}
		var C = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
		for (var A = 0,
		B; A < C.length; A++) {
			B = C[A];
			if (Object.prototype.hasOwnProperty.call(D, B)) {
				F[B] = D[B]
			}
		}
	}
	return F
};
Fe.Browser = (function() {
	var C = navigator.userAgent;
	var H = 0,
	A = 0,
	F = 0,
	E = 0;
	var D = 0,
	I = 0,
	B = 0;
	if (typeof(window.opera) == "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(C)) {
		A = parseFloat(RegExp.$2)
	} else {
		if (/MSIE (\d+(\.\d+)?)/.test(C)) {
			H = parseFloat(RegExp.$1)
		} else {
			if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(C)) {
				E = parseFloat(RegExp.$2)
			} else {
				if (navigator.vendor == "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(C)) {
					B = parseFloat(RegExp.$2)
				} else {
					if (C.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(C)) {
						F = parseFloat(RegExp.$1)
					}
				}
			}
		}
	}
	if (C.indexOf("Gecko") > -1 && C.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(C)) {
		I = parseFloat(RegExp.$1)
	}
	return {
		ie: H,
		firefox: E,
		gecko: I,
		netscape: B,
		opera: A,
		safari: F
	}
})();
window.FeBrowser = Fe.Browser;
Fe.isGecko = (navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isStrict = (document.compatMode == "CSS1Compat");
Fe.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1: 0;
Fe.isFirefox = /Firefox(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$2: 0;
Fe.isSafari = (navigator.userAgent.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isWebkit = (navigator.userAgent.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isOpera = (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$2: 0;
Fe.G = function() {
	for (var A = [], B = arguments.length - 1; B > -1; B--) {
		var C = arguments[B];
		A[B] = null;
		if (typeof C == "object" && C && C.dom) {
			A[B] = C.dom
		} else {
			if ((typeof C == "object" && C && C.tagName) || C == window || C == document) {
				A[B] = C
			} else {
				if (typeof C == "string" && (C = document.getElementById(C))) {
					A[B] = C
				}
			}
		}
	}
	return A.length < 2 ? A[0] : A
};
Fe.Q = function(E, D, B) {
	if (typeof E != "string" || E.length <= 0) {
		return null
	}
	var J = [],
	B = (typeof B == "string" && B.length > 0) ? B.toLowerCase() : null,
	C = (Fe.G(D) || document);
	if (C.getElementsByClassName) {
		Fe.each(C.getElementsByClassName(E),
		function(K) {
			if (B !== null) {
				if (K.tagName.toLowerCase() == B) {
					J[J.length] = K
				}
			} else {
				J[J.length] = K
			}
		})
	} else {
		E = E.replace(/\-/g, "\\-");
		var A = new RegExp("(^|\\s{1,})" + Fe.trim(E) + "(\\s{1,}|$)"),
		H = (B === null) ? (C.all ? C.all: C.getElementsByTagName("*")) : C.getElementsByTagName(B),
		F = H.length,
		I = F;
		while (F--) {
			if (A.test(H[I - F - 1].className)) {
				J[J.length] = H[I - F - 1]
			}
		}
	}
	return J
};
Fe.hide = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = "none"
		}
	})
};
Fe.show = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = ""
		}
	})
};
Fe.toggle = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = A.style.display == "none" ? "": "none"
		}
	})
};
Fe.addClassName = function(C, D) {
	if (! (C = Fe.G(C))) {
		return
	}
	var A = C.className.split(" "),
	B = Fe.trim;
	if (!new RegExp("(^|\\s{1,})" + B(D) + "(\\s{1,}|$)").test(C.className)) {
		C.className = B(A.concat(D).join(" "))
	}
};
Fe.ac = Fe.addClassName;
Fe.removeClassName = function(B, C) {
	if (! (B = Fe.G(B))) {
		return
	}
	var A = Fe.trim,
	D = new RegExp("(^|\\s{1,})" + A(C) + "(\\s{1,}|$)", "g");
	B.className = A(B.className.replace(D, "$2"))
};
Fe.rc = Fe.removeClassName;
Fe.body = function() {
	var A = 0,
	J = 0,
	E = 0,
	C = 0,
	B = 0,
	K = 0;
	var F = window,
	D = document,
	I = D.documentElement;
	A = I.clientWidth || D.body.clientWidth;
	J = F.innerHeight || I.clientHeight || D.body.clientHeight;
	C = D.body.scrollTop || I.scrollTop;
	E = D.body.scrollLeft || I.scrollLeft;
	B = Math.max(D.body.scrollWidth, I.scrollWidth || 0);
	K = Math.max(D.body.scrollHeight, I.scrollHeight || 0, J);
	return {
		scrollTop: C,
		scrollLeft: E,
		documentWidth: B,
		documentHeight: K,
		viewWidth: A,
		viewHeight: J
	}
};
Fe.on = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C[B + A] = function() {
			A.call(C, window.event)
		};
		C.attachEvent("on" + B, C[B + A])
	} else {
		C.addEventListener(B, A, false)
	}
	return C
};
Fe.un = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C.detachEvent("on" + B, C[B + A]);
		C[B + A] = null
	} else {
		C.removeEventListener(B, A, false)
	}
	return C
};
Fe.css = function(C, H) {
	if (!C || !H) {
		return null
	}
	C = typeof C == "string" ? document.getElementById(C) : C;
	var B = !window.opera && navigator.userAgent.indexOf("MSIE") != -1;
	if (H == "float") {
		H = B ? "styleFloat": "cssFloat"
	}
	H = H.replace(/(-[a-z])/gi,
	function(I, J) {
		return J.charAt(1).toUpperCase()
	});
	if ("opacity" == H && B) {
		var A = C.style.filter;
		return A && A.indexOf("opacity=") >= 0 ? (parseFloat(A.match(/opacity=([^)]*)/)[1]) / 100) + "": "1"
	}
	var F = null;
	if (F = C.style[H]) {
		return F
	}
	if (C.currentStyle) {
		return C.currentStyle[H]
	} else {
		var E = C.nodeType == 9 ? C: C.ownerDocument || C.document;
		if (E.defaultView && E.defaultView.getComputedStyle) {
			var D = E.defaultView.getComputedStyle(C, "");
			if (D) {
				return D[H]
			}
		}
	}
	return null
};
if (!window.console || !console.firebug) {
	var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	window.console = (typeof window.loadFirebugConsole == "function") ? window.loadFirebugConsole() : {};
	for (var i = 0; i < names.length; ++i) {
		window.console[names[i]] = function() {}
	}
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("children",
	function() {
		for (var B = [], C = 0, E, D = 0, A = this.childNodes.length; D < A; D++) {
			E = this.childNodes[D];
			if (E.nodeType == 1) {
				B[C++] = E;
				if (E.name) {
					if (!B[E.name]) {
						B[E.name] = []
					}
					B[E.name][B[E.name].length] = E
				}
				if (E.id) {
					B[E.id] = E
				}
			}
		}
		return B
	})
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("currentStyle",
	function() {
		return this.ownerDocument.defaultView.getComputedStyle(this, null)
	})
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.insertAdjacentHTML = function(A, B) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		C = C.createContextualFragment(B);
		switch (A) {
		case "beforeBegin":
			this.parentNode.insertBefore(C, this);
			break;
		case "afterBegin":
			this.insertBefore(C, this.firstChild);
			break;
		case "beforeEnd":
			this.appendChild(C);
			break;
		case "afterEnd":
			if (!this.nextSibling) {
				this.parentNode.appendChild(C)
			} else {
				this.parentNode.insertBefore(C, this.nextSibling)
			}
			break
		}
	}
}
if (Fe.isFirefox && window.Event) {
	Event.prototype.__defineSetter__("returnValue",
	function(A) {
		if (!A) {
			this.preventDefault()
		}
		return A
	});
	Event.prototype.__defineSetter__("cancelBubble",
	function(A) {
		if (A) {
			this.stopPropagation()
		}
		return A
	});
	Event.prototype.__defineGetter__("srcElement",
	function() {
		var A = this.target;
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("fromElement",
	function() {
		var A;
		if (this.type == "mouseover") {
			A = this.relatedTarget
		} else {
			if (this.type == "mouseout") {
				A = this.target
			}
		}
		if (!A) {
			return
		}
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("toElement",
	function() {
		var A;
		if (this.type == "mouseout") {
			A = this.relatedTarget
		} else {
			if (this.type == "mouseover") {
				A = this.target
			}
		}
		if (!A) {
			return
		}
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("offsetX",
	function() {
		return this.layerX
	});
	Event.prototype.__defineGetter__("offsetY",
	function() {
		return this.layerY
	})
}
if (window.Document) {}
if (window.Node) {
	Node.prototype.replaceNode = function(A) {
		this.parentNode.replaceChild(A, this)
	};
	Node.prototype.removeNode = function(B) {
		if (B) {
			return this.parentNode.removeChild(this)
		} else {
			var A = document.createRange();
			A.selectNodeContents(this);
			return this.parentNode.replaceChild(A.extractContents(), this)
		}
	};
	Node.prototype.swapNode = function(B) {
		var C = this.nextSibling;
		var A = this.parentNode;
		node.parentNode.replaceChild(this, B);
		A.insertBefore(node, C)
	}
}
if (window.HTMLElement) {
	HTMLElement.prototype.__defineGetter__("all",
	function() {
		var A = this.getElementsByTagName("*");
		var B = this;
		A.tags = function(C) {
			return B.getElementsByTagName(C)
		};
		return A
	});
	HTMLElement.prototype.__defineGetter__("parentElement",
	function() {
		if (this.parentNode == this.ownerDocument) {
			return null
		}
		return this.parentNode
	});
	HTMLElement.prototype.__defineGetter__("children",
	function() {
		var C = [],
		A = 0,
		D;
		for (var B = 0; B < this.childNodes.length; B++) {
			D = this.childNodes[B];
			if (D.nodeType == 1) {
				C[A++] = D;
				if (D.name) {
					if (!C[D.name]) {
						C[D.name] = []
					}
					C[D.name][C[D.name].length] = D
				}
				if (D.id) {
					C[D.id] = D
				}
			}
		}
		return C
	});
	HTMLElement.prototype.__defineGetter__("currentStyle",
	function() {
		return this.ownerDocument.defaultView.getComputedStyle(this, null)
	});
	HTMLElement.prototype.__defineSetter__("outerHTML",
	function(B) {
		var A = this.ownerDocument.createRange();
		A.setStartBefore(this);
		var C = A.createContextualFragment(B);
		this.parentNode.replaceChild(C, this);
		return B
	});
	HTMLElement.prototype.__defineGetter__("outerHTML",
	function() {
		var A;
		var B = this.attributes;
		var D = "<" + this.tagName;
		for (var C = 0; C < B.length; C++) {
			A = B[C];
			if (A.specified) {
				D += " " + A.name + '="' + A.value + '"'
			}
		}
		if (!this.canHaveChildren) {
			return D + ">"
		}
		return D + ">" + this.innerHTML + "</" + this.tagName + ">"
	});
	HTMLElement.prototype.__defineGetter__("canHaveChildren",
	function() {
		switch (this.tagName.toLowerCase()) {
		case "area":
		case "base":
		case "basefont":
		case "col":
		case "frame":
		case "hr":
		case "img":
		case "br":
		case "input":
		case "isindex":
		case "link":
		case "meta":
		case "param":
			return false
		}
		return true
	});
	HTMLElement.prototype.__defineSetter__("innerText",
	function(B) {
		var A = document.createTextNode(B);
		this.innerHTML = A;
		return A
	});
	HTMLElement.prototype.__defineGetter__("innerText",
	function() {
		var A = this.ownerDocument.createRange();
		A.selectNodeContents(this);
		return A.toString()
	});
	HTMLElement.prototype.__defineSetter__("outerText",
	function(B) {
		var A = document.createTextNode(B);
		this.outerHTML = A;
		return A
	});
	HTMLElement.prototype.__defineGetter__("outerText",
	function() {
		var A = this.ownerDocument.createRange();
		A.selectNodeContents(this);
		return A.toString()
	});
	HTMLElement.prototype.attachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		B._ieEmuEventHandler = function(D) {
			window.event = D;
			return B()
		};
		this.addEventListener(A, B._ieEmuEventHandler, false)
	};
	HTMLElement.prototype.detachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		if (typeof(B._ieEmuEventHandler) == "function") {
			this.removeEventListener(A, B._ieEmuEventHandler, false)
		} else {
			this.removeEventListener(A, B, true)
		}
	};
	HTMLElement.prototype.contains = function(A) {
		do {
			if (A == this) {
				return true
			}
		} while ( A = A . parentNode );
		return false
	};
	HTMLElement.prototype.insertAdjacentElement = function(A, B) {
		switch (A) {
		case "beforeBegin":
			this.parentNode.insertBefore(B, this);
			break;
		case "afterBegin":
			this.insertBefore(B, this.firstChild);
			break;
		case "beforeEnd":
			this.appendChild(B);
			break;
		case "afterEnd":
			if (this.nextSibling) {
				this.parentNode.insertBefore(B, this.nextSibling)
			} else {
				this.parentNode.appendChild(B)
			}
			break
		}
	};
	HTMLElement.prototype.insertAdjacentHTML = function(B, D) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		var A = C.createContextualFragment(D);
		this.insertAdjacentElement(B, A)
	};
	HTMLElement.prototype.insertAdjacentText = function(B, C) {
		var A = document.createTextNode(C);
		this.insertAdjacentElement(B, A)
	};
	HTMLElement.prototype.attachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		B._ieEmuEventHandler = function(D) {
			window.event = D;
			return B()
		};
		this.addEventListener(A, B._ieEmuEventHandler, false)
	};
	HTMLElement.prototype.detachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		if (typeof(B._ieEmuEventHandler) == "function") {
			this.removeEventListener(A, B._ieEmuEventHandler, false)
		} else {
			this.removeEventListener(A, B, true)
		}
	}
}
var Fe = Fe || {
	version: "20080809",
	emptyFn: function() {}
};
Fe.Ajax = {};
Fe.Ajax.request = function(B, C, A) {
	if (typeof C == "object" && C) {
		A = C;
		C = null
	} else {
		if (typeof C == "function") {
			A = A || {};
			A.onsuccess = C;
			C = null
		}
	}
	var D = new FeAjax(A);
	D.request(B, C);
	return D
};
function FeAjax(B) {
	this.url = "";
	this.data = "";
	this.async = true;
	this.username = "";
	this.password = "";
	this.method = "GET";
	if (typeof B == "object" && B) {
		for (var A in B) {
			this[A] = B[A]
		}
	}
}
FeAjax.prototype.request = function(A, F) {
	var E = this,
	C = FeAjax._getPool(),
	H = C.xhr;
	C.active = true;
	E.url = A;
	if (typeof F == "string" && F) {
		E.data = F
	}
	if (typeof E.onexecute == "function") {
		E.onexecute(H)
	}
	try {
		if (!E.username) {
			H.open(E.method, E.url, E.async)
		} else {
			H.open(E.method, E.url, E.async, E.username, E.password)
		}
		if (E.async) {
			H.onreadystatechange = D
		}
		if (E.method.toUpperCase() == "POST") {
			H.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		}
		console.log(E.data);
		H.send(E.data)
	} catch(B) {
		if (typeof E.onerror == "function") {
			E.onerror(B)
		}
	}
	if (!E.async) {
		D()
	}
	function D() {
		if (H.readyState == 4) {
			try {
				H.status
			} catch(I) {
				if (typeof E.ondisconnect == "function") {
					E.ondisconnect(H)
				}
				C.active = false;
				return
			}
			if (typeof E["on" + H.status] == "function") {
				E["on" + H.status](H)
			}
			if (H.status == 200 && H.statusText.toLowerCase() == "ok") {
				if (typeof E.onsuccess == "function") {
					E.onsuccess(H)
				}
			} else {
				if (typeof E.onfailure == "function") {
					E.onfailure(H)
				}
			}
			C.active = false;
			H.onreadystatechange = function() {}
		}
	}
};
FeAjax._xhrpools = [];
FeAjax._getPool = function() {
	var C = this._xhrpools;
	for (var B = null,
	A = 0; A < C.length; A++) {
		B = C[A];
		if (!B.active) {
			break
		}
	}
	if (A >= C.length) {
		B = {
			active: false,
			xhr: FeAjax._getXhr()
		};
		C[C.length] = B
	}
	return B
};
FeAjax._getXhr = function() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else {
		if (window.ActiveXObject) {
			var C = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"];
			for (var B = 0; C[B]; B++) {
				try {
					return new ActiveXObject(C[B])
				} catch(A) {}
			}
			throw new Error("Your browser do not support XMLHttp")
		}
	}
};
Fe.Ajax.post = function(A, B, C) {
	return this.request(A, B, {
		method: "POST",
		onsuccess: C
	})
};
Fe.Ajax.get = function(A, B) {
	return this.request(A, B)
};
Fe.String = {};
Fe.String.parseQuery = function(D, C) {
	var B = new RegExp("(^|&|\\?|#)" + C + "=([^&]*)(&|$)", "i");
	var A = D.match(B);
	if (A) {
		return A[2]
	}
	return null
};
Fe.Ajax.sio = function(D, I) {
	if (!D || typeof D != "string") {
		throw new Error("invalid url parameter!")
	}
	var H = document.createElement("SCRIPT");
	var F = Fe.String.parseQuery(D, "callback");
	if (F === null) {
		var C = false;
		H.onreadystatechange = H.onload = function() {
			if (C) {
				return false
			}
			if (H.readyState == "loaded" || H.readyState == "complete") {
				C = true;
				try {
					I()
				} finally {
					if (H.parentNode) {
						H.parentNode.removeChild(H)
					}
					H.onreadystatechange = null;
					H.onload = null;
					H = null
				}
			}
		}
	} else {
		var B = "CB" + Math.floor(Math.random() * 2147483648).toString(36);
		D = D.replace(/(&|\?)callback=([^&]*)(&|$)/, "callback=" + B);
		window[B] = function() {
			try {
				var J = (I || window[F]);
				J.apply(null, arguments)
			} finally {
				if (H.parentNode) {
					H.parentNode.removeChild(H)
				}
				H = null;
				window[B] = null
			}
		}
	}
	H.src = D;
	H.type = "text/javascript";
	var E = document.getElementsByTagName("HEAD")[0];
	if (!E) {
		var A = document.getElementsByTagName("body")[0];
		E = document.createElement("head");
		A.parentNode.insertBefore(E, A)
	}
	E.insertBefore(H, E.firstChild)
};
var Fe = Fe || {
	version: "20080809",
	emptyFn: function() {}
};
Fe.path = "js/Dialog/";
Fe.inherit = function(I, D, B) {
	var H = I.prototype;
	var F = function() {};
	F.prototype = D.prototype;
	var E = I.prototype = new F();
	if (typeof B == "string") {
		E._className = B
	}
	for (var A in H) {
		E[A] = H[A]
	}
	I.prototype.constructor = H.constructor;
	H = null;
	return E
}; (function() {
	if (Fe.BaseClass) {
		return false
	}
	Fe._name = "%Fe%";
	window[Fe._name] = {};
	window[Fe._name].counter = 0;
	window[Fe._name].instances = {};
	Fe.BaseClass = function(A) {
		window[Fe._name].instances[(this.hashCode = (A || Fe.BaseClass.guid()))] = this
	};
	Fe.inherit(Fe.BaseClass, Object);
	Fe.BaseClass.guid = function() {
		return "MZ_" + (window[Fe._name].counter++).toString(36)
	};
	window.Instance = Fe.instance = Fe.I = function(A) {
		return window[Fe._name].instances[A]
	};
	Fe.BaseClass.prototype.dispose = function() {
		if (this.hashCode) {
			delete window[Fe._name].instances[this.hashCode]
		}
		for (var A in this) {
			if (typeof this[A] != "function") {
				delete this[A]
			}
		}
		if (navigator.userAgent.indexOf("MSIE") > 0 && !window.opera) {
			setTimeout(function() {
				CollectGarbage()
			},
			1)
		}
	};
	Fe.BaseClass.prototype.getHashCode = function() {
		if (!this.hashCode) {
			window[Fe._name].instances[(this.hashCode = Fe.BaseClass.guid())] = this
		}
		return this.hashCode
	};
	Fe.BaseClass.prototype.decontrol = function() {
		delete window[Fe._name].instances[this.hashCode]
	};
	Fe.BaseClass.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	}
})();
Fe.BaseEvent = function(A, B) {
	this.type = A;
	this.target = B || null;
	this.srcElement = this.currentTarget = null;
	this.returnValue = true
};
Fe.inherit(Fe.BaseEvent, Object, "Fe.BaseEvent");
Fe.BaseClass.prototype.addEventListener = function(D, C, B) {
	if (typeof C != "function") {
		throw ("addEventListener:" + C + " is not a function")
	}
	if (!this.__listeners) {
		this.__listeners = {}
	}
	var A = this.__listeners,
	E;
	if (typeof B == "string" && B) {
		if (/[^\w\-]/.test(B)) {
			throw ("nonstandard key:" + B)
		} else {
			C.hashCode = B;
			E = B
		}
	}
	if (D.indexOf("on") != 0) {
		D = "on" + D
	}
	if (typeof A[D] != "object") {
		A[D] = {}
	}
	E = E || Fe.BaseClass.guid();
	C.hashCode = E;
	A[D][E] = C
};
Fe.BaseClass.prototype.removeEventListener = function(C, B) {
	if (typeof B == "function") {
		B = B.hashCode
	} else {
		if (typeof B != "string") {
			return
		}
	}
	if (!this.__listeners) {
		this.__listeners = {}
	}
	if (C.indexOf("on") != 0) {
		C = "on" + C
	}
	var A = this.__listeners;
	if (!A[C]) {
		return
	}
	if (A[C][B]) {
		delete A[C][B]
	}
};
Fe.BaseClass.prototype.dispatchEvent = function(C) {
	if (!this.__listeners) {
		this.__listeners = {}
	}
	var B, A = this.__listeners,
	D = C.type;
	C.target = C.srcElement = C.target || C.srcElement || this;
	C.currentTarget = this;
	if (typeof this[D] == "function") {
		this[D](C)
	}
	if (typeof A[D] == "object") {
		for (B in A[D]) {
			if (typeof A[D][B] == "function") {
				A[D][B].call(this, C)
			}
		}
	}
	return C.returnValue
};
Fe.G = function() {
	for (var A = [], B = arguments.length - 1; B > -1; B--) {
		var C = arguments[B];
		A[B] = null;
		if (typeof C == "object" && C && C.dom) {
			A[B] = C.dom
		} else {
			if ((typeof C == "object" && C && C.tagName) || C == window || C == document) {
				A[B] = C
			} else {
				if (typeof C == "string" && (C = document.getElementById(C))) {
					A[B] = C
				}
			}
		}
	}
	return A.length < 2 ? A[0] : A
};
Fe.extend = function(F, D) {
	if (F && D && typeof(D) == "object") {
		for (var E in D) {
			F[E] = D[E]
		}
		var C = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
		for (var A = 0,
		B; A < C.length; A++) {
			B = C[A];
			if (Object.prototype.hasOwnProperty.call(D, B)) {
				F[B] = D[B]
			}
		}
	}
	return F
};
Fe.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1: 0;
Fe.trim = function(A) {
	return A.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.removeClassName = function(B, C) {
	if (! (B = Fe.G(B))) {
		return
	}
	var A = Fe.trim,
	D = new RegExp("(^|\\s{1,})" + A(C) + "(\\s{1,}|$)", "g");
	B.className = A(B.className.replace(D, "$2"))
};
Fe.rc = Fe.removeClassName;
Fe.addClassName = function(C, D) {
	if (! (C = Fe.G(C))) {
		return
	}
	var A = C.className.split(" "),
	B = Fe.trim;
	if (!new RegExp("(^|\\s{1,})" + B(D) + "(\\s{1,}|$)").test(C.className)) {
		C.className = B(A.concat(D).join(" "))
	}
};
Fe.ac = Fe.addClassName;
Fe.format = function(D, B) {
	D = String(D);
	if (B) {
		if ("object" == typeof B) {
			return D.replace(/#\{(.+?)\}/g,
			function(E, H) {
				var F = B[H];
				if ("function" == typeof F) {
					F = F(H)
				}
				return ("undefined" == typeof F ? "": F)
			})
		} else {
			var C = Array.prototype.slice.call(arguments, 1),
			A = C.length;
			return D.replace(/#\{(\d+)\}/g,
			function(F, E) {
				E = parseInt(E, 10);
				return (E >= A ? F: C[E])
			})
		}
	}
	return D
};
Fe.body = function() {
	var A = 0,
	J = 0,
	E = 0,
	C = 0,
	B = 0,
	K = 0;
	var F = window,
	D = document,
	I = D.documentElement;
	A = I.clientWidth || D.body.clientWidth;
	J = F.innerHeight || I.clientHeight || D.body.clientHeight;
	C = D.body.scrollTop || I.scrollTop;
	E = D.body.scrollLeft || I.scrollLeft;
	B = Math.max(D.body.scrollWidth, I.scrollWidth || 0);
	K = Math.max(D.body.scrollHeight, I.scrollHeight || 0, J);
	return {
		scrollTop: C,
		scrollLeft: E,
		documentWidth: B,
		documentHeight: K,
		viewWidth: A,
		viewHeight: J
	}
};
Fe.each = function(E, A) {
	if (typeof A != "function") {
		return E
	}
	if (E) {
		if (E.length === undefined) {
			for (var B in E) {
				A.call(E[B], E[B], B)
			}
		} else {
			for (var C = 0,
			D = E.length; C < D; C++) {
				A.call(E[C], E[C], C)
			}
		}
	}
	return E
};
Fe.show = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = ""
		}
	})
};
Fe.hide = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = "none"
		}
	})
};
Fe.on = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C[B + A] = function() {
			A.call(C, window.event)
		};
		C.attachEvent("on" + B, C[B + A])
	} else {
		C.addEventListener(B, A, false)
	}
	return C
};
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.insertAdjacentHTML = function(A, B) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		C = C.createContextualFragment(B);
		switch (A) {
		case "beforeBegin":
			this.parentNode.insertBefore(C, this);
			break;
		case "afterBegin":
			this.insertBefore(C, this.firstChild);
			break;
		case "beforeEnd":
			this.appendChild(C);
			break;
		case "afterEnd":
			if (!this.nextSibling) {
				this.parentNode.appendChild(C)
			} else {
				this.parentNode.insertBefore(C, this.nextSibling)
			}
			break
		}
	}
}
Fe.Dom = {};
Fe.Dom.loadCssFile = function(C, E) {
	if (/\w+\.\w+(\?|$)/.test(C)) {
		if (! (typeof(E) == "string" && E !== "")) {
			E = "BdCss_" + C.replace(/\W/g, "")
		}
		var D = document.createElement("LINK");
		D.href = C;
		D.id = E;
		D.type = "text/css";
		D.rel = "Stylesheet";
		var B = document.getElementsByTagName("HEAD")[0];
		if (!B) {
			var A = document.getElementsByTagName("body")[0];
			B = document.createElement("head");
			A.parentNode.insertBefore(B, A)
		}
		B.insertBefore(D, B.firstChild)
	}
};
Fe.Dialog = new Fe.BaseClass();
Fe.Dialog.cssFilePath = Fe.path + "FeDialog.css";
Fe.Dialog.defaultValue = {
	active: false,
	resizable: false,
	help: false,
	font: "normal 12px sans-serif",
	title: "Fe.Dialog",
	width: "",
	height: "",
	autofit: false,
	content: "&nbsp;",
	overflow: "visible",
	position: "center",
	titlebar: true,
	scrolling: "auto",
	buttonbar: false,
	statusbar: false,
	resizable: false,
	controlbar: true,
	buttonClose: true,
	contentType: "HTMLString",
	buttonAccept: false,
	buttonCancel: false,
	buttonbarAlign: "right",
	buttonAcceptValue: "\u786e \u5b9a",
	buttonCancelValue: "\u53d6 \u6d88",
	__listeners: null,
	onclose: null,
	onhelp: null,
	oncancel: null,
	onaccept: null,
	onopen: null
};
Fe.extend(Fe.Dialog, Fe.Dialog.defaultValue);
Fe.Dialog.render = function(B, C) {
	if ("undefined" != typeof(B)) {
		this.content = B
	}
	if ("object" == typeof(C)) {
		Fe.extend(this, C)
	}
	if ("number" == typeof(this.width)) {
		this.width += "px"
	}
	if ("number" == typeof(this.height)) {
		this.height += "px"
	}
	var A = this;
	A.show(this);
	if (this.buttonbar && this.buttonAccept) {
		Fe.G("FeDialogButtonAccept_" + A.hashCode).focus()
	}
	if (this.locked) {
		BdLockWindow.lock({
			opacity: 0.4,
			backgroundColor: "#FFFFFF",
			zIndex: (52000 - 10)
		});
		this.addEventListener("onclose",
		function() {
			BdLockWindow.unlock()
		})
	}
	setTimeout(function() {
		A.dispatchEvent(new Fe.BaseEvent("onopen"))
	},
	10)
};
Fe.Dialog.png = function() {
	return (Fe.isIE >= 7 || Fe.isIE <= 0)
}; (function() {
	Fe.Dom.loadCssFile(Fe.Dialog.cssFilePath, "CSS_Fe.Dialog");
	var A = ["<div ", 'id="FeDialog_#{0}" ', 'class="FeDialog focused_" ', 'style="position:absolute;z-index:52000;display:none" ', "onclick=\"Fe.I('#{0}').click(event)\">", '<div class="FeDialog_inner', (Fe.Dialog.png() ? " png_": ""), '">', '<table class="FeDialog_wrapper" border="0" cellpadding="0" cellspacing="0">', '<tr class="top_">', '<td class="left_ corner_">&nbsp;</td>', '<td class="center_ vertical_">&nbsp;</td>', '<td class="right_ corner_">&nbsp;</td>', "</tr>", '<tr class="middle_">', '<td class="left_ horizontal_">&nbsp;</td>', '<td class="center_ midland_">', '<div class="FeDialog_container">', '<div id="FeDialogCaption_#{0}" class="FeDialogCaption" onselectstart="return false">', '<div id="FeDialogControlBar_#{0}" class="FeDialogControlBar">', '<a id="FeDialogButtonClose_#{0}" class="close_" href="#" onfocus="this.blur();" onclick="Fe.I(\'#{0}\').close(); return false;">', '<img alt="close" src="', Fe.path, 'blank.gif" />', "</a>", "</div>", '<div id="FeDialogCaptionText_#{0}" class="FeDialogCaptionText">FeDialog</div>', "</div>", '<div id="FeDialogContent_#{0}" class="FeDialogContent">&nbsp;</div>', '<div id="FeDialogButtonBar_#{0}" class="FeDialogButtonBar">', '<input id="FeDialogButtonAccept_#{0}" type="button" value="\u786e \u5b9a" onclick="Fe.I(\'#{0}\').accept()" class="accept_" />', '<input id="FeDialogButtonCancel_#{0}" type="button" value="\u53d6 \u6d88" onclick="Fe.I(\'#{0}\').cancel()" class="cancel_" />', "</div>", '<div id="FeDialogStatusBar_#{0}" class="FeDialogStatusBar" style="display:none">&nbsp;</div>', "</div>", "</td>", '<td class="right_ horizontal_">&nbsp;</td>', "</tr>", '<tr class="bottom_">', '<td class="left_ corner_">&nbsp;</td>', '<td class="center_ vertical_">&nbsp;</td>', '<td class="right_ corner_">&nbsp;</td>', "</tr>", "</table>", "</div>", "</div>"];
	A = Fe.format(A.join(""), Fe.Dialog.hashCode);
	if (document.body) {
		document.body.insertAdjacentHTML("afterBegin", A)
	} else {
		document.write(A)
	}
})();
Fe.Dialog.show = function(op) {
	var me = this;
	function _(id) {
		return Fe.G(id + "_" + me.hashCode)
	}
	if (op.icon) {
		_("FeDialogCaption").style.background = "url(" + op.icon + ") no-repeat left 3px";
		_("FeDialogCaptionText").style.paddingLeft = "18px"
	}
	_("FeDialog").style.font = op.font;
	_("FeDialogCaptionText").innerHTML = op.title;
	_("FeDialogCaption").style.display = op.titlebar ? "": "none";
	_("FeDialogStatusBar").style.display = op.statusbar ? "": "none";
	_("FeDialogControlBar").style.display = op.controlbar ? "": "none";
	_("FeDialogButtonBar").style.display = op.buttonbar ? "": "none";
	_("FeDialogButtonClose").style.display = op.buttonClose ? "": "none";
	_("FeDialogButtonAccept").style.display = op.buttonAccept ? "": "none";
	_("FeDialogButtonCancel").style.display = op.buttonCancel ? "": "none";
	_("FeDialogButtonBar").style.textAlign = op.buttonbarAlign;
	_("FeDialogButtonAccept").value = op.buttonAcceptValue;
	_("FeDialogButtonCancel").value = op.buttonCancelValue;
	with(_("FeDialogContent").style) {
		width = op.width;
		height = op.height;
		overflow = op.overflow
	}
	if (op.contentType.toLowerCase() == "htmlelement" && !Fe.G(op.content)) {
		op.contentType = "HTMLString"
	}
	switch (op.contentType.toLowerCase()) {
	case "htmlstring":
		_("FeDialogContent").innerHTML = op.content;
		break;
	case "htmlelement":
		var e = Fe.G(op.content);
		this.opContentDisplay = e.style.display;
		e.insertAdjacentHTML("beforeBegin", "<input type='button' id='FeDialogFactoryInset_" + this.hashCode + "' style='width:" + e.offsetWidth + "px; height:" + e.offsetHeight + "px; padding:0; margin:0; border:none; visibility:hidden' />");
		_("FeDialogContent").innerHTML = "";
		e.style.display = "";
		_("FeDialogContent").appendChild(e);
		break;
	default:
		_("FeDialogContent").innerHTML = "<iframe frameborder='0' allowTransparency='true' scrolling='" + op.scrolling + "' id='FeDialogIframe_" + this.hashCode + "' name='FeDialog_" + this.hashCode + "' style='width:" + (op.width || "100%") + "; height:" + (op.height || "100%") + "' src='" + op.content + "'></iframe>";
		break
	}
	var a = Fe.trim(op.position).toLowerCase().split(/\s/);
	var body = Fe.body();
	Fe.show("FeDialog_" + this.hashCode);
	if (Fe.isIE && _("FeDialogContent").offsetWidth < 136) {
		_("FeDialogContent").style.width = "130px"
	}
	if (Fe.isIE && _("FeDialogContent").offsetHeight < 50) {
		_("FeDialogContent").style.height = "50px"
	}
	var top = (Math.max(parseInt((body.viewHeight - _("FeDialog").offsetHeight) / 2), 0) + body.scrollTop) + "px";
	var left = (Math.max(parseInt((body.viewWidth - _("FeDialog").offsetWidth) / 2), 0) + body.scrollLeft) + "px";
	if (a.length == 1) {
		if (a[0] == "" || a[0] == "center") {} else {
			if (a[0] == "top") {
				top = body.scrollTop + "px"
			} else {
				if (a[0] == "bottom") {
					top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight) + "px"
				} else {
					if (a[0] == "left") {
						left = body.scrollLeft + "px"
					} else {
						if (a[0] == "right") {
							left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth) + "px"
						} else {
							if (/\d+%/.test(a[0])) {
								top = a[0]
							} else {
								if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[0])) {
									top = parseInt(RegExp.$1) + RegExp.$2 || "px"
								}
							}
						}
					}
				}
			}
		}
	} else {
		if (a.length > 1) {
			if (/\d+%/.test(a[0])) {
				top = a[0]
			} else {
				if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[0])) {
					top = parseInt(RegExp.$1) + RegExp.$2 || "px"
				}
			}
			if (/\d+%/.test(a[1])) {
				left = a[1]
			} else {
				if (/(\d+)(cm|mm|in|pt|pc|px|em|ex)?/.test(a[1])) {
					left = parseInt(RegExp.$1) + RegExp.$2 || "px"
				}
			}
			if (a[0] == "top" || a[1] == "top") {
				top = body.scrollTop + "px"
			}
			if (a[0] == "bottom" || a[1] == "bottom") {
				top = (body.scrollTop + body.viewHeight - _("FeDialog").offsetHeight) + "px"
			}
			if (a[0] == "left" || a[1] == "left") {
				left = body.scrollLeft + "px"
			}
			if (a[0] == "right" || a[1] == "right") {
				left = (body.scrollLeft + body.viewWidth - _("FeDialog").offsetWidth) + "px"
			}
		}
	}
	_("FeDialog").style.top = top;
	_("FeDialog").style.left = left;
	this.active = true
};
Fe.Dialog.hide = function(D) {
	Fe.hide("FeDialog_" + this.hashCode);
	Fe.extend(Fe.Dialog, Fe.Dialog.defaultValue);
	var B = this;
	if (Fe.G("FeDialogFactoryInset_" + B.hashCode)) {
		var C = Fe.G("FeDialogFactoryInset_" + B.hashCode);
		var A = Fe.G("FeDialogContent_" + B.hashCode).childNodes[0];
		C.parentNode.insertBefore(A, C);
		C.parentNode.removeChild(C);
		A.style.display = B.opContentDisplay
	}
	if ("function" == typeof(D)) {
		D(B)
	}
	setTimeout(function() {
		B.active = false;
		B.setContent("&nbsp;");
		var E = Fe.G("FeDialogContent_" + B.hashCode);
		if (E) {
			E.style.width = E.style.height = E.style.overflow = ""
		}
	},
	50);
	clearTimeout(this.timer)
};
Fe.Dialog.setContent = function(A) {
	Fe.G("FeDialogContent_" + this.hashCode).innerHTML = A
};
Fe.Dialog.setCaption = function(A) {
	Fe.G("FeDialogCaptionText_" + this.hashCode).value = A
};
Fe.Dialog.setWidth = function(A) {
	Fe.G("FeDialogContent_" + this.hashCode).style.width = A
};
Fe.Dialog.setHeight = function(A) {
	Fe.G("FeDialogContent_" + this.hashCode).style.height = A
};
Fe.Dialog.getIframe = function() {
	return Fe.G("FeDialogIframe_" + this.hashCode)
};
Fe.Dialog.accept = function() {
	var A = new Fe.BaseEvent("onaccept");
	this.dispatchEvent(A);
	if (!A.returnValue) {
		return
	}
	this.close()
};
Fe.Dialog.cancel = function() {
	var A = new Fe.BaseEvent("oncancel");
	this.dispatchEvent(A);
	if (!A.returnValue) {
		return
	}
	this.close()
};
Fe.Dialog.help = function() {
	this.dispatchEvent(new Fe.BaseEvent("onhelp"))
};
if (Fe.isIE && Fe.isIE < 7) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch(e) {}
}
Fe.Dialog.close = function() {
	var A = this,
	B = new Fe.BaseEvent("onclose");
	A.dispatchEvent(B);
	if (!B.returnValue) {
		return
	}
	this.hide()
};
Fe.Dialog.open = function(A, B) {
	this.render(A, B);
	return this
};
Fe.Dialog.alert = function(A, B) {
	return this.open(A, Fe.extend({
		buttonbar: true,
		buttonAccept: true
	},
	B || {}))
};
Fe.Dialog.confirm = function(A, B) {
	return this.open(A, Fe.extend({
		locked: true,
		buttonbar: true,
		buttonAccept: true,
		buttonCancel: true
	},
	B || {}))
};
Fe.Dialog.showModalDialog = function(A, B) {
	return this.open(A, Fe.extend({
		locked: true,
		position: "center"
	},
	B || {}))
};
Fe.Dialog.submit = function(B, D) {
	var A = this.open("about:blank", Fe.extend({
		contentType: "page"
	},
	D || {}));
	var C = B.target;
	B.target = A.getIframe().name;
	B.submit();
	B.target = C;
	return A
};
Fe.Dialog.setStatus = function(A) {
	Fe.G("FeDialogStatusText_" + this.hashCode).innerHTML = A
};
Fe.Dialog.click = function(A) { (window.event || A).cancelBubble = true
};
Fe.Dialog.resizeBy = function() {
	var E = this,
	C = "FeDialogLayer_" + this.hashCode;
	Fe.G("FeDialogBgLayer_" + this.hashCode).style.width = Fe.G(C).offsetWidth + "px";
	Fe.G("FeDialogBgLayer_" + this.hashCode).style.height = Fe.G(C).offsetHeight + "px";
	if (Fe.isIE && Fe.G("FeDialogBgLayer_" + this.hashCode)) {
		if (Fe.isIE < 5.5) {
			Fe.G("FeDialogLayer_" + this.hashCode).style.width = "130px";
			Fe.G("FeDialog_" + this.hashCode).style.width = Fe.G("FeDialogLayer_" + this.hashCode).offsetWidth + "px"
		}
		var D = Fe.G("FeDialogBgLayer_" + this.hashCode);
		if (D.rows[0].cells[0].currentStyle) {
			var B = parseInt(D.rows[0].cells[0].currentStyle.height);
			var A = parseInt(D.rows[2].cells[0].currentStyle.height);
			if (!isNaN(B) && !isNaN(A)) {
				D.rows[1].cells[1].style.height = (Math.max(Fe.G(C).offsetHeight - B - A, 12)) + "px"
			}
		}
	}
	if (window.opera && Fe.G("FeDialogLayerTable_" + this.hashCode).offsetWidth < 130) {
		Fe.G("FeDialogLayerTable_" + this.hashCode).style.width = "130px"
	}
	this.timer = setTimeout(function() {
		E.resizeBy()
	},
	50)
};
Fe.on(document.body, "onkeydown",
function(C) {
	var B = C.target || C.srcElement;
	if (!B) {
		return false
	}
	if (B.tagName.toLowerCase() == "textarea") {
		return false
	}
	var A = C.which || C.keyCode;
	if (Fe.Dialog.active) {
		if (A == 27) {
			Fe.Dialog.cancel()
		} else {
			if (A == 13) {
				Fe.Dialog.accept();
				try {
					C.keyCode = 0
				} catch(D) {}
				C.returnValue = false
			}
		}
	}
});
Fe.un = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C.detachEvent("on" + B, C[B + A]);
		C[B + A] = null
	} else {
		C.removeEventListener(B, A, false)
	}
	return C
};
function BdLockWindow() {
	this.initialize()
}
BdLockWindow.prototype.initialize = function() {
	var B = BdLockWindow.element = document.createElement("DIV");
	B.id = BdLockWindow.id;
	var A = B.style;
	A.zIndex = 1;
	A.top = "0px";
	A.left = "0px";
	A.width = "100%";
	A.height = "100%";
	A.border = "none";
	A.display = "none";
	A.margin = 0;
	A.padding = 0;
	A.position = "absolute";
	A.backgroundColor = "#666699";
	A.backgroundImage = "url(" + Fe.path + "blank.gif)";
	document.body.insertBefore(B, document.body.firstChild);
	BdLockWindow.onResize()
};
BdLockWindow.onResize = function() {
	BdLockWindow.element.style.width = "100%";
	BdLockWindow.element.style.height = "100%";
	setTimeout(function() {
		var B = Fe.body();
		var A = B.documentWidth;
		var C = B.documentHeight;
		BdLockWindow.element.style.width = A + "px";
		BdLockWindow.element.style.height = C + "px"
	},
	10)
};
BdLockWindow._restore = function(A) {
	var C = document.getElementsByTagName(A);
	for (var B = C.length - 1; B > -1; B--) {
		C[B].style.visibility = C[B].getAttribute("att_BdLockWindow_v") || "";
		C[B].removeAttribute("att_BdLockWindow_v")
	}
};
BdLockWindow._safeguard = function(A) {
	var C = document.getElementsByTagName(A);
	for (var B = C.length - 1; B > -1; B--) {
		C[B].setAttribute("att_BdLockWindow_v", C[B].style.visibility, 0);
		C[B].style.visibility = "hidden"
	}
};
BdLockWindow.id = "BdLockWindow_" + new Date().getTime().toString(36);
BdLockWindow.lock = function(C) {
	var F = this;
	if (!F.instance) {
		F.instance = new BdLockWindow()
	}
	Fe.show(F.id);
	Fe.on(window, "onresize", F.onResize);
	var E = F.element.style;
	F.onResize();
	var H = Fe.extend({
		zIndex: 1,
		opacity: 0.5
	},
	C || {});
	E.zIndex = H.zIndex;
	E.backgroundColor = H.backgroundColor || "#666699";
	if ("opacity" in E) {
		E.opacity = H.opacity
	} else {
		if ("MozOpacity" in E) {
			E.MozOpacity = H.opacity
		} else {
			if ("filter" in E) {
				E.filter = (E.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (H.opacity == 1 ? "": "alpha(opacity=" + H.opacity * 100 + ")");
				E.zoom = 1
			}
		}
	}
	for (var B = ["SELECT", "OBJECT", "EMBED"], D = 0, A = B.length; D < A; D++) {
		this._safeguard(B[D])
	}
};
BdLockWindow.unlock = function() {
	if (!this.instance) {
		this.instance = new BdLockWindow();
		return
	}
	Fe.hide(this.id);
	Fe.un(window, "onresize", this.onResize);
	for (var B = ["SELECT", "OBJECT", "EMBED"], C = 0, A = B.length; C < A; C++) {
		this._restore(B[C])
	}
};
var userTracker = {
	request: getXMLHttpRequest(),
	beginTime: 0,
	sid: null,
	urlStr: "/stat/stat=1",
	lemmaContent: null,
	navigatorName: getNavigatorName()
};
var clicks = new Object();
userTracker.urlStr += getParam("navigator", userTracker.navigatorName);
if (window.attachEvent) {
	window.attachEvent("onload", statInitial);
	window.attachEvent("onunload", onPageClose)
} else {
	window.addEventListener("load", statInitial, false);
	window.addEventListener("beforeunload", onPageClose, false)
}
function lemmaCreateEditEnd() {
	if (isLemmaCreatePage() == true || isLemmaEditPage() == true) {
		userTracker.lemmaContent = getLemmaContent();
		var A = userTracker.lemmaContent ? userTracker.lemmaContent.length: 0;
		userTracker.urlStr += getParam("afterlemmacontentlen", A);
		userTracker.urlStr += getParam("aftelemmatitlecount", getSubstrCount(userTracker.lemmaContent, "[title]"))
	}
}
function onPageClose() {
	lemmaCreateEditEnd();
	var B = window.location.href;
	userTracker.urlStr += getParam("refer", B);
	for (var A in clicks) {
		userTracker.urlStr += getParam(A, clicks[A])
	}
	var C = getStayTime();
	userTracker.urlStr += getParam("staytime", C);
	userTracker.sid = getSID();
	userTracker.urlStr += getParam("sid", userTracker.sid);
	userTracker.urlStr = userTracker.urlStr.replace(/\#/g, "");
	sendRequest(userTracker.urlStr, null, "GET", null)
}
function getNavigatorName() {
	if (navigator.userAgent.indexOf("MSIE") != -1) {
		return "MSIE"
	} else {
		if (navigator.userAgent.indexOf("Firefox") != -1) {
			return "Firefox"
		} else {
			return "other"
		}
	}
}
function getSubstrCount(C, B) {
	if (!C || !B) {
		return 0
	}
	var D = -1;
	var A = 0;
	while ((D = C.indexOf(B, D + 1)) != -1) {
		A++
	}
	return A
}
function statInitial() {
	userTracker.beginTime = new Date();
	if (isLemmaEditPage() == true || isLemmaCreatePage() == true) {
		userTracker.lemmaContent = getLemmaContent();
		var A = userTracker.lemmaContent ? userTracker.lemmaContent.length: 0;
		userTracker.urlStr += getParam("beforelemmacontentlen", A);
		userTracker.urlStr += getParam("beforelemmatitlecount", getSubstrCount(userTracker.lemmaContent, "[title]"))
	}
	registerListeners("STAT_ONCLICK_SUBMIT_LEMMA", "onclick", onclickLemmaSubmitListener);
	registerListeners("STAT_ONCLICK_SUBMIT_UC_WAITAUDIT", "onclick", onclickASubmitListener);
	registerListeners("STAT_ONCLICK_SUBMIT_UC_UNPASS", "onclick", onclickASubmitListener);
	registerListeners("STAT_ONCLICK_SUBMIT_UC_PASS", "onclick", onclickASubmitListener);
	registerListeners("STAT_ONCLICK_UNSUBMIT_CATALOG", "onclick", onclickListener);
	registerListeners("STAT_ONCLICK_UNSUBMIT_CATALOG_RETURN", "onclick", onclickListener);
	registerListeners("STAT_ONCLICK_VIEW_COMMENT", "onclick", onclickListener)
}
function onclickLemmaSubmitListener() {
	userTracker.urlStr += getParam("lemmasubmit", "true")
}
function getSeconds(B, A) {
	return Math.round((B.getTime() - A.getTime()) / 1000)
}
function isLemmaCreatePage() {
	return (window.location.href.indexOf("/search_noitem/?word") == -1 && window.location.href.indexOf("/creat/") == -1) ? false: true
}
function isLemmaEditPage() {
	return window.location.href.indexOf("/edit/") == -1 ? false: true
}
function getLemmaContent() {
	if (isLemmaEditPage() == false && isLemmaCreatePage() == false) {
		return null
	}
	var A = editor.getContent();
	if (A) {
		return A
	}
	return null
}
function getLemmaContentLen() {
	var A = getLemmaContent();
	return A == null ? 0 : A.length
}
function getStayTime() {
	return Math.round(((new Date()).getTime() - userTracker.beginTime.getTime()) / 1000)
}
function getEventSource(B) {
	var A;
	if (userTracker.navigatorName == "MSIE") {
		A = window.event.srcElement
	} else {
		A = B.target
	}
	return A
}
function getParam(A, B) {
	return "$" + A + "=" + B
}
function onclickASubmitListener(B) {
	var A = getEventSource(B);
	if (A.href && A.href.lastIndexOf("#") == -1) {
		userTracker.urlStr += getParam("href", A.href);
		userTracker.urlStr += getParam("sourceid", A.id)
	}
}
function onclickListener(B) {
	var A = getEventSource(B);
	if (!clicks[A.id]) {
		clicks[A.id] = 1
	} else {
		clicks[A.id]++
	}
}
function registerListeners(A, B, C) {
	observers = document.getElementsByName(A);
	if (!observers || observers.length <= 0) {
		return false
	}
	for (i = 0; i < observers.length; i++) {
		Fe.on(observers[i], B, C);
		observers[i].setAttribute("id", A + "_" + i)
	}
	return true
}
function getSID() {
	var A = "anonymous";
	if (document.cookie) {
		var B = document.cookie.indexOf("BDUSS");
		if (B != -1) {
			var C = document.cookie.indexOf(";", B);
			A = C == -1 ? document.cookie.substr(B + 6) : document.cookie.substr(B + 6, C - B - 6)
		}
	}
	return A + "_" + Math.round(Math.random() * 2147483637) + "_" + (new Date()).getTime()
}
function getXMLHttpRequest() {
	var A;
	if (window.XMLHttpRequest) {
		A = new XMLHttpRequest()
	} else {
		if (window.ActiveXObject) {
			A = new ActiveXObject("Microsoft.XMLHTTP")
		}
	}
	return A
}
function sendRequest(A, B, D, C) {
	if (!userTracker.request) {
		return false
	}
	if (!D) {
		D = "GET"
	}
	userTracker.request.open(D, A, false);
	userTracker.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	userTracker.request.send(B);
	return false
}
function imageResize(B, H, F, C) {
	if (B.width <= H && B.height <= F) {
		return
	}
	if (B.width > 0 && B.height > 0) {
		var A = B.width;
		var E = B.height;
		var D = Math.min(H / A, F / E);
		B.style.height = "";
		B.style.width = "";
		B.height = Math.ceil(E * D);
		B.width = Math.ceil(A * D);
		if (C) {
			B.style.marginTop = ((F - B.height) / 2) + "px"
		}
	} else {
		B.style.height = "";
		B.style.width = "";
		B.style.width = H;
		B.style.height = F
	}
}
function picLoaded(B, A) {
	if (B.height > A) {
		var D = A / B.height;
		var C = B.width;
		B.width = C * D;
		B.height = A
	}
	if (B.width > 0) {
		B.parentNode.parentNode.style.width = (B.width + 6) + "px"
	}
}
function formatonlinpic(E, D, C) {
	var F = document.getElementsByName(E);
	for (var A = 0; A < F.length; A++) {
		if (F[A].width > 0 && F[A].height > 0) {
			var B = (D / F[A].width < C / F[A].height) ? D / F[A].width: C / F[A].height;
			if (B <= 1) {
				F[A].width = F[A].width * B
			}
		}
	}
}
function formatPic(A) {
	for (var B in A) {
		var J = A[B].width;
		var K = A[B].height;
		var H = A[B].valign;
		var C = document.getElementsByName(B);
		for (var D = 0; D < C.length; D++) {
			var I = C[D].width;
			var E = C[D].height;
			if (I > 0 && E > 0) {
				var F = Math.min(J / I, K / E);
				if (F <= 1) {
					C[D].width = I * F;
					C[D].height = E * F
				}
				if (H == 1) {
					C[D].style.marginTop = (K - C[D].height) / 2 + "px"
				}
			}
		}
	}
}
function imageFullSize(A) {
	A.style.height = "auto";
	A.style.width = "auto"
}
function adjustDiv(B, E, D, A, C) {
	imageResize(B, D, A, C);
	setTimeout(function() {
		if (Fe.G(E)) {
			if (Fe.G(E).innerHTML.length <= 0) {
				Fe.G(E).parentNode.removeChild(Fe.G(E))
			} else {
				Fe.G(E).style.width = B.width + "px"
			}
		}
	},
	40)
}
var Fe = Fe || {
	version: "20080809",
	emptyFn: function() {}
};
if (Object.prototype.propertyIsEnumerable) {
	Fe.propertyIsEnumerable = function(A, B) {
		return Object.prototype.propertyIsEnumerable.call(A, B)
	}
} else {
	Fe.propertyIsEnumerable = function(A, C) {
		if (C in A) {
			for (var B in A) {
				if (B == C) {
					return true
				}
			}
		}
		return false
	}
}
Fe.isArray = function(A) {
	return (A && typeof A.length == "number" && typeof A.splice != "undefined" && !Fe.propertyIsEnumerable(A, "length"))
};
Fe.isObject = function(A) {
	return (A && (typeof(A) == "object" || typeof(A) == "function")) || false
};
Fe.trim = function(A) {
	return A.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
Fe.format = function(I, K) {
	if (arguments.length > 1) {
		var E = Fe.format,
		H = /([.*+?^=!:${}()|[\]\/\\])/g,
		F = (E.left_delimiter || "{").replace(H, "\\$1"),
		A = (E.right_delimiter || "}").replace(H, "\\$1");
		var C = E._r1 || (E._r1 = new RegExp("#" + F + "([^" + F + A + "]+)" + A, "g")),
		B = E._r2 || (E._r2 = new RegExp("#" + F + "(\\d+)" + A, "g"));
		if (typeof(K) == "object") {
			return I.replace(C,
			function(L, N) {
				var M = K[N];
				if (typeof M == "function") {
					M = M(N)
				}
				return typeof(M) == "undefined" ? "": M
			})
		} else {
			if (typeof(K) != "undefined") {
				var J = Array.prototype.slice.call(arguments, 1);
				var D = J.length;
				return I.replace(B,
				function(L, M) {
					M = parseInt(M, 10);
					return (M >= D) ? L: J[M]
				})
			}
		}
	}
	return I
};
Fe.format.delimiter = function(C, A) {
	var B = Fe.format;
	B.left_delimiter = C || "{";
	B.right_delimiter = A || C || "}";
	B._r1 = B._r2 = null
};
Fe.each = function(E, A) {
	if (typeof A != "function") {
		return E
	}
	if (E) {
		if (E.length === undefined) {
			for (var B in E) {
				A.call(E[B], E[B], B)
			}
		} else {
			for (var C = 0,
			D = E.length; C < D; C++) {
				A.call(E[C], E[C], C)
			}
		}
	}
	return E
};
Fe.extend = function(F, D) {
	if (F && D && typeof(D) == "object") {
		for (var E in D) {
			F[E] = D[E]
		}
		var C = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
		for (var A = 0,
		B; A < C.length; A++) {
			B = C[A];
			if (Object.prototype.hasOwnProperty.call(D, B)) {
				F[B] = D[B]
			}
		}
	}
	return F
};
Fe.Browser = (function() {
	var C = navigator.userAgent;
	var H = 0,
	A = 0,
	F = 0,
	E = 0;
	var D = 0,
	I = 0,
	B = 0;
	if (typeof(window.opera) == "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(C)) {
		A = parseFloat(RegExp.$2)
	} else {
		if (/MSIE (\d+(\.\d+)?)/.test(C)) {
			H = parseFloat(RegExp.$1)
		} else {
			if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(C)) {
				E = parseFloat(RegExp.$2)
			} else {
				if (navigator.vendor == "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(C)) {
					B = parseFloat(RegExp.$2)
				} else {
					if (C.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(C)) {
						F = parseFloat(RegExp.$1)
					}
				}
			}
		}
	}
	if (C.indexOf("Gecko") > -1 && C.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(C)) {
		I = parseFloat(RegExp.$1)
	}
	return {
		ie: H,
		firefox: E,
		gecko: I,
		netscape: B,
		opera: A,
		safari: F
	}
})();
window.FeBrowser = Fe.Browser;
Fe.isGecko = (navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isStrict = (document.compatMode == "CSS1Compat");
Fe.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1: 0;
Fe.isFirefox = /Firefox(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$2: 0;
Fe.isSafari = (navigator.userAgent.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isWebkit = (navigator.userAgent.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(navigator.userAgent)) ? RegExp.$1: 0;
Fe.isOpera = (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$2: 0;
Fe.G = function() {
	for (var A = [], B = arguments.length - 1; B > -1; B--) {
		var C = arguments[B];
		A[B] = null;
		if (typeof C == "object" && C && C.dom) {
			A[B] = C.dom
		} else {
			if ((typeof C == "object" && C && C.tagName) || C == window || C == document) {
				A[B] = C
			} else {
				if (typeof C == "string" && (C = document.getElementById(C))) {
					A[B] = C
				}
			}
		}
	}
	return A.length < 2 ? A[0] : A
};
Fe.Q = function(E, D, B) {
	if (typeof E != "string" || E.length <= 0) {
		return null
	}
	var J = [],
	B = (typeof B == "string" && B.length > 0) ? B.toLowerCase() : null,
	C = (Fe.G(D) || document);
	if (C.getElementsByClassName) {
		Fe.each(C.getElementsByClassName(E),
		function(K) {
			if (B !== null) {
				if (K.tagName.toLowerCase() == B) {
					J[J.length] = K
				}
			} else {
				J[J.length] = K
			}
		})
	} else {
		E = E.replace(/\-/g, "\\-");
		var A = new RegExp("(^|\\s{1,})" + Fe.trim(E) + "(\\s{1,}|$)"),
		H = (B === null) ? (C.all ? C.all: C.getElementsByTagName("*")) : C.getElementsByTagName(B),
		F = H.length,
		I = F;
		while (F--) {
			if (A.test(H[I - F - 1].className)) {
				J[J.length] = H[I - F - 1]
			}
		}
	}
	return J
};
Fe.hide = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = "none"
		}
	})
};
Fe.show = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = ""
		}
	})
};
Fe.toggle = function() {
	Fe.each(arguments,
	function(A) {
		if (A = Fe.G(A)) {
			A.style.display = A.style.display == "none" ? "": "none"
		}
	})
};
Fe.addClassName = function(C, D) {
	if (! (C = Fe.G(C))) {
		return
	}
	var A = C.className.split(" "),
	B = Fe.trim;
	if (!new RegExp("(^|\\s{1,})" + B(D) + "(\\s{1,}|$)").test(C.className)) {
		C.className = B(A.concat(D).join(" "))
	}
};
Fe.ac = Fe.addClassName;
Fe.removeClassName = function(B, C) {
	if (! (B = Fe.G(B))) {
		return
	}
	var A = Fe.trim,
	D = new RegExp("(^|\\s{1,})" + A(C) + "(\\s{1,}|$)", "g");
	B.className = A(B.className.replace(D, "$2"))
};
Fe.rc = Fe.removeClassName;
Fe.body = function() {
	var A = 0,
	J = 0,
	E = 0,
	C = 0,
	B = 0,
	K = 0;
	var F = window,
	D = document,
	I = D.documentElement;
	A = I.clientWidth || D.body.clientWidth;
	J = F.innerHeight || I.clientHeight || D.body.clientHeight;
	C = D.body.scrollTop || I.scrollTop;
	E = D.body.scrollLeft || I.scrollLeft;
	B = Math.max(D.body.scrollWidth, I.scrollWidth || 0);
	K = Math.max(D.body.scrollHeight, I.scrollHeight || 0, J);
	return {
		scrollTop: C,
		scrollLeft: E,
		documentWidth: B,
		documentHeight: K,
		viewWidth: A,
		viewHeight: J
	}
};
Fe.on = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C[B + A] = function() {
			A.call(C, window.event)
		};
		C.attachEvent("on" + B, C[B + A])
	} else {
		C.addEventListener(B, A, false)
	}
	return C
};
Fe.un = function(C, B, A) {
	if (! (C = Fe.G(C))) {
		return C
	}
	B = B.replace(/^on/, "").toLowerCase();
	if (C.attachEvent) {
		C.detachEvent("on" + B, C[B + A]);
		C[B + A] = null
	} else {
		C.removeEventListener(B, A, false)
	}
	return C
};
Fe.css = function(C, H) {
	if (!C || !H) {
		return null
	}
	C = typeof C == "string" ? document.getElementById(C) : C;
	var B = !window.opera && navigator.userAgent.indexOf("MSIE") != -1;
	if (H == "float") {
		H = B ? "styleFloat": "cssFloat"
	}
	H = H.replace(/(-[a-z])/gi,
	function(I, J) {
		return J.charAt(1).toUpperCase()
	});
	if ("opacity" == H && B) {
		var A = C.style.filter;
		return A && A.indexOf("opacity=") >= 0 ? (parseFloat(A.match(/opacity=([^)]*)/)[1]) / 100) + "": "1"
	}
	var F = null;
	if (F = C.style[H]) {
		return F
	}
	if (C.currentStyle) {
		return C.currentStyle[H]
	} else {
		var E = C.nodeType == 9 ? C: C.ownerDocument || C.document;
		if (E.defaultView && E.defaultView.getComputedStyle) {
			var D = E.defaultView.getComputedStyle(C, "");
			if (D) {
				return D[H]
			}
		}
	}
	return null
};
if (!window.console || !console.firebug) {
	var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	window.console = (typeof window.loadFirebugConsole == "function") ? window.loadFirebugConsole() : {};
	for (var i = 0; i < names.length; ++i) {
		window.console[names[i]] = function() {}
	}
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("children",
	function() {
		for (var B = [], C = 0, E, D = 0, A = this.childNodes.length; D < A; D++) {
			E = this.childNodes[D];
			if (E.nodeType == 1) {
				B[C++] = E;
				if (E.name) {
					if (!B[E.name]) {
						B[E.name] = []
					}
					B[E.name][B[E.name].length] = E
				}
				if (E.id) {
					B[E.id] = E
				}
			}
		}
		return B
	})
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("currentStyle",
	function() {
		return this.ownerDocument.defaultView.getComputedStyle(this, null)
	})
}
if (typeof(HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.insertAdjacentHTML = function(A, B) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		C = C.createContextualFragment(B);
		switch (A) {
		case "beforeBegin":
			this.parentNode.insertBefore(C, this);
			break;
		case "afterBegin":
			this.insertBefore(C, this.firstChild);
			break;
		case "beforeEnd":
			this.appendChild(C);
			break;
		case "afterEnd":
			if (!this.nextSibling) {
				this.parentNode.appendChild(C)
			} else {
				this.parentNode.insertBefore(C, this.nextSibling)
			}
			break
		}
	}
}
if (Fe.isFirefox && window.Event) {
	Event.prototype.__defineSetter__("returnValue",
	function(A) {
		if (!A) {
			this.preventDefault()
		}
		return A
	});
	Event.prototype.__defineSetter__("cancelBubble",
	function(A) {
		if (A) {
			this.stopPropagation()
		}
		return A
	});
	Event.prototype.__defineGetter__("srcElement",
	function() {
		var A = this.target;
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("fromElement",
	function() {
		var A;
		if (this.type == "mouseover") {
			A = this.relatedTarget
		} else {
			if (this.type == "mouseout") {
				A = this.target
			}
		}
		if (!A) {
			return
		}
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("toElement",
	function() {
		var A;
		if (this.type == "mouseout") {
			A = this.relatedTarget
		} else {
			if (this.type == "mouseover") {
				A = this.target
			}
		}
		if (!A) {
			return
		}
		while (A.nodeType != 1) {
			A = A.parentNode
		}
		return A
	});
	Event.prototype.__defineGetter__("offsetX",
	function() {
		return this.layerX
	});
	Event.prototype.__defineGetter__("offsetY",
	function() {
		return this.layerY
	})
}
if (window.Document) {}
if (window.Node) {
	Node.prototype.replaceNode = function(A) {
		this.parentNode.replaceChild(A, this)
	};
	Node.prototype.removeNode = function(B) {
		if (B) {
			return this.parentNode.removeChild(this)
		} else {
			var A = document.createRange();
			A.selectNodeContents(this);
			return this.parentNode.replaceChild(A.extractContents(), this)
		}
	};
	Node.prototype.swapNode = function(B) {
		var C = this.nextSibling;
		var A = this.parentNode;
		node.parentNode.replaceChild(this, B);
		A.insertBefore(node, C)
	}
}
if (window.HTMLElement) {
	HTMLElement.prototype.__defineGetter__("all",
	function() {
		var A = this.getElementsByTagName("*");
		var B = this;
		A.tags = function(C) {
			return B.getElementsByTagName(C)
		};
		return A
	});
	HTMLElement.prototype.__defineGetter__("parentElement",
	function() {
		if (this.parentNode == this.ownerDocument) {
			return null
		}
		return this.parentNode
	});
	HTMLElement.prototype.__defineGetter__("children",
	function() {
		var C = [],
		A = 0,
		D;
		for (var B = 0; B < this.childNodes.length; B++) {
			D = this.childNodes[B];
			if (D.nodeType == 1) {
				C[A++] = D;
				if (D.name) {
					if (!C[D.name]) {
						C[D.name] = []
					}
					C[D.name][C[D.name].length] = D
				}
				if (D.id) {
					C[D.id] = D
				}
			}
		}
		return C
	});
	HTMLElement.prototype.__defineGetter__("currentStyle",
	function() {
		return this.ownerDocument.defaultView.getComputedStyle(this, null)
	});
	HTMLElement.prototype.__defineSetter__("outerHTML",
	function(B) {
		var A = this.ownerDocument.createRange();
		A.setStartBefore(this);
		var C = A.createContextualFragment(B);
		this.parentNode.replaceChild(C, this);
		return B
	});
	HTMLElement.prototype.__defineGetter__("outerHTML",
	function() {
		var A;
		var B = this.attributes;
		var D = "<" + this.tagName;
		for (var C = 0; C < B.length; C++) {
			A = B[C];
			if (A.specified) {
				D += " " + A.name + '="' + A.value + '"'
			}
		}
		if (!this.canHaveChildren) {
			return D + ">"
		}
		return D + ">" + this.innerHTML + "</" + this.tagName + ">"
	});
	HTMLElement.prototype.__defineGetter__("canHaveChildren",
	function() {
		switch (this.tagName.toLowerCase()) {
		case "area":
		case "base":
		case "basefont":
		case "col":
		case "frame":
		case "hr":
		case "img":
		case "br":
		case "input":
		case "isindex":
		case "link":
		case "meta":
		case "param":
			return false
		}
		return true
	});
	HTMLElement.prototype.__defineSetter__("innerText",
	function(B) {
		var A = document.createTextNode(B);
		this.innerHTML = A;
		return A
	});
	HTMLElement.prototype.__defineGetter__("innerText",
	function() {
		var A = this.ownerDocument.createRange();
		A.selectNodeContents(this);
		return A.toString()
	});
	HTMLElement.prototype.__defineSetter__("outerText",
	function(B) {
		var A = document.createTextNode(B);
		this.outerHTML = A;
		return A
	});
	HTMLElement.prototype.__defineGetter__("outerText",
	function() {
		var A = this.ownerDocument.createRange();
		A.selectNodeContents(this);
		return A.toString()
	});
	HTMLElement.prototype.attachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		B._ieEmuEventHandler = function(D) {
			window.event = D;
			return B()
		};
		this.addEventListener(A, B._ieEmuEventHandler, false)
	};
	HTMLElement.prototype.detachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		if (typeof(B._ieEmuEventHandler) == "function") {
			this.removeEventListener(A, B._ieEmuEventHandler, false)
		} else {
			this.removeEventListener(A, B, true)
		}
	};
	HTMLElement.prototype.contains = function(A) {
		do {
			if (A == this) {
				return true
			}
		} while ( A = A . parentNode );
		return false
	};
	HTMLElement.prototype.insertAdjacentElement = function(A, B) {
		switch (A) {
		case "beforeBegin":
			this.parentNode.insertBefore(B, this);
			break;
		case "afterBegin":
			this.insertBefore(B, this.firstChild);
			break;
		case "beforeEnd":
			this.appendChild(B);
			break;
		case "afterEnd":
			if (this.nextSibling) {
				this.parentNode.insertBefore(B, this.nextSibling)
			} else {
				this.parentNode.appendChild(B)
			}
			break
		}
	};
	HTMLElement.prototype.insertAdjacentHTML = function(B, D) {
		var C = this.ownerDocument.createRange();
		C.setStartBefore(this);
		var A = C.createContextualFragment(D);
		this.insertAdjacentElement(B, A)
	};
	HTMLElement.prototype.insertAdjacentText = function(B, C) {
		var A = document.createTextNode(C);
		this.insertAdjacentElement(B, A)
	};
	HTMLElement.prototype.attachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		B._ieEmuEventHandler = function(D) {
			window.event = D;
			return B()
		};
		this.addEventListener(A, B._ieEmuEventHandler, false)
	};
	HTMLElement.prototype.detachEvent = function(C, B) {
		var A = C.replace(/on/, "");
		if (typeof(B._ieEmuEventHandler) == "function") {
			this.removeEventListener(A, B._ieEmuEventHandler, false)
		} else {
			this.removeEventListener(A, B, true)
		}
	}
}
var BaikeLogParams = {};
function imageReq(A) {
	var C = "iknowlog_" + (new Date()).getTime();
	var B = window[C] = new Image();
	B.onload = B.onerror = function() {
		window[C] = null
	};
	B.src = A;
	B = null
}
function nslog(B, D, A) {
	var C = (new Date()).getTime();
	var E = ["http://nsclick.baidu.com/v.gif?pid=103", "url=" + encodeURIComponent(B), "type=" + D, "t=" + C];
	Fe.each(A,
	function(H, F) {
		E.push(F + "=" + H)
	});
	if (BaikeLogParams) {
		Fe.each(BaikeLogParams,
		function(H, F) {
			E.push(F + "=" + H)
		})
	}
	imageReq(E.join("&"))
}
if (top.location !== self.location) {
	top.location = self.location
}
function h(B, A) {
	B.style.behavior = "url(#default#homepage)";
	B.setHomePage(A)
}
var trim = function(A) {
	return A.replace(/(^[\s　]*)|([\s　]*$)/g, "")
};
function bytes(A) {
	return trim(A).replace(/[^\u0000-\u007f]/g, "\u0061\u0061").length
}
var isEditorReload = false;
var errMsg = {
	textEmp: "您好像忘记输入词条内容了哦 ：）",
	textEx: "您输入的内容过长，或许您可以精简一些　：）",
	refEx: "您输入的扩展阅读过长，请返回修改　：）",
	classEx: "您输入的开放分类过长，请返回修改　：）",
	classNumEx: "开放分类最多输入５个哦　：）",
	reasonEmp: "您好像忘记输入修改原因了哦　：）",
	reasonEx: "您输入的修改原因过长，请返回修改　：）",
	imgExp: "您上传的图片数量达到限制，请返回修改 ：）"
};
var sid = ((new Date()).getTime() + "_" + Math.round(Math.random() * 2147483637));
function sendStat(A, B) {
	if (document.images) { (new Image()).src = "js/blank.js?func=" + A + "&sid=" + sid + "&t=" + (new Date()).getTime() + B
	}
}
var BKLog = {};
BKLog.BaikeStat = function(C) {
	if (document.images) {
		var B = new Image();
		var A = (new Date()).getTime();
		window["BK_" + A] = B;
		B.src = "js/blank.js?" + C + "&sid=" + sid + "&t=" + A
	}
};
var flag = 0;
var Msg_loopNum = 5;
function showMsg() {
	if (typeof(redmsg) != "undefined") {
		if (!redmsg || redmsg.length < 1) {
			return false
		}
		Fe.G("mnum").innerHTML = redmsg
	} else {
		if (Msg_loopNum > 0) {
			setTimeout(function() {
				showMsg()
			},
			100);
			Msg_loopNum--
		}
	}
}
function setTextarea(A) {
	Fe.G("code").value = A
}
function setSectionEditor(A, D) {
	var B = "<html><head></head><body></body></html>";
	var C = window.frames[D];
	C.document.open();
	C.document.write(B);
	C.document.close();
	setTimeout(function() {
		window.frames[D].document.getElementsByTagName("BODY")[0].innerHTML = document.getElementById(A).value
	},
	20)
}
function getSectionEditor(A, C) {
	var B = window.frames[C].document.getElementsByTagName("BODY")[0].innerHTML;
	return B
}
function getEditorText(A) {
	A = A.replace(/<embed[^>]*>(.*?)<\/embed>/ig, "");
	A = A.replace(/<object[^>]*>(.*?)<\/object>/ig, "");
	A = A.replace(/<applet[^>]*>(.*?)<\/applet>/ig, "");
	A = A.replace(/<script[^>]*>(.*?)<\/script>/ig, "");
	A = A.replace(/<style[^>]*>(.*?)<\/style>/ig, "");
	A = A.replace(/<!--([^>]*)-->/ig, "");
	A = A.replace(/<!--(.|\n|\r)*?-->/ig, "");
	A = A.replace(/\r/g, "");
	A = A.replace(/\n/g, "");
	A = A.replace(/<p( .*?)?>/ig, "");
	A = A.replace(/<\/p>/ig, "<br>");
	A = A.replace(/<br>/ig, "\r\n");
	A = A.replace(/<br ?\/>/ig, "\r\n");
	A = A.replace(/<[^<>]*>/gi, "");
	A = A.replace(/&gt;/g, ">");
	A = A.replace(/&lt;/g, "<");
	A = A.replace(/&nbsp;/ig, " ");
	A = A.replace(/&amp;/g, "&");
	A = A.replace(/&#39;/g, "'");
	A = A.replace(/&quot;/g, '"');
	A = A.replace(/\r\n　　/g, "\r\n");
	return A
}
function HTMLEncode(A) {
	A = A.replace(/\"/g, "'");
	A = A.replace(/\</g, "〈");
	A = A.replace(/\>/g, "〉");
	return A
}
function editorFilter(B) {
	var A = filterMoreTable(B);
	return A
}
function filterMoreTable(F) {
	try {
		var D = editor.document.getElementsByTagName("BODY")[0];
		var B = D.getElementsByTagName("TABLE");
		for (var E = 0; E < B.length; E++) {
			if (B[E]) {
				var H = B[E].getElementsByTagName("TD");
				for (var C = 0; C < H.length; C++) {
					var J = H[C].innerHTML;
					if (/<table[^>]*>/gi.test(J)) {
						J = J.replace(/<(table|tbody|thead|tfoot|tr|th|td|\/table|\/tbody|\/thead|\/tfoot|\/tr|\/th|\/td)[^>]*>/ig, "");
						H[C].innerHTML = J
					}
				}
				var A = B[E].getElementsByTagName("TH");
				for (var C = 0; C < A.length; C++) {
					var J = A[C].innerHTML;
					if (/<table[^>]*>/gi.test(J)) {
						J = J.replace(/<(table|tbody|thead|tfoot|tr|th|td|\/table|\/tbody|\/thead|\/tfoot|\/tr|\/th|\/td)[^>]*>/ig, "");
						A[C].innerHTML = J
					}
				}
			}
		}
		return D.innerHTML
	} catch(I) {
		return F
	}
}
function preview(D, C) {
	G("beforeLemma").value = getSectionEditor("beforeLemma", "beforeLemmaIframe");
	G("endLemma").value = getSectionEditor("endLemma", "endLemmaIframe");
	var H = editorFilter(editor.getContent());
	var E, I;
	if (G("preFlag").value == 0) {
		I = H;
		E = D + "请控制在" + C + "字以内，否则词条内容过长，将无法提交哦 ：P"
	} else {
		I = G("beforeLemma").value + H + G("endLemma").value;
		E = D + "请控制在" + C + "字以内，否则将无法提交哦 ：P"
	}
	var A = H;
	var B = Math.floor(bytes(getEditorText(I)) / 2);
	if (B >= C) {
		alert(E);
		return false
	}
	if (Fe.G("lemmaclass")) {
		var F = Fe.G("lemmaclass").value;
		if (Fe.G("lemmaclass").value == wikiSug.g_str) {
			Fe.G("lemmaclass").value = ""
		}
	}
	setTextarea(A);
	getValue();
	Fe.G("refData4Preview").innerHTML = Fe.G("refContainer").innerHTML;
	sendStat("gotoPreview");
	gotoPreview();
	if (Fe.G("lemmaclass")) {
		if (F == wikiSug.g_str) {
			Fe.G("lemmaclass").value = wikiSug.g_str
		}
	}
}
function setPreFlag(A) {
	G("preFlag").value = A
}
var wikiSug = {
	g_str: "例如：人物，历史，学者",
	g_flag: 0,
	g_lemmaFst: "",
	g_summary: "您可以在这里输入词条概述：包括定义的概括,基本信息的描述，或者对词条正文主要内容的提炼，词条概述也可以为空。"
};
var wikiConflict = {
	isEdit: 0,
	saveContent: ""
};
function sugConfig() {
	if (Fe.G("lemmaclass")) {
		if (Fe.G("lemmaclass").value.length == 0) {
			Fe.G("lemmaclass").value = wikiSug.g_str
		}
		Fe.on("lemmaclass", "focus",
		function() {
			wikiSug.g_flag = 1;
			Fe.G("lemmaclass").style.color = "#000";
			if (Fe.G("lemmaclass").value == wikiSug.g_str) {
				Fe.G("lemmaclass").value = ""
			}
		});
		wikiSug.g_lemmaFst = Fe.G("lemmaclass").value
	}
}
Fe.on(window, "load", sugConfig);
var initText = "";
Fe.on(window, "load",
function() {
	if (isEditorReload) {
		editor.getFilter().filter(editor.document.body)
	}
	initText = editorFilter(editor.getContent())
});
var MSG_UNLOAD = "您编辑的文章内容还没有进行保存！";
var UnloadConfirm = {};
UnloadConfirm.set = function(A) {
	window.onbeforeunload = function(C) {
		if (isEditorReload) {
			editor.getFilter().filter(editor.document.body)
		}
		var B = editorFilter(editor.getContent());
		if (B != "" && B != "<br>" && B != initText && checkSave()) {
			C = C || window.event;
			C.returnValue = A
		}
	}
};
UnloadConfirm.clear = function() {
	window.onbeforeunload = function() {}
};
UnloadConfirm.set(MSG_UNLOAD);
var _lemmaTime = new Date().getTime();
function setLemmaTime() {
	var A = new Date().getTime();
	G("lemmaTime").value = parseInt((A - _lemmaTime) / 1000)
}
function classNum(D) {
	if (D.length == 0) {
		return 0
	}
	var A = D.length - 1;
	var B;
	if ((D.lastIndexOf(",") == A) || (D.lastIndexOf(",") == A)) {
		B = 5
	} else {
		B = 4
	}
	var C = D.replace(/,/ig, "").replace(/，/ig, "");
	return (D.length - C.length > B)
}
function tagNum(C, B) {
	if (!C || !B) {
		return 0
	}
	var D = -1;
	var A = 0;
	while ((D = C.indexOf(B, D + 1)) != -1) {
		A++
	}
	return A
}
function formValidate(B, A) {
	if (inputValidate()) {
		if (Fe.G("lemmaclass") && Fe.G("lemmaclass").value != wikiSug.g_lemmaFst) {
			sendStat("lemmaclassup")
		}
		userLogin(B, A)
	}
}
var Detect = {
	detecting: function() {
		doDetect()
	},
	url: "",
	id: "",
	uptime: "",
	upnum: "",
	upst: "",
	content: "",
	latestid: ""
};
function formatDetect(B) {
	var A = Fe.Dialog.open("/page/detect.html", B);
	return A
}
var Save = {
	content: ""
};
function checkSave() {
	var A = editorFilter(editor.getContent());
	if (Save.content == A) {
		return 0
	} else {
		return 1
	}
}
var ScrollPanel = (function() {
	var C;
	var E = 33;
	var B = (Fe.isIE && Fe.isIE <= 6);
	function A() {
		var K = baidu.dom.getPosition("EditorHolder");
		var F = K.top;
		var I = Fe.G("EditorHolder").offsetHeight;
		var J = (document.body.scrollTop || document.documentElement.scrollTop) - F + E;
		if (J > 0 && J < I + E) {
			if (B) {
				C.style.position = "absolute";
				var H = E - F - 1;
				C.style.setExpression("top", "eval((document.documentElement||document.body).scrollTop + " + H + ") + 'px'")
			} else {
				C.style.position = "fixed";
				C.style.top = 0
			}
		} else {
			if (B) {
				C.style.removeExpression("top")
			}
			C.style.position = ""
		}
	}
	function D() {
		C = Fe.G("tools");
		if (!C) {
			return
		}
		Fe.on(window, "scroll", A);
		Fe.on(window, "resize", A)
	}
	return {
		start: D
	}
})();
Fe.on(window, "load",
function() {
	ScrollPanel.start()
});
var autoTextArea = (function() {
	var A = 100;
	function B(F) {
		var E = F.scrollHeight;
		if (E > A) {
			if (Fe.isIE) {
				F.style.height = F.scrollHeight + "px"
			} else {
				var H = 0;
				var C = baidu.G("temp_autoTextArea");
				if (!C) {
					return false
				}
				var D = F.value;
				D = D.replace(/\n/g, "<br>");
				C.innerHTML = D;
				H = C.offsetHeight + 8;
				if (H < A) {
					H = A
				}
				F.style.height = H + "px"
			}
		}
	}
	return {
		auto: B
	}
})();
Fe.on(window, "load",
function() {
	autoTextArea.auto(baidu.G("lemmaref"))
});
var jsTools = {};
jsTools.pageY = function(A) {
	return A.offsetParent ? A.offsetTop + arguments.callee(A.offsetParent) : A.offsetTop
};
var gotoRef = function(D) {
	if (!D) {
		return false
	}
	var F = D.className.split("_")[1];
	F = parseInt(F);
	if (F >= 0) {
		var B = Fe.G("refIndex" + F);
		if (B && B.parentNode) {
			var E = jsTools.pageY(B.parentNode) - 0;
			if (E > 0) {
				setTimeout(function() {
					window.scrollTo(0, E)
				},
				500);
				if (Fe.G("refContentList")) {
					var A = Fe.G("refContentList").getElementsByTagName("li");
					for (var C = 0; C < A.length; C++) {
						A[C].className = ""
					}
					B.parentNode.parentNode.className = "selected"
				}
			}
		}
	}
};
var getNextSibling = function(A) {
	if (!A) {
		return false
	}
	while (A = A.nextSibling) {
		if (A.nodeType == 1) {
			return A
		}
	}
};
var refTools = {
	tipStr: "请输入您引用内容的来源书籍名称"
};
refTools.cancelInputRef = function() {
	var A = Fe.G("refContentList");
	var B = Fe.G("refForm");
	if (B.parentNode == A) {
		refTools.cancelEditRef()
	} else {
		refTools.cancelAddRef()
	}
};
refTools.makeFormDefault = function() {
	Fe.G("anchorTextInput").value = "";
	Fe.G("anchorTextInput").className = "ref-input";
	Fe.G("urlInput").value = "";
	Fe.hide("formTip")
};
refTools.cancelAddRef = function() {
	refTools.makeFormDefault();
	Fe.hide("refForm")
};
refTools.cancelEditRef = function() {
	var B = Fe.G("refForm");
	var A = getNextSibling(B);
	Fe.show(A);
	Fe.G("refAddRef").appendChild(B);
	Fe.hide(B);
	refTools.makeFormDefault()
};
refTools.clickOnAnchorTextInput = function() {
	var A = Fe.G("anchorTextInput");
	if (Fe.trim(A.value) == refTools.tipStr) {
		A.value = "";
		A.className = "ref-input";
		A.focus()
	}
};
refTools.checkAddRef = function() {
	var A = Fe.trim(Fe.G("anchorTextInput").value);
	var C = Fe.trim(Fe.G("urlInput").value);
	var E = false;
	var B = "";
	if (A.length == 0 || A == refTools.tipStr) {
		B = "您输入的参考资料说明为空，无法保存成为参考资料：p";
		return [E, B]
	}
	if (A.length > 200) {
		B = "参考资料说明请控制在200个字以内：p";
		return [E, B]
	}
	var D = /^http(s?):\/\//.test(C);
	if (!D && C.length > 0) {
		B = "输入的url格式不正确，请返回修改：p";
		return [E, B]
	}
	E = true;
	return [E, B]
};
refTools.saveRef = function() {
	var A = Fe.G("refContentList");
	var B = Fe.G("refForm");
	if (B.parentNode == A) {
		refTools.saveEditRef()
	} else {
		refTools.saveAddRef()
	}
};
refTools.saveEditRef = function() {
	var A = refTools.checkAddRef();
	if (!A[0]) {
		Fe.G("formTip").innerHTML = A[1];
		Fe.show("formTip");
		return false
	}
	var B = Fe.G("urlInput");
	var D = Fe.G("anchorTextInput");
	if (Fe.trim(D.value) == refTools.tipStr) {
		D.value = ""
	}
	if (Fe.trim(B.value) == "http://" || Fe.trim(B.value) == "https://") {
		B.value = ""
	}
	var H = Fe.G("refForm");
	var C = getNextSibling(H);
	var F = C.id + "";
	var E = F.replace(/\D/ig, "");
	Fe.G("iDescriptionIndex" + E).value = "";
	refTools.updateRefContent(E, E);
	Fe.show(C);
	Fe.G("refAddRef").appendChild(H);
	Fe.hide(H);
	refTools.makeFormDefault()
};
refTools.updateRefIndex = function(M, I) {
	if (!M) {
		return false
	}
	var I = I || "";
	var D = Fe.G("refLi" + I);
	var E = Fe.G("iRefIndex" + I);
	var B = Fe.G("iDescriptionIndex" + I);
	var O = Fe.G("iUrlIndex" + I);
	var J = Fe.G("iAnchorTextIndex" + I);
	var F = Fe.G("deleteIndex" + I);
	var L = Fe.G("editIndex" + I);
	var A = Fe.G("numberIndex" + I);
	var C = Fe.G("checkboxIndex" + I);
	var K = Fe.G("anchorTextIndex" + I);
	var H = Fe.G("urlIndex" + I);
	var N = Fe.G("refIndex" + I);
	D.id = "refLi" + M;
	E.value = M;
	E.id = "iRefIndex" + M;
	B.id = "iDescriptionIndex" + M;
	O.id = "iUrlIndex" + M;
	J.id = "iAnchorTextIndex" + M;
	F.id = "deleteIndex" + M;
	L.id = "editIndex" + M;
	A.id = "numberIndex" + M;
	A.innerHTML = M + ". ";
	C.id = "checkboxIndex" + M;
	K.id = "anchorTextIndex" + M;
	H.id = "urlIndex" + M;
	N.id = "refIndex" + M
};
refTools.updateRefContent = function(K, H) {
	if (!K) {
		return false
	}
	var H = H || "";
	var D = Fe.G("iRefIndex" + H);
	var L = Fe.G("iUrlIndex" + H);
	var I = Fe.G("iAnchorTextIndex" + H);
	var J = Fe.G("anchorTextIndex" + H);
	var E = Fe.G("urlIndex" + H);
	var F = Fe.trim(Fe.G("urlInput").value);
	var B = Fe.trim(Fe.G("anchorTextInput").value);
	D.value = K;
	L.value = F;
	I.value = B;
	J.innerHTML = "";
	E.innerHTML = "";
	var C = document.createTextNode(B);
	J.appendChild(C);
	var A = document.createTextNode(F);
	E.appendChild(A);
	E.href = F
};
refTools.deleteRef = function(C) {
	if (!C) {
		return false
	}
	var I = C.id + "";
	var F = I.replace(/\D/ig, "") - 0;
	var E = Fe.G("refContentList").getElementsByTagName("li");
	var H = E.length - 1;
	var D = Fe.G("refLi" + F);
	var A = Fe.G("refContentList");
	A.removeChild(D);
	for (var B = F + 1; B <= H; B++) {
		refTools.updateRefIndex(B - 1, B)
	}
	refTools.updateEditorSup(window.frames.beforeLemmaIframe, F, H);
	refTools.updateEditorSup(editor, F, H);
	refTools.updateEditorSup(window.frames.endLemmaIframe, F, H)
};
refTools.updateEditorSup = function(B, K, H) {
	var I = B.document;
	var C = I.getElementsByTagName("SUP");
	var J = [];
	var E = C.length;
	for (var D = 0; D < E; D++) {
		J.push(C[D])
	}
	for (var D = 0; D < E; D++) {
		var A = J[D];
		var F = A.className.split("_")[1];
		F = parseInt(F);
		if (F == K) {
			A.parentNode.removeChild(A)
		} else {
			if (F > K && F <= H) {
				A.className = "ref_" + (F - 1)
			}
		}
	}
};
refTools.editRef = function(C) {
	if (!C) {
		return false
	}
	var H = C.id + "";
	var E = H.replace(/\D/ig, "") - 0;
	var D = Fe.G("refLi" + E);
	var B = Fe.G("refContentList");
	var F = Fe.G("refForm");
	if (F.parentNode == B) {
		Fe.show(getNextSibling(F))
	}
	B.insertBefore(F, D);
	var A = Fe.G("iDescriptionIndex" + E).value;
	if (A != "") {
		A = "。" + A
	}
	Fe.G("urlInput").value = Fe.G("iUrlIndex" + E).value || "http://";
	Fe.G("anchorTextInput").value = Fe.G("iAnchorTextIndex" + E).value + A;
	Fe.G("anchorTextInput").className = "ref-input";
	Fe.hide("formTip");
	Fe.hide(D);
	Fe.show(F)
};