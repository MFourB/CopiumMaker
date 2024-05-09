"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyStroke = void 0;
var KeyStroke = /** @class */ (function () {
    function KeyStroke() {
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.space = false;
        this.top = 0;
        this.left = 0;
        this.keyDown = false;
        this.keyDownEvent = new CustomEvent("keyStrokeDown");
        this.keyUpEvent = new CustomEvent("keyStrokeUp");
    }
    KeyStroke.prototype.pressKey = function (key) {
        switch (key) {
            case "w":
                if (this.w)
                    return;
                this.w = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("w", key);
                break;
            case "a":
                if (this.a)
                    return;
                this.a = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("a", key);
                break;
            case "s":
                if (this.s)
                    return;
                this.s = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("s", key);
                break;
            case "d":
                if (this.d)
                    return;
                this.d = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("d", key);
                break;
        }
        // console.log("A key was pressed!");
    };
    ;
    KeyStroke.prototype.releaseKey = function (key) {
        switch (key) {
            case "w":
                if (!this.w)
                    return;
                this.w = false;
                //console.log("w", key);
                break;
            case "a":
                if (!this.a)
                    return;
                this.a = false;
                //console.log("a", key);
                break;
            case "s":
                if (!this.s)
                    return;
                this.s = false;
                //console.log("s", key);
                break;
            case "d":
                if (!this.d)
                    return;
                this.d = false;
                //console.log("d", key);
                break;
        }
        if (!this.isKeyPressed()) {
            dispatchEvent(this.keyUpEvent);
            this.keyDown = false;
        }
        //console.log("A key was released!");
    };
    ;
    KeyStroke.prototype.isKeyPressed = function () {
        return this.w || this.a || this.s || this.d || this.space;
    };
    ;
    KeyStroke.prototype.listenKeyPush = function (event, func) {
        addEventListener(event, function () { return func(); });
    };
    KeyStroke.prototype.listenKeyRelease = function (event, func) {
        addEventListener(event, function () { return func(); });
    };
    return KeyStroke;
}());
exports.KeyStroke = KeyStroke;
