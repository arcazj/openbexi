/*Code by Peter Funk*/
var PFunkGen = function () {
            'use strict';
            var boxStyle, sliderBR, sliderBS, sliderO, sliderFs, useOldMoz, useOldMS, useOldWebkit, useMoz, useMS, useO, useWebkit, showComments, cssStyle;

            function initAll() {
                initBasics();
                initBorderRadius();
                initBoxShadow();
                initGradient();
                initOpacity();
                initFontSize();
            }

            /*****BASICS*****/
            function initBasics() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var ob_border = parseInt(document.getElementById(currentObjNameSelected).style.borderWidth);
                if (isNaN(ob_border)) ob_border = 0;
                if (isNaN(ob_border)) ob_border = 0;
                cssStyle.borderWidth = document.getElementById('bwInput').value = ob_border;
                cssStyle.borderColor = document.getElementById('bcHiddenInput').value = document.getElementById(currentObjNameSelected).style.borderColor;
                document.getElementById('bcInput').style.color = cssStyle.borderColor;
                cssStyle.backgroundColor = document.getElementById('bgHiddenInput').value = document.getElementById(currentObjNameSelected).style.backgroundColor;
                document.getElementById('bgInput').style.color = cssStyle.backgroundColor;
            }

            function setBasics() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var bwValue = document.getElementById('bwInput').value;
                var bcValue = document.getElementById('bcHiddenInput').value;
                var bgcValue = document.getElementById('bgHiddenInput').value;
                if (isNaN(bwValue)) {
                    bwValue = 2;
                } else if (Number(bwValue) < 0) {
                    bwValue = 0;
                }
                bwValue = cssStyle.borderWidth = Number(bwValue);
                document.getElementById(currentObjNameSelected).style.borderWidth = bwValue + 'px';
                //document.getElementById(currentObjNameSelected).style.margin = (-bwValue) + 'px 0 0 ' + (-bwValue) + 'px';
                document.getElementById(currentObjNameSelected).style.borderColor = cssStyle.borderColor = bcValue;
                document.getElementById(currentObjNameSelected).style.backgroundColor = cssStyle.backgroundColor = bgcValue;
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css_border_bg", showBasics());
            }

            /*****END BASICS*****/
            /*****BORDER RADIUS*****/
            function initBorderRadius() {
                if (document.getElementById(currentObjNameSelected).style.MozBorderRadius != undefined) {
                    cssStyle.borderRadius[0] = document.getElementById('brTLInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-moz-border-radius-topleft']);
                    cssStyle.borderRadius[1] = document.getElementById('brTRInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-moz-border-radius-topright']);
                    cssStyle.borderRadius[2] = document.getElementById('brBLInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-moz-border-radius-bottomleft']);
                    cssStyle.borderRadius[3] = document.getElementById('brBRInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-moz-border-radius-bottomright']);
                } else if (document.getElementById(currentObjNameSelected).style.WebkitBorderRadius != undefined) {
                    cssStyle.borderRadius[0] = document.getElementById('brTLInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-webkit-border-top-left-radius']);
                    cssStyle.borderRadius[1] = document.getElementById('brTRInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-webkit-border-top-right-radius']);
                    cssStyle.borderRadius[2] = document.getElementById('brBLInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-webkit-border-bottom-left-radius']);
                    cssStyle.borderRadius[3] = document.getElementById('brBRInput').value = parseInt(document.getElementById(currentObjNameSelected).style['-webkit-border-bottom-right-radius']);

                } else {
                    cssStyle.borderRadius[0] = document.getElementById('brTLInput').value = parseInt(document.getElementById(currentObjNameSelected).style.borderTopLeftRadius);
                    cssStyle.borderRadius[1] = document.getElementById('brTRInput').value = parseInt(document.getElementById(currentObjNameSelected).style.borderTopRightRadius);
                    cssStyle.borderRadius[2] = document.getElementById('brBLInput').value = parseInt(document.getElementById(currentObjNameSelected).style.borderBottomLeftRadius);
                    cssStyle.borderRadius[3] = document.getElementById('brBRInput').value = parseInt(document.getElementById(currentObjNameSelected).style.borderBottomRightRadius);
                }
                if (isNaN(cssStyle.borderRadius[0])) {
                    cssStyle.borderRadius[0] = 0;
                    document.getElementById('brTLInput').value = 0;
                }
                if (isNaN(cssStyle.borderRadius[1])) {
                    cssStyle.borderRadius[1] = 0;
                    document.getElementById('brTRInput').value = 0;
                }
                if (isNaN(cssStyle.borderRadius[2])) {
                    cssStyle.borderRadius[2] = 0;
                    document.getElementById('brBLInput').value = 0;
                }
                if (isNaN(cssStyle.borderRadius[3])) {
                    cssStyle.borderRadius[3] = 0;
                    document.getElementById('brBRInput').value = 0;
                }
                if (cssStyle.borderRadius[0] == cssStyle.borderRadius[1] && cssStyle.borderRadius[0] == cssStyle.borderRadius[2] && cssStyle.borderRadius[0] == cssStyle.borderRadius[3])
                    document.getElementById('brInput').value = cssStyle.borderRadius[0];
                else
                    document.getElementById('brInput').value = 0;
                sliderBR.moveThumb(sliderBR.posPercToPx((cssStyle.borderRadius[0]) + '%'));

            }

            function updateBorderRadius(newRadius) {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                if (isNaN(newRadius) || Number(newRadius) < 0) {
                    cssStyle.borderRadius[0] = cssStyle.borderRadius[1] = cssStyle.borderRadius[2] = cssStyle.borderRadius[3] = 0;
                } else {
                    cssStyle.borderRadius[0] = cssStyle.borderRadius[1] = cssStyle.borderRadius[2] = cssStyle.borderRadius[3] = Number(newRadius);
                }
                newRadius = cssStyle.borderRadius[0];
                document.getElementById("brInput").value = newRadius;
                document.getElementById('brTLInput').value = newRadius;
                document.getElementById('brTRInput').value = newRadius;
                document.getElementById('brBLInput').value = newRadius;
                document.getElementById('brBRInput').value = newRadius;
                document.getElementById(currentObjNameSelected).style.MozBorderRadius = newRadius + 'px';
                document.getElementById(currentObjNameSelected).style.WebkitBorderRadius = newRadius + 'px';
                document.getElementById(currentObjNameSelected).style.borderRadius = newRadius + 'px';
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css3_radius", showBorderRadiusCode());
            }

            function setBorderRadii() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var brtl = document.getElementById('brTLInput').value;
                var brtr = document.getElementById('brTRInput').value;
                var brbl = document.getElementById('brBLInput').value;
                var brbr = document.getElementById('brBRInput').value;
                if (isNaN(brtl) || Number(brtl) < 0) {
                    cssStyle.borderRadius[0] = 0;
                } else {
                    cssStyle.borderRadius[0] = Number(brtl);
                }
                if (isNaN(brtr) || Number(brtr) < 0) {
                    cssStyle.borderRadius[1] = 0;
                } else {
                    cssStyle.borderRadius[1] = Number(brtr);
                }
                if (isNaN(brbr) || Number(brbr) < 0) {
                    cssStyle.borderRadius[2] = 0;
                } else {
                    cssStyle.borderRadius[2] = Number(brbr);
                }
                if (isNaN(brbl) || Number(brbl) < 0) {
                    cssStyle.borderRadius[3] = 0;
                } else {
                    cssStyle.borderRadius[3] = Number(brbl);
                }
                var newRadius = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px ' + cssStyle.borderRadius[2] + 'px ' + cssStyle.borderRadius[3] + 'px';
                document.getElementById(currentObjNameSelected).style.MozBorderRadius = newRadius;
                document.getElementById(currentObjNameSelected).style.WebkitBorderRadius = newRadius;
                document.getElementById(currentObjNameSelected).style.borderRadius = newRadius;
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css3_radius", showBorderRadiusCode());
            }

            /*****END BORDER RADIUS*****/
            /*****BOX SHADOW*****/
            function getIEDirection(horz, vert) {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var absH = 0, absV = 0, change = 0, returnNum = -1;
                horz = Number(horz);
                vert = Number(vert);
                absH = Math.abs(horz);
                absV = Math.abs(vert);
                if (isNaN(horz) || isNaN(vert) || (!horz && !vert)) {
                    returnNum = 0;
                } else if (horz === 0 && vert > 0) {
                    returnNum = 180;
                } else if (horz === 0 && vert < 0) {
                    returnNum = 0;
                } else if (vert === 0 && horz > 0) {
                    returnNum = 90;
                } else if (vert === 0 && horz < 0) {
                    returnNum = 270;
                } else if (absV === absH && vert < 0 && horz > 0) {
                    returnNum = 45;
                } else if (absV === absH && vert > 0 && horz > 0) {
                    returnNum = 135;
                } else if (absV === absH && vert > 0 && horz < 0) {
                    returnNum = 225;
                } else if (absV === absH && vert < 0 && horz < 0) {
                    returnNum = 315;
                }
                if (returnNum !== -1) {
                    return returnNum;
                }
                if (horz > 0 && vert < 0 && absV > absH) {
                    change = (absH / absV) * 45;
                } else if (horz > 0 && vert < 0) {
                    change = (absV / absH) * 45 + 45;
                } else if (horz > 0 && vert > 0 && absH > absV) {
                    change = (absV / absH) * 45 + 90;
                } else if (horz > 0 && vert > 0) {
                    change = (absH / absV) * 45 + 135;
                } else if (horz < 0 && vert > 0 && absV > absH) {
                    change = (absH / absV) * 45 + 180;
                } else if (horz < 0 && vert > 0) {
                    change = (absV / absH) * 45 + 225;
                } else if (horz < 0 && vert < 0 && absH > absV) {
                    change = (absV / absH) * 45 + 270;
                } else if (horz < 0 && vert < 0) {
                    change = (absH / absV) * 45 + 315;
                }
                return change;
            }

            function initBoxShadow() {
                var newBoxShadow;
                if (document.getElementById(currentObjNameSelected).style.MozBorderRadius != undefined) {
                    newBoxShadow = document.getElementById(currentObjNameSelected).style['-moz-box-shadow'];
                } else if (document.getElementById(currentObjNameSelected).style.WebkitBoxShadow != undefined) {
                    newBoxShadow = document.getElementById(currentObjNameSelected).style['-webkit-box-shadow'];
                } else {
                    newBoxShadow = document.getElementById(currentObjNameSelected).style.boxShadow;
                }
                //newBoxShadow = "10px 10px 5px 10px pink inset";
                //newBoxShadow = "10px 10px 5px 10px #CCCCCC inset";

                var rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/; //matches RGB
                var hexRegex = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi; //matches hex
                try {
                    cssStyle.boxShadowColor = newBoxShadow.match(rgbRegex)[0];
                } catch (e) {
                    cssStyle.boxShadowColor = "";
                }
                try {
                    if (cssStyle.boxShadowColor == "")
                        cssStyle.boxShadowColor = newBoxShadow.match(hexRegex)[0];
                } catch (e) {
                    cssStyle.boxShadowColor = "";
                }
                newBoxShadow = newBoxShadow.replace(cssStyle.boxShadowColor, "");

                if (newBoxShadow.match("inset")) {
                    cssStyle.boxShadow[4] = true;
                    newBoxShadow = newBoxShadow.replace("inset", "");
                } else {
                    cssStyle.boxShadow[4] = false;
                    document.getElementById('insetShadowBtn').className = 'outsetBtn';
                }
                var atts = newBoxShadow.split("px");
                for (var i = 0; i < atts.size(); i++) {
                    if (atts[i].replace(/\s/g, "") != "")
                        try {
                            cssStyle.boxShadow[i] = atts[i].replace(/\s/g, "");
                        } catch (e) {
                        }
                }
                if (cssStyle.boxShadow[2] != "") {
                    //updateBoxShadow(cssStyle.boxShadow[0]);
                    document.getElementById('bsInput').value = cssStyle.boxShadow[0];
                    document.getElementById('bsHorzInput').value = cssStyle.boxShadow[0];
                    document.getElementById('bsVertInput').value = cssStyle.boxShadow[1];
                    document.getElementById('bsBlurInput').value = cssStyle.boxShadow[2];
                    document.getElementById('bsSpreadInput').value = cssStyle.boxShadow[3];
                    document.getElementById('bsColorInput').style.color = cssStyle.boxShadowColor;
                    CSS3ME.sliderBS.moveThumb(sliderBS.posPercToPx((cssStyle.boxShadow[2]) + '%'))
                    document.getElementById('bsInput').value = cssStyle.boxShadow[2];

                }

            }

            function updateBoxShadow(newBoxShadow) {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var boxShadowDirection = 0, newBoxShadowSpread = "", newBoxShadowInset = "";
                if (isNaN(newBoxShadow)) {
                    newBoxShadow = 0;
                }
                document.getElementById("bsInput").value = newBoxShadow;
                document.getElementById('bsBlurInput').value = newBoxShadow;
                cssStyle.boxShadow[2] = Number(newBoxShadow);
                if (cssStyle.boxShadow[3]) {
                    newBoxShadowSpread = cssStyle.boxShadow[3] + "px ";
                }
                if (cssStyle.boxShadow[4]) {
                    newBoxShadowInset = "inset ";
                }
                newBoxShadow = newBoxShadowInset + cssStyle.boxShadow[0] + "px " + cssStyle.boxShadow[1] + "px " + newBoxShadow + "px " + newBoxShadowSpread + cssStyle.boxShadowColor;
                document.getElementById(currentObjNameSelected).style.MozBoxShadow = newBoxShadow;
                document.getElementById(currentObjNameSelected).style.WebkitBoxShadow = newBoxShadow;
                document.getElementById(currentObjNameSelected).style.boxShadow = newBoxShadow;
                boxShadowDirection = getIEDirection(cssStyle.boxShadow[0], cssStyle.boxShadow[1]);
                if (useOldMS) {
                    document.getElementById(currentObjNameSelected).style.filter = "progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(Math.abs(cssStyle.boxShadow[0]), Math.abs(cssStyle.boxShadow[1])) + ", direction = " + boxShadowDirection + ", color = '" + cssStyle.boxShadowColor + "')";
                    document.getElementById(currentObjNameSelected).style.msfilter = "\"progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(Math.abs(cssStyle.boxShadow[0]), Math.abs(cssStyle.boxShadow[1])) + ", Direction = " + boxShadowDirection + ", Color = '" + cssStyle.boxShadowColor + "')\";";
                }
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css3_boxShadow", showBoxShadowCode());
            }

            function setBoxShadow() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var bsHorz = document.getElementById('bsHorzInput').value, bsVert = document.getElementById('bsVertInput').value, bsBlur = document.getElementById('bsBlurInput').value, bsSpread = document.getElementById('bsSpreadInput').value, bsInset = document.getElementById('insetShadowBtn').className === 'outsetBtn' ? true : false, bsColor = document.getElementById('bsColorHiddenInput').value, boxShadowDirection = 0, newBoxShadow = "";
                if (isNaN(bsHorz)) {
                    cssStyle.boxShadow[0] = 0;
                    document.getElementById('bsHorzInput').value = 0;
                } else {
                    cssStyle.boxShadow[0] = Number(bsHorz);
                }
                if (isNaN(bsVert)) {
                    cssStyle.boxShadow[1] = 0;
                    document.getElementById('bsVertInput').value = 0;
                } else {
                    cssStyle.boxShadow[1] = Number(bsVert);
                }
                if (isNaN(bsBlur)) {
                    cssStyle.boxShadow[2] = 0;
                    document.getElementById('bsBlurInput').value = 0;
                } else {
                    cssStyle.boxShadow[2] = Number(bsBlur);
                }
                if (isNaN(bsSpread)) {
                    cssStyle.boxShadow[3] = 0;
                    document.getElementById('bsSpreadInput').value = 0;
                } else {
                    cssStyle.boxShadow[3] = Number(bsSpread);
                }
                cssStyle.boxShadow[4] = bsInset;
                cssStyle.boxShadowColor = bsColor;
                if (cssStyle.boxShadow[4]) {
                    newBoxShadow = "inset " + cssStyle.boxShadow[0] + "px " + cssStyle.boxShadow[1] + "px " + cssStyle.boxShadow[2] + "px " + cssStyle.boxShadow[3] + "px " + cssStyle.boxShadowColor;
                } else {
                    newBoxShadow = cssStyle.boxShadow[0] + "px " + cssStyle.boxShadow[1] + "px " + cssStyle.boxShadow[2] + "px " + cssStyle.boxShadow[3] + "px " + cssStyle.boxShadowColor;
                }
                document.getElementById(currentObjNameSelected).style.MozBoxShadow = newBoxShadow;
                document.getElementById(currentObjNameSelected).style.WebkitBoxShadow = newBoxShadow;
                document.getElementById(currentObjNameSelected).style.boxShadow = newBoxShadow;
                boxShadowDirection = getIEDirection(cssStyle.boxShadow[0], cssStyle.boxShadow[1]);
                if (useOldMS) {
                    document.getElementById(currentObjNameSelected).style.filter = "progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(Math.abs(cssStyle.boxShadow[0]), Math.abs(cssStyle.boxShadow[1])) + ", direction = " + boxShadowDirection + ", color = '" + cssStyle.boxShadowColor + "')";
                    document.getElementById(currentObjNameSelected).style.msfilter = "\"progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(Math.abs(cssStyle.boxShadow[0]), Math.abs(cssStyle.boxShadow[1])) + ", Direction = " + boxShadowDirection + ", Color = '" + cssStyle.boxShadowColor + "')\";";
                }
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css3_boxShadow", showBoxShadowCode());
            }

            /*****END BOX SHADOW*****/
            /*****GRADIENT*****/
            function initGradient() {

                var backgroundImage = document.getElementById(currentObjNameSelected).style.backgroundImage;

                var rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/; //matches RGB
                var hexRegex = /#[0-9a-f]{6}|#[0-9a-f]{3}/gi; //matches hex
                try {
                    cssStyle.backgroundFromColor = backgroundImage.match(rgbRegex)[0];
                } catch (e) {
                    cssStyle.backgroundFromColor = "";
                }
                try {
                    if (cssStyle.backgroundFromColor == "")
                        cssStyle.backgroundFromColor = backgroundImage.match(hexRegex)[0];
                } catch (e) {
                    cssStyle.backgroundFromColor = "";
                }
                backgroundImage = backgroundImage.replace(cssStyle.backgroundFromColor, "");
                try {
                    cssStyle.backgroundToColor = backgroundImage.match(rgbRegex)[0];
                } catch (e) {
                    cssStyle.backgroundToColor = "";
                }
                try {
                    if (cssStyle.backgroundToColor == "")
                        cssStyle.backgroundToColor = backgroundImage.match(hexRegex)[0];
                } catch (e) {
                    cssStyle.backgroundToColor = "";
                }
                document.getElementById('bgFromInput').style.color = cssStyle.backgroundFromColor;
                document.getElementById('bgToInput').style.color = cssStyle.backgroundToColor;

                // direction
                document.getElementById('bgT2B').className = 'radioBtn';
                document.getElementById('bgL2R').className = 'radioBtn';
                document.getElementById('bgR2L').className = 'radioBtn';
                if (backgroundImage.match("left top")) {
                    cssStyle.backgroundDirection = "left top";
                    document.getElementById('bgL2R').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "l2r";
                }
                else if (backgroundImage.match("right top")) {
                    cssStyle.backgroundDirection = "right top";
                    document.getElementById('bgR2L').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "r2l";
                }
                else if (backgroundImage.match("center bottom")) {
                    cssStyle.backgroundDirection = "center bottom";
                    document.getElementById('bgT2B').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "t2b";
                }
                else if (backgroundImage.match("right")) {
                    cssStyle.backgroundDirection = "right";
                    document.getElementById('bgL2R').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "l2r";
                }
                else if (backgroundImage.match("left")) {
                    cssStyle.backgroundDirection = "left";
                    document.getElementById('bgR2L').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "r2l";
                }
                else {
                    cssStyle.backgroundDirection = "top";
                    document.getElementById('bgT2B').className = 'radioBtn radioChecked';
                    cssStyle.backgroundDirection = "t2b";
                }

                if (backgroundImage != "")
                    document.getElementById('gradientSwitch').className = 'gradSwitch gradOn';
                else
                    document.getElementById('gradientSwitch').className = 'gradSwitch';

            }

            function updateGradient() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var hasGradient = (document.getElementById('gradientSwitch').className === "gradSwitch gradOn"), newFromColor = '', newToColor = '';
                if (hasGradient) {
                    newFromColor = cssStyle.backgroundFromColor = document.getElementById('bgFromHiddenInput').value;
                    newToColor = cssStyle.backgroundToColor = document.getElementById('bgToHiddenInput').value;
                    if (document.getElementById('bgL2R').className === 'radioBtn radioChecked') {
                        cssStyle.backgroundDirection = "l2r";
                        if (navigator.userAgent.indexOf('MSIE') === -1) {
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-moz-linear-gradient(left, " + newFromColor + ", " + newToColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-webkit-gradient(linear, left top, right top, from(" + newFromColor + "), to(" + newToColor + "))";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-o-linear-gradient(left, " + newFromColor + ", " + newToColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(left, " + newFromColor + ", " + newToColor + ")";
                        } else {
                            if (useOldMS) {
                                document.getElementById(currentObjNameSelected).style.filter = "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + newFromColor + "', endColorstr = '" + newToColor + "')";
                                document.getElementById(currentObjNameSelected).style.msfilter = "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + newFromColor + "', endColorstr = '" + newToColor + "')";
                            } else if (navigator.userAgent.indexOf('MSIE 9') !== -1) {
                                document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(left, " + newFromColor + ", " + newToColor + ")";
                            }
                        }
                    } else if (document.getElementById('bgR2L').className === 'radioBtn radioChecked') {
                        cssStyle.backgroundDirection = "r2l";
                        if (navigator.userAgent.indexOf('MSIE') === -1) {
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-moz-linear-gradient(left, " + newToColor + ", " + newFromColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-webkit-gradient(linear, left top, right top, from(" + newToColor + "), to(" + newFromColor + "))";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-o-linear-gradient(left, " + newToColor + ", " + newFromColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(left, " + newToColor + ", " + newFromColor + ")";
                        } else {
                            if (useOldMS) {
                                document.getElementById(currentObjNameSelected).style.filter = "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + newToColor + "', endColorstr = '" + newFromColor + "')";
                                document.getElementById(currentObjNameSelected).style.msfilter = "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + newToColor + "', endColorstr = '" + newFromColor + "')";
                            } else if (navigator.userAgent.indexOf('MSIE 9') !== -1) {
                                document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(left, " + newToColor + ", " + newFromColor + ")";
                            }
                        }
                    } else {
                        cssStyle.backgroundDirection = "t2b";
                        if (navigator.userAgent.indexOf('MSIE') === -1) {
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-moz-linear-gradient(top, " + newFromColor + ", " + newToColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-webkit-gradient(linear, center top, center bottom, from(" + newFromColor + "), to(" + newToColor + "))";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "-o-linear-gradient(top, " + newFromColor + ", " + newToColor + ")";
                            document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(top, " + newFromColor + ", " + newToColor + ")";
                        } else {
                            if (useOldMS) {
                                document.getElementById(currentObjNameSelected).style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr = '" + newFromColor + "', endColorstr = '" + newToColor + "')";
                                document.getElementById(currentObjNameSelected).style.msfilter = "progid:DXImageTransform.Microsoft.gradient(startColorstr = '" + newFromColor + "', endColorstr = '" + newToColor + "')";
                            } else if (navigator.userAgent.indexOf('MSIE 9') !== -1) {
                                document.getElementById(currentObjNameSelected).style.backgroundImage = "linear-gradient(top, " + newFromColor + ", " + newToColor + ")";
                            }
                        }
                    }
                } else {
                    document.getElementById(currentObjNameSelected).style.backgroundImage = "";
                    document.getElementById(currentObjNameSelected).style.backgroundColor = document.getElementById('bgHiddenInput').value;
                    if (useOldMS) {
                        document.getElementById(currentObjNameSelected).style.filter = '';
                        document.getElementById(currentObjNameSelected).style.msfilter = '';
                    }
                    cssStyle.backgroundDirection = "";
                }
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css3_gradient", showBackgroundGradientCode());

            }

            function setGradient() {
            }

            function bgRadioChecked(id) {
                document.getElementById('bgT2B').className = 'radioBtn';
                document.getElementById('bgL2R').className = 'radioBtn';
                document.getElementById('bgR2L').className = 'radioBtn';
                document.getElementById(id).className = 'radioBtn radioChecked';
                updateGradient();
            }

            function ftRadioChecked(id) {
                document.getElementById('ftpx').className = 'radioBtn';
                document.getElementById('ftem').className = 'radioBtn';
                document.getElementById('ftrem').className = 'radioBtn';
                document.getElementById(id).className = 'radioBtn radioChecked';
                updateFontSize(cssStyle.fontSize);
            }

            /*****END GRADIENT*****/
            /*****OPACITY*****/
            function initOpacity() {
                var ob_opacity = parseInt(document.getElementById(currentObjNameSelected).style.opacity);
                if (isNaN(ob_opacity))
                    ob_opacity = 100;
                else
                    ob_opacity = document.getElementById(currentObjNameSelected).style.opacity * 100;

                if (Number(ob_opacity) > 100) {
                    ob_opacity = 100;
                } else if (Number(ob_opacity) < 0) {
                    ob_opacity = 0;
                }
                document.getElementById("oInput").value = ob_opacity;
                setOpacity();
            }

            function updateOpacity(newOpacity) {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                if (isNaN(newOpacity) || Number(newOpacity) > 100) {
                    newOpacity = 100;
                } else if (Number(newOpacity) < 0) {
                    newOpacity = 0;
                }
                cssStyle.opacity = Number(newOpacity);
                document.getElementById("oInput").value = cssStyle.opacity;
                document.getElementById(currentObjNameSelected).style.opacity = (cssStyle.opacity / 100);
                if (useOldMS) {
                    document.getElementById(currentObjNameSelected).style.msfilter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity = ' + cssStyle.opacity + ')';
                    document.getElementById(currentObjNameSelected).style.filter = 'alpha(opacity = ' + cssStyle.opacity + ')';
                }
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css_opacity", showOpacityCode());
            }

            function setOpacity() {
                if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                var newOpacity = document.getElementById("oInput").value;
                if (isNaN(newOpacity) || Number(newOpacity) > 100) {
                    newOpacity = 100;
                } else {
                    if (Number(newOpacity) < 0) {
                        newOpacity = 0;
                    }
                }
                cssStyle.opacity = Number(newOpacity);
                if (document.getElementById("oSlider"))
                    sliderO.moveThumb(sliderO.posPercToPx(cssStyle.opacity + "%"));
                document.getElementById("oInput").value = cssStyle.opacity;
                document.getElementById(currentObjNameSelected).style.opacity = (cssStyle.opacity / 100);
                if (useOldMS) {
                    document.getElementById(currentObjNameSelected).style.msfilter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity = ' + cssStyle.opacity + ')';
                    document.getElementById(currentObjNameSelected).style.filter = 'alpha(opacity = ' + cssStyle.opacity + ')';
                }
                openbexi_updatePageData(null, "page", currentObjNameSelected, "css_opacity", showOpacityCode());
            }

            function initFontSize() {
                try {

                    cssStyle.fontSizeUnit = "px";
                    if (document.getElementById('ftpx').checked) {
                        document.getElementById('ftpx').className = 'radioBtn radioChecked';
                        document.getElementById('ftem').className = 'radioBtn';
                        document.getElementById('ftrem').className = 'radioBtn';
                        cssStyle.fontSizeUnit = "px";
                    }
                    if (document.getElementById('ftrem').checked) {
                        document.getElementById('ftpx').className = 'radioBtn';
                        document.getElementById('ftem').className = 'radioBtn radioChecked';
                        document.getElementById('ftrem').className = 'radioBtn';
                        cssStyle.fontSizeUnit = "em";
                    }
                    if (document.getElementById('ftrem').checked) {
                        document.getElementById('ftpx').className = 'radioBtn';
                        document.getElementById('ftem').className = 'radioBtn';
                        document.getElementById('ftrem').className = 'radioBtn radioChecked';
                        cssStyle.fontSizeUnit = "rem";
                    }
                    if (isNaN(ob_FontSize)) {
                        var fsRegex = /font-size: [0-9a-z]{4}|font-size: [0-9a-z]{3}|font-size:[0-9a-z]{4}|font-size:[0-9a-z]{3}/; //matches font-size
                        var css = openbexi_getStyleByClass(document.getElementById(currentObjNameSelected).class);
                        if (css != null) {
                            var ob_FontSize = css.match(fsRegex)[0];
                            if (ob_FontSize != null) {
                                if (ob_FontSize.match("px")) {
                                    document.getElementById('ftpx').className = 'radioBtn radioChecked';
                                    document.getElementById('ftem').className = 'radioBtn';
                                    document.getElementById('ftrem').className = 'radioBtn';
                                }
                                if (ob_FontSize.match("em")) {
                                    document.getElementById('ftpx').className = 'radioBtn';
                                    document.getElementById('ftem').className = 'radioBtn radioChecked';
                                    document.getElementById('ftrem').className = 'radioBtn';
                                }
                                if (ob_FontSize.match("rem")) {
                                    document.getElementById('ftpx').className = 'radioBtn';
                                    document.getElementById('ftem').className = 'radioBtn';
                                    document.getElementById('ftrem').className = 'radioBtn radioChecked';
                                }
                                ob_FontSize = ob_FontSize.replace("font-size:", "");
                                ob_FontSize = parseInt(ob_FontSize.trim());
                            } else {
                                ob_FontSize = 12;
                            }
                        } else {
                            ob_FontSize = 12;
                        }
                    }

                } catch (e) {
                    __openbexi_debugC("CSS3ME.initFontSize()", "Exception:" + e.message);
                }

                if (Number(ob_FontSize) > 100) {
                    ob_FontSize = 12;
                } else if (Number(ob_FontSize) < 0) {
                    ob_FontSize = 12;
                }
                document.getElementById("fsInput").value = ob_FontSize;

                setFontSize();
            }

            function updateFontSize(newFontSize) {
                try {
                    if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                    if (isNaN(newFontSize) || Number(newFontSize) > 100) {
                        newFontSize = 12;
                    } else if (Number(newFontSize) < 0) {
                        newFontSize = 0;
                    }
                    cssStyle.fontSize = Number(newFontSize);
                    document.getElementById("fsInput").value = cssStyle.fontSize;
                    if (getSelectedBexiObj(null).type == "openbexi_dojo_editor" && getSelectedBexiObj(null).mode == "editable")
                        openbexi_setCSSValue(event, 'fontSize', cssStyle.fontSize + cssStyle.fontSizeUnit);
                    else
                        document.getElementById(currentObjNameSelected).style.fontSize = cssStyle.fontSize + cssStyle.fontSizeUnit;
                    openbexi_updatePageData(null, "page", currentObjNameSelected, "css_font", "font:" + document.getElementById(currentObjNameSelected).style.fontSize + ";");
                } catch (e) {
                    __openbexi_debugC("CSS3ME.updateFontSize()", "Exception:" + e.message);
                }
            }

            function setFontSize() {
                try {
                    if (currentObjNameSelected == null || currentObjNameSelected == "BODY")return;
                    //if (document.getElementById(currentObjNameSelected).style.fontSize == "") return;
                    var newFontSize = document.getElementById("fsInput").value;
                    if (isNaN(newFontSize) || Number(newFontSize) > 100) {
                        newFontSize = 12;
                    } else {
                        if (Number(newFontSize) < 0) {
                            newFontSize = 12;
                        }
                    }
                    cssStyle.fontSize = Number(newFontSize);
                    if (document.getElementById("fsSlider"))
                        sliderFs.moveThumb(sliderFs.posPercToPx(cssStyle.fontSize + "%"));
                    document.getElementById("fsInput").value = cssStyle.fontSize;
                    openbexi_updatePageData(null, "page", currentObjNameSelected, "css_font", cssStyle.fontSize);
                    openbexi_updatePageData(null, "page", currentObjNameSelected, "css_font_unit", cssStyle.fontSizeUnit);
                    document.getElementById(currentObjNameSelected).style.fontSize = cssStyle.fontSize + cssStyle.fontSizeUnit;
                } catch (e) {
                    __openbexi_debugC("CSS3ME.setFontSize()", "Exception:" + e.message);
                }
            }

            /*****END OPACITY*****/
            /*****EXTERNAL FUNCTIONS*****/
            function centerModal(mdlId) {
                var modalToCenter = document.getElementById(mdlId), currH = 0, currW = 0;
                modalToCenter.style.display = 'block';
                currH = modalToCenter.offsetHeight;
                currW = modalToCenter.offsetWidth;
                if ((document.documentElement && Number(document.documentElement.clientHeight) !== 0 && document.documentElement.clientHeight < currH + 20) || (document.body.offsetHeight && document.body.offsetHeight < currH + 20) || (window.innerHeight && window.innerHeight < currH + 20)) {
                    modalToCenter.style.position = 'absolute';
                    modalToCenter.style.top = "20px";
                    modalToCenter.style.marginTop = '0px';
                    window.scroll(0, 0);
                } else {
                    modalToCenter.style.position = 'fixed';
                    modalToCenter.style.top = "50%";
                    modalToCenter.style.marginTop = -(currH / 2) + 'px';
                }
                modalToCenter.style.left = "50%";
                modalToCenter.style.marginLeft = -(currW / 2) + 'px';
            }

            /*****END EXTERNAL FUNCTIONS*****/
            /*****SHOW CODE*****/
            function showBorderRadiusCode() {
                var radAll = "", radMoz = "", radWeb = "", stringToPrint = "";
                //if (cssStyle.borderRadius[0] === 0 && cssStyle.borderRadius[1] === 0 && cssStyle.borderRadius[2] === 0 && cssStyle.borderRadius[3] === 0) {
                // return stringToPrint;
                //}
                if (cssStyle.borderRadius[0] === cssStyle.borderRadius[2] && cssStyle.borderRadius[1] === cssStyle.borderRadius[3] && cssStyle.borderRadius[2] === cssStyle.borderRadius[3]) {
                    radAll = radMoz = radWeb = cssStyle.borderRadius[0] + 'px;';
                } else if (cssStyle.borderRadius[0] === cssStyle.borderRadius[2] && cssStyle.borderRadius[1] === cssStyle.borderRadius[3]) {
                    radAll = radMoz = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px;';
                    radWeb = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px ' + cssStyle.borderRadius[2] + 'px ' + cssStyle.borderRadius[3] + 'px;';
                    if (showComments) {
                        radWeb += '/*This is the correct shorthand for webkit*/';
                    }
                } else if (cssStyle.borderRadius[1] === cssStyle.borderRadius[3]) {
                    radAll = radMoz = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px ' + cssStyle.borderRadius[2] + 'px;';
                    radWeb = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px ' + cssStyle.borderRadius[2] + 'px ' + cssStyle.borderRadius[3] + 'px;';
                    if (showComments) {
                        radWeb += '/*This is the correct shorthand for webkit*/';
                    }
                } else {
                    radAll = radMoz = radWeb = cssStyle.borderRadius[0] + 'px ' + cssStyle.borderRadius[1] + 'px ' + cssStyle.borderRadius[2] + 'px ' + cssStyle.borderRadius[3] + 'px;';
                }
                if (useOldMoz) {
                    stringToPrint = stringToPrint + '-moz-border-radius: ' + radMoz + '\n';
                }
                if (useOldWebkit) {
                    stringToPrint = stringToPrint + '-webkit-border-radius: ' + radWeb + '\n';
                }
                stringToPrint = stringToPrint + 'border-radius: ' + radAll + '\n';
                if (useOldMS && showComments) {
                    stringToPrint = stringToPrint + "\n";
                }
                return stringToPrint;
            }

            function showBoxShadowCode() {
                var newBoxShadowInset = '', newShadowB = '', newShadowS = '', stringToPrint = '', newBoxShadow = '';
                if (cssStyle.boxShadow[4]) {
                    newBoxShadowInset = "inset ";
                }
                if (cssStyle.boxShadow[2] && cssStyle.boxShadow[3]) {
                    newShadowB = cssStyle.boxShadow[2] + "px ";
                    newShadowS = cssStyle.boxShadow[3] + "px ";
                } else if (cssStyle.boxShadow[2]) {
                    newShadowB = cssStyle.boxShadow[2] + "px ";
                } else if (cssStyle.boxShadow[3]) {
                    newShadowB = "0px ";
                    newShadowS = cssStyle.boxShadow[3] + "px ";
                }
                newBoxShadow = newBoxShadowInset + cssStyle.boxShadow[0] + "px " + cssStyle.boxShadow[1] + "px " + newShadowB + newShadowS + cssStyle.boxShadowColor;
                if (cssStyle.boxShadow[0] || cssStyle.boxShadow[1] || cssStyle.boxShadow[2] || cssStyle.boxShadow[3]) {
                    if (useOldMoz) {
                        stringToPrint = stringToPrint + "-moz-box-shadow: " + newBoxShadow + ";\n";
                    }
                    if (useOldWebkit) {
                        stringToPrint = stringToPrint + "-webkit-box-shadow: " + newBoxShadow + ";\n";
                    }
                    stringToPrint = stringToPrint + "box-shadow: " + newBoxShadow + ";\n";
                    if (cssStyle.boxShadow[4] && showComments) {
                        stringToPrint = stringToPrint + "/*Inner elements should not cover inner shadows*/\n";
                        if (cssStyle.borderRadius[0] || cssStyle.borderRadius[1] || cssStyle.borderRadius[2] || cssStyle.borderRadius[3]) {
                            stringToPrint = stringToPrint + "/*Chrome renders inset shadows incorrectly with border-radius*/\n";
                        }
                    }
                    if (useOldMS) {
                        if (cssStyle.boxShadow[4] && showComments) {
                            stringToPrint = stringToPrint + "/*IE 7 AND 8 DO NOT SUPPORT INSET SHADOWS*/\n";
                        } else {
                            if (cssStyle.boxShadow[0] || cssStyle.boxShadow[1]) {
                                stringToPrint = stringToPrint + "filter: progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(cssStyle.boxShadow[0], cssStyle.boxShadow[1]) + ", direction = " + getIEDirection(cssStyle.boxShadow[0], cssStyle.boxShadow[1]) + ", color = '" + cssStyle.boxShadowColor + "');\n-ms-filter: \"progid:DXImageTransform.Microsoft.Shadow(strength = " + Math.max(cssStyle.boxShadow[0], cssStyle.boxShadow[1]) + ", Direction = " + getIEDirection(cssStyle.boxShadow[0], cssStyle.boxShadow[1]) + ", Color = '" + cssStyle.boxShadowColor + "')\";\n";
                                if (showComments) {
                                    stringToPrint = stringToPrint + "\n";
                                }
                            }
                            if (cssStyle.boxShadow[2] && showComments) {
                                stringToPrint = stringToPrint + "\n";
                            }
                            if (cssStyle.boxShadow[3] && showComments) {
                                stringToPrint = stringToPrint + "\n";
                            }
                        }
                    }
                }
                return stringToPrint;
            }

            function showBackgroundGradientCode() {
                if (cssStyle.backgroundColor == "" && cssStyle.backgroundFromColor == "" && cssStyle.backgroundToColor == "" && cssStyle.backgroundFromColor == "")return"";
                var stringToPrint = "";
                if (cssStyle.backgroundDirection === 'l2r') {
                    if (useOldMS) {
                        stringToPrint = stringToPrint + "filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + cssStyle.backgroundFromColor + "', endColorstr = '" + cssStyle.backgroundToColor + "');\n";
                        if (showComments) {
                            stringToPrint += "/*INNER ELEMENTS MUST NOT BREAK THIS ELEMENTS BOUNDARIES*/\n/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                        stringToPrint += "-ms-filter: \"progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + cssStyle.backgroundFromColor + "', endColorstr = '" + cssStyle.backgroundToColor + "')\";\n";
                        if (showComments) {
                            stringToPrint += "/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                    }
                    if (useMoz) {
                        stringToPrint = stringToPrint + 'background-image: -moz-linear-gradient(left, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useMS) {
                        stringToPrint = stringToPrint + 'background-image: -ms-linear-gradient(left, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useO) {
                        stringToPrint = stringToPrint + 'background-image: -o-linear-gradient(left, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useOldWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-gradient(linear, left top, right top, from(' + cssStyle.backgroundFromColor + '), to(' + cssStyle.backgroundToColor + '));\n';
                    }
                    if (useWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-linear-gradient(left, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    stringToPrint = stringToPrint + 'background-image: linear-gradient(left, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                } else if (cssStyle.backgroundDirection === 'r2l') {
                    if (useOldMS) {
                        stringToPrint = stringToPrint + "filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + cssStyle.backgroundToColor + "', endColorstr = '" + cssStyle.backgroundFromColor + "');\n";
                        if (showComments) {
                            stringToPrint += "/*INNER ELEMENTS MUST NOT BREAK THIS ELEMENTS BOUNDARIES*/\n/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                        stringToPrint += "-ms-filter: \"progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = '" + cssStyle.backgroundToColor + "', endColorstr = '" + cssStyle.backgroundFromColor + "')\";\n";
                        if (showComments) {
                            stringToPrint += "/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                    }
                    if (useMoz) {
                        stringToPrint = stringToPrint + 'background-image: -moz-linear-gradient(left, ' + cssStyle.backgroundToColor + ', ' + cssStyle.backgroundFromColor + ');\n';
                    }
                    if (useMS) {
                        stringToPrint = stringToPrint + 'background-image: -ms-linear-gradient(left, ' + cssStyle.backgroundToColor + ', ' + cssStyle.backgroundFromColor + ');\n';
                    }
                    if (useO) {
                        stringToPrint = stringToPrint + 'background-image: -o-linear-gradient(left, ' + cssStyle.backgroundToColor + ', ' + cssStyle.backgroundFromColor + ');\n';
                    }
                    if (useOldWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-gradient(linear, left top, right top, from(' + cssStyle.backgroundToColor + '), to(' + cssStyle.backgroundFromColor + '));\n';
                    }
                    if (useWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-linear-gradient(left, ' + cssStyle.backgroundToColor + ', ' + cssStyle.backgroundFromColor + ');\n';
                    }
                    stringToPrint = stringToPrint + 'background-image: linear-gradient(left, ' + cssStyle.backgroundToColor + ', ' + cssStyle.backgroundFromColor + ');\n';
                } else if (cssStyle.backgroundDirection === 't2b') {
                    if (useOldMS) {
                        stringToPrint = stringToPrint + "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '" + cssStyle.backgroundFromColor + "', endColorstr = '" + cssStyle.backgroundToColor + "');\n";
                        if (showComments) {
                            stringToPrint += "/*INNER ELEMENTS MUST NOT BREAK THIS ELEMENTS BOUNDARIES*/\n/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                        stringToPrint += "-ms-filter: \"progid:DXImageTransform.Microsoft.gradient(startColorstr = '" + cssStyle.backgroundFromColor + "', endColorstr = '" + cssStyle.backgroundToColor + "')\";\n";
                        if (showComments) {
                            stringToPrint += "/*Element must have a height (not auto)*/\n/*All filters must be placed together*/\n";
                        }
                    }
                    if (useMoz) {
                        stringToPrint = stringToPrint + 'background-image: -moz-linear-gradient(top, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useMS) {
                        stringToPrint = stringToPrint + 'background-image: -ms-linear-gradient(top, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useO) {
                        stringToPrint = stringToPrint + 'background-image: -o-linear-gradient(top, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    if (useOldWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-gradient(linear, center top, center bottom, from(' + cssStyle.backgroundFromColor + '), to(' + cssStyle.backgroundToColor + '));\n';
                    }
                    if (useWebkit) {
                        stringToPrint = stringToPrint + 'background-image: -webkit-linear-gradient(top, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                    }
                    stringToPrint = stringToPrint + 'background-image: linear-gradient(top, ' + cssStyle.backgroundFromColor + ', ' + cssStyle.backgroundToColor + ');\n';
                }
                if (cssStyle.backgroundDirection !== "") {
                    if (cssStyle.borderRadius[0] !== 0 && cssStyle.borderRadius[1] !== 0 && cssStyle.borderRadius[2] !== 0 && cssStyle.borderRadius[3] !== 0) {
                        if (useOldMoz) {
                            stringToPrint += '-moz-background-clip: padding;\n';
                        }
                        if (useOldWebkit) {
                            stringToPrint += '-webkit-background-clip: padding-box;\n';
                        }
                        stringToPrint += 'background-clip: padding-box;\n';
                        if (showComments) {
                            stringToPrint += '/*Use "background-clip: padding-box" when using rounded corners to avoid the gradient bleeding through the corners*/\n';
                        }
                        if (useOldMS && showComments) {
                            stringToPrint = stringToPrint + "/*--IE9 WILL PLACE THE FILTER ON TOP OF THE ROUNDED CORNERS--*/\n";
                        } else if (useMS && showComments) {
                            stringToPrint = stringToPrint + "/*--IE9 DOES NOT SUPPORT CSS3 GRADIENT BACKGROUNDS--*/\n";
                        }
                    } else {
                        if (useMS && showComments) {
                            stringToPrint = stringToPrint + "/*--IE9 DOES NOT SUPPORT CSS3 GRADIENT BACKGROUNDS--*/\n";
                        }
                    }
                }
                return stringToPrint;
            }

            function showOpacityCode() {
                var stringToPrint = "";
                if (cssStyle.opacity !== 100) {
                    stringToPrint = stringToPrint + 'opacity: ' + (cssStyle.opacity / 100) + ';\n';
                    if (useOldMS) {
                        stringToPrint = stringToPrint + "-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity = " + cssStyle.opacity + ");\n";
                        if (showComments) {
                            stringToPrint += "/*-ms-filter must come before filter*/\n";
                        }
                        stringToPrint += "filter: alpha(opacity = " + cssStyle.opacity + ");\n";
                        if (showComments) {
                            stringToPrint += "/*INNER ELEMENTS MUST NOT BREAK THIS ELEMENTS BOUNDARIES*/\n/*All filters must be placed together*/\n";
                        }
                    }
                }
                return stringToPrint;
            }

            function showBasics() {
                var stringToPrint = "";
                if (document.getElementById('defaultPanelContent').style.display === 'block') {
                    stringToPrint += "background-color: " + cssStyle.backgroundColor + ";\n";
                    //if (cssStyle.borderWidth > 0) {
                    stringToPrint += "border: " + cssStyle.borderWidth + "px solid " + cssStyle.borderColor + ";\n";
                    //}
                }
                return stringToPrint;
            }

            function setCodeCheckBoxes(checkBoxCode) {
                checkBoxCode = Number(checkBoxCode);
                //console.log(checkBoxCode.toString(2));
                if (checkBoxCode & 1) {
                    document.getElementById("oldMSCheck").checked = "checked";
                } else if (!!document.getElementById("oldMSCheck").getAttribute("checked")) {
                    document.getElementById("oldMSCheck").checked = false;
                    document.getElementById("oldMSCheck").removeAttribute("checked");
                } else {
                    document.getElementById("oldMSCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("oldMozCheck").checked = "checked";
                } else if (!!document.getElementById("oldMozCheck").getAttribute("checked")) {
                    document.getElementById("oldMozCheck").checked = false;
                    document.getElementById("oldMozCheck").removeAttribute("checked");
                } else {
                    document.getElementById("oldMozCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("oldWebkitCheck").checked = "checked";
                } else if (!!document.getElementById("oldWebkitCheck").getAttribute("checked")) {
                    document.getElementById("oldWebkitCheck").checked = false;
                    document.getElementById("oldWebkitCheck").removeAttribute("checked");
                } else {
                    document.getElementById("oldWebkitCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("commentsCheck").checked = "checked";
                } else if (!!document.getElementById("commentsCheck").getAttribute("checked")) {
                    document.getElementById("commentsCheck").checked = false;
                    document.getElementById("commentsCheck").removeAttribute("checked");
                } else {
                    document.getElementById("commentsCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("msCheck").checked = "checked";
                } else if (!!document.getElementById("msCheck").getAttribute("checked")) {
                    document.getElementById("msCheck").checked = false;
                    document.getElementById("msCheck").removeAttribute("checked");
                } else {
                    document.getElementById("msCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("mozCheck").checked = "checked";
                } else if (!!document.getElementById("mozCheck").getAttribute("checked")) {
                    document.getElementById("mozCheck").checked = false;
                    document.getElementById("mozCheck").removeAttribute("checked");
                } else {
                    document.getElementById("mozCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("operaCheck").checked = "checked";
                } else if (!!document.getElementById("operaCheck").getAttribute("checked")) {
                    document.getElementById("operaCheck").checked = false;
                    document.getElementById("operaCheck").removeAttribute("checked");
                } else {
                    document.getElementById("operaCheck").checked = false;
                }
                checkBoxCode = checkBoxCode >> 1;
                if (checkBoxCode & 1) {
                    document.getElementById("webkitCheck").checked = "checked";
                } else if (!!document.getElementById("webkitCheck").getAttribute("checked")) {
                    document.getElementById("webkitCheck").checked = false;
                    document.getElementById("webkitCheck").removeAttribute("checked");
                } else {
                    document.getElementById("webkitCheck").checked = false;
                }
            }

            function ob_css3_slide_init() {
                if (document.getElementById("brSlider"))
                    sliderBR = new SliderObj({'id': 'brSlider', 'thumbId': 'brThumb', 'max': '80', 'min': '-10', 'startPos': '0%'});
                if (document.getElementById("bsSlider"))
                    sliderBS = new SliderObj({'id': 'bsSlider', 'thumbId': 'bsThumb', 'max': '80', 'min': '-10', 'startPos': '0%'});
                if (document.getElementById("oSlider"))
                    sliderO = new SliderObj({'id': 'oSlider', 'thumbId': 'oThumb', 'max': '80', 'min': '-10', 'startPos': '100%'});
                if (document.getElementById("fsSlider"))
                    sliderFs = new SliderObj({'id': 'fsSlider', 'thumbId': 'fsThumb', 'max': '80', 'min': '-10', 'startPos': '100%'});
                useOldMoz = true;
                useOldMS = false;
                useOldWebkit = true;
                useMoz = true;
                useMS = true;
                useO = true;
                useWebkit = true;
                showComments = false;
                //boxStyle = document.getElementById(currentObjNameSelected).style;
                cssStyle = {
                    backgroundColor: "#ffffff",
                    backgroundDirection: "",//top, right, bottom, left
                    backgroundFromColor: "#ffffff",
                    backgroundToColor: "#000000",
                    borderColor: "#999999",
                    borderRadius: [0, 0, 0, 0],//[[0, 0], [0, 0], [0, 0], [0, 0]];
                    borderWidth: 4,
                    boxShadow: [0, 0, 0, 0, false],//H, V, V, S, I
                    boxShadowColor: "#000000",
                    opacity: 100,//0 - 100
                    rotation: 0
                };

                if (document.getElementById("brSlider"))
                    sliderBR.createSnapToEveryPercent(2);
                if (document.getElementById("bsSlider"))
                    sliderBS.createSnapToEveryPercent(5);
                if (document.getElementById("oSlider"))
                    sliderO.createSnapToEveryPercent(1);
                if (document.getElementById("fsSlider"))
                    sliderFs.createSnapToEveryPercent(1);
                if (document.getElementById("brSlider"))
                    sliderBR.extStartFunc = function () {
                        updateBorderRadius(Math.round(sliderBR.posPxToPerc()));
                    };
                if (document.getElementById("bsSlider"))
                    sliderBS.extStartFunc = function () {
                        updateBoxShadow(Math.round(sliderBS.posPxToPerc()));
                    };
                if (document.getElementById("oSlider"))
                    sliderO.extStartFunc = function () {
                        updateOpacity(sliderO.posPxToPerc());
                    };
                if (document.getElementById("fsSlider"))
                    sliderFs.extStartFunc = function () {
                        updateFontSize(sliderFs.posPxToPerc());
                    };
                if (document.getElementById("brSlider"))
                    sliderBR.extMoveFunc = function (e) {
                        sliderBR.extStartFunc(e);
                    };
                if (document.getElementById("bsSlider"))
                    sliderBS.extMoveFunc = function (e) {
                        sliderBS.extStartFunc(e);
                    };
                if (document.getElementById("oSlider"))
                    sliderO.extMoveFunc = function (e) {
                        sliderO.extStartFunc(e);
                    };
                if (document.getElementById("fsSlider"))
                    sliderFs.extMoveFunc = function (e) {
                        sliderFs.extStartFunc(e);
                    };
                if (document.getElementById("brSlider"))
                    sliderBR.extEndFunc = function (e) {
                        sliderBR.extStartFunc(e);
                    };
                if (document.getElementById("bsSlider"))
                    sliderBS.extEndFunc = function (e) {
                        sliderBS.extStartFunc(e);
                    };
                if (document.getElementById("oSlider"))
                    sliderO.extEndFunc = function (e) {
                        sliderO.extStartFunc(e);
                    };
                if (document.getElementById("brSlider"))
                    sliderBR.extClickFunc = function (e) {
                        sliderBR.extStartFunc(e);
                    };
                if (document.getElementById("bsSlider"))
                    sliderBS.extClickFunc = function (e) {
                        sliderBS.extStartFunc(e);
                    };
                if (document.getElementById("oSlider"))
                    sliderO.extClickFunc = function (e) {
                        sliderO.extStartFunc(e);
                    };
                if (document.getElementById("fsSlider"))
                    sliderFs.extClickFunc = function (e) {
                        sliderFs.extStartFunc(e);
                    };
                if (document.getElementById("brSlider"))
                    sliderBR.extStartFunc(sliderBR);
                if (document.getElementById("bsSlider"))
                    sliderBS.extStartFunc(document.getElementById(sliderBS.id));
                if (document.getElementById("oSlider"))
                    sliderO.extStartFunc(document.getElementById(sliderO.id));
                if (document.getElementById("fsSlider"))
                    sliderFs.extStartFunc(document.getElementById(sliderFs.id));
                return {
                    'sliderBR': sliderBR,
                    'sliderBS': sliderBS,
                    'sliderO': sliderO,
                    'sliderFs': sliderFs,
                    'useOldMoz': useOldMoz,
                    'useOldMS': useOldMS,
                    'useOldWebkit': useOldWebkit,
                    'useMoz': useMoz,
                    'useMS': useMS,
                    'useO': useO,
                    'useWebkit': useWebkit,
                    'showComments': showComments,
                    'initAll': initAll,
                    'initBasics': initBasics,
                    'setBasics': setBasics,
                    'initBorderRadius': initBorderRadius,
                    'updateBorderRadius': updateBorderRadius,
                    'setBorderRadii': setBorderRadii,
                    /*'getIEDirection' : getIEDirection*/
                    'initBoxShadow': initBoxShadow,
                    'updateBoxShadow': updateBoxShadow,
                    'setBoxShadow': setBoxShadow,
                    'initGradient': initGradient,
                    'updateGradient': updateGradient,
                    'setGradient': setGradient,
                    'bgRadioChecked': bgRadioChecked,
                    'ftRadioChecked': ftRadioChecked,
                    'initOpacity': initOpacity,
                    'updateOpacity': updateOpacity,
                    'setOpacity': setOpacity,
                    'initFontSize': initFontSize,
                    'updateFontSize': updateFontSize,
                    'setFontSize': setFontSize,
                    'centerModal': centerModal
                };
            }

            return ob_css3_slide_init();
        }
        ;
var CSS3ME = new PFunkGen();

function openbexi_collapse_tree_CSSBrowser(event) {
    clearTimeout(_ob_goSyncSlide);
    clearTimeout(_ob_goSlide);
    document.getElementById("ob_slide_div0").style.visibility = "hidden";
    document.getElementById("ob_slide_div1").style.visibility = "hidden";
    document.getElementById("ob_slide_div2").style.visibility = "hidden";
    document.getElementById("ob_slide_div3").style.visibility = "hidden";
    document.getElementById("ob_slide_div4").style.visibility = "hidden";
    document.getElementById("ob_slide_div5").style.visibility = "hidden";
    document.getElementById("ob_slide_div6").style.visibility = "hidden";
    document.getElementById("ob_slide_div7").style.visibility = "hidden";
    if (dijit.byId("tree_CSSBrowser") != null)
        dijit.byId("tree_CSSBrowser").collapseAll();
}
var _ob_goSyncSlide;
function openbexi_sync_slide(event, container, slide, frame) {
    document.getElementById(slide).style.visibility = "visible";
    _ob_goSyncSlide = setTimeout(function () {
        openbexi_sync_slide(event, container, slide, frame);
        clearTimeout(_ob_goSyncSlide);
    }, 500);
    var pos = document.getElementById(frame).getBoundingClientRect();
    if (pos.top != 0 && pos.left != 0) {
        document.getElementById(slide).style.top = pos.top + $ob_jquery(document).scrollTop().valueOf() + "px";
        document.getElementById(slide).style.left = pos.left + "px";
    }
}
var _ob_goSlide;
function openbexi_display_css3(event, container, slide, frame) {
    try {
        if (document.getElementById(container) != null) {
            if (container == "ob_slide_bg0")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:80px" ></div>';
            else if (container == "ob_slide_bg2")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:130px" ></div>';
            else if (container == "ob_slide_bg3")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:175px" ></div>';
            else if (container == "ob_slide_bg4")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:50px" ></div>';
            else if (container == "ob_slide_bg5")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:60px" ></div>';
            else if (container == "ob_slide_bg6")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:70px" ></div>';
            else if (container == "ob_slide_bg7")
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:40px" ></div>';
            else
                document.getElementById(container).innerHTML = '<div id=' + frame + ' style="width:170px;height:110px" ></div>';
        }
        _ob_goSlide = setTimeout(function () {
            openbexi_display_css3(event, container, slide, frame);
        }, 20);
        if (dijit.byId("tree_CSSBrowser").attr("selectedItem") != null) {
            var pos = document.getElementById(frame).getBoundingClientRect();
            //var nodes = dijit.byId("tree_CSSBrowser").getNodesByItem(dijit.byId("tree_CSSBrowser").attr("selectedItem"));
            if (document.getElementById(container).innerHTML != null && pos.top != 0 && pos.left != 0) {
                document.getElementById(slide).style.visibility = "visible";
                pos = document.getElementById(frame).getBoundingClientRect();
                document.getElementById(slide).style.top = pos.top + $ob_jquery(document).scrollTop().valueOf() + "px";
                document.getElementById(slide).style.left = pos.left + "px";
                openbexi_sync_slide(event, container, slide, frame);
                clearTimeout(_ob_goSlide);
            }
        }
        CSS3ME.initAll();
    } catch (e) {
        __openbexi_debugC("openbexi_display_css3()", "Exception:" + e.message);
    }
}
function ob_changeInputValue(e, elmToChange, minNum, maxNum) {
    try {
        var currNumber = Number(elmToChange.value);
        if (e.keyCode === 38) {
            elmToChange.value = Math.min(currNumber + 1, maxNum);
        } else if (e.keyCode === 40) {
            elmToChange.value = Math.max(currNumber - 1, minNum);
        } else if (e.keyCode === 33) {
            elmToChange.value = Math.min(currNumber + 10, maxNum);
        } else if (e.keyCode === 34) {
            elmToChange.value = Math.max(currNumber - 10, minNum);
        }
    } catch (e) {
        __openbexi_debugC("ob_changeInputValue()", "Exception:" + e.message);
    }
}