"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XYCoordinates = void 0;
var XYCoordinates = /** @class */ (function () {
    function XYCoordinates(x, y, id) {
        this._x = x !== null && x !== void 0 ? x : 0;
        this._y = y !== null && y !== void 0 ? y : 0;
        this._id = id !== null && id !== void 0 ? id : 0;
    }
    Object.defineProperty(XYCoordinates.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XYCoordinates.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XYCoordinates.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    return XYCoordinates;
}());
exports.XYCoordinates = XYCoordinates;
