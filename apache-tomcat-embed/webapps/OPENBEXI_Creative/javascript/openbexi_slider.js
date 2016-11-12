function SliderObj(objParams) {
    'use strict';
    var self = this;
    if (typeof objParams.thumbId === 'undefined') {
        return false;
    }
    this.thumbId = objParams.thumbId;
    this.id = typeof objParams.id === 'undefined' ? '' : objParams.id;
    this.thumb = false;
    this.thumb = document.getElementById(this.thumbId);
    this.slider = false;
    this.slider = this.thumb.parentNode;
    if (this.id) {
        this.slider = document.getElementById(this.id);
    }
    this.vert = typeof objParams.vert === 'undefined' ? false : objParams.vert;
    this.sliderWorH = this.vert ? this.slider.offsetHeight : this.slider.offsetWidth;
    this.thumbWorH = this.vert ? this.thumb.offsetHeight : this.thumb.offsetWidth;
    this.SLIDER_MAX = typeof objParams.max === 'undefined' ? this.sliderWorH - this.thumbWorH : objParams.max;
    if (isNaN(this.SLIDER_MAX)) {
        if (this.SLIDER_MAX.indexOf('%') === this.SLIDER_MAX.length - 1 && !isNaN(this.SLIDER_MAX.substring(0, this.SLIDER_MAX.length - 1))) {
            this.SLIDER_MAX = Number(Math.round((Number(this.SLIDER_MAX.substring(0, this.SLIDER_MAX.length - 1)) / 100) * (this.sliderWorH - this.thumbWorH)));
        } else {
            this.SLIDER_MAX = this.sliderWorH - this.thumbWorH;
        }
    } else {
        this.SLIDER_MAX = Number(this.SLIDER_MAX);
    }
    this.SLIDER_MIN = typeof objParams.min === 'undefined' ? 0 : objParams.min;
    if (isNaN(this.SLIDER_MIN)) {
        if (this.SLIDER_MIN.indexOf('%') === this.SLIDER_MIN.length - 1 && !isNaN(this.SLIDER_MIN.substring(0, this.SLIDER_MIN.length - 1))) {
            this.SLIDER_MIN = Math.round((Number(this.SLIDER_MIN.substring(0, this.SLIDER_MIN.length - 1)) / 100) * (this.sliderWorH - this.thumbWorH));
        } else {
            this.SLIDER_MIN = 0;
        }
    } else {
        this.SLIDER_MIN = Number(this.SLIDER_MIN);
    }
    this.startPos = typeof objParams.startPos === 'undefined' ? this.SLIDER_MIN : objParams.startPos;
    if (isNaN(this.startPos)) {
        if (this.startPos.indexOf('%') === this.startPos.length - 1 && !isNaN(this.startPos.substring(0, this.startPos.length - 1))) {
            this.startPos = Math.round((Number(this.startPos.substring(0, this.startPos.length - 1)) / 100) * (this.SLIDER_MAX - this.SLIDER_MIN) + this.SLIDER_MIN);
        } else {
            this.startPos = this.SLIDER_MIN;
        }
    }
    this.thumbOnly = typeof objParams.thumbOnly === 'undefined' ? false : objParams.thumbOnly;
    this.listOfSnapTos = typeof objParams.listOfSnapTos === 'undefined' ? [] : objParams.listOfSnapTos;
    this.currPos = this.startPos;
    this.mouseStart = 0;
    this.isMoving = false;
    this.styleAttr = (this.vert ? 'top' : 'left');
    this.clientAttr = (this.vert ? 'clientY' : 'clientX');
    this.thumb.style[this.styleAttr] = this.currPos + 'px';
    this.animClick = typeof objParams.animClick === 'undefined' ? false : objParams.animClick;
    this.animTime = typeof objParams.animTime === 'undefined' ? 1000 : objParams.animTime;
    this.isAnim = false;
    this.animFunc = false;
    this.animStartTime = 0;
    this.startAnimPos = 0;
    this.endAnimPos = 0;
    this.timeDiff = 0;
    this.extStartFunc = function () {
        return false;
    };
    this.extMoveFunc = function () {
        return false;
    };
    this.extEndFunc = function () {
        return false;
    };
    this.extClickFunc = function () {
        return false;
    };
    this.extInitFunc = function () {
        return false;
    };
    this.createSnapToEveryPercent = function (newPercent, useMin, useMax) {
        var x = 0;
        if (isNaN(newPercent) || newPercent < 0 || newPercent > 100) {
            return false;
        }
        if (typeof useMin === 'undefined') {
            useMin = true;
        }
        if (typeof useMax === 'undefined') {
            useMax = true;
        }
        self.listOfSnapTos = [];
        if (useMin) {
            self.listOfSnapTos.push(self.SLIDER_MIN);
        }
        for (x = newPercent; x < 100; x = x + newPercent) {
            self.listOfSnapTos.push(x + "%");
        }
        if (useMax) {
            self.listOfSnapTos.push(self.SLIDER_MAX);
        }
        self.organizeSnaps();
    };
    this.organizeSnaps = function () {
        var snapIndex = 0, temp = [], i = 0;
        for (snapIndex = 0; snapIndex < self.listOfSnapTos.length; snapIndex += 1) {
            if (isNaN(self.listOfSnapTos[snapIndex])) {
                if (self.listOfSnapTos[snapIndex].indexOf('%') === self.listOfSnapTos[snapIndex].length - 1 && !isNaN(self.listOfSnapTos[snapIndex].substring(0, self.listOfSnapTos[snapIndex].length - 1))) {
                    self.listOfSnapTos[snapIndex] = Math.round((Number(self.listOfSnapTos[snapIndex].substring(0, self.listOfSnapTos[snapIndex].length - 1)) / 100) * (self.SLIDER_MAX - self.SLIDER_MIN) + self.SLIDER_MIN);
                } else {
                    self.listOfSnapTos[snapIndex] = 0;
                }
            }
        }
        self.listOfSnapTos.sort(function (a, b) {
            return a - b;
        });
        for (i = 0; i < self.listOfSnapTos.length; i += 1) {
            if (i === 0 || temp[i - 1] !== self.listOfSnapTos[i]) {
                temp.push(self.listOfSnapTos[i]);
            }
        }
        self.listOfSnapTos = temp;
    };
    this.startSlide = function (e) {
        var elm;
        if (!e) {
            e = event;
        }
        if (e.target) {
            elm = e.target;
        } else if (e.srcElement) {
            elm = e.srcElement;
        }
        if (elm.nodeType === 3) {
            elm = elm.parentNode;
        }
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        e.cancelBubble = true;
        self.mouseStart = e[self.clientAttr];
        self.startPos = self.currPos;
        self.isMoving = true;
        self.extStartFunc(e);
        document.body.style.userSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.khtmlUserSelect = 'none';
        document.body.onselectstart = function () {
            return false;
        };
        return true;
    };
    this.moveSlide = function (e) {
        var elm;
        if (!self.isMoving) {
            return false;
        }
        if (!e) {
            e = event;
        }
        if (e.target) {
            elm = e.target;
        } else if (e.srcElement) {
            elm = e.srcElement;
        }
        if (elm.nodeType === 3) {
            elm = elm.parentNode;
        }
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        e.cancelBubble = true;
        self.moveThumb(self.startPos + (e[self.clientAttr] - self.mouseStart), true);
        self.extMoveFunc(e);
        return true;
    };
    this.endSlide = function (e) {
        if (!self.isMoving) {
            return false;
        }
        if (!e) {
            e = event;
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        self.moveThumb(self.startPos + (e[self.clientAttr] - self.mouseStart));
        self.isMoving = false;
        self.extEndFunc(e);
        document.body.style.userSelect = 'normal';
        document.body.style.mozUserSelect = 'normal';
        document.body.style.khtmlUserSelect = 'normal';
        document.body.onselectstart = function () {
            return true;
        };
        return true;
    };
    this.thumbClick = function (e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
        return false;
    };
    this.slideClick = function (e) {
        var startPoint = 0, tempElm = self.slider;
        if (!e) {
            e = event;
        }
        while (tempElm !== tempElm.offsetParent) {
            if (isNaN(self.vert ? tempElm.offsetTop : tempElm.offsetLeft)) {
                break;
            }
            startPoint += self.vert ? tempElm.offsetTop : tempElm.offsetLeft;
            if (!tempElm.offsetParent) {
                break;
            }
            tempElm = tempElm.offsetParent;
        }
        if (self.animClick) {
            if (self.isAnim) {
                return false;
            } else {
                document.getElementById('IEOnOff').style.cursor = 'wait';
                self.startAnimPos = self.currPos;
                self.endAnimPos = self.SLIDER_MIN + e[self.clientAttr] - startPoint - (self.thumbWorH / 2);
                if (self.endAnimPos > self.SLIDER_MAX) {
                    self.endAnimPos = self.SLIDER_MAX;
                }
                if (self.endAnimPos < self.SLIDER_MIN) {
                    self.endAnimPos = self.SLIDER_MIN;
                }
                self.endAnimPos = self.getSnapTo(self.endAnimPos);
                self.animStartTime = new Date().getTime();
                self.animThumb();
            }
        } else {
            self.currPos = e[self.clientAttr] - startPoint - (self.thumbWorH / 2);
            if (self.currPos > self.SLIDER_MAX) {
                self.currPos = self.SLIDER_MAX;
            } else if (self.currPos < self.SLIDER_MIN) {
                self.currPos = self.SLIDER_MIN;
            }
            self.currPos = self.getSnapTo(self.currPos);
            self.thumb.style[self.styleAttr] = self.currPos + 'px';
            self.extClickFunc(e);
        }
    };
    this.animThumb = function () {
        self.isAnim = true;
        self.timeDiff = new Date().getTime() - self.animStartTime;
        if (self.timeDiff < self.animTime) {
            self.currPos = Math.round((Math.pow((self.timeDiff / self.animTime) - 1, 3) + 1) * (self.endAnimPos - self.startAnimPos)) + self.startAnimPos;
            self.thumb.style[self.styleAttr] = self.currPos + 'px';
            self.extClickFunc();
            if (self.currPos === self.endAnimPos) {
                clearTimeout(self.animFunc);
                self.animFunc = false;
                self.isAnim = false;
                self.startAnimPos = self.endAnimPos;
            } else {
                self.animFunc = setTimeout(function () {
                    self.animThumb();
                });
                return false;
            }
        } else {
            clearTimeout(self.animFunc);
            self.animFunc = false;
            self.thumb.style[self.styleAttr] = self.endAnimPos + 'px';
            self.isAnim = false;
            self.startAnimPos = self.endAnimPos;
            self.extClickFunc();
        }
        document.getElementById('IEOnOff').style.cursor = 'pointer';
        return true;
    };
    this.moveThumb = function (newPos, noSnap) {
        clearTimeout(self.animFunc);
        self.animFunc = false;
        self.isAnim = false;
        self.currPos = newPos;
        if (self.currPos > self.SLIDER_MAX) {
            self.currPos = self.SLIDER_MAX;
        }
        if (self.currPos < self.SLIDER_MIN) {
            self.currPos = self.SLIDER_MIN;
        }
        if (typeof noSnap === 'undefined' || !noSnap) {
            self.currPos = self.getSnapTo(self.currPos);
        }
        self.startAnimPos = self.endAnimPos = self.currPos;
        self.thumb.style[self.styleAttr] = self.currPos + 'px';
    };
    this.getSnapTo = function (newPos) {
        var snapIndex = 0;
        newPos = self.posPercToPx(newPos);
        if (!self.listOfSnapTos.length) {
            return newPos;
        }
        for (snapIndex = 0; snapIndex < self.listOfSnapTos.length - 1; snapIndex += 1) {
            if (newPos < ((self.listOfSnapTos[snapIndex + 1] - self.listOfSnapTos[snapIndex]) / 2) + self.listOfSnapTos[snapIndex]) {
                return self.listOfSnapTos[snapIndex];
            }
        }
        return self.listOfSnapTos[self.listOfSnapTos.length - 1];
    };
    this.posPercToPx = function (newPos) {
        if (typeof newPos === 'undefined') {
            newPos = self.currPos;
        }
        if (isNaN(newPos)) {
            if (String(newPos).indexOf('%') === newPos.length - 1 && !isNaN(newPos.substring(0, newPos.length - 1))) {
                newPos = Math.round((Number(newPos.substring(0, newPos.length - 1)) / 100) * (self.SLIDER_MAX - self.SLIDER_MIN));
            } else {
                newPos = 0;
            }
        }
        return newPos;
    };
    this.posPxToPerc = function (newPos) {
        if (typeof newPos === 'undefined') {
            newPos = self.currPos;
        }
        if (isNaN(newPos)) {
            newPos = 0;
        }
        return Math.round(((newPos - self.SLIDER_MIN) / (self.SLIDER_MAX - self.SLIDER_MIN)) * 100);
    };
    this.initSlider = function () {
        try {
            self.thumb.attachEvent("onmousedown", function (e) {
                self.startSlide(e);
            });
        } catch (e1) {
            self.thumb.addEventListener("mousedown", function (e) {
                self.startSlide(e);
            }, false);
        }
        try {
            document.attachEvent("onmousemove", function (e) {
                self.moveSlide(e);
            });
        } catch (e2) {
            document.addEventListener("mousemove", function (e) {
                self.moveSlide(e);
            }, false);
        }
        try {
            document.attachEvent("onmouseup", function (e) {
                self.endSlide(e);
            });
        } catch (e3) {
            document.addEventListener("mouseup", function (e) {
                self.endSlide(e);
            }, false);
        }
        try {
            self.thumb.attachEvent("onclick", function (e) {
                self.thumbClick(e);
            });
        } catch (e4) {
            self.thumb.addEventListener("click", function (e) {
                self.thumbClick(e);
            }, true);
        }
        if (!self.thumbOnly) {
            try {
                self.slider.attachEvent("onclick", function (e) {
                    self.slideClick(e);
                });
            } catch (e5) {
                self.slider.addEventListener("click", function (e) {
                    self.slideClick(e);
                }, false);
            }
        }
        if (self.listOfSnapTos.length) {
            self.organizeSnaps();
        }
        self.extInitFunc();
    };
    self.initSlider();
}
