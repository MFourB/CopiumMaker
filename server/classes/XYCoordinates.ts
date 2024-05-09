class XYCoordinates {
    _id: number;

    _x: number;
    _y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(x: number, y: number, id: number);
    constructor(x?: number, y?: number, id?: number) {
        this._x = x ?? 0;
        this._y = y ?? 0;
        this._id = id ?? 0;
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }
    get id(): number {
        return this._id;
    }

    set x(value: number) {
        this._x = value;
    }
    set y(value: number) {
        this._y = value;
    }
    set id(value: number) {
        this._id = value;
    }
}

export { XYCoordinates };