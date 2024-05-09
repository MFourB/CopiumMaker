import { XYCoordinates } from './XYCoordinates';
import { KeyStroke } from './KeyStroke';

class Employee {
    static id = 0;

    _id: number;
    _name: string;
    _keyStroke: KeyStroke;
    _intervalId: NodeJS.Timeout | undefined;

    _position: XYCoordinates;

    constructor();
    constructor(name: string, position: XYCoordinates, keyStroke: KeyStroke);
    constructor(name: string, position: XYCoordinates, keyStroke?: KeyStroke);
    constructor(name?: string, position?: XYCoordinates, keyStroke?: KeyStroke) {
        this._name = name ?? "";
        this._position = position ?? new XYCoordinates(0, 0);
        this._keyStroke = keyStroke ?? new KeyStroke();
        this._intervalId = undefined;
        this._id = Employee.id++;
    }

    get id(): number {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get position(): XYCoordinates {
        return this._position;
    }
    get keyStroke(): KeyStroke {
        return this._keyStroke;
    }
    get intervalId(): NodeJS.Timeout | undefined {
        return this._intervalId;
    }

    set id(value: number) {
        this._id = value;
    }
    set name(value: string) {
        this._name = value;
    }
    set position(value: XYCoordinates) {
        this._position = value;
    }
    set keyStroke(value: KeyStroke) {
        this._keyStroke = value;
    }
    set intervalId(value: NodeJS.Timeout | undefined) {
        this._intervalId = value;
    }
}

export { Employee }   