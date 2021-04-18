//download by http://www.jb51.net
function setCurrentFocus(A) {
	currentFocus = this
}
function addItem(C) {
	var B = Fe.G(C + "_inputSpan");
	var D = document.createElement("div");
	D.innerHTML = B.innerHTML;
	Fe.G(C + "_td").appendChild(D);
	var A = Fe.G(C + "_td").getElementsByTagName("input");
	A[A.length - 1].value = "";
	D = null;
	Fe.on(A[A.length - 1], "focus", setCurrentFocus)
}
function addBigItem(B) {
	var E = parseInt(B.getAttribute("count"));
	if (E >= 5) {
		alert("\u6700\u591a5\u4e2a\u81ea\u5b9a\u4e49\u9879\u76ee");
		return false
	}
	var D = B.getAttribute("tpl");
	var H = Fe.G("inputCustom");
	var A = H.rows.length;
	var I = H.insertRow(A);
	I.className = "customer";
	I.insertCell(0);
	I.cells[0].innerHTML = "<input type='text' name='" + D + "_ext_" + E + "' id='" + D + "_ext_" + E + "' class='custInput1' maxLen='6' />";
	var F = Fe.G(D + "_ext_" + E);
	Fe.on(F, "focus", setCurrentFocus);
	I.insertCell(1);
	I.cells[1].innerHTML = "<input type='text' name='" + D + "_ext_" + E + "_value' id='" + D + "_ext_" + E + "_value' class='custInput2' maxLen='15' />";
	var C = Fe.G(D + "_ext_" + E + "_value");
	Fe.on(C, "focus", setCurrentFocus);
	E++;
	B.setAttribute("count", E.toString())
}
function showInputData(B) {
	var A = "";
	if (!B || B.length == 0) {
		return A
	} else {
		A = Fe.trim(B).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\n\r]+/g, "").replace(/[\s\t\xa0\u3000]+/g, "&nbsp;").replace(/(\[url\])+(.*?)(\[\/url\])+/g, "<span class='spanA'>$2</span>");
		return A
	}
}
var extData = [];
Fe.on(window, "load",
function() {
	if (Fe.G("extData").value.length > 0) {
		extData = eval(Fe.G("extData").value)
	}
	showOnPage();
	showSummary();
	return false
});
function jsonToString() {
	var E = "[";
	if (extData.length > 0) {
		for (var C = 0,
		H = extData.length; C < H; C++) {
			var F = extData[C].key;
			var B = extData[C].name;
			var D = extData[C].value;
			E += '{"key":"' + F + '","name":"' + B + '","value":[';
			for (var A = 0; A < D.length; A++) {
				E += '"' + D[A] + '",'
			}
			E = E.slice(0, E.length - 1);
			E += "]},"
		}
		E = E.slice(0, E.length - 1);
		E += "]"
	} else {
		E = ""
	}
	Fe.G("extData").value = E
}
function formatExtData() {
	var E = [];
	var D = 0;
	var H = 0;
	for (var B = 0,
	A = extData.length; B < A; B++) {
		if (extData[B].value.length > 0 && extData[B].name.length > 0) {
			if (extData[B].key.indexOf("_ext_") != -1) {
				var C = parseInt(extData[B].key.slice(extData[B].key.lastIndexOf("_") + 1));
				if (C != H) {
					var F = extData[B].key.slice(0, extData[B].key.lastIndexOf("_") + 1);
					extData[B].key = F + H.toString()
				}
				H++
			}
			E[D] = extData[B];
			D++
		}
	}
	extData = E
}
function showOnPage() {
	var B = Fe.G("inputMainInfoDivContent");
	var A = Fe.G("inputShowMainInfoDiv");
	if (extData.length > 0) {
		var C = "data=" + encodeURIComponent(Fe.G("extData").value) + "&t=" + new Date().getTime();
		Fe.Ajax.post("/api/preview/card/", C,
		function(D) {
			B.innerHTML = D.responseText;
			if (Fe.G("errorTableDiv")) {
				A.style.display = "none";
				extData = [];
				Fe.G("extData").value = ""
			} else {
				A.style.display = "block"
			}
			if (_cardOpen) {
				setTimeout(function() {
					_cardDialog.close()
				},
				130);
				_cardOpen = false
			}
		})
	} else {
		A.style.display = "none";
		if (_cardOpen) {
			setTimeout(function() {
				_cardDialog.close()
			},
			130);
			_cardOpen = false
		}
	}
	controlInsertButton()
}
function writeDataMain() {
	extData = [];
	var P = Fe.G("inputMainInfo").getElementsByTagName("tr");
	for (var N = 0,
	O = P.length; N < O; N++) {
		var C = P[N].getElementsByTagName("input")[0].name;
		var B = "";
		if (P[N].className == "customer") {
			B = encodeURIComponent(P[N].cells[0].getElementsByTagName("input")[0].value)
		} else {
			B = encodeURIComponent(Fe.G(C + "_name").innerHTML)
		}
		var A = [];
		var R = 0;
		var E = P[N].cells[1].getElementsByTagName("input");
		for (var K = 0,
		M = E.length; K < M; K++) {
			if (Fe.trim(E[K].value).length > 0) {
				A[R] = encodeURIComponent(Fe.trim(E[K].value));
				R++
			}
		}
		var L = P[N].cells[1].getElementsByTagName("select");
		for (var F = 0,
		J = L.length; F < J; F++) {
			var I = encodeURIComponent(L[F].options[L[F].selectedIndex].value);
			if (I != "0") {
				A[R] = I;
				R++
			}
		}
		var Q = P[N].cells[1].getElementsByTagName("textarea");
		for (var D = 0,
		H = Q.length; D < H; D++) {
			if (Fe.trim(Q[D].value).length > 0) {
				A[R] = encodeURIComponent(Fe.trim(Q[D].value));
				R++
			}
		}
		extData[N] = {
			key: C,
			name: B,
			value: A
		}
	}
	formatExtData();
	jsonToString();
	setTimeout(function() {
		showOnPage()
	},
	120)
}
function writeBackData() {
	for (var S = 0,
	P = extData.length; S < P; S++) {
		var K = extData[S].key;
		var D = extData[S].name;
		var B = extData[S].value;
		var E = Fe.G(K + "_td");
		try {
			if (E) {
				var C = E.getElementsByTagName("input");
				if (C.length > 0 && C.length < B.length) {
					var V = B.length - C.length;
					for (var Q = 0; Q < V; Q++) {
						addItem(K)
					}
				}
				C = E.getElementsByTagName("input");
				for (var R = 0,
				L = C.length; R < L; R++) {
					if (C[R].name == K) {
						C[R].value = decodeURIComponent(B[R])
					}
				}
				var F = Fe.G(K + "_inputSpan").getElementsByTagName("select");
				if (F.length > 0) {
					var M = F[0];
					if (M.name == K) {
						for (var N = 0,
						J = M.options.length; N < J; N++) {
							if (M.options[N].value == decodeURIComponent(B[0])) {
								M.options[N].selected = true;
								break
							}
						}
					}
				}
				var A = E.getElementsByTagName("textarea");
				for (var O = 0,
				I = A.length; O < I; O++) {
					if (A[O].name == K) {
						A[O].value = decodeURIComponent(B[O])
					}
				}
			} else {
				if (K.indexOf("_ext_") != -1) {
					var H = Fe.G("addBigPlus");
					var U = H.getAttribute("tpl");
					if (K.indexOf(U) != -1) {
						if (!Fe.G(K)) {
							addBigItem(H)
						}
						Fe.G(K).value = decodeURIComponent(D);
						Fe.G(K + "_value").value = decodeURIComponent(B[0])
					}
				}
			}
		} catch(T) {}
	}
}
function checkCharNum() {
	var J = true;
	var C = Fe.G("inputMainInfo").getElementsByTagName("input");
	for (var I = 0,
	F = C.length; I < F; I++) {
		var D = parseInt(C[I].getAttribute("maxLen")) * 2;
		var H = Fe.trim(C[I].value).replace(/(\[url\])+(.*?)(\[\/url\])+/g, "$2");
		if (bytes(H) > D) {
			var L = C[I].name;
			var N = "";
			if (Fe.G(L + "_name")) {
				N = Fe.G(L + "_name").innerHTML
			} else {
				if (L.indexOf("_ext_") != -1 && L.indexOf("_value") == -1) {
					N = "\u81ea\u5b9a\u4e49\u9879"
				} else {
					if (L.indexOf("_ext_") != -1 && L.indexOf("_value") != -1) {
						N = "\u81ea\u5b9a\u4e49\u9879\u7684\u503c"
					}
				}
			}
			alert(N + "\u8d85\u8fc7" + D / 2 + "\u4e2a\u5b57\uff08" + D + "\u5b57\u8282\uff09\uff0c\u8bf7\u91cd\u65b0\u586b\u5199");
			J = false;
			return false
		}
	}
	var B = Fe.G("inputMainInfo").getElementsByTagName("textarea");
	for (var I = 0,
	F = B.length; I < F; I++) {
		var A = parseInt(B[I].getAttribute("maxLen")) * 2;
		var E = Fe.trim(B[I].value).replace(/(\[url\])+(.*?)(\[\/url\])+/g, "$2");
		if (bytes(E) > A) {
			var K = B[I].name;
			var M = "";
			if (Fe.G(K + "_name")) {
				M = Fe.G(K + "_name").innerHTML
			}
			alert(M + "\u8d85\u8fc7" + A / 2 + "\u4e2a\u5b57\uff08" + A + "\u5b57\u8282\uff09\uff0c\u8bf7\u91cd\u65b0\u586b\u5199");
			J = false;
			return false
		}
	}
	return J
}
var _cardDialog;
var _cardOpen = false;
function editMainInfo() {
	if (Fe.G("extDataType").value.length <= 0) {
		insertMainInfo();
		return false
	}
	var A = "/page/card/card" + Fe.G("extDataType").value + ".html?t=" + new Date().getTime();
	Fe.Ajax.get(A,
	function(B) {
		setTimeout(function() {
			_cardDialog = Fe.Dialog.open(B.responseText, {
				title: "\u7f16\u8f91\u57fa\u672c\u4fe1\u606f\u680f",
				width: "440px",
				height: "500px",
				buttonbar: true,
				buttonAccept: true,
				buttonCancel: true,
				contentType: "HTMLString",
				buttonAcceptValue: "\u786e\u5b9a",
				buttonCancelValue: "\u53d6\u6d88",
				locked: true
			});
			_cardOpen = true;
			var E = Fe.G("inputMainInfo").getElementsByTagName("select");
			for (var H = 0,
			C = E.length; H < C; H++) {
				E[H].style.visibility = "visible"
			}
			var F = Fe.G("inputMainInfoTbody").getElementsByTagName("input");
			for (var H = 0,
			C = F.length; H < C; H++) {
				Fe.on(F[H], "focus", setCurrentFocus)
			}
			var D = Fe.G("inputCustom").getElementsByTagName("input");
			for (var H = 0,
			C = D.length; H < C; H++) {
				Fe.on(D[H], "focus", setCurrentFocus)
			}
			var I = Fe.G("inputMainInfoTbody").getElementsByTagName("textarea");
			for (var H = 0,
			C = I.length; H < C; H++) {
				Fe.on(I[H], "focus", setCurrentFocus)
			}
			writeBackData();
			_cardDialog.onaccept = function(J) {
				if (!checkCharNum()) {
					J.returnValue = false
				} else {
					J.returnValue = false;
					Fe.G("extDataTypeTemp").value = Fe.G("extDataType").value;
					writeDataMain()
				}
				return false
			};
			_cardDialog.oncancel = function(J) {
				if (confirm("\u786e\u5b9e\u8981\u53d6\u6d88\u7f16\u8f91\u7684\u5185\u5bb9\u5417\uff1f")) {
					Fe.G("extDataType").value = Fe.G("extDataTypeTemp").value;
					_cardOpen = false;
					J.returnValue = true
				} else {
					J.returnValue = false
				}
				return false
			}
		},
		200);
		nslog(location.href, 71)
	})
}
var listType = [["\u4eba\u7269", ["\u4eba\u7269\u901a\u7528", 0], ["\u6f14\u827a\u660e\u661f", 1], ["\u8fd0\u52a8\u5458", 2]], ["\u5f71\u89c6\u5267", ["\u7535\u5f71", 3], ["\u7535\u89c6\u5267", 4]], ["\u8fd0\u52a8\u961f", ["\u8fd0\u52a8\u961f\u901a\u7528", 5]], ["\u751f\u7269", ["\u751f\u7269\u901a\u7528", 6]], ["\u56fd\u5bb6", ["\u56fd\u5bb6\u901a\u7528", 7]], ["\u57ce\u5e02\u5730\u533a", ["\u57ce\u5e02\u5730\u533a\u901a\u7528", 8]], ["\u6e38\u620f", ["\u6e38\u620f\u901a\u7528", 9]], ["\u5b66\u6821", ["\u5b66\u6821\u901a\u7528", 10]], ["\u4e16\u535a", ["\u4e16\u535a\u5c55\u4f1a", 11], ["\u4e16\u535a\u5c55\u9986", 12]]];
function clearOnClass(D) {
	var C = Fe.G(D).getElementsByTagName("li");
	for (var B = 0,
	A = C.length; B < A; B++) {
		C[B].className = ""
	}
}
function addSecond(C) {
	var E = Fe.G("secondUl");
	E.innerHTML = "";
	Fe.G("extDataType").value = "";
	if (listType[C].length > 1) {
		for (var D = 1,
		B = listType[C].length; D < B; D++) {
			var A = document.createElement("li");
			A.innerHTML = listType[C][D][0];
			A.id = "secondLi_" + listType[C][D][1];
			E.appendChild(A);
			Fe.on(A, "click",
			function() {
				clearOnClass("secondUl");
				this.className = "on";
				Fe.G("extDataType").value = this.id.slice(9)
			});
			A = null
		}
	} else {
		Fe.G("extDataType").value = listType[C][1][1]
	}
}
function insertMainInfo() {
	var A = "/page/selectCategory.html?t=" + new Date().getTime();
	Fe.Ajax.get(A,
	function(B) {
		setTimeout(function() {
			var H = Fe.Dialog.open(B.responseText, {
				title: "\u7f16\u8f91\u57fa\u672c\u4fe1\u606f\u680f",
				width: "430px",
				height: "270px",
				buttonbar: true,
				buttonAccept: true,
				buttonCancel: true,
				contentType: "HTMLString",
				buttonAcceptValue: "\u4e0b\u4e00\u6b65",
				buttonCancelValue: "\u53d6\u6d88",
				locked: true
			});
			H.onaccept = function(I) {
				if (Fe.G("extDataType").value.length <= 0) {
					alert("\u8bf7\u9009\u62e9\u4fe1\u606f\u6a21\u677f\u7c7b\u578b");
					I.returnValue = false
				} else {
					editMainInfo()
				}
				return false
			};
			H.oncancel = function(I) {
				Fe.G("extDataType").value = Fe.G("extDataTypeTemp").value
			};
			var D = Fe.G("firstUl");
			for (var E = 0,
			F = listType.length; E < F; E++) {
				var C = document.createElement("li");
				C.innerHTML = listType[E][0];
				C.id = "firstLi_" + E;
				D.appendChild(C);
				Fe.on(C, "click",
				function() {
					clearOnClass("firstUl");
					this.className = "on";
					addSecond(parseInt(this.id.slice(8)))
				});
				C = null
			}
		},
		200)
	})
}
function selectAnother() {
	if (confirm("\u91cd\u9009\u6a21\u677f\u5c06\u6e05\u9664\u539f\u6709\u6570\u636e\n\u5982\u9700\u5bfc\u5165\u539f\u6a21\u677f\u6570\u636e\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u7f16\u8f91\u9875\n\u786e\u5b9a\u91cd\u65b0\u9009\u62e9\uff1f")) {
		_cardDialog.close();
		_cardOpen = false;
		insertMainInfo()
	} else {
		return false
	}
}
function seeOrgLemma(A) {
	A.href = "/view/" + Fe.G("lemmaid").value + ".htm"
}
function deleteMainInfo() {
	if (confirm("\u5220\u9664\u540e\u8d44\u6599\u4e0d\u53ef\u6062\u590d\uff01\n\u786e\u5b9a\u8981\u5220\u9664\uff1f")) {
		Fe.G("inputShowMainInfoDiv").style.display = "none";
		extData = [];
		Fe.G("extData").value = "";
		Fe.G("extDataType").value = ""
	} else {
		return false
	}
	controlInsertButton()
}
function checkSummaryCharNum(A) {
	flag = true;
	var B = Fe.trim(A.G("spphotoform").summarySummary.value).replace(/(\[url\])+(.*?)(\[\/url\])+/g, "$2");
	if (B.length <= 0) {
		alert("\u6982\u8ff0\u5fc5\u987b\u586b\u5199");
		flag = false;
		return false
	}
	if (bytes(B) > 500) {
		alert("\u6982\u8ff0\u8d85\u8fc7250\u5b57\uff08500\u5b57\u8282\uff09\uff0c\u8bf7\u91cd\u65b0\u586b\u5199");
		flag = false;
		return false
	}
	return flag
}
var _imgDialog;
function insertSummary() {
	setTimeout(function() {
		_imgDialog = Fe.Dialog.open("/page/uploadImg_card.html", {
			title: "\u7f16\u8f91\u6982\u8ff0",
			width: "450px",
			height: "540px",
			buttonbar: true,
			buttonAccept: true,
			buttonCancel: true,
			contentType: "HTMLUrl",
			buttonAcceptValue: "\u786e\u5b9a",
			buttonCancelValue: "\u53d6\u6d88",
			locked: true
		});
		var A = _imgDialog.getIframe().contentWindow;
		_imgDialog.onaccept = function(B) {
			if (checkSummaryCharNum(A)) {
				A.G("spphotoform").submit()
			}
			B.returnValue = false
		}
	},
	200);
	nslog(location.href, 70)
}
function deleteSummary() {
	if (confirm("\u5220\u9664\u540e\u8d44\u6599\u4e0d\u53ef\u6062\u590d\uff01\n\u786e\u5b9a\u8981\u5220\u9664\uff1f")) {
		Fe.G("inputShowSummaryDiv").style.display = "none";
		Fe.G("summaryImgId").value = "";
		Fe.G("summaryImgInfo").value = "";
		Fe.G("summarySummary").value = ""
	} else {
		return false
	}
	controlInsertButton()
}
function showSummary() {
	var C = Fe.G("summaryImgInfo").value;
	var B = Fe.G("summaryImgId").value;
	var D = Fe.G("summarySummary").value;
	var A = "";
	if (B.length > 0) {
		A += '<div class="text_pic">';
		A += '<a target="_blank" href="/image/' + B + '">';
		A += '<img src="baike/abpic/item/' + B + '.jpg" title="' + C + '" onload="adjustDiv(this,\'imageInfoDiv\',160,160);" /></a>';
		if (C.length > 0) {
			A += '<div id="imageInfoDiv">' + showInputData(C) + "</div>"
		}
		A += "</div>"
	}
	if (D.length > 0) {
		A += "<h4>\u6982\u8ff0</h4>" + showInputData(D)
	}
	A += '<div style="clear:both;"></div>';
	setTimeout(function() {
		if (Fe.G("canEditSummary")) {
			A = Fe.G("canEditSummary").innerHTML + A
		}
		Fe.G("cardSummary").innerHTML = A;
		if (B.length <= 0 && D.length <= 0) {
			Fe.G("inputShowSummaryDiv").style.display = "none"
		} else {
			Fe.G("inputShowSummaryDiv").style.display = "block"
		}
		controlInsertButton()
	},
	200)
}
function controlInsertButton() {
	if (!Fe.G("insertButton")) {
		return false
	}
	var B = true,
	A = true;
	if (extData.length <= 0) {
		B = false
	}
	if (Fe.G("summaryImgId").value.length <= 0 && Fe.G("summarySummary").value.length <= 0) {
		A = false
	}
	if (B && A) {
		Fe.G("insertButton").style.display = "none"
	} else {
		if (B) {
			Fe.G("insert2Span").style.display = "none"
		} else {
			Fe.G("insert2Span").style.display = ""
		}
		if (A) {
			Fe.G("insert1Span").style.display = "none"
		} else {
			Fe.G("insert1Span").style.display = ""
		}
		Fe.G("insertButton").style.display = "block"
	}
}
var currentFocus;
function AddText(A) {
	if (document.all) {
		insertAtCaret(currentFocus, A)
	} else {
		mvalue = currentFocus.value;
		currentFocus.value = mvalue.substring(0, spstart) + A + mvalue.substring(spend);
		setfocusZS();
		currentFocus.setSelectionRange(spstart + A.length, spstart + A.length);
		currentFocus.scrollTop = g_top
	}
}
function ffeditor(I, B, D) {
	eobj = currentFocus;
	var F = eobj.selectionStart;
	var A = eobj.selectionEnd;
	g_top = eobj.scrollTop;
	var E = eobj.value.substring(F, A);
	if (E == "") {
		alert("\u8bf7\u5148\u9009\u62e9\u9700\u8981\u6dfb\u52a0\u5185\u94fe\u7684\u6587\u5b57");
		return false
	}
	eobj.value = eobj.value.substring(0, F) + I + E + B + eobj.value.substring(A);
	var C = I + E + B;
	var H = C.length;
	setfocusZS();
	eobj.setSelectionRange(F + H, F + H);
	eobj.scrollTop = g_top
}
function setfocusZS() {
	currentFocus.focus()
}
function getSelectedTextZS() {
	if (Fe.isFirefox) {
		return ""
	}
	var B = currentFocus;
	var C = "";
	if (B.isTextEdit) {
		B.focus();
		var D = document.selection;
		var A = D.createRange();
		A.colapse;
		if ((D.type == "Text" || D.type == "None") && A != null) {
			if (A.text.length > 0) {
				C = A.text
			}
		}
	}
	return C
}
function hyperlinkZS() {
	var A = "\u8bf7\u5148\u9009\u62e9\u9700\u8981\u6dfb\u52a0\u5185\u94fe\u7684\u6587\u5b57";
	if (!currentFocus) {
		alert("\u8bf7\u5148\u9009\u62e9\u8f93\u5165\u6846");
		return false
	}
	if (document.all) {
		if (getSelectedTextZS()) {
			var B = document.selection.createRange();
			B.text = "[url]" + B.text + "[/url]";
			setfocusZS()
		} else {
			alert("\u8bf7\u5148\u9009\u62e9\u9700\u8981\u6dfb\u52a0\u5185\u94fe\u7684\u6587\u5b57");
			return false
		}
	} else {
		ffeditor("[url]", "[/url]", A)
	}
}
var templateGuide = templateGuide || {};
templateGuide.editTempSerialize = function() {
	if (templateGuide.textEditType == "full") {
		var stamp = Math.round(Math.random() * 2147483637);
		var _url = "/api/lemmaTemplate?stamp=" + stamp + "&lemmaid=" + Fe.G("lemmaid").value;
		Fe.Ajax.request(_url, {
			onsuccess: function(xhr) {
				var recommendJson = eval("(" + xhr.responseText + ")");
				templateGuide.formatRecommendTit(recommendJson);
				templateGuide.formatAlltit(recommendJson)
			}
		})
	} else {
		Fe.hide("ctrlDirDisplayContainer");
		Fe.hide("dirContentDisplay");
		if (Fe.G("contentNumLimit")) {
			Fe.G("contentNumLimit").style.marginTop = "0"
		}
	}
};
Fe.on(window, "load",
function(A) {
	templateGuide.editTempSerialize()
});
Fe.on("allContainerTit", "click",
function(A) {
	if (Fe.G("allContainer").style.display != "block") {
		Fe.G("allContainer").style.display = "block";
		Fe.G("recommendContainer").style.display = "none";
		Fe.G("recommendContainerTit").className = "recommendContainerTitStyleFold";
		Fe.G("allContainerTit").className = "allContainerTitStyle"
	} else {
		Fe.G("allContainer").style.display = "none";
		Fe.G("allContainerTit").className = "allContainerTitStyleFold"
	}
});
Fe.on("recommendContainerTit", "click",
function(A) {
	if (Fe.G("recommendContainer").style.display != "block") {
		Fe.G("recommendContainer").style.display = "block";
		Fe.G("recommendContainerTit").className = "recommendContainerTitStyle";
		Fe.G("allContainerTit").className = "allContainerTitStyleFold";
		Fe.G("allContainer").style.display = "none"
	} else {
		Fe.G("recommendContainer").style.display = "none";
		Fe.G("recommendContainerTit").className = "recommendContainerTitStyleFold"
	}
});
templateGuide.ctrlDirContentDisplay = function() {
	if (Fe.G("dirContentDivRelative").style.display == "none") {
		Fe.show("dirContentDivRelative");
		Fe.G("ctrlDirDisplayContainer").className = "ctrlDirDisplayContainerStyle"
	} else {
		Fe.hide("dirContentDivRelative");
		Fe.G("ctrlDirDisplayContainer").className = "ctrlDirDisplayContainerStyleFold"
	}
};
templateGuide.formatRecommendTit = function(B) {
	if (templateGuide.countJson(B.recommendTit.recommend)) {
		Fe.G("recommendContainer").style.display = "block";
		Fe.G("recommendContainerTit").className = "recommendContainerTitStyle";
		var D = document.createDocumentFragment();
		for (var F in B.recommendTit.recommend) {
			var H = document.createElement("DL");
			var E = document.createElement("DT");
			E.className = "dirUnFold";
			E.innerHTML = F;
			H.appendChild(E);
			for (var C = 0; C < B.recommendTit.recommend[F].classname.length; C++) {
				var I = document.createElement("DD");
				I.innerHTML = B.recommendTit.recommend[F].classname[C];
				I.style.display = "block";
				H.appendChild(I)
			}
			var A = document.createElement("DD");
			A.className = "recommendData";
			A.innerHTML = '示例词条：<br><a href="view/' + B.recommendTit.recommend[F].recommendLemma.lemmaid + '.htm" target="_blank">' + B.recommendTit.recommend[F].recommendLemma.lemmaname + "</a>";
			H.appendChild(A);
			D.appendChild(H);
			E.onclick = function(J) {
				return function() {
					if (J.className == "dirUnFold") {
						J.className = "dirFold";
						var K = J.parentNode.getElementsByTagName("DD");
						for (var L = 0; L < K.length; L++) {
							K[L].style.display = "none"
						}
					} else {
						J.className = "dirUnFold";
						var K = J.parentNode.getElementsByTagName("DD");
						for (var L = 0; L < K.length; L++) {
							K[L].style.display = ""
						}
					}
				}
			} (E)
		}
		Fe.G("recommendContainer").appendChild(D)
	}
};
templateGuide.formatAlltit = function(A) {
	if (templateGuide.countJson(A.allTit)) {
		var D = document.createDocumentFragment();
		var C = document.createElement("UL");
		for (var E in A.allTit) {
			var F = document.createElement("LI");
			F.innerHTML = E;
			C.appendChild(F);
			D.appendChild(C);
			F.onclick = function(I, H) {
				return function() {
					var K = I.parentNode.getElementsByTagName("LI");
					for (var O = 0; O < K.length; O++) {
						K[O].className = ""
					}
					I.className = "allContentLeftLiSelected";
					var N = document.createDocumentFragment();
					for (var M in A.allTit[H]) {
						var L = document.createElement("DL");
						var P = document.createElement("DT");
						P.className = "dirFold";
						P.innerHTML = M;
						L.appendChild(P);
						for (var O = 0; O < A.allTit[H][M].classname.length; O++) {
							var Q = document.createElement("DD");
							Q.innerHTML = A.allTit[H][M].classname[O];
							Q.style.display = "none";
							L.appendChild(Q)
						}
						var J = document.createElement("DD");
						J.className = "recommendData";
						J.innerHTML = '示例词条：<br><a href="view/' + A.allTit[H][M].recommendLemma.lemmaid + '.htm" target="_blank">' + A.allTit[H][M].recommendLemma.lemmaname + "</a>";
						J.style.display = "none";
						L.appendChild(J);
						N.appendChild(L);
						P.onclick = function(R) {
							return function() {
								if (R.className == "dirUnFold") {
									R.className = "dirFold";
									var S = R.parentNode.getElementsByTagName("DD");
									for (var V = 0; V < S.length; V++) {
										S[V].style.display = "none"
									}
								} else {
									var W = R.parentNode.parentNode.getElementsByTagName("DT");
									var X = R.parentNode.parentNode.getElementsByTagName("DD");
									for (var U = 0; U < W.length; U++) {
										W[U].className = "dirFold"
									}
									for (var T = 0; T < X.length; T++) {
										X[T].style.display = "none"
									}
									R.className = "dirUnFold";
									var S = R.parentNode.getElementsByTagName("DD");
									for (var V = 0; V < S.length; V++) {
										S[V].style.display = ""
									}
								}
							}
						} (P)
					}
					while (Fe.G("allContentRight").hasChildNodes()) {
						Fe.G("allContentRight").removeChild(Fe.G("allContentRight").childNodes[0])
					}
					Fe.G("allContentRight").appendChild(N)
				}
			} (F, E);
			if (templateGuide.countJson(A.recommendTit.halfrecommend)) {
				for (var B in A.recommendTit.halfrecommend) {
					if (B == E) {
						Fe.hide("recommendContainerTit");
						templateGuide.dispatchE(F)
					}
				}
			}
		}
		Fe.G("allContentLeft").appendChild(D);
		if (!templateGuide.countJson(A.recommendTit.recommend)) {
			Fe.G("allContainer").style.display = "block";
			Fe.G("allContainerTit").className = "allContainerTitStyle";
			Fe.G("recommendContainerTit").style.display = "none"
		}
	}
};
templateGuide.countJson = function(A) {
	var B = 0;
	for (var C in A) {
		B++
	}
	return B
};
templateGuide.dispatchE = function(B) {
	if (Fe.isIE) {
		B.click()
	} else {
		var A = document.createEvent("MouseEvents");
		A.initEvent("click", false, true);
		B.dispatchEvent(A)
	}
};
function getValue() {
	document.pre.pretitle.value = document.input.lemmatitle.value;
	document.pre.prelemma.value = document.input.message.value;
	document.pre.pretag.value = document.input.lemmaclass.value;
	document.pre.preref.value = document.input.lemmaref.value;
	document.pre.preBeforeLemma.value = document.input.beforeLemma.value;
	document.pre.preEndLemma.value = document.input.endLemma.value;
	document.pre.preExtData.value = document.input.extData.value;
	document.pre.preSummaryImgId.value = document.input.summaryImgId.value;
	document.pre.preSummaryImgInfo.value = document.input.summaryImgInfo.value;
	document.pre.preSummarySummary.value = document.input.summarySummary.value;
	document.pre.preExtDataType.value = document.input.extDataType.value
}
function gotoPreview() {
	document.pre.submit()
}
var g_pcNum = g_pcNum || 20000;
function inputValidate() {
	G("beforeLemma").value = getSectionEditor("beforeLemma", "beforeLemmaIframe");
	G("endLemma").value = getSectionEditor("endLemma", "endLemmaIframe");
	var A = editorFilter(editor.getContent());
	if (A == "" || A == "<br>") {
		alert(errMsg.textEmp);
		return false
	}
	var B = Fe.G("code");
	B.value = A;
	var E = A;
	var C = G("curPicNum") ? G("curPicNum").value: 10;
	var D = Math.floor(bytes(getEditorText(E)) / 2);
	if (D >= g_pcNum) {
		alert(errMsg.textEx);
		return false
	}
	if (G("lemmaref").value.length > 1000) {
		alert(errMsg.refEx);
		return false
	}
	if (G("lemmaclass")) {
		if (G("lemmaclass").value.length > 100) {
			alert(errMsg.classEx);
			return false
		} else {
			if (classNum(G("lemmaclass").value)) {
				alert(errMsg.classNumEx);
				return false
			}
		}
	}
	if (arguments.length == 1) {
		if (G("lemmamodify")) {
			if (G("lemmamodify").value.length > 200) {
				alert(errMsg.reasonEx);
				G("lemmamodify").focus();
				return false
			}
		}
	} else {
		if (G("lemmamodify")) {
			if (G("lemmamodify").value.length == 0) {
				alert(errMsg.reasonEmp);
				G("lemmamodify").focus();
				return false
			} else {
				if (G("lemmamodify").value.length > 200) {
					alert(errMsg.reasonEx);
					G("lemmamodify").focus();
					return false
				}
			}
		}
	}
	if (tagNum(A, "<img") > C) {
		alert(errMsg.imgExp);
		return false
	}
	return true
}
function cnEdit() {
	var _str = "tp=2&r=" + Math.random() + "&lemmaid=" + Fe.G("lemmaid").value + "&lemmaVersionId=" + Fe.G("lemmaVersionId").value + "&lemmatitle=" + encodeURIComponent(Fe.G("lemmatitle").value);
	var _url = "/getConflictInfo/?" + _str;
	Fe.Ajax.get(_url,
	function(xhr) {
		callbackCnEdit(eval(xhr.responseText))
	})
}
function callbackCnEdit(A) {
	callback_local(A)
}
function doDetect() {
	var _str = "tp=2&r=" + Math.random() + "&lemmaid=" + Fe.G("lemmaid").value + "&lemmaVersionId=" + Fe.G("lemmaVersionId").value;
	if (wikiConflict.isEdit == 0) {
		_str += "&lemmatitle=" + encodeURIComponent(Fe.G("lemmatitle").value)
	}
	var _url = "/getConflictInfo/?" + _str;
	Fe.Ajax.get(_url,
	function(xhr) {
		callback_local(eval(xhr.responseText))
	})
}
function callback_local(A) {
	if (wikiConflict.isEdit == 0) {
		if (A[2] != 0) {
			if (A[0] != 0 && A[3] > 0) {
				Detect.content = '本词条已由其他用户创建，建议您及时保存当前版本内容，根据词条<a href="/view/' + A[3] + '.htm" target="_blank">最新版本</a>内容，编辑本词条。<br><br>现在就保存么？';
				var B = formatDetect({
					title: "编辑提示",
					width: "380px",
					height: "190px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					contentType: "HTMLUrl",
					locked: true,
					buttonAcceptValue: "确定",
					buttonCancelValue: "取消"
				});
				B.onaccept = function() {
					Saves.dP();
					sendStat("createConflictSaveDraft")
				}
			} else {
				Detect.content = "本词条已有其他用户的创建版本，建议您及时保存当前版本内容，等待词条浏览页更新后，再继续编辑本词条。<br><br>现在就保存么？";
				var B = formatDetect({
					title: "编辑提示",
					width: "380px",
					height: "190px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					contentType: "HTMLUrl",
					locked: true,
					buttonAcceptValue: "确定",
					buttonCancelValue: "取消"
				});
				B.onaccept = function() {
					Saves.dP();
					sendStat("createConflictSaveDraft")
				}
			}
		} else {
			submitform()
		}
	} else {
		if (A[2] == 0) {
			if (A[5] == 1) {
				Detect.content = '感谢您为百科做出的贡献！<br><br>因当前属于<a href="search/baike_help.html#n22" target="_blank">特殊编辑时段</a>，您的提交可能不会立即生效。<br>百科建议您保存内容晚些时候提交，这样编辑成果可以更<br>快的与大家分享哦：）<br><br>您可以继续提交，或选择将内容保存至草稿箱。';
				var B = formatDetect({
					title: "编辑提示",
					width: "380px",
					height: "190px",
					buttonbar: true,
					buttonAccept: true,
					buttonCancel: true,
					contentType: "HTMLUrl",
					locked: true,
					buttonAcceptValue: "提交",
					buttonCancelValue: "保存"
				});
				B.onaccept = function() {
					submitform()
				};
				B.oncancel = function() {
					if (Fe.G("BkLogUser")) {
						BKLog.BaikeStat("func=nighteditsave&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
					} else {
						BKLog.BaikeStat("func=nighteditsave&&lid=" + Fe.G("lemmaid").value)
					}
					Saves.dP()
				}
			} else {
				submitform()
			}
		} else {
			if (A[1] >= A[6]) {
				if (A[6]) {
					if (Fe.G("BkLogUser")) {
						BKLog.BaikeStat("func=submitextradeny&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
					} else {
						BKLog.BaikeStat("func=submitextradeny&lid=" + Fe.G("lemmaid").value)
					}
					Detect.content = '很抱歉，您当前无法提交词条：（<br><br>该词条已有多个版本正在提交，为了保证您的编辑成果不<br>会因<a href="search/baike_help.html#n-7" target="_blank">编辑冲突</a>造成损失，百科建议您保存当前内容。<br><br>您可以选择其他时间在草稿箱中继续编辑。';
					var B = formatDetect({
						title: "编辑提示",
						width: "388px",
						height: "190px",
						buttonbar: true,
						buttonAccept: true,
						buttonCancel: true,
						contentType: "HTMLUrl",
						locked: true,
						buttonAcceptValue: "保存"
					});
					B.onaccept = function() {
						if (Fe.G("BkLogUser")) {
							BKLog.BaikeStat("func=submitextrasave&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
						} else {
							BKLog.BaikeStat("func=submitextrasave&lid=" + Fe.G("lemmaid").value)
						}
						Saves.dP()
					}
				} else {
					if (A[5] == 1) {
						Detect.content = '感谢您为百科做出的贡献！<br><br>因当前属于<a href="search/baike_help.html#n22" target="_blank">特殊编辑时段</a>，您的提交可能不会立即生效。<br>百科建议您保存内容晚些时候提交，这样编辑成果可以更<br>快的与大家分享哦：）<br><br>您可以继续提交，或选择将内容保存至草稿箱。';
						var B = formatDetect({
							title: "编辑提示",
							width: "380px",
							height: "190px",
							buttonbar: true,
							buttonAccept: true,
							buttonCancel: true,
							contentType: "HTMLUrl",
							locked: true,
							buttonAcceptValue: "提交",
							buttonCancelValue: "保存"
						});
						B.onaccept = function() {
							submitform()
						};
						B.oncancel = function() {
							if (Fe.G("BkLogUser")) {
								BKLog.BaikeStat("func=nighteditsave&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
							} else {
								BKLog.BaikeStat("func=nighteditsave&&lid=" + Fe.G("lemmaid").value)
							}
							Saves.dP()
						}
					} else {
						submitform()
					}
				}
			} else {
				if ((A[2] == 1) || (A[2] == 2)) {
					Detect.content = '该词条已有其他版本正在等待审核，您当前的提交操作<br>可能会造成<a href="search/baike_help.html#n-7" target="_blank">编辑冲突</a>。<br><br>为了保障您的编辑能得到及时审核并生效，建议您稍后<br>再提交：）<br><br>仍然要继续吗？';
					var B = formatDetect({
						title: "编辑提示",
						width: "380px",
						height: "190px",
						buttonbar: true,
						buttonAccept: true,
						buttonCancel: true,
						contentType: "HTMLUrl",
						locked: true
					});
					B.onaccept = function() {
						submitform()
					}
				} else {
					if (Fe.G("BkLogUser")) {
						BKLog.BaikeStat("func=submitdateddeny&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
					} else {
						BKLog.BaikeStat("func=submitdateddeny&lid=" + Fe.G("lemmaid").value)
					}
					Detect.content = '很抱歉，在您的编辑过程中本词条已经产生了更新的版<br>本，您当前无法提交：（<br><br>建议您将当前内容保存至草稿箱，查看词条的<a href="/view/' + Fe.G("lemmaid").value + '.htm" target="_blank">最新版本</a>后再做编辑、 提交。';
					var B = formatDetect({
						title: "编辑提示",
						width: "380px",
						height: "190px",
						buttonbar: true,
						buttonAccept: true,
						buttonCancel: true,
						contentType: "HTMLUrl",
						locked: true,
						buttonAcceptValue: "保存"
					});
					B.onaccept = function() {
						if (Fe.G("BkLogUser")) {
							BKLog.BaikeStat("func=submitdatedsave&username=" + Fe.G("BkLogUser").innerHTML + "&lid=" + Fe.G("lemmaid").value)
						} else {
							BKLog.BaikeStat("func=submitdatedsave&lid=" + Fe.G("lemmaid").value)
						}
						Saves.dP()
					};
					return false
				}
			}
		}
	}
}
function submitform(A, E) {
	if (Fe.G("lemmaclass")) {
		if (Fe.G("lemmaclass").value == wikiSug.g_str) {
			Fe.G("lemmaclass").value = ""
		}
	}
	setLemmaTime();
	UnloadConfirm.clear();
	var D = editorFilter(editor.getContent());
	setTextarea(D);
	if (document.images && editor && editor.stat) {
		var C = "";
		for (toolName in editor.stat) {
			C += toolName + "=" + editor.stat[toolName] + "&"
		}
		var B = "js/blank.js?func=editorStat&" + C + "sid=" + sid + "&t=" + (new Date()).getTime(); (new Image()).src = B
	}
	document.input.submit()
};