"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
var XYCoordinates_1 = require("./XYCoordinates");
var KeyStroke_1 = require("./KeyStroke");
var Employee = /** @class */ (function () {
    function Employee(name, position, keyStroke) {
        this._name = name !== null && name !== void 0 ? name : "";
        this._position = position !== null && position !== void 0 ? position : new XYCoordinates_1.XYCoordinates(0, 0);
        this._keyStroke = keyStroke !== null && keyStroke !== void 0 ? keyStroke : new KeyStroke_1.KeyStroke();
        this._intervalId = undefined;
        this._id = Employee.id++;
    }
    Object.defineProperty(Employee.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "keyStroke", {
        get: function () {
            return this._keyStroke;
        },
        set: function (value) {
            this._keyStroke = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "intervalId", {
        get: function () {
            return this._intervalId;
        },
        set: function (value) {
            this._intervalId = value;
        },
        enumerable: false,
        configurable: true
    });
    Employee.id = 0;
    return Employee;
}());
exports.Employee = Employee;
