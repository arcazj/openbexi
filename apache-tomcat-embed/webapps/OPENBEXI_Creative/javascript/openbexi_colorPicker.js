/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: September 28 2013 version 5.0
The latest version is available at http://www.openbexi.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
*/

var ns6 = document.getElementById && !document.all
var ie = document.all
var ob_color = '';
var ob_flag_color = false;
function pickClick() {
    var inputColor = document.getElementById('choixColor');
    var temoinColor = document.getElementById('temoin');
    temoinColor.style.backgroundColor = ob_color;
    inputColor.style.backgroundColor = ob_color;
    inputColor.value = ob_color;
    setObjNameColorGround(ob_color);
    ob_setDirty_flag(true);
    ob_flag_color = true;
}
function pickOver(e) {
    var inputColor = document.getElementById('choixColor');
    var source = ie ? event.srcElement : e.target
    if (source.tagName == "TABLE") {
        return
    }
    while (source.tagName != "TD" && source.tagName != "HTML")source = ns6 ? source.parentNode : source.parentElement;
    source.style.border = "1px solid black";
    document.getElementById('temoin').style.backgroundColor = ob_color = source.bgColor
    if (ob_flag_color == false) inputColor.value = ob_color;
}
function pickOut(e) {
    var source = ie ? event.srcElement : e.target
    if (source.tagName == "TABLE") {
        alert("ddd");
        return
    }
    while (source.tagName != "TD" && source.tagName != "HTML")source = ns6 ? source.parentNode : source.parentElement;
    source.style.border = "0px solid black";
}
function setObjNameColorGround(color) {
    try {
        if (document.getElementById("labelBackground").value == "") document.getElementById("labelBackground").value = "background";
        if (getSelectedBexiObj(null).id == "BODY") {
            getSelectedBexiObj(null).setAttribute("bgColor", color);
            return;
        }
        if (document.getElementById("labelBackground").value == "background") getSelectedBexiObj(null).setAttribute("background", color);
        if (document.getElementById("labelBackground").value == "ItemBackground") getSelectedBexiObj(null).setItemBackgroundColor(color);
        if (document.getElementById("labelBackground").value.match("border")) getSelectedBexiObj(null).setAttribute(document.getElementById("labelBackground").value, color);
        if (getSelectedBexiObj(null).type != "openbexi_dojo_editor") {
            if (document.getElementById("labelBackground").value.match("fontColor")) getSelectedBexiObj(null).setAttribute("color", color);
            if (document.getElementById("labelBackground").value.match("color")) getSelectedBexiObj(null).setAttribute("color", color);
        }
    } catch(e) {
            __openbexi_debugC("setObjNameColorGround()", e.message);
    }
}
//#####################################################################################
function ColorPickerModal(modalParams) {
	'use strict';
	this.inputElmId = '';
	this.coloredElmId = '';
	this.startColor = '#999999';
	if (typeof modalParams.inputElmId !== 'undefined') {
		this.inputElmId = modalParams.inputElmId;
	}
	if (typeof modalParams.coloredElmId !== 'undefined') {
		this.coloredElmId = modalParams.coloredElmId;
	}
	if (typeof modalParams.startColor !== 'undefined') {
		this.startColor = modalParams.startColor;
	}
	this.initElmValues = {"bcHiddenInput" : "#999999", "bgFromHiddenInput" : "#ffffff", "bgHiddenInput" : "#ffffff", "bgToHiddenInput" : "#000000", "bsColorHiddenInput" : "#000000"};
	this.isTransparent = false;
	if (this.startColor === 'transparent') {
		this.isTransparent = true;
		this.startColor = this.initElmValues[this.inputElmId];
	}
	this.lastColor = this.startColor;
	this.currColor = this.lastColor;
	this.hasColorClicked = false;
	this.hasHueClicked = false;
	this.rgbArray = [
		[0xff, 0x00, 0x00], [0xff, 0x0C, 0x00], [0xff, 0x12, 0x00], [0xff, 0x18, 0x00], [0xff, 0x24, 0x00], [0xff, 0x2a, 0x00], [0xff, 0x36, 0x00], [0xff, 0x3c, 0x00],
		[0xff, 0x48, 0x00], [0xff, 0x4e, 0x00], [0xff, 0x54, 0x00], [0xff, 0x60, 0x00], [0xff, 0x66, 0x00], [0xff, 0x72, 0x00], [0xff, 0x78, 0x00], [0xff, 0x7e, 0x00],
		[0xff, 0x8a, 0x00], [0xff, 0x90, 0x00], [0xff, 0x9c, 0x00], [0xff, 0xa2, 0x00], [0xff, 0xae, 0x00], [0xff, 0xb4, 0x00], [0xff, 0xba, 0x00], [0xff, 0xc6, 0x00],
		[0xff, 0xcc, 0x00], [0xff, 0xd8, 0x00], [0xff, 0xde, 0x00], [0xff, 0xe4, 0x00], [0xff, 0xf0, 0x00], [0xff, 0xf6, 0x00], [0xfc, 0xff, 0x00], [0xf6, 0xff, 0x00],
		[0xf0, 0xff, 0x00], [0xe4, 0xff, 0x00], [0xde, 0xff, 0x00], [0xd2, 0xff, 0x00], [0xcc, 0xff, 0x00], [0xc0, 0xff, 0x00], [0xba, 0xff, 0x00], [0xb4, 0xff, 0x00],
		[0xa8, 0xff, 0x00], [0xa2, 0xff, 0x00], [0x96, 0xff, 0x00], [0x90, 0xff, 0x00], [0x8a, 0xff, 0x00], [0x7e, 0xff, 0x00], [0x78, 0xff, 0x00], [0x6c, 0xff, 0x00],
		[0x66, 0xff, 0x00], [0x5a, 0xff, 0x00], [0x54, 0xff, 0x00], [0x4e, 0xff, 0x00], [0x42, 0xff, 0x00], [0x3c, 0xff, 0x00], [0x30, 0xff, 0x00], [0x2a, 0xff, 0x00],
		[0x24, 0xff, 0x00], [0x18, 0xff, 0x00], [0x12, 0xff, 0x00], [0x06, 0xff, 0x00], [0x00, 0xff, 0x00], [0x00, 0xff, 0x0c], [0x00, 0xff, 0x12], [0x00, 0xff, 0x18],
		[0x00, 0xff, 0x24], [0x00, 0xff, 0x2a], [0x00, 0xff, 0x36], [0x00, 0xff, 0x3c], [0x00, 0xff, 0x42], [0x00, 0xff, 0x4e], [0x00, 0xff, 0x54], [0x00, 0xff, 0x60],
		[0x00, 0xff, 0x66], [0x00, 0xff, 0x6c], [0x00, 0xff, 0x78], [0x00, 0xff, 0x7e], [0x00, 0xff, 0x8a], [0x00, 0xff, 0x90], [0x00, 0xff, 0x9c], [0x00, 0xff, 0xa2],
		[0x00, 0xff, 0xa8], [0x00, 0xff, 0xb4], [0x00, 0xff, 0xba], [0x00, 0xff, 0xc6], [0x00, 0xff, 0xcc], [0x00, 0xff, 0xd2], [0x00, 0xff, 0xde], [0x00, 0xff, 0xe4],
		[0x00, 0xff, 0xf0], [0x00, 0xff, 0xf6], [0x00, 0xfc, 0xff], [0x00, 0xf6, 0xff], [0x00, 0xf0, 0xff], [0x00, 0xe4, 0xff], [0x00, 0xde, 0xff], [0x00, 0xd2, 0xff],
		[0x00, 0xcc, 0xff], [0x00, 0xc6, 0xff], [0x00, 0xba, 0xff], [0x00, 0xb4, 0xff], [0x00, 0xa8, 0xff], [0x00, 0xa2, 0xff], [0x00, 0x9c, 0xff], [0x00, 0x90, 0xff],
		[0x00, 0x8a, 0xff], [0x00, 0x7e, 0xff], [0x00, 0x78, 0xff], [0x00, 0x6c, 0xff], [0x00, 0x66, 0xff], [0x00, 0x60, 0xff], [0x00, 0x54, 0xff], [0x00, 0x4e, 0xff],
		[0x00, 0x42, 0xff], [0x00, 0x3c, 0xff], [0x00, 0x36, 0xff], [0x00, 0x2a, 0xff], [0x00, 0x24, 0xff], [0x00, 0x18, 0xff], [0x00, 0x12, 0xff], [0x00, 0x06, 0xff],
		[0x00, 0x00, 0xff], [0x06, 0x00, 0xff], [0x12, 0x00, 0xff], [0x18, 0x00, 0xff], [0x24, 0x00, 0xff], [0x2a, 0x00, 0xff], [0x30, 0x00, 0xff], [0x3c, 0x00, 0xff],
		[0x42, 0x00, 0xff], [0x4e, 0x00, 0xff], [0x54, 0x00, 0xff], [0x60, 0x00, 0xff], [0x66, 0x00, 0xff], [0x6c, 0x00, 0xff], [0x78, 0x00, 0xff], [0x7e, 0x00, 0xff],
		[0x8a, 0x00, 0xff], [0x90, 0x00, 0xff], [0x96, 0x00, 0xff], [0xa2, 0x00, 0xff], [0xa8, 0x00, 0xff], [0xb4, 0x00, 0xff], [0xba, 0x00, 0xff], [0xc0, 0x00, 0xff],
		[0xcc, 0x00, 0xff], [0xd2, 0x00, 0xff], [0xde, 0x00, 0xff], [0xe4, 0x00, 0xff], [0xf0, 0x00, 0xff], [0xf6, 0x00, 0xff], [0xfc, 0x00, 0xff], [0xff, 0x00, 0xf6],
		[0xff, 0x00, 0xf0], [0xff, 0x00, 0xe4], [0xff, 0x00, 0xde], [0xff, 0x00, 0xd8], [0xff, 0x00, 0xcc], [0xff, 0x00, 0xc6], [0xff, 0x00, 0xba], [0xff, 0x00, 0xb4],
		[0xff, 0x00, 0xa8], [0xff, 0x00, 0xa2], [0xff, 0x00, 0x9c], [0xff, 0x00, 0x90], [0xff, 0x00, 0x8a], [0xff, 0x00, 0x7e], [0xff, 0x00, 0x78], [0xff, 0x00, 0x72],
		[0xff, 0x00, 0x66], [0xff, 0x00, 0x60], [0xff, 0x00, 0x54], [0xff, 0x00, 0x4e], [0xff, 0x00, 0x42], [0xff, 0x00, 0x3c], [0xff, 0x00, 0x36], [0xff, 0x00, 0x2a],
		[0xff, 0x00, 0x24], [0xff, 0x00, 0x18], [0xff, 0x00, 0x12], [0xff, 0x00, 0x0c], [0xff, 0x00, 0x00]
	];
	this.hueClickStart = 0;
	this.hueClickStartY = 0;
	this.decontructor = function () {
		document.onmousemove = null;
		document.onmouseup = null;
	};
	this.toggleTransparent = function () {
		this.setTransparent(!this.isTransparent);
		this.runExtFunctions();
	};
	this.setTransparent = function (newIsTransparent) {
		this.isTransparent = newIsTransparent;
		if (this.isTransparent) {
			document.getElementById('hueArrow').style.top = '-9px';
			document.getElementById('hiddenHue').value = 0;
		}
		this.changeTransparentElms(this.isTransparent);
	};
	this.changeTransparentElms = function (isTransparentElms) {
		var currColorString = this.lastColor, currColorArray = [];
		if (isTransparentElms || this.isTransparent) {
			currColorString = this.initElmValues[this.inputElmId];
			document.getElementById('pickerColorInput').value = "transparent";
			document.getElementById('pickerColorInput').style.color = '#000000';
			document.getElementById('pickerColorInput').style.backgroundImage = "url('gif/transparent_small.png')";
			document.getElementById('hueColor').style.backgroundImage = "url('gif/transparent_small.png')";
			document.getElementById(this.inputElmId).value = "transparent";
		} else {
			currColorArray = this.HEX2RGB(currColorString);
			currColorString = this.calcColorHue(currColorArray[0], currColorArray[1], currColorArray[2])[3];
			document.getElementById('pickerColorInput').value = currColorString;
			document.getElementById('pickerColorInput').style.color = this.getColorOppositeHEX(currColorString);
			document.getElementById('pickerColorInput').style.backgroundImage = "none";
			document.getElementById('hueColor').style.backgroundImage = "url('gif/hue.png')";
			document.getElementById(this.inputElmId).value = currColorString;
		}
		document.getElementById('pickerColorInput').style.backgroundColor = currColorString;
		document.getElementById('pickerHue').style.backgroundColor = currColorString;
		document.getElementById(this.inputElmId).style.color = currColorString;
		document.getElementById(this.inputElmId).style.backgroundColor = this.getColorOppositeHEX(currColorString);
		document.getElementById(this.coloredElmId).style.color = currColorString;
	};
	this.startHueChange = function (e, elm) {
		if (!e) {
			e = event;
		}
		this.hasHueClicked = true;
		if (e.stopPropagation) {
			e.stopPropagation();
			e.preventDefault();
		}
		e.cancelBubble = true;
		this.hueClickStart = Number(document.getElementById('hiddenHue').value);
		this.hueClickStartY = e.clientY;
		try {
			document.attachEvent("onmousemove", function (e) {
				cpm.changeHue(e, document.getElementById('hueArrow'));
			});
		} catch (e1) {
			document.addEventListener("mousemove", function (e) {
				cpm.changeHue(e, document.getElementById('hueArrow'));
			}, false);
		}
		try {
			document.attachEvent("onmouseup", function (e) {
				cpm.stopHueChange(e, document.getElementById('hueArrow'));
			});
		} catch (e2) {
			document.addEventListener("mouseup", function (e) {
				cpm.stopHueChange(e, document.getElementById('hueArrow'));
			}, false);
		}
		document.body.style.userSelect = 'none';
		document.body.style.mozUserSelect = 'none';
		document.body.style.khtmlUserSelect = 'none';
		document.body.onselectstart = function () {
			return false;
		};
		this.setTransparent(false);
	};
	this.changeHue = function (e, elm) {
		if (!this.hasHueClicked) {
			return false;
		}
		if (!e) {
			e = event;
		}
		var currY = (e.clientY - this.hueClickStartY) + this.hueClickStart, currColorArray = [];
		if (currY > 100) {
			currY = 100;
		}
		if (currY < 0) {
			currY = 0;
		}
		document.getElementById('hueArrow').style.top = (currY - 9) + 'px';
		document.getElementById('hiddenHue').value = currY;
		this.currColor = document.getElementById('hiddenColor').value;
		currColorArray = this.HEX2RGB(this.currColor);
		this.calcColorHue(currColorArray[0], currColorArray[1], currColorArray[2]);
		this.runExtFunctions();
	};
	this.stopHueChange = function (e, elm) {
		if (!this.hasHueClicked) {
			return false;
		}
		this.hasHueClicked = false;
		if (!e) {
			e = event;
		}
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
			e.preventDefault();
		}
		document.body.style.userSelect = 'normal';
		document.body.style.mozUserSelect = 'normal';
		document.body.style.khtmlUserSelect = 'normal';
		document.body.onselectstart = function () {
			return true;
		};
	};
	this.setHue = function (e, elm, elmOffsetX, elmOffsetY) {
		if (!elmOffsetX) {
			elmOffsetX = 0;
		}
		if (!elmOffsetY) {
			elmOffsetY = 0;
		}
		if (!e) {
			e = event;
		}
		var currY = this.getPos(e, elm, elmOffsetX, elmOffsetY)[1], currColorArray = [];
		document.getElementById('hueArrow').style.top = (currY - 9) + 'px';
		document.getElementById('hiddenHue').value = currY;
		currColorArray = this.HEX2RGB(document.getElementById('hiddenColor').value);
		this.calcColorHue(currColorArray[0], currColorArray[1], currColorArray[2]);
		this.setTransparent(false);
		this.runExtFunctions();
	};
	this.calcColorHue = function (newR, newG, newB) {
		var hue = document.getElementById('hiddenHue').value, currColorString = "";
		newR = Math.max(Math.min(Math.round(newR - ((newR * hue) / 100)), 0xff), 0x00);
		newG = Math.max(Math.min(Math.round(newG - ((newG * hue) / 100)), 0xff), 0x00);
		newB = Math.max(Math.min(Math.round(newB - ((newB * hue) / 100)), 0xff), 0x00);
		currColorString = this.RGB2HEX(newR, newG, newB);
		document.getElementById(this.inputElmId).value = currColorString;
		document.getElementById(this.coloredElmId).style.color = currColorString;
		document.getElementById('pickerColorInput').value = currColorString;
		document.getElementById('pickerColorInput').style.backgroundColor = currColorString;
		document.getElementById('pickerColorInput').style.color = this.getColorOppositeHEX(currColorString);
		return [newR, newG, newB, currColorString];
	};
	this.RGB2HEX = function (newR, newG, newB) {
		var retColor = Math.round(newR * 0x10000 + newG * 0x100 + newB), leadingZeros = '';
		if (retColor < 0x100000) {
			leadingZeros += '0';
		}
		if (retColor < 0x10000) {
			leadingZeros += '0';
		}
		if (retColor < 0x1000) {
			leadingZeros += '0';
		}
		if (retColor < 0x100) {
			leadingZeros += '0';
		}
		if (retColor < 0x10) {
			leadingZeros += '0';
		}
		return "#" + leadingZeros + retColor.toString(16);
	};
	this.HEX2RGB = function (tempColor) {
		tempColor = tempColor.replace('#', '');
		return [parseInt(tempColor.substr(0, 2), 16), parseInt(tempColor.substr(2, 2), 16), parseInt(tempColor.substr(4, 2), 16)];
	};
	this.calcColor = function (newR, newG, newB) {
		var currColorString = this.RGB2HEX(newR, newG, newB);
		document.getElementById('hiddenColor').value = currColorString;
		document.getElementById('pickerHue').style.backgroundColor = currColorString;
		return [newR, newG, newB, currColorString];
	};
	this.changeColor = function (e, elm, elmOffsetX, elmOffsetY) {
		if (!elmOffsetX) {
			elmOffsetX = 0;
		}
		if (!elmOffsetY) {
			elmOffsetY = 0;
		}
		if (this.hasColorClicked) {
			return false;
		}
		if (!e) {
			e = event;
		}
		var newPos = this.getPos(e, elm, elmOffsetX, elmOffsetY), currX = 0, currY = 0, currColorArray = [], newR = 0, newG = 0, newB = 0;
		currX = newPos[0];
		currY = newPos[1];
		if (currX >= this.rgbArray.length) {
			currX = 0;
		}
		newR = Math.max(Math.min(Math.round(((0xff - this.rgbArray[currX][0]) / 100) * currY + this.rgbArray[currX][0]), 0xff), 0x00);
		newG = Math.max(Math.min(Math.round(((0xff - this.rgbArray[currX][1]) / 100) * currY + this.rgbArray[currX][1]), 0xff), 0x00);
		newB = Math.max(Math.min(Math.round(((0xff - this.rgbArray[currX][2]) / 100) * currY) + this.rgbArray[currX][2], 0xff), 0x00);
		currColorArray = this.calcColor(newR, newG, newB);
		this.calcColorHue(currColorArray[0], currColorArray[1], currColorArray[2]);
		document.getElementById('pickerColorInput').style.backgroundImage = "none";
		document.getElementById('hueColor').style.backgroundImage = "url('gif/hue.png')";
		return currColorArray;
	};
	this.setColorFromInput = function (e, obj) {
		var currValue = obj.value, newColor = "", colorMatch = false;
		colorMatch = currValue.match(/^#?([0-9a-f]{6})$/gi);
		if (!colorMatch) {
			colorMatch = [""];
		}
		if (currValue === colorMatch[0]) {
			newColor = this.HEX2RGB(currValue);
			this.lastColor = this.calcColor(newColor[0], newColor[1], newColor[2])[3];
			document.getElementById('hiddenHue').value = 0;
			document.getElementById('hiddenColor').value = this.lastColor;
			document.getElementById('pickerColorInput').value = this.lastColor;
			document.getElementById('pickerColorInput').style.color = this.getColorOppositeHEX(this.lastColor);
			document.getElementById('pickerColorInput').style.backgroundColor = this.lastColor;
			document.getElementById('pickerColorInput').style.backgroundImage = "none";
			document.getElementById('pickerHue').style.backgroundColor = this.lastColor;
			document.getElementById('hueColor').style.backgroundImage = "url('gif/hue.png')";
			document.getElementById(this.inputElmId).value = this.lastColor;
			this.hasColorClicked = true;
			this.setTransparent(false);
			this.runExtFunctions();
			return newColor;
		}
		return false;
	};
	this.setColor = function (e, elm, elmOffsetX, elmOffsetY) {
		if (!elmOffsetX) {
			elmOffsetX = 0;
		}
		if (!elmOffsetY) {
			elmOffsetY = 0;
		}
		this.hasColorClicked = false;
		this.lastColor = this.changeColor(e, elm, elmOffsetX, elmOffsetY)[3];
		document.getElementById('hiddenColor').value = this.lastColor;
		this.hasColorClicked = true;
		this.setTransparent(false);
		this.runExtFunctions();
	};
	this.resetColor = function () {
		var newColor = '', currColorArray = [];
		this.hasColorClicked = false;
		if (this.isTransparent) {
			this.setTransparent(true);
		} else {
			newColor = this.HEX2RGB(this.lastColor);
			currColorArray = this.calcColor(newColor[0], newColor[1], newColor[2]);
			this.calcColorHue(currColorArray[0], currColorArray[1], currColorArray[2]);
		}
	};
	this.debug = function (listOfValues) {
		var stringToPrint = '', a = 0;
		for (a = 0; a < listOfValues.length; a += 1) {
			stringToPrint += listOfValues[a] + " ";
		}
		document.getElementById('changedDiv').innerHTML = stringToPrint + "<br />" + document.getElementById('changedDiv').innerHTML;
	};
	this.getColorOppositeHEX = function (tempColorString) {
		var newColor = 0xffffff - (this.HEX2RGB(tempColorString)[0] * 0x10000 + this.HEX2RGB(tempColorString)[1] * 0x100 + this.HEX2RGB(tempColorString)[2]);
		return this.RGB2HEX(Math.floor(newColor / 0x10000), Math.floor(newColor / 0x100) % 0x100, newColor % 0x100);
	};
	this.getPos = function (e, elm, elmOffsetX, elmOffsetY) {
		var trueTop = 0, trueLeft = 0, tempElm = false;
		if (!elmOffsetX) {
			elmOffsetX = 0;
		}
		if (!elmOffsetY) {
			elmOffsetY = 0;
		}
		if (e.offsetX && e.offsetY) {
			return [e.offsetX, e.offsetY];
		} else if (e.clientX && e.clientY) {
			trueTop = 0;
			trueLeft = 0;
			tempElm = elm;
			while (tempElm !== tempElm.offsetParent) {
				if (isNaN(tempElm.offsetTop) || isNaN(tempElm.offsetLeft)) {
					break;
				}
				trueTop += tempElm.offsetTop;
				trueLeft += tempElm.offsetLeft;
				if (!tempElm.offsetParent) {
					break;
				}
				tempElm = tempElm.offsetParent;
			}
			return [e.clientX - trueLeft + elmOffsetX, e.clientY - trueTop + elmOffsetY];
		} else if (e.pageX && e.pageY) {
			return [e.pageX - elm.offsetLeft, e.pageY - elm.offsetTop];
		}
		return [e.layerX, e.layerY];
	};
	this.runExtFunctions = function () {
		if (this.coloredElmId === 'bcInput') {
			CSS3ME.setBasics();
		} else if (this.coloredElmId === 'bgInput') {
			CSS3ME.setBasics();
		} else if (this.coloredElmId === 'bsColorInput') {
			CSS3ME.setBoxShadow();
		} else if (this.coloredElmId === 'bgToInput') {
			CSS3ME.updateGradient();
		} else if (this.coloredElmId === 'bgFromInput') {
			CSS3ME.updateGradient();
		}
	};
	this.initColors = function () {
		document.getElementById('hiddenHue').value = 0;
		if (this.isTransparent) {
			document.getElementById('hiddenColor').value = 'transparent';
			document.getElementById('pickerColorInput').value = 'transparent';
			document.getElementById('pickerColorInput').style.color = '#000000';
			document.getElementById('pickerColorInput').style.backgroundColor = 'none';
			document.getElementById('pickerColorInput').style.backgroundImage = "url('gif/transparent_small.png')";
			document.getElementById('pickerHue').style.backgroundColor = 'none';
			document.getElementById('hueColor').style.backgroundImage = "url('gif/transparent_small.png')";
			document.getElementById(this.inputElmId).value = 'transparent';
		} else {
			document.getElementById('hiddenColor').value = this.lastColor;
			document.getElementById('pickerColorInput').value = this.lastColor;
			document.getElementById('pickerColorInput').style.color = this.getColorOppositeHEX(this.lastColor);
			document.getElementById('pickerColorInput').style.backgroundColor = this.lastColor;
			document.getElementById('pickerColorInput').style.backgroundImage = "none";
			document.getElementById('pickerHue').style.backgroundColor = this.lastColor;
			document.getElementById('hueColor').style.backgroundImage = "url('gif/hue.png')";
			document.getElementById(this.inputElmId).value = this.lastColor;
		}
	};
	this.initColors();
}



