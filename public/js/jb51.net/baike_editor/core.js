//download by http://www.jb51.net
window.baidu = window.baidu || {
	version: "1-0-0",
	emptyFn: function() {}
};
baidu.on = function(H, F, E, G) {
	if (typeof E != "function") {
		return H
	}
	F = F.replace(/^on/i, "").toLowerCase();
	function B(I) {
		return I || window.event
	}
	var D = function(I) {
		E.call(D.src, B(I))
	};
	D.src = H;
	var C = baidu.on._listeners;
	var A = [H, F, E, D];
	C[C.length] = A;
	if (H.attachEvent) {
		H.attachEvent("on" + F, D)
	} else {
		if (H.addEventListener) {
			H.addEventListener(F, D, false)
		}
	}
	return H
};
baidu.on._listeners = [];
baidu.string = baidu.string || {};
baidu.isString = function(A) {
	return (typeof A == "object" && A && A.constructor == String) || typeof A == "string"
};
baidu.G = function() {
	for (var A = [], B = arguments.length - 1; B > -1; B--) {
		var C = arguments[B];
		A[B] = null;
		if (typeof C == "object" && C && C.dom) {
			A[B] = C.dom
		} else {
			if ((typeof C == "object" && C && C.tagName) || C == window || C == document) {
				A[B] = C
			} else {
    console.log(C)

				if (baidu.isString(C) && (C = document.getElementById(C))) {
					A[B] = C
				}
			}
		}
	}
	return A.length < 2 ? A[0] : A
}; (function() {
	var B = {};
	baidu.BaseClass = function(C) {
		B[(this.guid = (C || baidu.BaseClass.guid()))] = this
	};
	var A = 0;
	baidu.BaseClass.guid = function() {
		return "MZ__" + (A++).toString(36)
	};
	baidu.BaseClass.create = function(D) {
		var E = new baidu.BaseClass();
		delete B[this.guid];
		for (var C in D) {
			E[C] = D[C]
		}
		return E
	};
	window.Instance = baidu.instance = function(C) {
		return B[C]
	};
	baidu.BaseClass.prototype.dispose = function() {
		if (this.guid) {
			delete B[this.guid]
		}
		for (var C in this) {
			if (typeof this[C] != "function") {
				delete this[C]
			}
		}
	};
	baidu.BaseClass.decontrol = function(C) {
		if (C && C.guid) {
			delete B[C.guid]
		}
	};
	baidu.BaseClass.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	}
})();
baidu.BaseEvent = function(A, B) {
	this.type = A;
	this.returnValue = true;
	this.target = B || null;
	this.currentTarget = this.srcElement = null
};
baidu.BaseClass.prototype.addEventListener = function(D, C, B) {
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
	E = E || baidu.BaseClass.guid();
	C.hashCode = E;
	A[D][E] = C
};
baidu.BaseClass.prototype.removeEventListener = function(C, B) {
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
baidu.BaseClass.prototype.dispatchEvent = function(C) {
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
baidu.extend = function(C, A) {
	if (C && A && typeof(A) == "object") {
		for (var B in A) {
			C[B] = A[B]
		}
	}
	return C
};
baidu.trim = function(B, A) {
	if (A == "left") {
		return B.replace(/(^[\s\t\xa0\u3000]+)/g, "")
	}
	if (A == "right") {
		return B.replace(/([\u3000\xa0\s\t]+$)/g, "")
	}
	return B.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
};
baidu.addClass = function(A, B) {
	if (! (A = baidu.G(A))) {
		return
	}
	B = baidu.trim(B);
	if (!new RegExp("(^| )" + B.replace(/(\W)/g, "\\\x241") + "( |\x24)").test(A.className)) {
		A.className = baidu.trim(A.className.split(/\s+/).concat(B).join(" "))
	}
};
baidu.ac = baidu.addClass;
baidu.removeClass = function(A, B) {
	if (! (A = baidu.G(A))) {
		return
	}
	B = baidu.trim(B);
	var C = A.className.replace(new RegExp("(^| +)" + B.replace(/(\W)/g, "\\\x241") + "( +|\x24)", "g"), "\x242");
	if (A.className != C) {
		A.className = baidu.trim(C)
	}
};
baidu.rc = baidu.removeClass;
baidu.ui = baidu.ui || {};
baidu.editor = {
	_register: [],
	register: function(A) {
		this._register[this._register.length] = A
	},
	_commands: {},
	registCommand: function(B, A) {
		this._commands[B] = A
	},
	_queries: {},
	registQuery: function(B, A) {
		this._queries[B] = A
	},
	_parser: {},
	registParser: function(A, B) {
		this._parser[A] = B
	}
};
baidu.editor.EditorConfig = {
	docType: "",
	skinCSS: "css/editorarea.css",
	maxUndoCount: 100,
	hotkey: {
		"ctrl+66": "Bold",
		"meta+66": "Bold",
		"ctrl+90": "Undo",
		"ctrl+89": "Redo"
	}
};
baidu.ie = 0;
if (/MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) && !window.opera) {
	baidu.ie = parseFloat(RegExp.$1)
}
baidu.editor.register(function(C) {
	var A = baidu.editor.EditorConfig.hotkey;
	if (A) {
		function B(H) {
			var D = H;
			H = H.srcElement;
			var G = H.keyCode || H.which;
			if (H.ctrlKey && G == 86 || H.ctrlKey && G == 88 || H.shiftKey && G == 45 || H.shiftKey && G == 46) {
				C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
				setTimeout(function() {
					C.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
					C.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
					C.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"));
					C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"))
				},
				0);
				D.returnValue = false;
				return false
			}
			if (baidu.ie && G == 8) {
				var I = C.getSelection().getSelectedElement();
				if (I) {
					C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
					baidu.dom.element.remove(I, C.document);
					C.dispatchEvent(new baidu.BaseEvent("onneedsavescene"));
					if (H.preventDefault) {
						H.preventDefault()
					}
				}
			}
			for (var F in A) {
				if (/^(ctrl|meta)\+(\d+)$/.test(F.toLowerCase()) || /^(\d+)$/.test(F)) {
					if ((H[RegExp.$1 + "Key"] && G == RegExp.$2) || G == RegExp.$1) {
						try {
							C.execCommand(A[F])
						} catch(E) {}
						D.returnValue = H.returnValue = false;
						if (H.preventDefault) {
							H.preventDefault()
						}
						return false
					}
				}
			}
			return true
		}
		C.addEventListener("onbeforekeydown", B)
	}
});
baidu.inherits = function(A, E, D) {
	var B, F, H = A.prototype,
	G = function() {};
	G.prototype = E.prototype;
	F = A.prototype = new G();
	if (typeof D == "string") {
		F._className = D
	}
	for (B in H) {
		F[B] = H[B]
	}
	A.prototype.constructor = H.constructor;
	A.superClass = E.prototype;
	H = G = null;
	return F
}; (function() {
	function A(C, B) {
		baidu.BaseClass.call(this);
		this.iframe = null;
		this.document = null;
		this.window = null;
		B = B || {};
		this.width = B.width || "";
		this.height = B.height || "";
		this.readyState = 0;
		this.ieBakRange = null;
		this.temp = {
			scene: {}
		};
		this.isBlur = true
	}
	baidu.inherits(A, baidu.BaseClass, "baidu.Editor");
	A.prototype.render = function() {
		var D = typeof this.width == "number" ? this.width + "px": this.width;
		var B = typeof this.height == "number" ? this.height + "px": this.height;
		B = "height:" + B + ";";
		var C = ["<div id='tangram_editor_container_" + this.guid + "' class='tangram_editor_container' "];
		C.push("style='width:" + D + ";'");
		C.push("><iframe id='tangram_editor_iframe_" + this.guid + "' ");
		C.push("name='tangram_editor_iframe_" + this.guid + "' ");
		C.push("style='width:100%;" + B + "' scroll='no' frameborder='0'></iframe>");
		C.push("</div>");
		this._setReadyState(1);
		this.availableIframe();
		return C.join("")
	};
	A.prototype.availableIframe = function() {
		var B = document.getElementById("tangram_editor_iframe_" + this.guid);
		if (B) {
			this.iframe = B;
			this._setReadyState(3)
		} else {
			var C = this;
			setTimeout(function() {
				C.availableIframe()
			},
			20)
		}
	};
	A.prototype.makeEditable = function(F) {
		var D = this;
		var B = [baidu.editor.EditorConfig.docType];
		B.push("<html><head>");
		if (baidu.editor.EditorConfig.skinCSS) {
			var C = baidu.editor.EditorConfig.skinCSS + (baidu.ie ? "": "?tmp=" + new Date().getTime());
			B.push("<link rel='stylesheet' type='text/css' href='" + C + "' _bdtmp='true'/>")
		}
		B.push("</head><body>");
		B.push(F || "");
		B.push("</body></html>");
		D.window = D.iframe.contentWindow;
		var E = D.document = D.window.document;
		E.open();
		E.write(B.join(""));
		E.close();
		if (baidu.ie) {
			E.body.disabled = true;
			E.body.contentEditable = true;
			E.body.removeAttribute("disabled");
			D._setReadyState(4)
		} else {
			setTimeout(function() {
				try {
					E.body.spellcheck = false;
					E.designMode = "on";
					var J = false;
					try {
						E.execCommand("styleWithCSS", false, J)
					} catch(H) {
						E.execCommand("useCSS", false, !J)
					}
					var I = false;
					var G = true;
					E.execCommand("enableObjectResizing", false, !I);
					E.execCommand("enableInlineTableEditing", false, !G)
				} catch(H) {}
				D._setReadyState(4)
			},
			1)
		}
	};
	A.prototype.execCommand = function(G, D, E) {
		var C = false,
		F = true;
		this.focus();
		if (this.__hasEnterdExecCommand) {
			F = false
		} else {
			this.__hasEnterdExecCommand = true
		}
		this.dispatchEvent(new baidu.BaseEvent("onbeforeexeccommand", {
			command: G,
			topOpearation: F
		}));
		if (typeof G == "string") {
			var B = baidu.editor._commands;
			if (typeof B[G] == "function") {
				C = B[G].apply(null, [this].concat(Array.prototype.slice.call(arguments, 1)))
			} else {
				C = this.document.execCommand(G, D, E)
			}
		} else {
			if (typeof G == "function") {
				C = G.apply(null, [this].concat(Array.prototype.slice.call(arguments, 1)))
			}
		}
		if (F) {
			this.__hasEnterdExecCommand = false
		}
		this.dispatchEvent(new baidu.BaseEvent("onafterexeccommand", {
			command: G,
			topOpearation: F
		}));
		this.selectionChangeHandler(null, true);
		return C
	};
	A.prototype.queryContextState = function(B) {
		var C = baidu.editor._parser;
		if (typeof C[B] == "function") {
			return C[B](this)
		}
	};
	A.prototype.queryCommandState = function(D) {
		var B = baidu.editor._queries;
		if (typeof B[D] == "function") {
			return B[D](this)
		} else {
			var C = navigator.userAgent;
			if (/(\d+\.\d)\s+safari/i.test(C) && !/chrome/i.test(C) && D.toLowerCase() == "paste") {
				return false
			}
			return this.document.queryCommandEnabled(D) && this.document.queryCommandState(D)
		}
	};
	A.prototype.getContent = function(B) {
		if (!B) {
			var C = this.document.body.innerHTML;
			return C
		} else {
			var C = baidu.editor.EditorConfig.docType;
			C += "<html>";
			C += this.document.documentElement.innerHTML;
			C += "</html>";
			return C
		}
	};
	A.prototype.setContent = function(C) {
		var B = this;
		this.document.body.innerHTML = C;
		setTimeout(function() {
			B.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
			B.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
			B.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"))
		},
		0)
	};
	A.prototype._bindEvent = function() {
		var E = this;
		function F(G) {
			E.selectionChangeHandler(G)
		}
		function C(I) {
			I = E.window.event || I;
			var H = I.keyCode || I.which,
			G;
			E.dispatchEvent(G = new baidu.BaseEvent("onbeforekeydown", I));
			if (G.returnValue == false) {
				return
			}
			E.dispatchEvent(G = new baidu.BaseEvent("onkeydown", I));
			if (G.returnValue == false) {
				return
			}
			if (H != 27 && H != 16 && H != 17 && H != 18) {
				clearTimeout(C.timer);
				C.timer = setTimeout(function() {
					F()
				},
				500)
			}
			E.dispatchEvent(new baidu.BaseEvent("onafterkeydown", I))
		}
		function D(G) {
			clearTimeout(D.timer);
			D.timer = setTimeout(function() {
				F()
			},
			20)
		}
		function B(G) {
			G = E.window.event || G;
			E.dispatchEvent(new baidu.BaseEvent("onmousedown", G))
		}
		baidu.on(E.document, "mouseup", F);
		baidu.on(E.document, "keydown", C);
		baidu.on(E.document, "mousemove", D);
		baidu.on(E.document, "mousedown", B);
		baidu.on(E.window, "blur",
		function() {
			E.dispatchEvent(new baidu.BaseEvent("onblur"));
			E.isBlur = true
		});
		baidu.on(E.window, "focus",
		function() {
			E.dispatchEvent(new baidu.BaseEvent("onfocus"));
			E.isBlur = false
		});
		if (baidu.ie) {
			setInterval(function() {
				if (!E.isBlur) {
					E.ieBakRange = E.document.selection.createRange();
					E.ieBakRangeType = E.document.selection.type
				}
			},
			20)
		}
		this.dispatchEvent(new baidu.BaseEvent("onwysiwygready"))
	};
	A.prototype.selectionChangeHandler = function(H) {
		var G = this.temp.scene;
		var C = this.document.body.innerHTML;
		if (this.temp.innerHTML != C) {
			this.temp.innerHTML = C;
			H = this.window.event || H;
			if (H && H.type && H.type.indexOf("key") >= 0) {
				var E = H.srcElement || H.target;
				if (E) {
					if (E.nodeType == 3) {
						E = E.parentNode
					}
					var I = E.getElementsByTagName("*").length;
					if (E.tagName != "HTML" && E == G.target && I == G.count) {
						return
					}
					G.target = E;
					G.count = I
				}
			}
		} else {
			if (window.getSelection) {
				var B = this.window.getSelection().getRangeAt(0);
				if (B.startContainer == G.startContainer && B.endContainer == G.endContainer) {
					if (B.collapsed) {
						return
					} else {
						if (B.startOffset == G.startOffset && B.endOffset == G.endOffset) {
							return
						}
					}
				}
				G.endOffset = B.endOffset;
				G.startOffset = B.startOffset;
				G.endContainer = B.endContainer;
				G.startContainer = B.startContainer
			} else {
				if (document.selection) {
					var F = this.document.selection;
					var B = F.createRange();
					var D = F.type.toLowerCase();
					if (G.type == D) {
						if (D == "control" && B(0) == G.control) {
							return
						} else {
							if (G.text == B.text && G.parentElement == B.parentElement()) {
								return
							}
						}
					}
					G.type = D;
					if (D == "control") {
						G.control = B(0)
					} else {
						G.text = B.text;
						G.parentElement = B.parentElement()
					}
				}
			}
		}
		this.dispatchEvent(new baidu.BaseEvent("onbeforeselectionchange"));
		this.dispatchEvent(new baidu.BaseEvent("onselectionchange"));
		this.dispatchEvent(new baidu.BaseEvent("onafterselectionchange"))
	};
	A.prototype._setReadyState = function(B) {
		this.readyState = B;
		this.dispatchEvent(new baidu.BaseEvent("onreadystatechange", B))
	};
	A.prototype.addToolbarItem = function(B) {
		if (B && typeof B.initialize == "function") {
			B.initialize()
		}
	};
	baidu.editor.Editor = A
})();
baidu.editor.create = function(D, A) {
	var E = new baidu.editor.Editor(D, A);
	if (typeof D == "string") {
		D = document.getElementById(D)
	}
	var C = "";
	if (D && D.tagName) {
		if (D.tagName.toLowerCase() == "textarea") {
			C = D.value
		} else {
			C = D.innerHTML
		}
	}
	if (C == "" && A) {
		C = A.content || ""
	}
	if (!baidu.ie && C == "") {
		C = "<br/>"
	}
	var B = baidu.BaseClass.guid();
	E.addEventListener("onreadystatechange",
	function(H) {
		var G = H.currentTarget;
		switch (G.readyState) {
		case 3:
			G.makeEditable(C);
			break;
		case 4:
			for (var F = baidu.editor._register.length - 1; F >= 0; F--) {
				baidu.editor._register[F](this)
			}
			G.removeEventListener("onreadystatechange", B);
			G._bindEvent();
			break
		}
	},
	B);
	return E
};
baidu.editor.Editor.prototype.focus = function() {
	this.window.focus();
	try {
		if (baidu.ie && this.ieBakRange) {
			this.ieBakRange.select()
		}
	} catch(A) {}
};
baidu.dom = baidu.dom || {};
baidu.isElement = function(A) {
	if (A === undefined || A === null) {
		return false
	}
	return A && A.nodeName && A.nodeType == 1
};
baidu.isDocument = function(A) {
	if (A === undefined || A === null) {
		return false
	}
	return A && A.nodeType == 9
};
baidu.dom.getWindow = function(A) {
	if (!baidu.isDocument(A)) {
		throw new Error("[baidu.dom.getWindow] param must be Document")
	}
	return A.parentWindow ? A.parentWindow: (A.defaultView ? A.defaultView: null)
};
baidu.array = baidu.array || {};
baidu.array.each = function(F, D) {
	var C, E, B, A = F.length;
	if ("function" == typeof D) {
		for (B = 0; B < A; B++) {
			E = F[B];
			C = D.call(F, E, B);
			if (C === false) {
				break
			}
		}
	}
	return F
};
baidu.each = baidu.array.each;
baidu.isElement = function(A) {
	if (A === undefined || A === null) {
		return false
	}
	return A && A.nodeName && A.nodeType == 1
};
baidu.isText = function(A) {
	if (A === undefined || A === null) {
		return false
	}
	return A && A.nodeType == 3
};
baidu.browser = baidu.browser || {}; (function() {
	var A = navigator.userAgent;
	baidu.firefox = baidu.browser.firefox = /firefox\/(\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
	baidu.ie = baidu.browser.ie = /msie (\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
	baidu.opera = baidu.browser.opera = /opera\/(\d+\.\d)/i.test(A) ? parseFloat(RegExp.$1) : 0;
	baidu.safari = baidu.browser.safari = (/(\d+\.\d)\s+safari/i.test(A) && !/chrome/i.test(A)) ? parseFloat(RegExp.$1) : 0;
	try {
		baidu.browser.maxthon = /(\d+\.\d)/.test(external.max_version) ? parseFloat(RegExp.$1) : 0
	} catch(B) {
		baidu.browser.maxthon = 0
	}
	baidu.maxthon = baidu.browser.maxthon;
	baidu.isGecko = baidu.browser.isGecko = /gecko/i.test(A) && !/like gecko/i.test(A);
	baidu.isStrict = baidu.browser.isStrict = document.compatMode == "CSS1Compat";
	baidu.isWebkit = baidu.browser.isWebkit = /webkit/i.test(A)
})();
baidu.dom.getDocument = function(A) {
	return A.nodeType == 9 ? A: A.ownerDocument || A.document
};
baidu.dom.getParent = function(B) {
	var A = B.parentNode;
	return (A && baidu.isElement(A)) ? A: null
};
baidu.dom.getParents = function(B) {
	var A = [];
	do {
		A.unshift(B)
	} while ( B = baidu . dom . getParent ( B ));
	return A
};
baidu.dom.getIndex = function(C) {
	var B = C.parentNode && C.parentNode.firstChild;
	var A = -1;
	while (B) {
		A++;
		if (B == C) {
			return A
		}
		B = B.nextSibling
	}
	return - 1
};
baidu.dom.getCommonAncestor = function(B, A) {
	B = baidu.isElement(B) ? B: baidu.dom.getParent(B);
	A = baidu.isElement(A) ? A: baidu.dom.getParent(A);
	if (A === B) {
		return B
	}
	if (baidu.dom.element.contains(A, B)) {
		return A
	}
	do {
		if (baidu.dom.element.contains(B, A)) {
			return B
		}
	} while (( B = baidu . dom . getParent ( B )));
	return null
};
baidu.dom.insertAfter = function(B, A) {
	A.parentNode.insertBefore(B, A.nextSibling);
	return A
};
baidu.dom.clone = function(C, A, D) {
	var E = C.cloneNode(A);
	if (!D) {
		var B = function(G) {
			if (!baidu.isElement(G)) {
				return
			}
			G.removeAttribute("id", false);
			var H = G.childNodes;
			for (var F = 0; F < H.length; F++) {
				B(H[F])
			}
		};
		B(E)
	}
	return E
};
baidu.dom.getNext = function(B, C) {
	var A = B.nextSibling;
	while (C && A && (baidu.isText(A)) && !baidu.trim(A.nodeValue)) {
		A = A.nextSibling
	}
	return A
};
baidu.dom.getPrevious = function(B, C) {
	var A = B.previousSibling;
	while (C && A && (baidu.isText(A)) && !baidu.trim(A.nodeValue)) {
		A = A.previousSibling
	}
	return A ? A: null
};
baidu.dom.getAddress = function(D, F, G) {
	var C = [],
	E = F.documentElement;
	while (D && D != E) {
		var A = D.parentNode,
		B = -1,
		H = A.firstChild;
		while (H) {
			if (G && H.nodeType == 3 && H.previousSibling && H.previousSibling.nodeType == 3) {
				H = H.nextSibling;
				continue
			}
			B++;
			if (H == D) {
				break
			}
			H = H.nextSibling
		}
		C.unshift(B);
		D = D.parentNode
	}
	return C
};
baidu.dom.getByAddress = function(G, B, H) {
	G = G.documentElement;
	for (var D = 0; G && D < B.length; D++) {
		var F = B[D];
		if (!H) {
			G = G.childNodes[F];
			continue
		}
		var A = -1;
		for (var C = 0; C < G.childNodes.length; C++) {
			var E = G.childNodes[C];
			if (H === true && E.nodeType == 3 && E.previousSibling && E.previousSibling.nodeType == 3) {
				continue
			}
			A++;
			if (A == F) {
				G = E;
				break
			}
		}
	}
	return G ? G: null
};
baidu.dom.text = baidu.dom.text || {};
baidu.dom.text.getLength = function(A) {
	return A.nodeValue.length
};
baidu.dom.text.split = function(E, D, C) {
	if (baidu.ie && D == baidu.dom.text.getLength(E)) {
		var B = C.createTextNode("");
		baidu.dom.insertAfter(B, E);
		return B
	}
	var A = E.splitText(D);
	if ( !! document.documentMode) {
		baidu.dom.insertAfter(C.createTextNode(""), A)
	}
	return A
};
baidu.dom.element = baidu.dom.element || {};
baidu.dom.element.getChildCount = function(A) {
	return A.childNodes.length
};
baidu.dom.element.getChild = function(B, A) {
	if (!A.slice) {
		B = B.childNodes[A]
	} else {
		while (A.length > 0 && B) {
			B = B.childNodes[A.shift()]
		}
	}
	return B
};
baidu.dom.element.getName = function(B) {
	var C = B.nodeName.toLowerCase();
	if (baidu.ie) {
		var A = B.scopeName;
		if (A != "HTML") {
			C = A.toLowerCase() + ":" + C
		}
	}
	return C
};
baidu.dom.element.is = function(C) {
	var A = baidu.dom.element.getName(C);
	for (var B = 0; B < arguments.length; B++) {
		if (arguments[B] == A) {
			return true
		}
	}
	return false
};
baidu.dom.element.append = function(C, B, A) {
	if (A) {
		C.insertBefore(B, C.firstChild)
	} else {
		C.appendChild(B)
	}
	return B
};
baidu.dom.element.remove = function(A, B) {
	if (A && A.parentNode && A.nodeName != "BODY") {
		A.parentNode.removeChild(A)
	}
};
baidu.dom.element.contains = baidu.ie || baidu.isWebkit ?
function(B, A) {
	return ! baidu.isElement(A) ? B.contains(baidu.dom.getParent(A)) : B != A && B.contains(A)
}: function(B, A) {
	return !! (B.compareDocumentPosition(A) & 16)
};
baidu.dom.element.setAttr = function(C, A, D) {
	var B = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		height: "height",
		width: "width",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	if (baidu.isString(A)) {
		if (A == "style") {
			C.style.cssText = D
		} else {
			if (A == "class") {
				C.className = D
			} else {
				if (A == "for") {
					C.htmlFor = D
				} else {
					if (A in B) {
						C.setAttribute(B[A], D)
					} else {
						C[A] = D
					}
				}
			}
		}
	} else {
		for (var E in A) {
			if (typeof A[E] != "function") {
				baidu.setAttr(C, E, A[E])
			}
		}
	}
};
baidu.dom.element.setStyle = function() {
	var C = {},
	B = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	A = function(D, E) {
		return E.charAt(1).toUpperCase()
	};
	return function(G, D, H) {
		if (typeof D == "string") {
			var E;
			if (! (E = C[D])) {
				E = C[D] = D.replace(/(-[a-z])/gi, A)
			}
			var F = G.style;
			if (E == "opacity") {
				if ("opacity" in F) {
					F.opacity = H
				} else {
					if ("MozOpacity" in F) {
						F.MozOpacity = H
					} else {
						if ("filter" in F) {
							F.filter = (F.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (H == 1 ? "": "alpha(opacity=" + H * 100 + ")");
							F.zoom = 1
						}
					}
				}
			} else {
				if (H && H.constructor == Number && !B.test(D)) {
					H = H + "px"
				}
				F[E] = H
			}
		} else {
			for (var I in D) {
				if (typeof D[I] != "function") {
					baidu.setStyle(G, I, D[I])
				}
			}
		}
		return
	}
} ();
baidu.dom.element.hasAttribute = function(C, B) {
	var A = C.attributes.getNamedItem(B);
	return !! (A && A.specified)
};
baidu.editor.Range = function(A) {
	var B = this;
	B.startContainer = null;
	B.startOffset = null;
	B.endContainer = null;
	B.endOffset = null;
	B.document = A;
	B.collapsed = true
}; (function() {
	POSITION_AFTER_START = 1;
	POSITION_BEFORE_END = 2;
	POSITION_BEFORE_START = 3;
	POSITION_AFTER_END = 4;
	var B = function(C) {
		C.collapsed = (C.startContainer && C.endContainer && C.startContainer === C.endContainer && C.startOffset == C.endOffset)
	};
	var A = function(M, R, C) {
		M.optimizeBookmark();
		var Z = M.startContainer;
		var O = M.endContainer;
		var T = M.startOffset;
		var I = M.endOffset;
		var Q;
		var J;
		if (baidu.isText(O)) {
			O = baidu.dom.text.split(O, I, this.document)
		} else {
			var V;
			if ((V = baidu.dom.element.getChildCount(O)) > 0) {
				if (I >= V) {
					O = baidu.dom.element.append(O, M.document.createTextNode(""));
					J = true
				} else {
					O = baidu.dom.element.getChild(O, I)
				}
			}
		}
		if (baidu.isText(Z)) {
			baidu.dom.text.split(Z, T, this.document);
			if (Z === O) {
				O = baidu.dom.getNext(Z)
			}
		} else {
			if (!T) {
				Z = Z.insertBefore(M.document.createTextNode(""), Z.firstChild);
				Q = true
			} else {
				if (T >= baidu.dom.element.getChildCount(Z)) {
					Z = baidu.dom.element.append(Z, M.document.createTextNode(""));
					Q = true
				} else {
					Z = baidu.dom.getPrevious(baidu.dom.element.getChild(Z, T))
				}
			}
		}
		var W = baidu.dom.getParents(Z);
		var E = baidu.dom.getParents(O);
		var U, a, Y;
		for (U = 0; U < W.length; U++) {
			a = W[U];
			Y = E[U];
			if (! (a === Y)) {
				break
			}
		}
		var X = C,
		N, L, G, K;
		for (var S = U; S < W.length; S++) {
			N = W[S];
			if (X && !(N === Z)) {
				L = baidu.dom.element.append(X, baidu.dom.clone(N))
			}
			G = baidu.dom.getNext(N);
			while (G) {
				if (G === E[S] || G === O) {
					break
				}
				K = baidu.dom.getNext(G);
				if (R == 2) {
					baidu.dom.element.append(X, baidu.dom.clone(G, true))
				} else {
					if (R == 1) {
						baidu.dom.element.append(X, baidu.dom.clone(G, true))
					}
					baidu.dom.element.remove(G, C)
				}
				G = K
			}
			if (X) {
				X = L
			}
		}
		X = C;
		for (var P = U; P < E.length; P++) {
			N = E[P];
			if (R > 0 && !(N === O)) {
				L = baidu.dom.element.append(X, baidu.dom.clone(N))
			}
			if (!W[P] || N.parentNode != W[P].parentNode) {
				G = baidu.dom.getPrevious(N);
				while (G) {
					if (G === W[P] || G === Z) {
						break
					}
					K = baidu.dom.getPrevious(G);
					if (R == 2) {
						X.insertBefore(G.cloneNode(true), X.firstChild)
					} else {
						baidu.dom.element.remove(G, C);
						if (R == 1) {
							X.insertBefore(G, X.firstChild)
						}
					}
					G = K
				}
			}
			if (X) {
				X = L
			}
		}
		if (R == 2) {
			var D = M.startContainer;
			if (baidu.isText(D)) {
				D.data += D.nextSibling.data;
				D.parentNode.removeChild(D.nextSibling)
			}
			var H = M.endContainer;
			if (baidu.isText(H) && H.nextSibling) {
				H.data += H.nextSibling.data;
				H.parentNode.removeChild(H.nextSibling)
			}
		} else {
			if (a && Y && (Z.parentNode != a.parentNode || O.parentNode != Y.parentNode)) {
				var F = baidu.dom.getIndex(Y);
				if (Q && Y.parentNode == Z.parentNode) {
					F--
				}
				M.setStart(baidu.dom.getParent(Y), F)
			}
			M.collapse(true)
		}
		if (Q) {
			baidu.dom.element.remove(Z, C)
		}
		if (J && O.parentNode) {
			baidu.dom.element.remove(O, C)
		}
	};
	baidu.editor.Range.prototype = {
		deleteContents: function() {
			var C = this.document.createDocumentFragment();
			if (this.collapsed) {
				return
			}
			A(this, 0, C)
		},
		cloneContents: function() {
			var C = this.document.createDocumentFragment();
			if (!this.collapsed) {
				A(this, 2, C)
			}
			return C
		},
		extractContents: function() {
			var C = this.document.createDocumentFragment();
			if (!this.collapsed) {
				A(this, 1, C)
			}
			return C
		},
		clone: function() {
			var C = new baidu.editor.Range(this.document);
			C.startContainer = this.startContainer;
			C.startOffset = this.startOffset;
			C.endContainer = this.endContainer;
			C.endOffset = this.endOffset;
			C.collapsed = this.collapsed;
			return C
		},
		collapse: function(C) {
			if (C) {
				this.endContainer = this.startContainer;
				this.endOffset = this.startOffset
			} else {
				this.startContainer = this.endContainer;
				this.startOffset = this.endOffset
			}
			this.collapsed = true
		},
		select: baidu.ie ?
		function() {
			var G = this.collapsed;
			var C;
			var H;
			var K = this.createBookmark();
			var E = K.startNode;
			var I;
			if (!G) {
				I = K.endNode
			}
			var D = this.document.body.createTextRange();
			D.moveToElementText(E);
			D.moveStart("character", 1);
			if (I) {
				var J = this.document.body.createTextRange();
				J.moveToElementText(I);
				D.setEndPoint("EndToEnd", J);
				D.moveEnd("character", -1)
			} else {
				H = this.document.createElement("span");
				H.innerHTML = "&#65279;";
				E.parentNode.insertBefore(H, E);
				var F = this.document.createTextNode("\ufeff");
				E.parentNode.insertBefore(F, E)
			}
			this.setStartBefore(E);
			baidu.dom.element.remove(E, this.document);
			if (G) {
				D.moveStart("character", -1);
				D.select();
				this.document.selection.clear();
				baidu.dom.element.remove(H, this.document)
			} else {
				this.setEndBefore(I);
				baidu.dom.element.remove(I, this.document);
				D.select()
			}
		}: function() {
			var D = this.startContainer;
			if (this.collapsed && baidu.isElement(D) && !baidu.dom.element.getChildCount(D)) {
				baidu.dom.element.append(D, this.document.createTextNode(""))
			}
			var E = this.document.createRange();
			E.setStart(D, this.startOffset);
			try {
				E.setEnd(this.endContainer, this.endOffset)
			} catch(F) {
				if (F.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
					this.collapse(true);
					E.setEnd(this.endContainer, this.endOffset)
				} else {
					throw (F)
				}
			}
			var C = baidu.dom.getWindow(this.document).getSelection();
			C.removeAllRanges();
			C.addRange(E)
		},
		createBookmark: function(F) {
			var E, C;
			var D;
			var G;
			E = this.document.createElement("span");
			baidu.dom.element.setAttr(E, "_BaiduEditor_bm", 1);
			baidu.dom.element.setStyle(E, "display", "none");
			E.innerHTML = "&nbsp;";
			if (F) {
				D = "_BaiduEditor_bm" + Math.floor(Math.random() * 2147483648).toString(36);
				baidu.dom.element.setAttr(E, "id", D + "S")
			}
			if (!this.collapsed) {
				C = baidu.dom.clone(E);
				C.innerHTML = "&nbsp;";
				if (F) {
					baidu.dom.element.setAttr(C, "id", D + "E")
				}
				G = this.clone();
				G.collapse();
				G.insertNode(C)
			}
			G = this.clone();
			G.collapse(true);
			G.insertNode(E);
			if (C) {
				this.setStartAfter(E);
				this.setEndBefore(C)
			} else {
				this.moveToPosition(E, POSITION_AFTER_END)
			}
			return {
				startNode: F ? D + "S": E,
				endNode: F ? D + "E": C,
				serializable: F
			}
		},
		moveToPosition: function(D, C) {
			this.setStartAt(D, C);
			this.collapse(true)
		},
		createBookmark2: function(I) {
			var G = this.startContainer,
			H = this.endContainer;
			var C = this.startOffset,
			E = this.endOffset;
			var J, F;
			if (!G || !H) {
				return {
					start: 0,
					end: 0
				}
			}
			if (I) {
				if (baidu.isElement(G)) {
					J = baidu.dom.element.getChild(G, C);
					if (J && baidu.isText(J) && C > 0 && baidu.isText(baidu.dom.getPrevious(J))) {
						G = J;
						C = 0
					}
				}
				while (baidu.isText(G) && (F = baidu.dom.getPrevious(G)) && baidu.isText(F)) {
					G = F;
					C += baidu.dom.text.getLength(F)
				}
				if (!this.isCollapsed) {
					if (baidu.isElement(H)) {
						J = baidu.dom.element.getChild(H, E);
						if (J && baidu.isText(J) && E > 0 && baidu.isText(baidu.dom.getPrevious(J))) {
							H = J;
							E = 0
						}
					}
					while (baidu.isText(H) && (F = baidu.dom.getPrevious(H)) && baidu.isText(F)) {
						H = F;
						E += baidu.dom.text.getLength(F)
					}
				}
			}
			var D = baidu.dom.getAddress(G, this.document, I);
			return {
				start: D,
				end: this.isCollapsed ? D: baidu.dom.getAddress(H, this.document, I),
				startOffset: C,
				endOffset: E,
				normalized: I,
				is2: true
			}
		},
		moveToBookmark: function(H) {
			if (H.is2) {
				var I = baidu.dom.getByAddress(this.document, H.start, H.normalized),
				D = H.startOffset;
				var J = H.end && baidu.dom.getByAddress(this.document, H.end, H.normalized),
				F = H.endOffset;
				this.setStart(I, D);
				if (J) {
					this.setEnd(J, F)
				} else {
					this.collapse(true)
				}
			} else {
				var G = H.serializable,
				E = G ? this.document.getElementById(H.startNode) : H.startNode,
				C = G ? this.document.getElementById(H.endNode) : H.endNode;
				this.setStartBefore(E);
				baidu.dom.element.remove(E, this.document);
				if (C) {
					this.setEndBefore(C);
					baidu.dom.element.remove(C, this.document)
				} else {
					this.collapse(true)
				}
			}
		},
		setStart: function(D, C) {
			this.startContainer = D;
			this.startOffset = C;
			if (!this.endContainer) {
				this.endContainer = D;
				this.endOffset = C
			}
			B(this)
		},
		setEnd: function(C, D) {
			this.endContainer = C;
			this.endOffset = D;
			if (!this.startContainer) {
				this.startContainer = C;
				this.startOffset = D
			}
			B(this)
		},
		setStartBefore: function(C) {
			this.setStart(baidu.dom.getParent(C), baidu.dom.getIndex(C))
		},
		setStartAfter: function(C) {
			this.setStart(baidu.dom.getParent(C), baidu.dom.getIndex(C) + 1)
		},
		setEndAfter: function(C) {
			this.setEnd(baidu.dom.getParent(C), baidu.dom.getIndex(C) + 1)
		},
		setEndBefore: function(C) {
			this.setEnd(baidu.dom.getParent(C), baidu.dom.getIndex(C))
		},
		setStartAt: function(D, C) {
			switch (C) {
			case POSITION_AFTER_START:
				this.setStart(D, 0);
				break;
			case POSITION_BEFORE_END:
				if (baidu.isText(D)) {
					this.setStart(D, baidu.dom.text.getLength(D))
				} else {
					this.setStart(D, baidu.dom.element.getChildCount(D))
				}
				break;
			case POSITION_BEFORE_START:
				this.setStartBefore(D);
				break;
			case POSITION_AFTER_END:
				this.setStartAfter(D)
			}
			B(this)
		},
		setEndAt: function(D, C) {
			switch (C) {
			case POSITION_AFTER_START:
				this.setEnd(D, 0);
				break;
			case POSITION_BEFORE_END:
				if (baidu.isText(D)) {
					this.setEnd(D, baidu.dom.text.getLength(D))
				} else {
					this.setEnd(D, baidu.dom.element.getChildCount(D))
				}
				break;
			case POSITION_BEFORE_START:
				this.setEndBefore(D);
				break;
			case POSITION_AFTER_END:
				this.setEndAfter(D)
			}
			B(this)
		},
		getCommonAncestor: function(D, F) {
			var G = this.startContainer,
			C = this.endContainer,
			E;
			if (G === C) {
				if (D && baidu.isElement(G) && this.startOffset == this.endOffset - 1) {
					E = baidu.dom.element.getChild(G, this.startOffset)
				} else {
					E = G
				}
			} else {
				E = baidu.dom.getCommonAncestor(G, C)
			}
			return F && !baidu.isElement(E) ? baidu.dom.getParent(E) : E
		},
		optimizeBookmark: function() {
			var D = this.startContainer,
			C = this.endContainer;
			if (baidu.isElement(D) && baidu.dom.element.is(D, "span") && baidu.dom.element.hasAttribute(D, "_BaiduEditor_bm")) {
				this.setStartAt(D, POSITION_BEFORE_START)
			}
			if (C && baidu.isElement(C) && baidu.dom.element.is(C, "span") && baidu.dom.element.hasAttribute(C, "_BaiduEditor_bm")) {
				this.setEndAt(C, POSITION_AFTER_END)
			}
		},
		trim: function(F, I) {
			var G = this.startContainer,
			C = this.startOffset,
			J = this.collapsed;
			if ((!F || J) && G && baidu.isText(G)) {
				if (!C) {
					C = baidu.dom.getIndex(G);
					G = baidu.dom.getParent(G)
				} else {
					if (C >= baidu.dom.text.getLength(G)) {
						C = baidu.dom.getIndex(G) + 1;
						G = baidu.dom.getParent(G)
					} else {
						var E = baidu.dom.text.split(G, C, this.document);
						C = baidu.dom.getIndex(G) + 1;
						G = baidu.dom.getParent(G);
						if (!J && this.startContainer === this.endContainer) {
							this.setEnd(E, this.endOffset - this.startOffset)
						}
					}
				}
				this.setStart(G, C);
				if (J) {
					this.collapse(true)
				}
			}
			var H = this.endContainer;
			var D = this.endOffset;
			if (! (I || J) && H && baidu.isText(H)) {
				if (!D) {
					D = baidu.dom.getIndex(H);
					H = baidu.dom.getParent(H)
				} else {
					if (D >= baidu.dom.text.getLength(H)) {
						D = baidu.dom.getIndex(H) + 1;
						H = baidu.dom.getParent(H)
					} else {
						baidu.dom.text.split(H, D, this.document);
						D = baidu.dom.getIndex(H) + 1;
						H = baidu.dom.getParent(H)
					}
				}
				this.setEnd(H, D)
			}
		},
		insertNode: function(F) {
			this.optimizeBookmark();
			this.trim(false, true);
			var E = this.startContainer;
			var D = this.startOffset;
			var C = baidu.dom.element.getChild(E, D);
			if (C) {
				C.parentNode.insertBefore(F, C)
			} else {
				E.appendChild(F)
			}
			if (baidu.dom.getParent(F) === this.endContainer) {
				this.endOffset++
			}
			this.setStartBefore(F)
		},
		getTouchedStartNode: function() {
			var C = this.startContainer;
			if (this.collapsed || !baidu.isElement(C)) {
				return C
			}
			return baidu.dom.element.getChild(C, this.startOffset) || C
		},
		getTouchedEndNode: function() {
			var C = this.endContainer;
			if (this.collapsed || !baidu.isElement(C)) {
				return C
			}
			return baidu.dom.element.getChild(this.endOffset - 1) || C
		},
		optimize: function() {
			var C = this.startContainer;
			var D = this.startOffset;
			if (!baidu.isElement(C)) {
				if (!D) {
					this.setStartBefore(C)
				} else {
					if (D >= baidu.dom.text.getLength(C)) {
						this.setStartAfter(C)
					}
				}
			}
			C = this.endContainer;
			D = this.endOffset;
			if (!baidu.isElement(C)) {
				if (!D) {
					this.setEndBefore(C)
				} else {
					if (D >= baidu.dom.text.getLength(C)) {
						this.setEndAfter(C)
					}
				}
			}
		},
		walk: function(L) {
			var E = this.startContainer,
			H = this.startOffset,
			M = this.endContainer,
			I = this.endOffset,
			K = [{
				n: baidu.firefox && this.startContainer.nodeName.toUpperCase() == "TR" ? baidu.dom.getParent(this.getCommonAncestor(0, 1)) : this.getCommonAncestor(0, 1),
				i: 0
			}],
			G,
			J = false;
			function D(P, O, N) {
				try {
					if (J == -1 && !baidu.dom.element.contains(P, E)) {
						J = true
					}
					if (!J && (baidu.dom.getParent(P) == E && O == H)) {
						J = true
					}
					if (baidu.isText(P) && P == E) {
						if (baidu.dom.text.getLength(P) == H) {
							J = -1
						} else {
							if (!J) {
								J = true
							}
						}
					}
					if (!N) {
						return
					}
					if (baidu.isText(P) && P == M && I == 0) {
						J = false
					}
					if (J == true || (J == -2 && P == M)) {
						L(P)
					}
					if (baidu.dom.getParent(P) == M && O + 1 == I) {
						J = -2
					}
					if (baidu.isText(P) && P == M) {
						J = false
					}
				} catch(Q) {}
			}
			while (G = K.pop()) {
				var C = G.n,
				F = cri = G.i;
				D(C, cri, false);
				while (C.childNodes[cri] != undefined) {
					K.push({
						n: C,
						i: cri
					});
					C = C.childNodes[cri];
					D(C, cri, false);
					F = cri;
					cri = 0
				}
				D(C, F, true);
				if (K.length) {
					K[K.length - 1].i++
				}
			}
		},
		dispose: function() {
			for (var C in this) {
				if (typeof this[C] != "function") {
					delete this[C]
				}
			}
		}
	}
})();
var SELECTION_NONE = 0;
var SELECTION_TEXT = 2;
var SELECTION_CONTROL = 3;
var styleObjectElements = {
	img: 1,
	hr: 1,
	li: 1,
	table: 1,
	tr: 1,
	td: 1,
	embed: 1,
	object: 1,
	ol: 1,
	ul: 1,
	a: 1,
	input: 1,
	form: 1,
	select: 1,
	textarea: 1,
	button: 1,
	fieldset: 1,
	th: 1,
	thead: 1,
	tfoot: 1
};
baidu.editor.Editor.prototype.getSelection = function() {
	var B = this;
	if (!B.selection) {
		var A = B.document;
		B.selection = {
			getNative: baidu.ie ?
			function() {
				return A.selection
			}: function() {
				return baidu.dom.getWindow(A).getSelection()
			},
			getNativeRange: function() {
				if (baidu.ie) {
					var C = this.getNative(),
					D = C.createRange();
					if (C.type.toUpperCase() != "CONTROL" && baidu.dom.getDocument(D.parentElement()) != B.document) {
						range = B.ieBakRange;
						if (range) {
							return range
						}
					}
					return D
				} else {
					throw new Error("[baidu.editor.selection.getNativeRange] only support ie now!")
				}
			},
			getType: baidu.ie ?
			function() {
				var C = SELECTION_NONE;
				try {
					var E = this.getNative(),
					F = E.type;
					if (E.createRange().parentElement) {
						C = SELECTION_TEXT
					}
					if (F.toUpperCase() != "CONTROL" && baidu.dom.getDocument(E.createRange().parentElement()) != B.document) {
						if (!B.ieBakRange) {
							return SELECTION_NONE
						}
						F = B.ieBakRangeType
					}
					if (F == "Text") {
						C = SELECTION_TEXT
					}
					if (F == "Control") {
						C = SELECTION_CONTROL
					}
				} catch(D) {}
				return C
			}: function() {
				var D = SELECTION_TEXT;
				var F = this.getNative();
				if (!F) {
					D = SELECTION_NONE
				} else {
					if (F.rangeCount == 1) {
						var C = F.getRangeAt(0),
						E = C.startContainer;
						if (E == C.endContainer && E.nodeType == 1 && (C.endOffset - C.startOffset) == 1 && styleObjectElements[E.childNodes[C.startOffset].nodeName.toLowerCase()]) {
							D = SELECTION_CONTROL
						}
					}
				}
				return D
			},
			getRanges: baidu.ie ? (function() {
				var C = function(I, E) {
					I = I.duplicate();
					I.collapse(E);
					var K = I.parentElement();
					var F = K.firstChild;
					var G, H = 0;
					while (F) {
						if (F.nodeType == 1) {
							G = I.duplicate();
							G.moveToElementText(F);
							G.collapse();
							var L = G.compareEndPoints("StartToStart", I);
							if (L > 0) {
								break
							} else {
								if (L === 0) {
									return {
										container: K,
										offset: H
									}
								}
							}
							G = null
						}
						F = F.nextSibling;
						H++
					}
					if (!G) {
						G = I.duplicate();
						G.moveToElementText(K);
						G.collapse(false)
					}
					G.setEndPoint("StartToStart", I);
					var D = G.text.length;
					var J = K.childNodes;
					while (D > 0 && H--) {
						F = J[H];
						D -= F.nodeValue ? F.nodeValue.length: 0
					}
					if (D === 0) {
						return {
							container: K,
							offset: H
						}
					} else {
						if (D > 0) {
							return {
								container: K,
								offset: 0
							}
						} else {
							return {
								container: J[H],
								offset: -D
							}
						}
					}
				};
				return function() {
					var F = this.getNative(),
					K = F && F.createRange(),
					L = this.getType(),
					J;
					if (!F) {
						return []
					}
					if (L != SELECTION_CONTROL && F.createRange().parentElement().ownerDocument != B.document) {
						K = B.ieBakRange;
						if (!K) {
							return []
						}
						L = B.ieBakRangeType.toUpperCase() == "CONTROL" ? SELECTION_CONTROL: (B.ieBakRangeType.toUpperCase() == "TEXT" ? SELECTION_TEXT: SELECTION_NONE)
					}
					if (L === SELECTION_TEXT) {
						J = this.createRange();
						var D = C(K, true);
						J.setStart(D.container, D.offset);
						D = C(K);
						J.setEnd(D.container, D.offset);
						return [J]
					} else {
						if (L == SELECTION_CONTROL) {
							var E = [];
							for (var H = 0; H < K.length; H++) {
								var I = K.item(H),
								M = I.parentNode,
								G = 0;
								J = this.createRange();
								for (; G < M.childNodes.length && M.childNodes[G] != I; G++) {}
								J.setStart(M, G);
								J.setEnd(M, G + 1);
								E.push(J)
							}
							return E
						}
					}
					return []
				}
			})() : function() {
				var C = [];
				var G = this.getNative();
				if (!G) {
					return []
				}
				for (var E = 0; E < G.rangeCount; E++) {
					var F = G.getRangeAt(E);
					var D = this.createRange();
					D.setStart(F.startContainer, F.startOffset);
					D.setEnd(F.endContainer, F.endOffset);
					C.push(D)
				}
				return C
			},
			createRange: function() {
				return new baidu.editor.Range(A)
			},
			selectRanges: function(C) {
				if (baidu.ie) {
					if (C[0]) {
						C[0].select()
					}
				} else {
					var G = this.getNative();
					G.removeAllRanges();
					for (var E = 0; E < C.length; E++) {
						var D = C[E];
						var F = A.createRange();
						F.setStart(D.startContainer, D.startOffset);
						F.setEnd(D.endContainer, D.endOffset);
						G.addRange(F)
					}
				}
			},
			setCursor: function(E, C) {
				var D = this.createRange(A);
				D.setStartAt(E, C);
				D.collapse(true);
				this.selectRanges([D])
			},
			selectElement: function(C) {
				var D = this;
				if (baidu.ie) {
					D.getNative().empty();
					try {
						range = A.body.createControlRange();
						range.addElement(C);
						range.select()
					} catch(F) {
						range = A.body.createTextRange();
						range.moveToElementText(C);
						range.select()
					}
				} else {
					range = A.createRange();
					range.selectNode(C);
					var E = D.getNative();
					E.removeAllRanges();
					E.addRange(range)
				}
			},
			pasteElements: function(F, C) {
				var E = this;
				range = E.getRanges()[0];
				range.deleteContents();
				for (var D = F.length - 1; D >= 0; D--) {
					range.insertNode(F[D])
				}
				if (C) {
					range.setStartBefore(F[F.length - 1]);
					range.setEndAfter(F[0]);
					range.select()
				} else {
					E.setCursor(F[F.length - 1], 4)
				}
			},
			pasteElement: function(E, D) {
				var F = this,
				C = F.getRanges()[0];
				C.deleteContents();
				C.insertNode(E);
				if (D) {
					B.selection.selectElement(E)
				} else {
					F.setCursor(E, 4)
				}
			},
			getText: function(C) {
				if (baidu.ie) {
					var D = B.document.selection.createRange(),
					E = C ? D.text: baidu.trim(D.text);
					return E.replace("\r\n", "")
				} else {
					var D = B.window.getSelection().getRangeAt(0),
					E = C ? D.toString() : baidu.trim(D.toString());
					return E.replace("\n", "")
				}
			},
			getTextNodes: function() {
				var E = this;
				var C = E.getRanges();
				var F = [];
				for (var D = 0; D < C.length; D++) {
					C[D].walk(function(G) {
						if (G.nodeType == 3) {
							F.push(G)
						}
					})
				}
				return F
			},
			getSelectedElement: function() {
				var D;
				if (this.getType() == SELECTION_CONTROL) {
					var E = this.getNative();
					if (baidu.ie) {
						try {
							D = E.createRange().item(0)
						} catch(F) {}
					} else {
						var C = E.getRangeAt(0);
						D = C.startContainer.childNodes[C.startOffset]
					}
				}
				return D
			}
		}
	}
	return B.selection
};
baidu.editor.Editor.prototype.undo = function() {
	this.execCommand("Undo")
};
baidu.editor.Editor.prototype.redo = function() {
	this.execCommand("Redo")
}; (function() {
	function B(E) {
		var D = this;
		D.editor = E;
		E.addEventListener("onneedsavescene",
		function(F) {
			D.save(false)
		})
	}
	B.prototype.undoList = [];
	B.prototype.undoIndex = 0;
	B.prototype.getScene = function() {
		var F = {
			bookmarks: []
		};
		var D = this.editor.getSelection().getRanges();
		for (var E = D.length - 1; E >= 0; E--) {
			if (D[E]) {
				F.bookmarks.push(D[E].createBookmark2(true))
			} else {
				F.bookmarks.push(false)
			}
		}
		F.content = this.editor.getContent();
		return F
	};
	B.prototype.applyScene = function(G) {
		if (!G) {
			return
		}
		this.editor.setContent(G.content);
		var D = [];
		for (var F = G.bookmarks.length - 1; F >= 0; F--) {
			if (G.bookmarks[F]) {
				var E = this.editor.getSelection().createRange();
				E.moveToBookmark(G.bookmarks[F]);
				D.push(E)
			}
		}
		this.editor.getSelection().selectRanges(D);
		this.undoIndex = G.index;
		this.currentScene = G;
		this.fireChange()
	};
	B.prototype.save = function(E, G, H) {
		var F = this.currentScene;
		if (!G) {
			G = this.getScene()
		}
		if (E && F && F.content == G.content) {
			return
		}
		this.undoList = this.undoList.slice(0, this.undoIndex + 1);
		this.undoList.push(G);
		var D = this.undoList.length;
		if (D > baidu.editor.EditorConfig.maxUndoCount) {
			this.undoList = this.undoList.slice(D - baidu.editor.EditorConfig.maxUndoCount, D)
		}
		this.undoIndex = this.undoList.length - 1;
		this.currentScene = G;
		if (H !== false) {
			this.fireChange()
		}
		return true
	};
	B.prototype.getNextScene = function(E) {
		var D = this.undoList,
		G = this.currentScene,
		H, F;
		if (G) {
			if (E) {
				for (F = this.undoIndex - 1; F >= 0; F--) {
					H = D[F];
					if (G.content != H.content) {
						H.index = F;
						return H
					}
				}
			} else {
				for (F = this.undoIndex + 1; F < D.length; F++) {
					H = D[F];
					if (G.content != H.content) {
						H.index = F;
						return H
					}
				}
			}
		}
		return null
	};
	B.prototype.fireChange = function() {
		this.hasUndo = !!this.getNextScene(true);
		this.hasRedo = !!this.getNextScene(false);
		this.resetType()
	};
	B.prototype.resetType = function() {
		this.typing = false;
		delete this.lastKeystroke;
		this.typesCount = 0;
		this.modifiersCount = 0
	};
	baidu.editor.register(function(F) {
		var E = new B(F);
		F.undoMan = E;
		function D(I) {
			var I = F.window.event || I;
			var H = I.keyCode || I.which;
			modifierCodes = {
				8 : 1,
				46 : 1
			},
			isModifier = H in modifierCodes,
			wasModifier = E.lastKeyCode in modifierCodes,
			lastWasSameModifier = isModifier && H == E.lastKeyCode,
			resetTypingCodes = {
				37 : 1,
				38 : 1,
				39 : 1,
				40 : 1
			},
			isReset = H in resetTypingCodes,
			wasReset = E.lastKeyCode in resetTypingCodes,
			isContent = (!isModifier && !isReset),
			modifierSnapshot = (isModifier && !lastWasSameModifier),
			startedTyping = !E.typing || (isContent && (wasModifier || wasReset));
			if (startedTyping || modifierSnapshot) {
				var G = E.getScene();
				function J() {
					var K = F.getContent();
					if (G.content != K) {
						if (!E.save(true, G, false)) {
							E.undoList = E.undoList.slice(0, E.undoIndex + 1)
						}
						E.hasUndo = true;
						E.hasRedo = false;
						E.typesCount = 1;
						E.modifiersCount = 1
					}
				}
				setTimeout(function() {
					J()
				},
				0)
			}
			E.lastKeyCode = H;
			if (isModifier) {
				E.typesCount = 0;
				E.modifiersCount++;
				if (E.modifiersCount > 25) {
					E.save(true);
					E.modifiersCount = 1
				}
			} else {
				if (!isReset) {
					E.modifiersCount = 0;
					E.typesCount++;
					if (E.typesCount > 25) {
						E.save(true);
						E.typesCount = 1
					}
				}
			}
			E.typing = true
		}
		F.addEventListener("onkeydown", D, false);
		F.addEventListener("onbeforeexeccommand",
		function(G) {
			if (!G.target.topOpearation || G.target.command == "Undo" || G.target.command == "Redo") {
				return
			}
			E.save(false)
		});
		F.addEventListener("onafterexeccommand",
		function(G) {
			if (!G.target.topOpearation || G.target.command == "Undo" || G.target.command == "Redo") {
				return
			}
			E.save(false)
		});
		E.save(true)
	});
	function C(D) {
		if (!D.undoMan.hasUndo) {
			return
		}
		if (D.undoMan.undoIndex == D.undoMan.undoList.length - 1) {
			D.undoMan.save(false)
		}
		D.undoMan.applyScene(D.undoMan.getNextScene(true))
	}
	function A(D) {
		if (!D.undoMan.hasRedo) {
			return
		}
		if (D.undoMan.undoIndex == D.undoMan.undoList.length - 1) {
			return
		}
		D.undoMan.applyScene(D.undoMan.getNextScene(false))
	}
	baidu.editor.registCommand("Undo",
	function(D) {
		C(D)
	});
	baidu.editor.registCommand("Redo",
	function(D) {
		A(D)
	});
	baidu.editor.registQuery("Undo",
	function(D) {
		return D.undoMan.hasUndo
	});
	baidu.editor.registQuery("Redo",
	function(D) {
		return D.undoMan.hasRedo
	})
})();
baidu.editor.Editor.prototype.autoHeight = function() {
	var D = this,
	C = 20,
	B = 32000,
	F = 500,
	H = D.document.createElement("DIV"),
	G,
	A;
	if (!D.document.body) {
		return
	}
	H.style.clear = "both";
	H.style.display = "block";
	D.document.body.appendChild(H);
	G = Math.max(H.offsetTop + C, D.height);
	A = G + "px";
	baidu.dom.element.remove(H, this.document);
	if (D.disableAutoheight || baidu.firefox && G > B) {
		if (D.iframe.style.height == F + "px") {
			return
		}
		D.document.body.style.overflowY = "scroll";
		D.iframe.style.height = F + "px";
		D.disableAutoheight = true
	} else {
		if (D.iframe.style.height == A) {
			return
		}
		D.document.body.style.overflowY = "hidden";
		D.iframe.style.height = A;
		if (baidu.ie && this.document.selection.type.toUpperCase() != "NONE") {
			var E = this.document.selection.createRange();
			E.scrollIntoView()
		}
	}
};
baidu.editor.register(function(A) {
	if (A.readyState != 4) {
		return
	}
	A.autoHeight();
	baidu.on(A.window, "resize",
	function() {
		A.autoHeight()
	});
	baidu.on(A.document, "keydown",
	function(C) {
		C = A.window.event || C;
		var B = C.keyCode || C.which;
		if (B != 27 && B != 16 && B != 17 && B != 18) {
			A.autoHeight()
		}
	});
	A.addEventListener("onselectionchange",
	function() {
		A.autoHeight()
	},
	false);
	A.addEventListener("onwysiwygready",
	function() {
		A.autoHeight()
	},
	false)
});
baidu.editor.Editor.prototype.bold = function() {
	this.execCommand("Bold");
	this.dispatchEvent(new baidu.BaseEvent("onbold"))
};
baidu.editor.Editor.prototype.underline = function() {
	this.execCommand("Underline");
	this.dispatchEvent(new baidu.BaseEvent("onunderline"))
}; (function() {
	var A = baidu.editor.Editor.prototype.getFilter = function() {
		var D = this;
		if (!D._filter) {
			var C = D._filter = new(function() {
				var F = {},
				G = D.document.getElementsByTagName("*").length;
				this.add = function(I, H) {
					H = H || "key_" + (new Date()).getTime();
					F[H] = I
				};
				this.remove = function(H) {
					delete F[H]
				};
				var E = this.builder = new B(D);
				this.filter = function(I) {
					E._process(I);
					for (var H in F) {
						F[H](I)
					}
				};
				D.addEventListener("onafterexeccommand",
				function(H) {
					G = D.document.getElementsByTagName("*").length
				});
				D.addEventListener("onselectionchange",
				function(L) {
					var H = D.document.getElementsByTagName("*").length,
					K,
					J,
					I;
					if (baidu.ie) {
						K = D.document.selection.createRange()
					} else {
						K = D.window.getSelection().getRangeAt(0)
					}
					if (H == G) {
						return
					} else {
						if (H <= G * 0.8 || H >= G * 1.2) {
							G = H;
							J = D.document.body
						} else {
							G = H;
							if (!baidu.ie) {
								J = baidu.dom.getCommonAncestor(K.startContainer, K.endContainer)
							} else {
								I = D.document.selection;
								if (I.type.toUpperCase() != "CONTROL") {
									J = K.parentElement();
									if (baidu.dom.getDocument(J) != D.document) {
										J = D.document.body
									}
								} else {
									J = D.document.body
								}
							}
						}
					}
					C.filter(J)
				})
			})()
		}
		return D._filter
	};
	var B = function(F) {
		var E = {};
		var C = {};
		var D = [];
		var H = function() {
			this.attribute = {};
			this.allow = {};
			this.except = {};
			this.text = false;
			this.html = false;
			this.delegates = []
		};
		var G = false;
		this.element = function(K) {
			G = true;
			D = [];
			var J = K.split(",");
			for (var I = 0; I < J.length; I++) {
				J[I] = J[I].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
				D.push(J[I]);
				if (!E[J[I]]) {
					E[J[I]] = new H()
				}
			}
			return this
		};
		this.allow = function(L) {
			var K = L.split(",");
			for (var J = 0; J < K.length; J++) {
				K[J] = K[J].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
				for (var I = 0; I < D.length; I++) {
					E[D[I]].allow[K[J]] = true
				}
			}
			return this
		};
		this.except = function(L) {
			var K = L.split(",");
			for (var J = 0; J < K.length; J++) {
				K[J] = K[J].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
				for (var I = 0; I < D.length; I++) {
					E[D[I]].except[K[J]] = true
				}
			}
			return this
		};
		this.attribute = function(L) {
			var I = L.split(",");
			for (var K = 0; K < I.length; K++) {
				I[K] = I[K].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
				for (var J = 0; J < D.length; J++) {
					E[D[J]].attribute[I[K]] = true
				}
			}
			return this
		};
		this.text = function() {
			for (var I = 0; I < D.length; I++) {
				E[D[I]].text = true
			}
			return this
		};
		this.html = function() {
			for (var I = 0; I < D.length; I++) {
				E[D[I]].html = true
			}
			return this
		};
		this.delegate = function(J) {
			for (var I = 0; I < D.length; I++) {
				E[D[I]].delegates.push(J)
			}
			return this
		};
		this.eliminate = function(K) {
			G = true;
			D = [];
			var J = K.split(",");
			for (var I = 0; I < J.length; I++) {
				J[I] = J[I].replace(/(^\s+|\s+$)/ig, "").toLowerCase();
				if (!C[J[I]]) {
					C[J[I]] = true
				}
			}
			return this
		};
		this._process = function(N) {
			if (!G) {
				return
			}
			var M = N.tagName ? E[N.tagName.toLowerCase()] : null;
			while (!M && N.parentNode && N != F.document.body) {
				N = N.parentNode;
				M = N.tagName ? E[N.tagName.toLowerCase()] : null
			}
			M = N.tagName ? E[N.tagName.toLowerCase()] : null;
			if (!M) {
				return
			}
			var Q = M.delegates.length;
			for (var O = 0; O < Q; O++) {
				M.delegates[O](N)
			}
			var L = N.attributes;
			for (var O = L.length - 1; O >= 0; O--) {
				var K = L[O];
				if (!M.attribute[K.name.toLowerCase()]) {
					N.removeAttribute(K.name)
				}
			}
			if (N.className && !M.attribute["class"]) {
				N.className = ""
			}
			var J = N.lastChild;
			while (J) {
				var R = J.previousSibling;
				switch (J.nodeType) {
				case 1:
					var I = J.tagName.toLowerCase();
					if (((M.html && E[I]) || M.allow[I]) && !M.except[I] && !C[I]) {
						arguments.callee(J)
					} else {
						if (M.text && !C[I]) {
							var P = J.innerHTML;
							for (key in C) {
								P = P.replace(new RegExp("<" + key + "[\\s\\S]*?>[\\s\\S]*?</" + key + ">", "ig"), "")
							}
							P = P.replace(/<[\s\S]*?>/ig, "").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
							N.insertBefore(F.document.createTextNode(P), J);
							N.removeChild(J)
						} else {
							N.removeChild(J)
						}
					}
					break;
				case 3:
					if (!M.text) {
						N.removeChild(J)
					}
					break
				}
				J = R
			}
		}
	}
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("span").attribute("style").html().text().element("b,strong").html().text()
}); (function() {
	var K = {},
	H = true;
	var I = 1,
	B = 2,
	G = 3,
	E = 4,
	F = 5,
	J = 6;
	function L(O, N, M) {
		var P = this;
		P.context = N,
		P.range = M;
		P.nodeInRange = function(Q) {
			P.context.contains.push(Q);
			var R = Q.lastChild;
			while (R) {
				P.context.contains.push(R);
				R = R.previousSibling
			}
		};
		P.nodePartlyInRange = function(Q, R) {
			P.context.partlyContains.push(Q);
			if (R) {
				var S = Q.lastChild;
				while (S) {
					if (P.process(S) == E) {
						break
					}
					S = S.previousSibling
				}
			} else {
				var S = Q.firstChild;
				while (S) {
					if (P.process(S) == G) {
						break
					}
					S = S.nextSibling
				}
			}
		};
		P.rangeInNode = function(U, V, R) {
			if (P.context.parents[0] != U) {
				P.context.parents.unshift(U)
			}
			var Q = Math.floor((R + V) / 2);
			while (R >= V) {
				var T = U.childNodes[Q],
				S = P.compareRangeWithNode(T, M);
				if (S == G) {
					R = Q - 1
				} else {
					if (S == E) {
						V = Q + 1
					} else {
						if (S == J) {
							P.rangeInNode(T, 0, T.childNodes.length - 1);
							break
						} else {
							if (S == F) {
								P.nodeInRange(T);
								if (V <= Q - 1) {
									P.rangeInNode(U, V, Q - 1)
								}
								if (Q + 1 <= R) {
									P.rangeInNode(U, Q + 1, R)
								}
								break
							} else {
								if (S == I) {
									P.nodePartlyInRange(T, true);
									V = Q + 1
								} else {
									if (S == B) {
										P.nodePartlyInRange(T, false);
										R = Q - 1
									}
								}
							}
						}
					}
				}
				Q = Math.floor((R + V) / 2)
			}
		};
		P.process = function(Q) {
			var R = P.compareRangeWithNode(Q, P.range);
			if (R == F) {
				P.nodeInRange(Q)
			} else {
				if (R == I || R == B) {
					P.nodePartlyInRange(Q, R == I)
				} else {
					if (R == J) {
						P.rangeInNode(Q, 0, Q.childNodes.length - 1)
					}
				}
			}
			return R
		};
		P.compareRangeWithNode = function(V, R) {
			if (baidu.ie) {
				var U = O.document.body.createTextRange();
				if (V.nodeType == 1) {
					U.moveToElementText(V)
				} else {
					var S = O.document.createElement("a");
					V.parentNode.insertBefore(S, V);
					var b = O.document.body.createTextRange();
					b.moveToElementText(S);
					S.parentNode.removeChild(S);
					U.setEndPoint("StartToStart", b);
					S = O.document.createElement("a");
					V.parentNode.insertBefore(S, V.nextSibling);
					var b = O.document.body.createTextRange();
					b.moveToElementText(S);
					S.parentNode.removeChild(S);
					U.setEndPoint("EndToStart", b)
				}
				var T = R.compareEndPoints("StartToStart", U),
				Z = R.compareEndPoints("EndToStart", U),
				Q = R.compareEndPoints("StartToEnd", U),
				W = R.compareEndPoints("EndToEnd", U)
			} else {
				var a = O.document.createRange();
				if (baidu.isText(V) && V.parentNode.childNodes.length == 1) {
					V = V.parentNode
				}
				a.selectNode(V);
				var Y = O.document.createRange();
				Y.selectNodeContents(V);
				var X;
				var T = (X = R.compareBoundaryPoints(Range.START_TO_START, a)) == R.compareBoundaryPoints(Range.START_TO_START, Y) ? X: 0,
				Q = (X = R.compareBoundaryPoints(Range.END_TO_START, a)) == R.compareBoundaryPoints(Range.END_TO_START, Y) ? X: 0,
				Z = (X = R.compareBoundaryPoints(Range.START_TO_END, a)) == R.compareBoundaryPoints(Range.START_TO_END, Y) ? X: 0,
				W = (X = R.compareBoundaryPoints(Range.END_TO_END, a)) == R.compareBoundaryPoints(Range.END_TO_END, Y) ? X: 0
			}
			if (T <= 0 && W >= 0) {
				return F
			}
			if (T >= 0 && W <= 0) {
				return J
			}
			if (T * Z == -1) {
				return B
			}
			if (Q * W == -1) {
				return I
			}
			if (T <= 0 && Z <= 0) {
				return G
			}
			if (Q >= 0 && W >= 0) {
				return E
			}
		}
	}
	K.w3cParser = function(R) {
		function S(U) {
			if (U.startContainer.nodeType == 3 && U.startContainer.nodeValue.length == U.startOffset) {
				U.setStartAfter(U.startContainer)
			}
			if (U.endContainer.nodeType == 3 && U.endOffset == 0) {
				U.setEndBefore(U.endContainer)
			}
			return U
		}
		var T = new Array(),
		Q = R.window.getSelection();
		for (var O = 0; O < Q.rangeCount; O++) {
			var M = S(Q.getRangeAt(O));
			context = {
				parents: [],
				collapsed: false,
				contains: [],
				partlyContains: []
			};
			if (M.collapsed) {
				context.collapsed = true;
				var P = M.startContainer;
				do {
					context.parents.push(P);
					P = P.parentNode
				} while ( P . parentNode && P . nodeName != "HTML")
			} else {
				var N = M.commonAncestorContainer,
				P = baidu.isText(N) ? baidu.dom.getParent(N) : N;
				do {
					context.parents.push(P);
					P = P.parentNode
				} while ( P . parentNode && P . nodeName != "HTML"); (new L(R, context, M)).process(N)
			}
			T.push(context)
		}
		return T
	};
	K.ieParser = function(Q) {
		var N = "CONTROL",
		P = Q.document.selection,
		O = P.type,
		M, R = [{
			collapsed: [],
			parents: [],
			contains: [],
			partlyContains: []
		}];
		if (O.toUpperCase() != N && P.createRange().parentElement().ownerDocument != Q.document) {
			M = Q.ieBakRange;
			if (!M) {
				return R
			}
			O = Q.ieBakRangeType
		} else {
			M = P.createRange()
		}
		if (O.toUpperCase() == N) {
			return C(Q, M)
		} else {
			return A(Q, M)
		}
	};
	function C(Q, N) {
		var R = N.commonParentElement(),
		P = Q.document.selection,
		O = {
			collapsed: false,
			parents: [],
			contains: [],
			partlyContains: []
		};
		do {
			O.parents.push(R);
			R = R.parentNode
		} while ( R . nodeName . toUpperCase () != "HTML");
		var M = [];
		M.push(N.item(0));
		while (M.length > 0) {
			var R = M.pop(),
			S = R.lastChild;
			while (S) {
				M.push(S);
				S = S.previousSibling
			}
			O.contains.push(R)
		}
		return [O]
	}
	function A(N, M) {
		var P = new Array();
		context = {
			collapsed: false,
			parents: [],
			contains: [],
			partlyContains: []
		};
		if (D(M)) {
			context.collapsed = true
		}
		P.push(context);
		var O = M.parentElement();
		do {
			context.parents.push(O);
			O = O.parentNode
		} while ( O . nodeName . toUpperCase () != "HTML"); (new L(N, context, M)).process(M.parentElement());
		return P
	}
	function D(N) {
		try {
			var M = N.duplicate(),
			P = N.duplicate();
			M.collapse(true);
			P.collapse(false);
			return M.inRange(P)
		} catch(O) {
			return false
		}
	}
	baidu.editor.Editor.prototype.getContexts = function() {
		var O = this;
		if (H) {
			function M() {
				var P;
				if (baidu.ie) {
					P = K.ieParser(O)
				} else {
					P = K.w3cParser(O)
				}
				if (P) {
					O.contextsInfo = P
				}
			}
			O.addEventListener("onbeforeselectionchange",
			function(P) {
				M()
			});
			M();
			H = false
		}
		if (!O.contextsObj) {
			O.contextsObj = {
				containNode: function(V, W) {
					function P(k, b, f) {
						var Z = [],
						h = -1;
						for (var a = b.length - 1; a >= 0; a--) {
							Z = Z.concat(b[a])
						}
						b = Z;
						if (!b) {
							return h
						}
						for (var a = b.length - 1; a >= 0; a--) {
							var c = b[a];
							try {
								if (c.ownerDocument != O.document) {
									continue
								}
							} catch(g) {
								continue
							}
							if (baidu.isText(c)) {
								if (baidu.trim(c.nodeValue)) {
									c = baidu.dom.getParent(c)
								}
							}
							if (!c) {
								continue
							}
							if (f.toLowerCase().indexOf("," + c.nodeName.toLowerCase() + ",") != -1) {
								continue
							}
							if (k.toLowerCase().indexOf("," + c.nodeName.toLowerCase() + ",") == -1) {
								if (h == 1) {
									return 2
								}
								h = 0
							} else {
								if (h == 0) {
									return 2
								}
								h = 1
							}
						}
						return h
					}
					V = "," + V + ",";
					W = "," + W + ",";
					var R = this;
					var T = false,
					U = false;
					for (var S = R.contains.length - 1; S >= 0; S--) {
						if (R.contains[S].length) {
							T = true
						}
						if (R.partlyContains[S].length) {
							U = true
						}
					}
					if (T || U) {
						var Y = P(V, R.contains, W),
						X = P(V, R.partlyContains, W);
						if ((X == 2) && (Y == -1 || Y == 0)) {
							return 2
						}
						if ((X != -1 || Y != -1) && (Y == 1 || Y == -1) && (X == 1 || X == -1)) {
							return 1
						}
						if (X > 0 || Y > 0) {
							return 2
						}
					}
					var Q = P(V, R.parents, W);
					if (Q == 2 || Q == 1) {
						return 3
					}
					return 0
				},
				walkTextNode: function(R) {
					var U = this,
					P = [];
					function Q(X) {
						for (var W = X.length - 1; W >= 0; W--) {
							for (var V = X[W].length - 1; V >= 0; V--) {
								if (baidu.isText(X[W][V]) && baidu.trim(X[W][V].nodeValue)) {
									P.push(X[W][V])
								}
							}
						}
					}
					Q(U.contains);
					Q(U.partlyContains);
					for (var S = U.parents.length - 1; S >= 0; S--) {
						try {
							if (U.parents[S][0].ownerDocument != O.document) {
								continue
							}
						} catch(T) {
							continue
						}
						if (baidu.isText(U.parents[S][0]) && baidu.trim(U.parents[S][0].nodeValue)) {
							P.push(U.parents[S][0])
						}
					}
					for (var S = P.length - 1; S >= 0; S--) {
						R(P[S])
					}
				}
			}
		}
		O.contextsObj.collapsed = [];
		O.contextsObj.parents = [];
		O.contextsObj.contains = [];
		O.contextsObj.partlyContains = [];
		for (var N = O.contextsInfo.length - 1; N >= 0; N--) {
			O.contextsObj.collapsed.push(O.contextsInfo[N].collapsed);
			O.contextsObj.parents.push(O.contextsInfo[N].parents);
			O.contextsObj.contains.push(O.contextsInfo[N].contains);
			O.contextsObj.partlyContains.push(O.contextsInfo[N].partlyContains)
		}
		return O.contextsObj
	}
})();
baidu.getStyle = function(C, A) {
	if (C = baidu.G(C)) {
		var B = baidu.isString(A);
		A = B ? [A] : A;
		var G = [];
		var H = function(M, N) {
			return N.charAt(1).toUpperCase()
		};
		var J = function(M) {
			var Q = M.split(",");
			var P = "#",
			O;
			for (var N = 0; O = Q[N]; N++) {
				O = O.replace(/[^\d]/gi, "");
				O = parseInt(O, 10);
				O = O.toString(16);
				if (O.length == 1) {
					O = "0" + O
				}
				P += O
			}
			return P.toUpperCase()
		};
		for (var F = 0,
		D; F < A.length; F = F + 1) {
			var E = A[F].replace(/(-[a-z])/gi, H);
			if ("float" == E) {
				E = baidu.isIE ? "styleFloat": "cssFloat"
			}
			if ("opacity" == E && baidu.isIE) {
				var L = C.style.filter;
				D = L && L.indexOf("opacity=") >= 0 ? (parseFloat(L.match(/opacity=([^)]*)/)[1]) / 100) + "": "1"
			}
			if (D = C.style[E]) {
				G[F] = D
			} else {
				if (C.currentStyle) {
					D = C.currentStyle[E]
				} else {
					var I = C.nodeType == 9 ? C: C.ownerDocument || C.document;
					if (I.defaultView && I.defaultView.getComputedStyle) {
						var K = I.defaultView.getComputedStyle(C, "");
						if (K) {
							D = K[E]
						}
					}
				}
			}
			if (/color/i.test(E) && D.indexOf("rgb(") != -1) {
				D = J(D)
			}
			G[F] = D
		}
		if (B) {
			G = G[0]
		}
		return G
	}
};
baidu.editor.registParser("bold",
function(A) {
	var B = -1;
	A.getContexts().walkTextNode(function(C) {
		var D = baidu.getStyle(baidu.dom.getParent(C), "font-weight");
		if (((parseInt(D) > 400 || D == "bold") && (C.parentNode.tagName.indexOf("H") !== 0)) && (B == -1 || B == 1)) {
			B = 1
		} else {
			B = 0
		}
	});
	if (B == -1) {
		B = 0
	}
	return B
});
baidu.editor.registParser("underline",
function(A) {
	var B = -1;
	A.getContexts().walkTextNode(function(C) {
		var D = baidu.getStyle(baidu.dom.getParent(C), "text-decoration");
		if (((parseInt(D) > 400 || D == "underline") && (C.parentNode.tagName.indexOf("H") !== 0)) && (B == -1 || B == 1)) {
			B = 1
		} else {
			B = 0
		}
	});
	if (B == -1) {
		B = 0
	}
	return B
});
baidu.editor.Editor.prototype.italic = function() {
	this.execCommand("Italic");
	this.dispatchEvent(new baidu.BaseEvent("onitalic"))
};
baidu.editor.register(function(A) {
	A.getFilter().builder.element("span").attribute("style").html().text().element("i,em").html().text()
});
baidu.editor.registParser("italic",
function(A) {
	var B = -1;
	A.getContexts().walkTextNode(function(C) {
		var D = baidu.getStyle(baidu.dom.getParent(C), "font-style");
		if (D == "italic" && (B == -1 || B == 1)) {
			B = 1
		} else {
			B = 0
		}
	});
	if (B == -1) {
		B = 0
	}
	return B
});
baidu.dom.getSpecificAncestor = function(C, A) {
	if (!C) {
		return null
	}
	var B = "," + A.toUpperCase() + ",";
	while (C) {
		if (B.indexOf("," + C.nodeName.toUpperCase() + ",") != -1) {
			return C
		}
		C = C.parentNode
	}
	return null
}; (function() {
	function U(V) {
		if (baidu.ie) {
			return E(V)
		} else {
			return N(V)
		}
	}
	function N(a) {
		var X = new Array();
		var Z = a.window.getSelection();
		if (Z.rangeCount == 1) {
			var b = baidu.dom.getCommonAncestor(Z.anchorNode, Z.focusNode);
			if (b.nodeName.toUpperCase() != "TR") {
				b = baidu.dom.getSpecificAncestor(b, "TD");
				if (b) {
					X[0] = b
				}
				return X
			}
		}
		for (var Y = 0,
		W = Z.rangeCount; Y < W; Y++) {
			var c = Z.getRangeAt(Y);
			var V;
			if (c.startContainer.nodeName.toUpperCase() == "TD") {
				V = c.startContainer
			} else {
				V = c.startContainer.childNodes[c.startOffset]
			}
			if (V && V.nodeName.toUpperCase() == "TD") {
				X[X.length] = V
			}
		}
		return X
	}
	function E(a) {
		var f = new Array();
		if (a.getSelection().getType() == 3) {
			var b = a.getSelection().getNativeRange();
			if (b && b.length > 0) {
				var W = b.item(0);
				var X = baidu.dom.getSpecificAncestor(W, "TD");
				if (X) {
					f[0] = X
				}
			}
		} else {
			var Y = a.getSelection().getNativeRange(),
			V = Y.parentElement();
			var X = baidu.dom.getSpecificAncestor(V, "TD");
			if (false) {
				f[0] = X
			} else {
				var e = baidu.dom.getSpecificAncestor(V, "TABLE");
				if (e) {
					for (var Z = 0; Z < e.cells.length; Z++) {
						var c = e.cells[Z];
						var b = a.document.body.createTextRange();
						b.moveToElementText(c);
						if (Y.inRange(b) || (Y.compareEndPoints("StartToStart", b) >= 0 && Y.compareEndPoints("StartToEnd", b) <= 0) || (Y.compareEndPoints("EndToStart", b) >= 0 && Y.compareEndPoints("EndToEnd", b) <= 0)) {
							f[f.length] = c
						}
					}
				}
			}
		}
		return f
	}
	function K(Z, c) {
		var b = Z.getSelection().getNative(),
		a = Z.document,
		Y = null,
		W = null,
		e = null;
		if (baidu.ie) {
			Y = Z.getSelection().getNativeRange();
			if (Z.getSelection().getType() == 3) {
				if (Y && Y.length > 0) {
					W = Y.item(0)
				}
				if (c && W && W.nodeName.toUpperCase() == "TABLE") {
					e = W
				} else {
					if (W) {
						e = baidu.dom.getSpecificAncestor(W.parentNode, "TABLE")
					}
				}
				return e
			} else {
				W = Y.parentElement();
				e = baidu.dom.getSpecificAncestor(W, "TABLE")
			}
		} else {
			var X = null;
			for (var V = 0; V < b.rangeCount; V++) {
				Y = b.getRangeAt(V);
				W = Y.commonAncestorContainer;
				e = baidu.dom.getSpecificAncestor(W, "TABLE");
				if (!e) {
					return null
				}
				if (!X) {
					X = e
				} else {
					if (X && X != e) {
						return null
					}
				}
				return e
			}
		}
		return e
	}
	function C(X) {
		var V = U(X);
		var Y = [];
		for (var W = 0; W < V.length; W++) {
			var a = baidu.dom.getSpecificAncestor(V[W], "TR");
			if (a) {
				Y[Y.length] = a.rowIndex
			}
		}
		Y.sort(function(b, c) {
			return b - c
		});
		var Z = {};
		for (var W = 0; W < Y.length;) {
			if (Z["" + Y[W]]) {
				Y.splice(W, 1)
			} else {
				Z["" + Y[W]] = true;
				W++
			}
		}
		return Y
	}
	function B(Y) {
		var W = U(Y);
		var V = [];
		for (var X = 0; X < W.length; X++) {
			V[V.length] = W[X].cellIndex
		}
		V.sort(function(a, b) {
			return a - b
		});
		var Z = {};
		for (var X = 0; X < V.length;) {
			if (Z["" + V[X]]) {
				V.splice(X, 1)
			} else {
				Z["" + V[X]] = true;
				X++
			}
		}
		return V
	}
	function R(X) {
		var Z = X.rows[0].cells.length;
		var Y = Math.round((1 / Z) * 100) + "%";
		for (var W = 0; W < X.rows.length; W++) {
			for (var V = 0; V < X.rows[W].cells.length; V++) {
				X.rows[W].cells[V].width = Y
			}
		}
	}
	function A(V) {
		V.innerHTML = baidu.ie ? "&#65279": "<br/>"
	}
	function D(c, n, l, f, m) {
		var h, a, X, e, k = null,
		W;
		var g = c.getSelection();
		var b = g.getRanges()[0];
		if (!b) {
			return false
		}
		if (!b || !l || !f || l < 0 || f < 0) {
			return false
		}
		m = m || {};
		var V = m.noDefaultStyle || false;
		h = c.document;
		a = h.createElement("table");
		a.className = m.tableClassName || (V ? "": "tangram_editor_table");
		a.setAttribute("border", m.border || (V ? "": "1"));
		a.setAttribute("borderColor", m.borderColor || (V ? "": "#333333"));
		a.setAttribute("cellPadding", m.cellPadding || (V ? "": "3"));
		a.setAttribute("cellSpacing", m.cellSpacing || (V ? "": "0"));
		a.setAttribute("width", m.width || (V ? "": ""));
		a.setAttribute("height", m.height || (V ? "": ""));
		a.style.borderCollapse = V ? "": "collapse";
		a.style.marginBottom = V ? "": "2px";
		a.style.wordWrap = V ? "": "break-word";
		a.style.wordBreak = V ? "": "break-all";
		W = Math.round((1 / f) * 100) + "%";
		for (var Z = 0; Z < l; Z++) {
			e = a.insertRow(Z);
			e.className = m.trClassName || (V ? "": "tangram_editor_tr");
			for (var Y = 0; Y < f; Y++) {
				X = e.insertCell(Y);
				if (!V) {
					X.setAttribute("width", W)
				}
				A(X);
				X.className = m.tdClassName || (V ? "": "tangram_editor_td");
				if (Z == 0 && Y == 0) {
					firstCell = X
				}
			}
		}
		g.pasteElement(a);
		g.setCursor(firstCell, 1);
		return true
	}
	function H(V) {
		var W = V.parentNode;
		if (W) {
			W.removeChild(V)
		}
	}
	function L(X, V, W) {
		W = W || {};
		var Y = W.table || K(X, true);
		if (!Y) {
			return false
		}
		H(Y);
		X.window.focus()
	}
	function G(a, m, Z, l) {
		l = l || {};
		var h = l.table || K(a);
		if (!h) {
			return false
		}
		var e = l.columnIndexes || B(a);
		if (!e || e.length == 0) {
			return
		}
		var X = -1,
		V = -1;
		X = e[0];
		V = e[e.length - 1];
		var b = Z == "left" ? X: V;
		var W = Z == "left" ? b: b + 1;
		var f = null;
		for (var Y = 0; Y < h.rows.length; Y++) {
			var k = h.rows[Y];
			var g = k.insertCell(W);
			A(g);
			if (Y == 0) {
				f = g
			}
		}
		if (!l.noAdjustWidth) {
			R(h)
		}
		a.getSelection().setCursor(f, 1)
	}
	function F(Y, f, e) {
		e = e || {};
		var a = e.table || K(Y);
		if (!a) {
			return false
		}
		var Z = e.columnIndexes || B(Y);
		var b = null;
		if (Z.length > 0) {
			var V = Z[Z.length - 1];
			b = a.rows[0].cells[V + 1]
		}
		for (var X = Z.length - 1; X >= 0; X--) {
			for (var W = a.rows.length - 1; W >= 0; W--) {
				a.rows[W].deleteCell(Z[X])
			}
			if (a.rows[0].cells.length == 0) {
				Y.getSelection().setCursor(a, 4);
				H(a);
				a = null;
				break
			}
		}
		if (a && !e.noAdjustWidth) {
			R(a)
		}
		var c = Y.getSelection();
		if (b) {
			c.setCursor(b, 1)
		} else {
			if (a) {
				c.setCursor(a, 4)
			}
		}
	}
	function J(Z, g, X, f) {
		f = f || {};
		var c = f.table || K(Z);
		if (!c) {
			return false
		}
		var V = null;
		var h = null;
		var a = f.rowIndexes || C(Z);
		if (!a || a.length == 0 || a[0] < 0) {
			return
		}
		V = X == "up" ? a[0] : a[a.length - 1];
		h = X == "up" ? V: V + 1;
		var Y = c.rows[V];
		var e = c.insertRow(h);
		for (var W = 0; W < Y.cells.length; W++) {
			var b = e.insertCell(W);
			b.className = Y.cells[W].className;
			b.width = Y.cells[W].width;
			b.colSpan = Y.cells[W].colSpan;
			A(b)
		}
		Z.getSelection().setCursor(e.cells[0], 1)
	}
	function Q(W, e, c) {
		c = c || {};
		var Z = c.table || K(W);
		if (!Z) {
			return false
		}
		var X = c.rowIndexes || C(W);
		var a = null;
		if (X.length > 0) {
			var Y = Z.rows[X[X.length - 1] + 1];
			if (Y) {
				a = Y.cells[0]
			}
		}
		for (var V = X.length - 1; V >= 0; V--) {
			Z.deleteRow(X[V]);
			if (Z.rows.length == 0) {
				H(Z);
				Z = null;
				break
			}
		}
		var b = W.getSelection();
		if (a) {
			b.setCursor(a, 1)
		} else {
			if (Z) {
				b.setCursor(Z, 4)
			}
		}
		W.window.focus()
	}
	function P(Y, V, X, W) {
		X = X || {};
		W = W || {};
		var Z = W.table || K(Y);
		if (!Z) {
			return false
		}
		Z.setAttribute("border", X.border || "1");
		Z.setAttribute("borderColor", X.borderColor || "#333333");
		Z.setAttribute("cellPadding", X.cellPadding || "3");
		Z.setAttribute("cellSpacing", X.cellSpacing || "0");
		Z.setAttribute("width", X.width || "");
		Z.setAttribute("height", X.height || "");
		return
	}
	function S(a, V, b, Y) {
		Y = Y || {};
		var X = Y.cells || U(a);
		b = b || {};
		for (var Z = X.length - 1; Z >= 0; Z--) {
			for (var W in b) {
				X[Z].setAttribute(W, b[W])
			}
		}
	}
	function O(Y, g, b, f) {
		f = f || {};
		b = b || {};
		var c = f.table || K(Y);
		if (!c) {
			return false
		}
		var Z = f.columnIndexes || B(Y);
		for (var X = c.rows.length - 1; X >= 0; X--) {
			var e = c.rows[X];
			for (var W = Z.length - 1; W >= 0; W--) {
				if (Z[W] < 0) {
					continue
				}
				var a = e.cells[Z[W]];
				if (!a) {
					continue
				}
				for (var V in b) {
					a.setAttribute(V, b[V])
				}
			}
		}
	}
	function T(X, f, a, e) {
		e = e || {};
		a = a || {};
		var b = e.table || K(X);
		if (!b) {
			return false
		}
		var Y = e.rowIndexes || C(X);
		for (var W = Y.length - 1; W >= 0; W--) {
			if (Y[W] < 0) {
				continue
			}
			var c = b.rows[Y[W]];
			if (!c) {
				continue
			}
			for (j = c.cells.length - 1; j >= 0; j--) {
				var Z = c.cells[j];
				for (var V in a) {
					Z.setAttribute(V, a[V])
				}
			}
		}
	}
	function M(X, V) {
		var V = V || {};
		var Y = V.table || K(X);
		if (!Y) {
			return null
		}
		var W = {};
		W.borderColor = Y.getAttribute("borderColor", 2);
		W.border = Y.getAttribute("border", 2);
		W.width = Y.getAttribute("width", 2);
		W.height = Y.getAttribute("height", 2);
		W.cellPadding = Y.getAttribute("cellPadding", 2);
		W.cellSpacing = Y.getAttribute("cellSpacing", 2);
		return W
	}
	function I(Y, W) {
		var W = W || {};
		var V = W.cell || (U(Y).length > 0 ? U(Y)[0] : null);
		var X = {};
		if (!V) {
			return X
		}
		X.width = V.getAttribute("width", 2);
		X.height = V.getAttribute("height", 2);
		X.align = V.getAttribute("align", 2);
		X.vAlign = V.getAttribute("vAlign", 2);
		X.bgColor = V.getAttribute("bgColor", 2);
		return X
	}
	baidu.editor.Editor.prototype.getCurrentTable = function(V) {
		return K(this, V)
	};
	baidu.editor.Editor.prototype.getSelectedColumns = function() {
		return B(this)
	};
	baidu.editor.Editor.prototype.getSelectedRows = function() {
		return C(this)
	};
	baidu.editor.Editor.prototype.getSelectedCells = function() {
		return U(this)
	};
	baidu.editor.Editor.prototype.getTableProps = function(V) {
		return M(this, V)
	};
	baidu.editor.Editor.prototype.getCellProps = function(V) {
		return I(this, V)
	};
	baidu.editor.registCommand("InsertTable", D);
	baidu.editor.registCommand("DeleteTable", L);
	baidu.editor.registCommand("InsertRow", J);
	baidu.editor.registCommand("DeleteRows", Q);
	baidu.editor.registCommand("InsertColumn", G);
	baidu.editor.registCommand("DeleteColumns", F);
	baidu.editor.registCommand("SetTableProps", P);
	baidu.editor.registCommand("SetCellProps", S);
	baidu.editor.registCommand("SetRowProps", T);
	baidu.editor.registCommand("SetColumnProps", O)
})(); (function() {
	var A = baidu.editor.Editor;
	A.prototype.insertTable = function(C, D, B) {
		this.execCommand("InsertTable", true, C, D, B);
		this.dispatchEvent(new baidu.BaseEvent("oninserttable"))
	};
	A.prototype.deleteTable = function(B) {
		this.execCommand("DeleteTable", true, B);
		this.dispatchEvent(new baidu.BaseEvent("ondeletetable"))
	};
	A.prototype.insertColumn = function(B, C) {
		this.execCommand("InsertColumn", true, B, C);
		this.dispatchEvent(new baidu.BaseEvent("oninsertcolumn"))
	};
	A.prototype.deleteColumns = function(B) {
		this.execCommand("DeleteColumns", true, B);
		this.dispatchEvent(new baidu.BaseEvent("ondeletecolumns"))
	};
	A.prototype.insertRow = function(B, C) {
		this.execCommand("InsertRow", true, B, C);
		this.dispatchEvent(new baidu.BaseEvent("oninsertrow"))
	};
	A.prototype.deleteRows = function(B) {
		this.execCommand("DeleteRows", true, B);
		this.dispatchEvent(new baidu.BaseEvent("ondeleterows"))
	};
	A.prototype.setCellProps = function(C, B) {
		this.execCommand("SetCellProps", true, C, B);
		this.dispatchEvent(new baidu.BaseEvent("onsetcellprops"))
	};
	A.prototype.setColumnProps = function(C, B) {
		this.execCommand("SetColumnProps", true, C, B);
		this.dispatchEvent(new baidu.BaseEvent("onsetcolumnprops"))
	};
	A.prototype.setRowProps = function(C, B) {
		this.execCommand("SetRowProps", true, C, B);
		this.dispatchEvent(new baidu.BaseEvent("onsetrowprops"))
	};
	A.prototype.setTableProps = function(C, B) {
		this.execCommand("SetTableProps", true, C, B);
		this.dispatchEvent(new baidu.BaseEvent("onsettableprops"))
	}
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("table").allow("tbody,thead,tr").attribute("width").element("tbody,thead").allow("tr").element("tr").allow("td,th").element("td").text().html().attribute("width,align").element("br")
});
baidu.editor.registParser("table",
function(C) {
	var D = C.getContexts(),
	B = {
		state: D.containNode("table,td,tr,tbody", "br")
	};
	if (B.state == 1) {
		var A = 0;
		if (baidu.ie) {
			baidu.array.each(D.contains[0],
			function(E) {
				if (E.nodeName == "TD") {
					A++
				}
			})
		} else {
			baidu.array.each(D.contains,
			function(E) {
				baidu.array.each(E,
				function(F) {
					if (F.nodeName == "TD") {
						A++
					}
				})
			})
		}
		if (A > 1) {
			B.crossTd = true
		}
	}
	return B
});
baidu.editor.Editor.prototype.insertTitle = function(B, A) {
	this.execCommand("insertTitle", B, A);
	this.dispatchEvent(new baidu.BaseEvent("oninserttitle"))
};
baidu.editor.Editor.prototype.removeTitle = function(B, A) {
	this.execCommand("removeTitle");
	this.dispatchEvent(new baidu.BaseEvent("onremovetitle"))
};
baidu.dom.element.getText = function(A) {
	return A.textContent || A.innerText || ""
};
baidu.dom.element.setText = function(A, B) {
	setText = (A.innerText != undefined) ?
	function(C) {
		return A.innerText = C
	}: function(C) {
		return A.textContent = C
	};
	return setText(B)
}; (function() {
	function B(G, F, H) {
		if (!G || !F) {
			return
		}
		H = H || G.getSelection().getText();
		if (!H) {
			return
		}
		var C = (F == 1 ? "H2": (F == 2 ? "H3": ""));
		if (C == "") {
			return
		}
		var I = G.document.createElement(C);
		baidu.dom.element.setText(I, H);
		G.getSelection().pasteElements([I]);
		var D = baidu.dom.getPrevious(I);
		if (D && D.tagName != "BR") {
			I.parentNode.insertBefore(G.document.createElement("BR"), I)
		}
		var E = baidu.dom.getNext(I, true);
		if (E && E.tagName == "BR") {
			baidu.dom.element.remove(E, G.document)
		}
	}
	function A(G) {
		var H = G.getContexts().contains[0];
		H.push(G.getSelection().getRanges()[0].getCommonAncestor(true, true));
		for (var D = H.length - 1; D >= 0; D--) {
			var F = H[D];
			if (F.nodeName != "H2" && F.nodeName != "H3") {
				continue
			}
			var C = baidu.dom.getNext(F, true);
			if (C) {
				baidu.dom.insertAfter(G.document.createElement("BR"), F)
			}
			var E = G.document.createTextNode(baidu.dom.element.getText(F));
			baidu.dom.insertAfter(E, F);
			baidu.dom.element.remove(F, G.document);
			G.getSelection().setCursor(E, 2);
			break
		}
	}
	baidu.editor.registCommand("insertTitle", B);
	baidu.editor.registCommand("removeTitle", A)
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("h2, h3").allow("img").text()
});
baidu.editor.registParser("title1",
function(A) {
	return A.getContexts().containNode("h2")
});
baidu.editor.registParser("title2",
function(A) {
	return A.getContexts().containNode("h3")
});
baidu.editor.Editor.prototype.insertLink = function(A, B) {
	this.execCommand("createLink", A, B);
	this.dispatchEvent(new baidu.BaseEvent("oncreatelink"))
};
baidu.editor.Editor.prototype.removeLink = function(A, B) {
	this.execCommand("unLink", A, B);
	this.dispatchEvent(new baidu.BaseEvent("onremovelink"))
}; (function() {
	function A(D, C, F) {
		if (!D) {
			return
		}
		C = C || "";
		F = F || D.getSelection().getRanges()[0].extractContents();
		if (!F) {
			return
		}
		var E = D.document.createElement("a");
		E.href = C;
		baidu.dom.element.append(E, F);
		D.getSelection().pasteElement(E)
	}
	function B(C) {
		var E = C.getContexts(),
		D = E.contains[0].concat(E.parents[0]);
		baidu.array.each(D,
		function(G) {
			if (G.nodeName != "A") {
				return true
			}
			var F = C.document.createDocumentFragment();
			while (G.childNodes.length > 0) {
				F.appendChild(G.childNodes[0])
			}
			baidu.dom.insertAfter(F, G);
			baidu.dom.element.remove(G, C.document);
			return false
		})
	}
	baidu.editor.registCommand("createLink", A);
	baidu.editor.registCommand("unLink", B)
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("a").allow("b,strong,i,em,span,br").attribute("href").text()
});
baidu.editor.registParser("link",
function(A) {
	return A.getContexts().containNode("a")
});
baidu.editor.Editor.prototype.insertImage = function(A) {
	this.execCommand("insertImage", A);
	this.dispatchEvent(new baidu.BaseEvent("oninsertimage"))
}; (function() {
	function B(E, C) {
		var D = E.document.createElement("IMG");
		D.src = C.src;
		D.title = C.title;
		D.style[baidu.ie ? "styleFloat": "cssFloat"] = {
			left: "left",
			right: "right",
			center: ""
		} [C["float"] || "center"];
		E.getSelection().pasteElement(D, true)
	}
	function A(E) {
		var C = E.getSelection().getRanges()[0],
		D;
		D = C.startContainer;
		if (D.nodeName != "IMG") {
			D = baidu.dom.element.getChild(C.startContainer, C.startOffset)
		}
		if (D.nodeName == "IMG") {
			return {
				src: D.style.backgroundImage || D.src,
				"float": D.style.styleFloat || D.style.cssFloat,
				title: D.title
			}
		}
	}
	baidu.editor.Editor.prototype.getImage = function() {
		return A(this)
	};
	baidu.editor.registCommand("insertImage", B)
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("img").attribute("src, title, alt, class, style")
});
baidu.editor.registParser("image",
function(A) {
	return A.getContexts().containNode("img", "p")
});
baidu.editor.Editor.prototype.insertSpecialCharacter = function(A) {
	this.execCommand("insertSpecialCharacter", A);
	this.dispatchEvent(new baidu.BaseEvent("oninsertspecialcharacter"))
}; (function() {
	function A(B, C) {
		if (!C) {
			return
		}
		B.getSelection().pasteElement(B.document.createTextNode(C))
	}
	baidu.editor.registCommand("insertSpecialCharacter", A)
})();
baidu.editor.Editor.prototype.insertReference = function(A) {
	this.execCommand("insertReference", A);
	this.dispatchEvent(new baidu.BaseEvent("oninsertreference"))
};
baidu.editor.Editor.prototype.removeReference = function() {
	this.execCommand("removeReference");
	this.dispatchEvent(new baidu.BaseEvent("onremovereference"))
}; (function() {
	function B(E) {
		if (baidu.ie) {
			var D = E.document.selection.createRange();
			return D.text
		} else {
			var D = E.window.getSelection().getRangeAt(0);
			return D.toString()
		}
	}
	function A(F, G) {
		if (!F || !G) {
			return
		}
		var E = [],
		D = F.getSelection().getRanges()[0];
		baidu.array.each(G,
		function(I) {
			var H = F.document.createElement("sup");
			H.innerHTML = "\u5f15";
			H.className = "ref_" + I;
			baidu.on(H, "click",
			function() {
				parent.gotoRef(this)
			});
			E.push(H);
			if (baidu.ie) {
				E.push(F.document.createTextNode("\ufeff"))
			}
		});
		F.getSelection().pasteElements(E)
	}
	function C(D) {
		var E = D.getContexts().contains[0];
		E.push(D.getSelection().getRanges()[0].getCommonAncestor(true, true));
		baidu.array.each(E,
		function(F) {
			if (F.nodeName != "SUP") {
				return true
			}
			baidu.dom.element.remove(F, D.document);
			return true
		})
	}
	baidu.editor.registCommand("insertReference", A);
	baidu.editor.registCommand("removeReference", C)
})();
baidu.editor.register(function(A) {
	A.getFilter().builder.element("sup").text().attribute("class,onclick")
});
baidu.editor.registParser("reference",
function(A) {
	return A.getContexts().containNode("sup")
});
baidu.editor.Editor.prototype.removeformat = function() {
	this.execCommand("removeformat");
	this.dispatchEvent(new baidu.BaseEvent("onremoveformat"))
}; (function() {
	function A(D) {
		var E = editor.getContexts().contains[0];
		E.push();
		var F = [];
		function B(G) {
			for (var H = 0; H < G.length; H++) {
				var I = G[H];
				if (I.nodeName == "SUP") {
					F.push(I);
					continue
				} else {
					if (I.nodeType == 1 && I.hasChildNodes()) {
						B(I.childNodes)
					}
				}
			}
		}
		B(E);
		for (var C = 0; C < F.length; C++) {
			baidu.dom.element.remove(F[C], editor.document)
		}
		D.execCommand("removeFormat")
	}
	baidu.editor.registCommand("removeformat", A)
})();
var toolbar = baidu.editor.toolbar = {};
function ItemBase(A) {
	baidu.BaseClass.call(this);
	this.name = "";
	this.editor = A
}
baidu.inherits(ItemBase, baidu.BaseClass, "biadu.editor.toolbar.ItemBase");
baidu.editor.toolbar.ItemBase = ItemBase;
baidu.editor.toolbar.Bold = function(B, A) {
	baidu.editor.toolbar.ItemBase.call(this, B);
	this.name = "Bold";
	this.button = A
};
baidu.inherits(baidu.editor.toolbar.Bold, baidu.editor.toolbar.ItemBase, "baidu.editor.toolbar.Bold");
baidu.editor.toolbar.Bold.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		var C = A.editor.queryContextState("bold");
		if (C == 0) {
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				A.button.highlight()
			}
		} else {
			A.button.removeHighlight()
		}
		A.editor.bold()
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("bold");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.bold.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Italic = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Italic";
	this.button = A
};
baidu.inherits(toolbar.Italic, toolbar.ItemBase, "baidu.editor.toolbar.Italic");
toolbar.Italic.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		var C = A.editor.queryContextState("italic");
		if (C == 0) {
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				A.button.highlight()
			}
		} else {
			A.button.removeHighlight()
		}
		A.editor.italic()
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("italic");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.italic.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Underline = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Underline";
	this.button = A
};
baidu.inherits(toolbar.Underline, toolbar.ItemBase, "baidu.editor.toolbar.Underline");
toolbar.Underline.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		var C = A.editor.queryContextState("underline");
		if (C == 0) {
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				A.button.highlight()
			}
		} else {
			A.button.removeHighlight()
		}
		A.editor.underline()
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("underline");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.underline.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Table = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Table";
	this.button = A
};
baidu.inherits(toolbar.Table, toolbar.ItemBase, "baidu.editor.toolbar.Table");
toolbar.Table.prototype.initialize = function() {
	var A = this;
	var B = false;
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("table");
		switch (C.state) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			if (C.crossTd) {
				Tools.bold.disable();
				Tools.italic.disable();
				Tools.underline.disable();
				Tools.special.disable();
				Tools.link.disable();
				Tools.title1.disable();
				Tools.title2.disable();
				Tools.image.disable()
			} else {
				Tools.title1.disable();
				Tools.title2.disable();
				Tools.image.disable()
			}
			break;
		case 2:
			B = false;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.special.disable();
			Tools.link.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.image.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.insertTable.disable();
			Tools.deleteTable.enable();
			Tools.insertColumnLeft.enable();
			Tools.insertColumnRight.enable();
			Tools.insertRowUp.enable();
			Tools.insertRowBelow.enable();
			Tools.deleteColumns.enable();
			Tools.deleteRows.enable();
			Tools.setColumnProps.enable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.table.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight();
			Tools.table.enable()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.InsertTable = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "InsertTable";
	this.button = A
};
baidu.inherits(toolbar.InsertTable, toolbar.ItemBase, "baidu.editor.toolbar.InsertTable");
toolbar.InsertTable.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(B) {});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"];
		B == 0 ? A.button.enable() : A.button.disable()
	})
};
toolbar.DeleteTable = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "DeleteTable";
	this.button = A
};
baidu.inherits(toolbar.DeleteTable, toolbar.ItemBase, "baidu.editor.toolbar.DeleteTable");
toolbar.DeleteTable.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(B) {
		A.editor.deleteTable()
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.InsertColumnLeft = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "InsertColumnLeft";
	this.button = A
};
baidu.inherits(toolbar.InsertColumnLeft, toolbar.ItemBase, "baidu.editor.toolbar.InsertColumnLeft");
toolbar.InsertColumnLeft.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(E) {
		var D = A.editor.getCurrentTable(true);
		var C = D.rows[0].cells.length;
		if (C >= 20) {
			var B = Fe.Dialog.alert("\u62b1\u6b49\uff01\u63d2\u5165\u7684\u5217\u5df2\u8d85\u8fc7\u8868\u683c\u9650\u5236:(", {
				title: "\u63d0\u793a",
				locked: true
			});
			B.onopen = function() {
				document.body.focus()
			};
			B.onclose = function() {
				A.editor.focus()
			}
		} else {
			A.editor.insertColumn("left", {
				noAdjustWidth: true
			})
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.InsertColumnRight = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "InsertColumnRight";
	this.button = A
};
baidu.inherits(toolbar.InsertColumnRight, toolbar.ItemBase, "baidu.editor.toolbar.InsertColumnRight");
toolbar.InsertColumnRight.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(E) {
		var D = A.editor.getCurrentTable(true);
		var C = D.rows[0].cells.length;
		if (C >= 20) {
			var B = Fe.Dialog.alert("\u62b1\u6b49\uff01\u63d2\u5165\u7684\u5217\u5df2\u8d85\u8fc7\u8868\u683c\u9650\u5236:(", {
				title: "\u63d0\u793a",
				locked: true
			});
			B.onopen = function() {
				document.body.focus()
			};
			B.onclose = function() {
				A.editor.focus()
			}
		} else {
			A.editor.insertColumn("right", {
				noAdjustWidth: true
			})
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.DeleteColumns = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "DeleteColumns";
	this.button = A
};
baidu.inherits(toolbar.DeleteColumns, toolbar.ItemBase, "baidu.editor.toolbar.DeleteColumns");
toolbar.DeleteColumns.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(B) {
		A.editor.deleteColumns({
			noAdjustWidth: true
		})
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.InsertRowBelow = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "InsertRowBelow";
	this.button = A
};
baidu.inherits(toolbar.InsertRowBelow, toolbar.ItemBase, "baidu.editor.toolbar.InsertRowBelow");
toolbar.InsertRowBelow.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(E) {
		var D = A.editor.getCurrentTable(true);
		var C = D.rows.length;
		if (C >= 50) {
			var B = Fe.Dialog.alert("\u62b1\u6b49\uff01\u63d2\u5165\u7684\u884c\u5df2\u8d85\u8fc7\u8868\u683c\u9650\u5236:(", {
				title: "\u63d0\u793a",
				locked: true
			});
			B.onopen = function() {
				document.body.focus()
			};
			B.onclose = function() {
				A.editor.focus()
			}
		} else {
			A.editor.insertRow("below")
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.InsertRowUp = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "InsertRowUp";
	this.button = A
};
baidu.inherits(toolbar.InsertRowUp, toolbar.ItemBase, "baidu.editor.toolbar.InsertRowUp");
toolbar.InsertRowUp.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(E) {
		var D = A.editor.getCurrentTable(true);
		var C = D.rows.length;
		if (C >= 50) {
			var B = Fe.Dialog.alert("\u62b1\u6b49\uff01\u63d2\u5165\u7684\u884c\u5df2\u8d85\u8fc7\u8868\u683c\u9650\u5236:(", {
				title: "\u63d0\u793a",
				locked: true
			});
			B.onopen = function() {
				document.body.focus()
			};
			B.onclose = function() {
				A.editor.focus()
			}
		} else {
			A.editor.insertRow("up")
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.DeleteRows = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "DeleteRows";
	this.button = A
};
baidu.inherits(toolbar.DeleteRows, toolbar.ItemBase, "baidu.editor.toolbar.DeleteRows");
toolbar.DeleteRows.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(B) {
		A.editor.deleteRows()
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.SetTableProps = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "SetTableProps";
	this.button = A
};
baidu.inherits(toolbar.SetTableProps, toolbar.ItemBase, "baidu.editor.toolbar.SetTableProps");
toolbar.SetTableProps.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(C) {
		var B = C.target.getUserInput();
		A.editor.setTableProps(B)
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.SetCellProps = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "SetCellProps";
	this.button = A
};
baidu.inherits(toolbar.SetCellProps, toolbar.ItemBase, "baidu.editor.toolbar.SetCellProps");
toolbar.SetCellProps.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(C) {
		var B = C.target.getUserInput();
		A.editor.setCellProps(B)
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.SetRowProps = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "SetRowProps";
	this.button = A
};
baidu.inherits(toolbar.SetRowProps, toolbar.ItemBase, "baidu.editor.toolbar.SetRowProps");
toolbar.SetRowProps.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(C) {
		var B = C.target.getUserInput();
		A.editor.setRowProps(B)
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.SetColumnProps = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "SetColumnProps";
	this.button = A
};
baidu.inherits(toolbar.SetColumnProps, toolbar.ItemBase, "baidu.editor.toolbar.SetColumnProps");
toolbar.SetColumnProps.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function(D) {
		var E = this;
		var C = A.editor.getCellProps();
		var B = C.align;
		if (!B) {
			B = "left"
		}
		E.dialog = Fe.Dialog.open("js/Dialog/Wiki/TiTable/changeColumnAttribute.html#textAlign=" + B, {
			title: "\u5217\u5c5e\u6027",
			width: "380px",
			height: "170px",
			buttonbar: true,
			buttonAccept: true,
			buttonCancel: true,
			locked: true,
			contentType: "HTMLUrl"
		});
		E.dialog.onaccept = function(H) {
			var F = E.dialog.getIframe().contentWindow;
			d = F.document;
			if (d.getElementById("float_left").checked) {
				B = "left"
			}
			if (d.getElementById("float_center").checked) {
				B = "center"
			}
			if (d.getElementById("float_right").checked) {
				B = "right"
			}
			var G = {
				align: B
			};
			A.editor.setColumnProps(G)
		};
		E.dialog.onclose = function() {
			A.editor.focus()
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(C) {
		var B = A.editor.queryContextState("table")["state"]; (B == 0 || B == 2) ? A.button.disable() : A.button.enable()
	})
};
toolbar.Undo = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Undo";
	this.button = A
};
baidu.inherits(toolbar.Undo, toolbar.ItemBase, "baidu.editor.toolbar.Undo");
toolbar.Undo.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function() {
		A.editor.undo()
	});
	A.editor.addEventListener("onselectionchange",
	function(B) {
		if (A.editor.queryCommandState("Undo")) {
			Tools.undo.enable()
		} else {
			Tools.undo.disable()
		}
	})
};
toolbar.Redo = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Redo";
	this.button = A
};
baidu.inherits(toolbar.Redo, toolbar.ItemBase, "baidu.editor.toolbar.Redo");
toolbar.Redo.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function() {
		A.editor.redo()
	});
	A.editor.addEventListener("onselectionchange",
	function(B) {
		if (A.editor.queryCommandState("Redo")) {
			Tools.redo.enable()
		} else {
			Tools.redo.disable()
		}
	})
};
baidu.string.getByteLength = function(A) {
	return String(A).replace(/[^\x00-\xff]/g, "mm").length
};
toolbar.Title = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Title";
	this.button = A
};
baidu.inherits(toolbar.Title, toolbar.ItemBase, "baidu.editor.toolbar.Title");
toolbar.Title.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		if (A.editor.queryContextState("title1")) {
			A.editor.removeTitle()
		} else {
			var C = 40;
			var F = editor.getSelection().getText();
			if (baidu.string.getByteLength(F) > C) {
				var D = Fe.Dialog.alert("\u6807\u9898\u6700\u591a" + C + "\u4e2a\u5b57\u8282!", {
					title: "\u63d0\u793a",
					locked: true
				});
				D.onopen = function() {
					document.body.focus()
				};
				D.onclose = function() {
					A.editor.focus()
				};
				return false
			}
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				var E = this;
				E.dialog = Fe.Dialog.open("TiTitle.html", {
					title: "\u63d2\u5165\u4e00\u7ea7\u6807\u9898",
					width: "300px",
					height: "75px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					locked: true,
					contentType: "HTMLUrl"
				});
				E.dialog.onaccept = function(H) {
					var G = E.dialog.getIframe().contentWindow;
					d = G.document;
					var I = d.getElementById("titleText").value;
					if (baidu.string.getByteLength(I) > C) {
						setTimeout(function() {
							var J = Fe.Dialog.alert("\u6807\u9898\u6700\u591a" + C + "\u4e2a\u5b57\u8282!", {
								title: "\u63d0\u793a"
							});
							J.onopen = function() {
								document.body.focus()
							};
							J.onclose = function() {
								A.editor.focus()
							}
						},
						100);
						return false
					}
					A.editor.insertTitle(1, I)
				};
				E.dialog.onclose = function() {
					A.editor.focus()
				}
			} else {
				A.editor.insertTitle(1)
			}
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("title1");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.title1.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Title2 = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Title2";
	this.button = A
};
baidu.inherits(toolbar.Title2, toolbar.ItemBase, "baidu.editor.toolbar.Title2");
toolbar.Title2.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		if (A.editor.queryContextState("title2")) {
			A.editor.removeTitle()
		} else {
			var C = 40;
			var F = editor.getSelection().getText();
			if (baidu.string.getByteLength(F) > C) {
				var D = Fe.Dialog.alert("\u6807\u9898\u6700\u591a" + C + "\u4e2a\u5b57\u8282!", {
					title: "\u63d0\u793a",
					locked: true
				});
				D.onopen = function() {
					document.body.focus()
				};
				D.onclose = function() {
					A.editor.focus()
				};
				return false
			}
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				var E = this;
				E.dialog = Fe.Dialog.open("TiH3Title.html", {
					title: "\u63d2\u5165\u4e8c\u7ea7\u6807\u9898",
					width: "300px",
					height: "80px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					locked: true,
					contentType: "HTMLUrl"
				});
				E.dialog.onaccept = function(H) {
					var G = E.dialog.getIframe().contentWindow;
					d = G.document;
					var I = d.getElementById("titleText").value;
					if (baidu.string.getByteLength(I) > C) {
						setTimeout(function() {
							var J = Fe.Dialog.alert("\u6807\u9898\u6700\u591a" + C + "\u4e2a\u5b57\u8282! ! ", {
								title: "\u63d0\u793a",
								locked: true
							});
							J.onopen = function() {
								document.body.focus()
							};
							J.onclose = function() {
								A.editor.focus()
							}
						},
						100);
						return false
					}
					A.editor.insertTitle(2, I)
				};
				E.dialog.onclose = function() {
					A.editor.focus()
				}
			} else {
				A.editor.insertTitle(2)
			}
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("title2");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.title2.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Link = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Link";
	this.button = A
};
baidu.inherits(toolbar.Link, toolbar.ItemBase, "baidu.editor.toolbar.Link");
toolbar.Link.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		if (A.editor.queryContextState("link")) {
			A.editor.removeLink()
		} else {
			if (editor.getSelection().getRanges().length == 0 || editor.getSelection().getRanges()[0].collapsed) {
				var C = Fe.Dialog.alert("\u8bf7\u5148\u9009\u4e2d\u8981\u751f\u6210\u94fe\u63a5\u7684\u6587\u5b57! ", {
					title: "\u63d0\u793a",
					locked: true
				});
				C.onopen = function() {
					document.body.focus()
				};
				C.onclose = function() {
					A.editor.focus()
				}
			} else {
				var E = this;
				E.dialog = Fe.Dialog.open("TiLink.html", {
					title: "\u4e3a\u6240\u9009\u5185\u5bb9\u589e\u52a0\u94fe\u63a5",
					width: "300px",
					height: "120px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					locked: true,
					contentType: "HTMLUrl"
				});
				E.dialog.onaccept = function(H) {
					var G = E.dialog.getIframe().contentWindow;
					d = G.document;
					var I = d.getElementById("linkHref").value;
					if ('http://' !== I.substr(0, 7) && 'https://' !== I.substr(0, 8) && 'mailto://' !== I.substr(0, 9) && 'ftp://' !== I.substr(0, 6)) {
						setTimeout(function() {
							var C = Fe.Dialog.alert("\u60a8\u6240\u8f93\u5165\u7684\u4e0d\u662f\u6709\u6548\u7684\u94fe\u63a5\u5730\u5740! ", {
								title: "\u63d0\u793a",
								locked: true
							});
							C.onopen = function() {
								document.body.focus()
							};
							C.onclose = function() {
								A.editor.focus()
							}
						},
						100)
					} else {
						A.editor.insertLink(I)
					}
				};
				E.dialog.onclose = function() {
					A.editor.focus()
				}
			}
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("link");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.image.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.link.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Image = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Image";
	this.button = A
};
baidu.inherits(toolbar.Image, toolbar.ItemBase, "baidu.editor.toolbar.Image");
toolbar.Image.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		var E = this;
		var D = null;
		if (A.editor.queryContextState("image")) {
			D = A.editor.getImage()
		}
		if (!D) {
			var H = A.editor.maxPicNum || 10;
			var J = A.editor.document.getElementsByTagName("img");
			if (J && J.length >= H) {
				var C;
				if (H == 10) {
					C = Fe.Dialog.alert("\u5bf9\u4e0d\u8d77\uff0c\u6bcf\u4e2a\u8bcd\u6761\u56fe\u7247\u603b\u6570\u9650\u5236\u4e3a" + H + "\u5f20:( !", {
						title: "\u63d0\u793a",
						locked: true
					})
				} else {
					C = Fe.Dialog.alert("\u5bf9\u4e0d\u8d77\uff0c\u672c\u6bb5\u843d\u56fe\u7247\u603b\u6570\u9650\u5236\u4e3a" + H + "\u5f20:( !", {
						title: "\u63d0\u793a",
						locked: true
					})
				}
				C.onopen = function() {
					document.body.focus()
				};
				C.onclose = function() {
					A.editor.focus()
				};
				return
			}
		}
		var I, G, F;
		if (D) {
			I = D.src,
			G = (D["float"] || "left").toUpperCase().indexOf("LEFT") > -1 ? 0 : 1,
			F = D.title
		}
		E.dialog = Fe.Dialog.open("TiImage.html" + (D != null ? "#img_url_value=" + encodeURIComponent(I) + "&img_float=" + G + "&img_title=" + encodeURIComponent(F).replace(/'/g, "%27") : ""), {
			title: "\u6dfb\u52a0\u6216\u4fee\u6539\u56fe\u7247",
			width: "380px",
			height: "340px",
			buttonbar: true,
			buttonAccept: true,
			buttonCancel: true,
			locked: true,
			contentType: "HTMLUrl"
		});
		E.dialog.afterupload = function(K) {
			var L = E.dialog.getIframe().contentWindow;
			d = L.document;
			var N = d.spphotoform.spImgAlign2[0].checked ? "left": "right";
			var M = d.spphotoform.picInfo.value;
			M = HTMLEncode(M);
			A.editor.insertImage({
				src: K,
				"float": N,
				title: M
			});
			E.dialog.close();
			A.uploadNum++
		};
		E.dialog.onaccept = function(L) {
			var K = E.dialog.getIframe().contentWindow;
			d = K.document;
			var M = (d.getElementById("tab1").style.display == "none");
			if (M) {
				K.startUpload(E);
				L.returnValue = false
			}
		};
		E.dialog.onopen = function() {
			document.body.focus()
		};
		E.dialog.onclose = function() {
			A.editor.focus()
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("image");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.special.disable();
			Tools.table.disable();
			break;
		case 2:
			B = false;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.special.disable();
			Tools.table.disable();
			break;
		case 3:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.special.disable();
			Tools.table.disable();
			break
		}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(C) {
		Tools.image.enable()
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.SpecialCharacter = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "SpecialCharacter";
	this.button = A
};
baidu.inherits(toolbar.SpecialCharacter, toolbar.ItemBase, "baidu.editor.toolbar.SpecialCharacter");
toolbar.SpecialCharacter.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function() {
		var B = this;
		B.dialog = Fe.Dialog.open("TiSpecialCharacter.html", {
			title: "\u63d2\u5165\u7279\u6b8a\u5b57\u7b26",
			width: "400px",
			height: "480px",
			buttonbar: true,
			buttonAccept: true,
			buttonCancel: true,
			locked: true,
			contentType: "HTMLUrl"
		});
		B.dialog.onopen = function() {
			document.body.focus()
		};
		B.dialog.onaccept = function(C) {}
	});
	A.editor.addEventListener("onbeforeselectionchange",
	function(B) {
		Tools.special.enable()
	})
};
toolbar.Reference = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Reference";
	this.button = A
};
baidu.inherits(toolbar.Reference, toolbar.ItemBase, "baidu.editor.toolbar.Reference");
toolbar.Reference.prototype.initialize = function() {
	var A = this;
	var B = false;
	this.button.addEventListener("onconfirm",
	function() {
		if (A.editor.queryContextState("reference")) {
			A.editor.removeReference()
		} else {
			var C = this;
			C.dialog = Fe.Dialog.open("js/Dialog/Wiki/TiReference/TiReference.html", {
				title: "\u5f15\u7528\u53c2\u8003\u8d44\u6599",
				width: "488px",
				height: "350px",
				buttonbar: true,
				buttonAccept: true,
				buttonCancel: true,
				locked: true,
				contentType: "HTMLUrl"
			});
			C.dialog.onopen = function() {
				document.body.focus()
			};
			C.dialog.onaccept = function(F) {
				var D = C.dialog.getIframe().contentWindow;
				d = D.document;
				if (!D.refTools.clickOkButton()) {
					F.returnValue = false
				} else {
					var E = D.refTools.getSeletedRefIndex();
					if (E && E.length) {
						A.editor.insertReference(E)
					}
					D.refTools.unloadHandler()
				}
			};
			C.dialog.onclose = function() {
				var D = C.dialog.getIframe().contentWindow;
				d = D.document;
				D.refTools.unloadHandler();
				A.editor.focus()
			}
		}
	});
	A.editor.addEventListener("onselectionchange",
	function(D) {
		var C = A.editor.queryContextState("reference");
		switch (C) {
		case 0:
			B = false;
			break;
		case 1:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			Tools.special.disable();
			break;
		case 2:
			B = false;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			Tools.special.disable();
			break;
		case 3:
			B = true;
			Tools.bold.disable();
			Tools.italic.disable();
			Tools.underline.disable();
			Tools.title1.disable();
			Tools.title2.disable();
			Tools.link.disable();
			Tools.image.disable();
			Tools.table.disable();
			Tools.special.disable();
			break
		}
	});
	A.editor.addEventListener("onafterselectionchange",
	function(C) {
		if (B) {
			A.button.highlight()
		} else {
			A.button.removeHighlight()
		}
	})
};
toolbar.Format = function(B, A) {
	toolbar.ItemBase.call(this, B);
	this.name = "Format";
	this.button = A
};
baidu.inherits(toolbar.Format, toolbar.ItemBase, "baidu.editor.toolbar.Format");
toolbar.Format.prototype.initialize = function() {
	var A = this;
	this.button.addEventListener("onconfirm",
	function() {
		A.editor.removeformat()
	})
};
baidu.editor.register(function(A) {
	A.getFilter().builder.element("body").text().html().attribute("contentEditable,style").element("p").text().html().element("br").element("img").attribute("src").element("div").text().html().attribute("class").element("td").except("table").except("table, td, tr").element("h2,h3").attribute("class").eliminate("script, style,object,select")
});
function ce(A) {
	var B = document.createElement(A);
	B.style.MozUserSelect = "none";
	B.unselectable = "on";
	return B
}
function stopEvent(A) {
	if (A) {
		A.cancelBubble = true;
		if (A.stopPropagation) {
			A.stopPropagation()
		}
	}
}
function preventDefault(A) {
	A.returnValue = false;
	if (A.preventDefault) {
		A.preventDefault()
	}
}

