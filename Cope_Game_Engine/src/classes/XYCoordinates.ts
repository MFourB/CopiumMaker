class XYCoordinates {
    _x: number;
    _y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x?: number, y?: number) {
        this._x = x ?? 0;
        this._y = y ?? 0;
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }

    set x(value: number) {
        this._x = value;
    }
    set y(value: number) {
        this._y = value;
    }
}

export { XYCoordinates };