function Toolbar(B) {
    console.log(B);
	var A = this;
	A.id = B;
	A.dom = baidu.G(B);
    console.log(A.dom)
	A.create()
}
baidu.extend(Toolbar.prototype, {
	create: function() {
		this.dom.style.MozUserSelect = "none";
		this.dom.unselectable = "on"
	},
	addButton: function(A) {
		if (A && A.getDomObj) {
			this.dom.appendChild(A.getDomObj())
		}
	},
	addBar: function() {
		var B = ce("div");
		var A = ce("span");
		baidu.addClass(A, "btn_bar");
		B.appendChild(A);
		A.style.MozUserSelect = "none";
		A.unselectable = "on";
		B.style.MozUserSelect = "none";
		B.unselectable = "on";
		this.dom.appendChild(B)
	}
});
Button.config = {
	hover: "btn_hover",
	active: "btn_active",
	disabled: "btn_disabled",
	highlight: "btn_highlight",
	defaultClassName: "",
	textButton: "btn_text btn_default",
	idPrefix: "toolbar-button-"
};
var buttonCounter = 0;
function Button(A) {
	var B = this;
	buttonCounter++;
	baidu.BaseClass.call(B);
	A = A || {};
	B.id = A.id || Button.config.idPrefix + buttonCounter;
	B.className = A.className || Button.config.defaultClassName;
	B._onclick = A.onclick;
	B.label = A.label;
	B.title = A.title;
	B.button = null;
	B.inner = null;
	B.isDisabled = false;
	B.isHighlight = false;
	B._createWraper()
}
baidu.inherits(Button, baidu.BaseClass, "Button");
baidu.extend(Button.prototype, {
	_createWraper: function() {
		var D = this;
		var C = D.button = ce("div");
		C.id = D.id;
		if (D.label) {
			baidu.addClass(C, Button.config.textButton)
		}
		var B = ce("div");
		var A = D.inner = ce("p");
		C.appendChild(B);
		B.appendChild(A);
		B.title = D.title;
		C.style.MozUserSelect = "none";
		B.style.MozUserSelect = "none";
		A.style.MozUserSelect = "none";
		C.unselectable = "on";
		B.unselectable = "on";
		A.unselectable = "on";
		D.createInner();
		D.registerHandlers();
		return D
	},
	createInner: function() {
		var B = this;
		var A = ce("span");
		baidu.addClass(A, B.className);
		A.style.MozUserSelect = "none";
		A.unselectable = "on";
		B.addContent(A);
		if (B.label) {
			A.innerHTML = B.label
		}
	},
	addContent: function(A) {
		this.inner.appendChild(A)
	},
	registerHandlers: function() {
		var B = this;
		var A = B.button;
		baidu.on(A, "mouseover",
		function(C) {
			if (B.isDisabled) {
				return
			}
			baidu.addClass(A, Button.config.hover)
		});
		baidu.on(A, "mouseout",
		function(C) {
			if (B.isDisabled) {
				return
			}
			baidu.removeClass(A, Button.config.hover);
			baidu.removeClass(A, Button.config.active)
		});
		baidu.on(A, "mousedown",
		function(C) {
			if (B.isDisabled) {
				return
			}
			baidu.addClass(A, Button.config.active)
		});
		baidu.on(A, "mouseup",
		function(C) {
			if (B.isDisabled) {
				return
			}
			baidu.removeClass(A, Button.config.active)
		});
		baidu.on(A, "click",
		function(C) {
			if (B.isDisabled) {
				return
			}
			if (B._onclick && typeof B._onclick == "function") {
				B._onclick()
			} else {
				B.confirm()
			}
		})
	},
	getDomObj: function() {
		return this.button
	},
	highlight: function() {
		this.isHighlight = true;
		baidu.addClass(this.button, Button.config.highlight)
	},
	disable: function() {
		this.isDisabled = true;
		baidu.removeClass(this.button, Button.config.highlight);
		baidu.removeClass(this.button, Button.config.hover);
		baidu.addClass(this.button, Button.config.disabled)
	},
	removeHighlight: function() {
		this.isHighlight = false;
		baidu.removeClass(this.button, Button.config.highlight)
	},
	enable: function() {
		this.isDisabled = false;
		baidu.removeClass(this.button, Button.config.disabled)
	},
	confirm: function() {
		this.dispatchEvent(new baidu.BaseEvent("onconfirm"))
	}
});
Menu.config = {
	menu: "toolbar-menu",
	idPrefix: "menu-"
};
var menuCounter = 0;
Menu.menus = [];
function Menu(A) {
	var B = this;
	baidu.BaseClass.call(B);
	menuCounter++;
	A = A || {};
	B.id = A.id || Menu.config.idPrefix + menuCounter;
	B.menu = null;
	B._menuitems = [];
	B.isShow = false;
	B._createDom();
	Menu.menus.push(this)
}
baidu.inherits(Menu, baidu.BaseClass, "Menu");
baidu.extend(Menu.prototype, {
	_createDom: function() {
		var A = this;
		var B = A.menu = ce("div");
		baidu.addClass(B, Menu.config.menu);
		B.id = A.id;
		A.hide();
		document.body.appendChild(B);
		A._registerHandlers()
	},
	_registerHandlers: function() {
		var A = this;
		baidu.on(document, "mousedown",
		function(B) {
			A.hide()
		});
		baidu.on(document, "mouseup",
		function(B) {
			A.hide()
		});
		baidu.on(A.menu, "mousedown",
		function(B) {
			stopEvent(B)
		});
		baidu.on(A.menu, "mouseup",
		function(B) {
			stopEvent(B)
		})
	},
	show: function() {
		this.menu.style.display = "";
		this.isShow = true
	},
	hide: function() {
		this.menu.style.display = "none";
		this.isShow = false
	},
	toggle: function() {
		if (this.menu.style.display == "") {
			this.hide()
		} else {
			this.show()
		}
	},
	setPosition: function(A) {
		this.menu.style.left = typeof A.left == "number" ? A.left + "px": A.left;
		this.menu.style.top = typeof A.top == "number" ? A.top + "px": A.top
	},
	addMenuitem: function(B) {
		if (!B || !B.getDom || !B.getDom()) {
			return
		}
		var A = this;
		A.menu.appendChild(B.getDom());
		B.addEventListener("onclick",
		function() {
			A.hide()
		})
	}
});
MenuItem.config = {
	menuitem: "menuitem",
	hover: "menuitem-hover",
	disabled: "menuitem-disabled",
	idPrefix: "toolbar-menuitem-"
};
var menuitemCounter = 0;
function MenuItem(A) {
	var B = this;
	menuitemCounter++;
	A = A || {};
	B.label = A.label || "Menu Item ";
	B.className = A.className;
	B._onclick = A.onclick;
	B.id = A.id || MenuItem.config.idPrefix + menuitemCounter;
	B.button = null;
	B.isDisabled = false;
	baidu.BaseClass.call(B);
	B._createDom()
}
baidu.inherits(MenuItem, baidu.BaseClass, "MenuItem");
baidu.extend(MenuItem.prototype, {
	_createDom: function() {
		var B = this;
		var A = B.button = ce("div");
		baidu.addClass(A, MenuItem.config.menuitem);
		A.id = B.id;
		if (B.className) {
			baidu.addClass(A, B.className)
		}
		var C = document.createTextNode(B.label);
		A.appendChild(C);
		B._registerHandlers()
	},
	_registerHandlers: function() {
		var B = this;
		var A = B.button;
		baidu.on(A, "mouseover",
		function(D) {
			if (B.isDisabled) {
				return
			}
			if (B.id == "insertTable") {
				var D = D || window.event;
				var G = D.target || D.srcElement;
				baidu.addClass(A, "menuitem-arrow");
				setTablePanel.showTablePanel();
				var F = parseInt(G.parentNode.style.left);
				var E = parseInt(G.parentNode.style.top);
				var C = baidu.G("bdMenuInsertTable");
				C.style.left = F + G.offsetWidth + "px";
				C.style.top = E + "px"
			} else {
				baidu.addClass(A, MenuItem.config.hover)
			}
		});
		baidu.on(A, "mouseout",
		function() {
			if (B.id == "insertTable") {
				baidu.removeClass(A, "menuitem-arrow");
				setTablePanel.hiddenTablePanel()
			}
			baidu.removeClass(A, MenuItem.config.hover)
		});
		baidu.on(A, "click",
		function() {
			if (B.isDisabled) {
				return
			}
			B.clicked();
			if (B._onclick && typeof B._onclick == "function") {
				B._onclick()
			} else {
				B.confirm()
			}
		})
	},
	getDom: function() {
		return this.button
	},
	disable: function() {
		var B = this;
		var A = B.button;
		this.isDisabled = true;
		if (B.id == "insertTable") {
			baidu.removeClass(A, "menuitem-arrow")
		}
		baidu.addClass(this.button, MenuItem.config.disabled)
	},
	enable: function() {
		this.isDisabled = false;
		baidu.removeClass(this.button, MenuItem.config.disabled)
	},
	confirm: function() {
		this.dispatchEvent(new baidu.BaseEvent("onconfirm"))
	},
	clicked: function() {
		this.dispatchEvent(new baidu.BaseEvent("onclick"))
	}
});
baidu.isElement = function(A) {
	return A && A.nodeType == 1
};
baidu.isFirefox = /Firefox(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$2: 0;
baidu.isIE = /MSIE (\d+(\.\d+)?)/.test(navigator.userAgent) ? RegExp.$1: 0;
baidu.isWebkit = (navigator.userAgent.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(navigator.userAgent)) ? RegExp.$1: 0;
baidu.isOpera = (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$2: 0;
baidu.isSafari = (navigator.userAgent.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
baidu.isGecko = (navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(navigator.userAgent)) ? RegExp.$1: 0;
baidu.isStrict = (document.compatMode == "CSS1Compat");
baidu.css = function(C, G) {
	if (!C || !G) {
		return null
	}
	C = typeof C == "string" ? document.getElementById(C) : C;
	var B = !window.opera && navigator.userAgent.indexOf("MSIE") != -1;
	if (G == "float") {
		G = B ? "styleFloat": "cssFloat"
	}
	G = G.replace(/(-[a-z])/gi,
	function(H, I) {
		return I.charAt(1).toUpperCase()
	});
	if ("opacity" == G && B) {
		var A = C.style.filter;
		return A && A.indexOf("opacity=") >= 0 ? (parseFloat(A.match(/opacity=([^)]*)/)[1]) / 100) + "": "1"
	}
	var F = null;
	if (F = C.style[G]) {
		return F
	}
	if (C.currentStyle) {
		return C.currentStyle[G]
	} else {
		var E = C.nodeType == 9 ? C: C.ownerDocument || C.document;
		if (E.defaultView && E.defaultView.getComputedStyle) {
			var D = E.defaultView.getComputedStyle(C, "");
			if (D) {
				return D[G]
			}
		}
	}
	return null
};
baidu.dom.getStyle = function(B, A) {
	return baidu.css(B, A)
};
baidu.dom.getPosition = function(D) {
	D = baidu.G(D);
	if (!baidu.isElement(D)) {
		throw new Error("[baidu.dom.getPosition] param must be Element")
	}
	var G = baidu.dom.getDocument(D);
	var F = baidu.isGecko > 0 && G.getBoxObjectFor && baidu.dom.getStyle(D, "position") == "absolute" && (D.style.top === "" || D.style.left === "");
	var H = {
		left: 0,
		top: 0
	};
	var B = (baidu.isIE && !baidu.isStrict) ? G.body: G.documentElement;
	if (D == B) {
		return H
	}
	var C = null;
	var E;
	if (D.getBoundingClientRect) {
		E = D.getBoundingClientRect();
		H.left = E.left + Math.max(G.documentElement.scrollLeft, G.body.scrollLeft);
		H.top = E.top + Math.max(G.documentElement.scrollTop, G.body.scrollTop);
		H.left -= G.documentElement.clientLeft;
		H.top -= G.documentElement.clientTop;
		if (baidu.isIE && !baidu.isStrict) {
			H.left -= 2;
			H.top -= 2
		}
	} else {
		if (G.getBoxObjectFor && !F) {
			E = G.getBoxObjectFor(D);
			var A = G.getBoxObjectFor(B);
			H.left = E.screenX - A.screenX;
			H.top = E.screenY - A.screenY
		} else {
			C = D;
			do {
				H.left += C.offsetLeft;
				H.top += C.offsetTop;
				if (baidu.isWebkit > 0 && baidu.dom.getStyle(C, "position") == "fixed") {
					H.left += G.body.scrollLeft;
					H.top += G.body.scrollTop;
					break
				}
				C = C.offsetParent
			} while ( C && C != D );
			if (baidu.isOpera > 0 || (baidu.isWebkit > 0 && baidu.dom.getStyle(D, "position") == "absolute")) {
				H.top -= G.body.offsetTop
			}
			C = D.offsetParent;
			while (C && C != G.body) {
				H.left -= C.scrollLeft;
				if (!baidu.isOpera || C.tagName != "TR") {
					H.top -= C.scrollTop
				}
				C = C.offsetParent
			}
		}
	}
	return H
};
MenuButton.config = {
	label: "toolbar-menu-button-label",
	dropdown: "toolbar-menu-button-dropdown",
	menubutton: "toolbar-menu-button"
};
baidu.extend(MenuButton.config, Button.config);
function MenuButton(A) {
	var B = this;
	A = A || {};
	B.label = A.label || "MenuButton";
	B.items = [];
	B.menu = new Menu();
	Button.call(B, A)
}
baidu.inherits(MenuButton, Button, "MenuButton");
baidu.extend(MenuButton.prototype, {
	createInner: function() {
		var B = this;
		baidu.addClass(B.button, MenuButton.config.textButton);
		var A = ce("span");
		baidu.addClass(A, B.className);
		A.innerHTML = B.label;
		A.unselectable = "on";
		A.MozUserSelect = "none";
		B.addContent(A);
		B._registerHandlers()
	},
	_registerHandlers: function() {
		var A = this;
		baidu.on(A.button, "mousedown",
		function(B) {
			if (A.isDisabled) {
				return
			}
			var C = baidu.dom.getPosition(A.button);
			A.menu.setPosition({
				left: C.left,
				top: (C.top + A.button.offsetHeight)
			});
			A.menu.toggle();
			window.focus();
			stopEvent(B)
		});
		baidu.on(A.button, "mouseup",
		function(B) {
			if (A.isDisabled) {
				return
			}
			stopEvent(B)
		})
	},
	addMenuitem: function(A) {
		this.menu.addMenuitem(A)
	}
});
var Tools = (function() {
	var V;
	var Z;
	var O;
	var T;
	var F;
	var J;
	var I;
	var H;
	var C;
	var R;
	var W;
	var G;
	var Y;
	var S;
	var M;
	var L;
	var E;
	var Q;
	var X;
	var N;
	var P;
	var B;
	var K;
	function U(a) {
		document.getElementById("loading").style.display = "block";
		var b = new Toolbar("toolbar");
		this.save = new Button({
			id: "button-save",
			className: "btn_save",
			title: "\u5b58\u4e3a\u8349\u7a3f",
			label: "\u5b58\u4e3a\u8349\u7a3f",
			onclick: function() {
				if (inputValidate(0)) {
					var c = this;
					c.dialog = Fe.Dialog.open("js/Dialog/Wiki/TiSave/TiSave.html", {
						title: "\u7248\u672c\u5907\u6ce8\u4fe1\u606f",
						width: "380px",
						height: "310px",
						buttonbar: true,
						buttonAccept: true,
						buttonCancel: true,
						locked: true,
						contentType: "HTMLUrl"
					});
					c.dialog.onaccept = function(g) {
						var f = c.dialog.getIframe().contentWindow;
						f.Save.dP(g)
					};
					c.dialog.onopen = function() {
						document.body.focus()
					}
				}
			}
		});
		b.addButton(this.save);
		this.undo = new Button({
			id: "button-undo",
			className: "btn_undo",
			title: "\u64a4\u9500"
		});
		b.addButton(this.undo);
		this.redo = new Button({
			id: "button-redo",
			className: "btn_redo",
			title: "\u91cd\u505a"
		});
		b.addButton(this.redo);
		b.addBar();
		this.bold = new Button({
			id: "button-bold",
			className: "btn_bold",
			title: "\u52a0\u7c97"
		});
		b.addButton(this.bold);
		this.italic = new Button({
			id: "button-italic",
			className: "btn_italic",
			title: "\u659c\u4f53"
		});
		b.addButton(this.italic);
		this.underline = new Button({
			id: "button-underline",
			className: "btn_underline",
			title: "\u4e0b\u5212\u7ebf"
		});
		b.addButton(this.underline);
		b.addBar();
		this.title1 = new Button({
			id: "button-title1",
			className: "btn_title1",
			title: "\u4e00\u7ea7\u6807\u9898",
			label: "\u4e00\u7ea7\u6807\u9898"
		});
		b.addButton(this.title1);
		this.title2 = new Button({
			id: "button-title2",
			className: "btn_title2",
			title: "\u4e8c\u7ea7\u6807\u9898",
			label: "\u4e8c\u7ea7\u6807\u9898"
		});
		b.addButton(this.title2);
		this.link = new Button({
			id: "button-link",
			className: "btn_link",
			title: "\u8bcd\u6761\u94fe\u63a5"
		});
		b.addButton(this.link);
		this.special = new Button({
			id: "button-special",
			className: "btn_special",
			title: "\u63d2\u5165\u7279\u6b8a\u5b57\u7b26"
		});
		b.addButton(this.special);
		this.image = new Button({
			id: "button-image",
			className: "btn_image",
			title: "\u63d2\u5165/\u7f16\u8f91\u56fe\u7247"
		});
		b.addButton(this.image);
		this.table = new MenuButton({
			id: "button-table",
			className: "btn_table",
			title: "\u8868\u683c",
			label: "\u8868\u683c"
		});
		this.insertTable = new MenuItem({
			id: "insertTable",
			label: "\u63d2\u5165\u8868\u683c"
		});
		this.deleteTable = new MenuItem({
			id: "deleteTable",
			label: "\u5220\u9664\u8868\u683c"
		});
		this.insertColumnLeft = new MenuItem({
			id: "insertColumnLeft",
			label: "\u5de6\u4fa7\u63d2\u5165\u5217"
		});
		this.insertColumnRight = new MenuItem({
			id: "insertColumnRight",
			label: "\u53f3\u4fa7\u63d2\u5165\u5217"
		});
		this.insertRowUp = new MenuItem({
			id: "insertRowUp",
			label: "\u4e0a\u65b9\u63d2\u5165\u884c"
		});
		this.insertRowBelow = new MenuItem({
			id: "insertRowBelow",
			label: "\u4e0b\u65b9\u63d2\u5165\u884c"
		});
		this.deleteColumns = new MenuItem({
			id: "deleteColumns",
			label: "\u5220\u9664\u5217"
		});
		this.deleteRows = new MenuItem({
			id: "deleteRows",
			label: "\u5220\u9664\u884c"
		});
		this.setColumnProps = new MenuItem({
			id: "setColumnProps",
			label: "\u5217\u5c5e\u6027",
			className: "btn_line"
		});
		this.table.addMenuitem(this.insertTable);
		this.table.addMenuitem(this.deleteTable);
		this.table.addMenuitem(this.insertColumnLeft);
		this.table.addMenuitem(this.insertColumnRight);
		this.table.addMenuitem(this.insertRowUp);
		this.table.addMenuitem(this.insertRowBelow);
		this.table.addMenuitem(this.deleteColumns);
		this.table.addMenuitem(this.deleteRows);
		this.table.addMenuitem(this.setColumnProps);
		b.addButton(this.table);
		this.removeFormat = new Button({
			id: "button-format",
			className: "btn_format",
			title: "\u5220\u9664\u683c\u5f0f"
		});
		b.addButton(this.removeFormat);
		A()
	}
	function D() {
		Tools.save.enable();
		Tools.bold.enable();
		Tools.italic.enable();
		Tools.underline.enable();
		Tools.title1.enable();
		Tools.title2.enable();
		Tools.link.enable();
		Tools.special.enable();
		Tools.image.enable();
		Tools.table.enable();
		Tools.removeFormat.enable();
		document.getElementById("loading").style.display = "none"
	}
	function A() {
		Tools.save.disable();
		Tools.undo.disable();
		Tools.redo.disable();
		Tools.bold.disable();
		Tools.italic.disable();
		Tools.underline.disable();
		Tools.title1.disable();
		Tools.title2.disable();
		Tools.link.disable();
		Tools.special.disable();
		Tools.image.disable();
		Tools.table.disable();
		Tools.removeFormat.disable();
		Tools.deleteTable.disable();
		Tools.insertColumnLeft.disable();
		Tools.insertColumnRight.disable();
		Tools.insertRowUp.disable();
		Tools.insertRowBelow.disable();
		Tools.deleteColumns.disable();
		Tools.deleteRows.disable();
		Tools.setColumnProps.disable()
	}
	return {
		save: V,
		undo: Z,
		redo: O,
		bold: T,
		italic: F,
		title1: J,
		title2: I,
		link: H,
		special: C,
		image: R,
		table: W,
		removeFormat: S,
		insertTable: M,
		deleteTable: L,
		insertColumnLeft: E,
		insertColumnRight: Q,
		insertRowUp: X,
		insertRowBelow: N,
		deleteColumns: P,
		deleteRows: B,
		setColumnProps: K,
		init: U,
		buttonEnable: D,
		buttonDisable: A
	}
})(); (function() {
	baidu.getPosition = function(C) {
		return {
			left: A(C),
			top: B(C)
		}
	};
	function A(D) {
		var C = 0;
		while (D != null) {
			C += D.offsetLeft;
			D = D.offsetParent
		}
		return C
	}
	function B(D) {
		var C = 0;
		while (D != null) {
			C += D.offsetTop;
			D = D.offsetParent
		}
		return C
	}
})(); (function() {
	baidu.getPointer = function(C) {
		var B = document.documentElement,
		A = document.body || {
			scrollLeft: 0,
			scrollTop: 0
		};
		return {
			x: C.pageX || (C.clientX + (B.scrollLeft || A.scrollLeft) - (B.clientLeft || 0)),
			y: C.pageY || (C.clientY + (B.scrollTop || A.scrollTop) - (B.clientTop || 0))
		}
	}
})();
var Saves = (function() {
	var left_num = 0;
	var getByteLength = function(me) {
		return me.replace(/[^\x00-\xff]/g, "mm").length
	};
	var doPost = function() {
		var editorHtml = editorFilter(editor.getContent());
		var _str = "&message=" + encodeURIComponent(editorHtml);
		if (Fe.G("lemmamodify")) {
			_str += "&lemmamodify=" + Fe.G("lemmamodify").value
		}
		var _arr = ["lemmaref", "lemmaid", "lemmaclass", "lemmaVersionId", "lemmatitle"];
		Fe.each(_arr,
		function(_value, _index) {
			_str += "&" + _value + "=" + encodeURIComponent(Fe.G(_value).value)
		});
		var newRefEls = Fe.G("refContentList").getElementsByTagName("input");
		var newRefLen = newRefEls.length;
		for (var i = 0; i < newRefLen; i++) {
			var inputName = newRefEls[i].name;
			if (inputName) {
				_str += "&" + inputName + "=" + encodeURIComponent(newRefEls[i].value)
			}
		}
		var _url = "/save/?";
		Fe.Ajax.request(_url, _str, {
			onsuccess: function(xhr) {
				callback(eval(xhr.responseText))
			},
			method: "POST",
			async: false
		})
	};
	var callback = function(_arr) {
		if (_arr[0] == 1) {
			_arr[1] = 100 - _arr[1];
			left_num = _arr[1];
			if (_arr[1] < 95) {
				displayInfo(0)
			} else {
				if (_arr[1] < 100 && _arr[1] > 94) {
					displayInfo(1)
				} else {
					displayInfo(2)
				}
			}
		} else {
			displayInfo(3)
		}
		Save.content = editorFilter(editor.getContent())
	};
	var displayInfo = function(i) {
		var _d = new Date();
		var _output = _d.getFullYear() + "-" + (_d.getMonth() + 1) + "-" + _d.getDate() + " " + _d.getHours() + ":" + _d.getMinutes() + ":" + _d.getSeconds();
		switch (i) {
		case 0:
			Fe.G("saveinfo").style.display = "";
			Fe.G("saveinfo").innerHTML = '<span id="draftbox"><a target="_blank" href="/usercenter/#2">查看已保存词条</a></span><b>提示</b>&nbsp;&nbsp;本次保存时间为' + _output + "，您可在草稿箱随时查看保存版本的信息";
			break;
		case 1:
			Fe.G("saveinfo").style.display = "";
			Fe.G("saveinfo").innerHTML = '<span id="draftbox"><a target="_blank" href="/usercenter/#2">查看已保存词条</a></span><b>提示</b>&nbsp;&nbsp;本次保存时间为' + _output + "，您的草稿箱已有" + left_num + "条记录，请及时清理不需要的版本";
			break;
		case 2:
			Fe.G("saveinfo").style.display = "";
			Fe.G("saveinfo").innerHTML = '<span id="draftbox"><a target="_blank" href="/usercenter/#2">查看已保存词条</a></span><b>提示</b>&nbsp;&nbsp;本次保存时间为' + _output + "，您的草稿箱记录已满，下一次保存将覆盖最早的版本记录";
			break;
		case 3:
			Fe.G("saveinfo").style.display = "";
			Fe.G("saveinfo").innerHTML = '<span id="draftbox"><a target="_blank" href="/usercenter/#2">查看已保存词条</a></span><b>提示</b>&nbsp;&nbsp;可能因您处于非登陆状态，或因网络及系统不稳定，本次保存失败！';
			break
		}
	};
	return {
		dP: doPost
	}
})();
var setTablePanel = (function() {
	var D, A, B, C;
	function H() {
		D = baidu.G("insertTable");
		A = baidu.G("bdMenuInsertTable");
		B = baidu.G("pickerHolder");
		C = baidu.G("pickerArea");
		G()
	}
	function G() {
		if (D && A) {
			baidu.on(A, "mouseover",
			function() {
				E()
			});
			if (B) {
				baidu.on(B, "mousemove",
				function(L) {
					var L = window.event || L;
					var J = baidu.getPointer(L);
					var K = J.x;
					var S = J.y;
					var Q = baidu.getPosition(C);
					var M = Q.left + 1;
					var R = Q.top + 1;
					var N = baidu.G("pickerHighlighted");
					var O = Math.ceil((K - M) / 22);
					var P = Math.ceil((S - R) / 22);
					if (O <= 0 || O > 10 || P <= 0 || P > 10) {
						O = 0;
						P = 0
					}
					N.style.width = O + "em";
					N.style.height = P + "em";
					baidu.G("columnCount").innerHTML = O;
					baidu.G("rowCount").innerHTML = P;
					baidu.addClass(D, "menuitem-arrow")
				});
				baidu.on(B, "mouseout",
				function(L) {
					var L = window.event || L;
					var J = baidu.getPointer(L);
					var K = J.x;
					var S = J.y;
					var Q = baidu.getPosition(C);
					var M = Q.left + 1;
					var R = Q.top + 1;
					var N = baidu.G("pickerHighlighted");
					var O = Math.ceil((K - M) / 22);
					var P = Math.ceil((S - R) / 22);
					if (O <= 0) {
						I();
						baidu.removeClass(D, "menuitem-arrow")
					}
					if (O <= 0 || O > 10 || P <= 0 || P > 10) {
						O = 0;
						P = 0
					}
					N.style.width = O + "em";
					N.style.height = P + "em";
					baidu.G("columnCount").innerHTML = O;
					baidu.G("rowCount").innerHTML = P
				});
				baidu.on(C, "mousedown",
				function(J) {
					var L = parseInt(baidu.G("columnCount").innerHTML);
					var K = parseInt(baidu.G("rowCount").innerHTML);
					if (L > 0 && K > 0) {
						editor.insertTable(K, L, {
							noDefaultStyle: true
						})
					}
					setTimeout(function() {
						var M = baidu.G("pickerHighlighted");
						M.style.width = 0 + "em";
						M.style.height = 0 + "em";
						baidu.G("columnCount").innerHTML = 0;
						baidu.G("rowCount").innerHTML = 0
					},
					10)
				})
			}
		}
		baidu.on(document.body, "click",
		function() {
			A.style.display = "none"
		})
	}
	function F() {
		var J = this;
		J.dialog = Fe.Dialog.open("insertTable.html", {
			title: "插入表格",
			width: "380px",
			height: "155px",
			buttonbar: true,
			buttonAccept: true,
			buttonCancel: true,
			locked: true,
			contentType: "HTMLUrl"
		});
		J.dialog.onaccept = function(Q) {
			var L = J.dialog.getIframe().contentWindow;
			var R = L.document;
			var P = R.getElementById("columnCount").value;
			var N = R.getElementById("rowCount").value;
			var K = R.getElementById("tableTip");
			var O = R.getElementById("columnTip");
			var M = R.getElementById("rowTip");
			var P = parseInt(P);
			var N = parseInt(N);
			if (!P || P < 1 || P > 20) {
				K.style.display = "none";
				O.style.display = "";
				M.style.display = "none";
				Q.returnValue = false;
				return false
			}
			if (!N || N < 1 || N > 50) {
				K.style.display = "none";
				O.style.display = "none";
				M.style.display = "";
				Q.returnValue = false;
				return false
			}
			editor.insertTable(N, P, {
				noDefaultStyle: true
			})
		}
	}
	function E() {
		A.style.display = "block"
	}
	function I() {
		A.style.display = "none"
	}
	return {
		init: H,
		insertMoreTable: F,
		showTablePanel: E,
		hiddenTablePanel: I
	}
})();
Tools.init();
var EditorTime_begin = (new Date()).getTime();
var editor = baidu.editor.create("code", {
	width: 673,
	height: 470
});
baidu.G("EditorHolder").innerHTML = editor.render();
function editorInit() {
	editor.addToolbarItem(new baidu.editor.toolbar.Undo(editor, Tools.undo));
	editor.addToolbarItem(new baidu.editor.toolbar.Redo(editor, Tools.redo));
	editor.addToolbarItem(new baidu.editor.toolbar.Bold(editor, Tools.bold));
	editor.addToolbarItem(new baidu.editor.toolbar.Italic(editor, Tools.italic));
	editor.addToolbarItem(new baidu.editor.toolbar.Underline(editor, Tools.underline));
	editor.addToolbarItem(new baidu.editor.toolbar.Title(editor, Tools.title1));
	editor.addToolbarItem(new baidu.editor.toolbar.Title2(editor, Tools.title2));
	editor.addToolbarItem(new baidu.editor.toolbar.Link(editor, Tools.link));
	editor.addToolbarItem(new baidu.editor.toolbar.SpecialCharacter(editor, Tools.special));
	editor.addToolbarItem(new baidu.editor.toolbar.Image(editor, Tools.image));
	editor.addToolbarItem(new baidu.editor.toolbar.Table(editor, Tools.table));
	editor.addToolbarItem(new baidu.editor.toolbar.InsertTable(editor, Tools.insertTable));
	editor.addToolbarItem(new baidu.editor.toolbar.DeleteTable(editor, Tools.deleteTable));
	editor.addToolbarItem(new baidu.editor.toolbar.InsertColumnLeft(editor, Tools.insertColumnLeft));
	editor.addToolbarItem(new baidu.editor.toolbar.InsertColumnRight(editor, Tools.insertColumnRight));
	editor.addToolbarItem(new baidu.editor.toolbar.InsertRowUp(editor, Tools.insertRowUp));
	editor.addToolbarItem(new baidu.editor.toolbar.InsertRowBelow(editor, Tools.insertRowBelow));
	editor.addToolbarItem(new baidu.editor.toolbar.DeleteColumns(editor, Tools.deleteColumns));
	editor.addToolbarItem(new baidu.editor.toolbar.DeleteRows(editor, Tools.deleteRows));
	editor.addToolbarItem(new baidu.editor.toolbar.SetColumnProps(editor, Tools.setColumnProps));
	editor.addToolbarItem(new baidu.editor.toolbar.Format(editor, Tools.removeFormat))
}
var editorKey = baidu.BaseClass.guid();
editor.addEventListener("onreadystatechange",
function(B) {
	var A = B.currentTarget;
	if (A.readyState == 4) {
		setTimeout(function() {
			var D = (new Date()).getTime();
			var C = D - EditorTime_begin;
			setTablePanel.init();
			editorInit();
			Tools.buttonEnable();
			setSectionEditor("beforeLemma", "beforeLemmaIframe");
			setSectionEditor("endLemma", "endLemmaIframe");
			editor.addEventListener("mousedown",
			function(G) {
				var E = G.target;
				var F = E.target || E.srcElement;
				if (F.nodeName == "SUP") {
					parent.gotoRef(F)
				}
			});
			editor.addEventListener("onfocus",
			function() {
				if (baidu.G("menu-1")) {
					var F = baidu.G("menu-1");
					if (F.style.display != "none") {
						F.style.display = "none"
					}
				}
				if (baidu.G("bdMenuInsertTable")) {
					var E = baidu.G("bdMenuInsertTable");
					if (E.style.display == "block") {
						E.style.display = "none"
					}
				}
			});
			Fe.on(window, "scroll",
			function() {
				if (baidu.G("menu-1")) {
					var F = baidu.G("menu-1");
					if (F.style.display != "none") {
						F.style.display = "none"
					}
				}
				if (baidu.G("bdMenuInsertTable")) {
					var E = baidu.G("bdMenuInsertTable");
					if (E.style.display == "block") {
						E.style.display = "none"
					}
				}
			});
			nslog(document.location, 74, {
				time: C
			})
		},
		200);
		A.removeEventListener("onreadystatechange", editorKey)
	}
},
editorKey);