abstract class KeyStrokeTemplate {
    w: Boolean;
    a: Boolean;
    s: Boolean;
    d: Boolean;
    space: Boolean;

    keyDown: Boolean;

    keyDownEvent: CustomEvent;

    abstract pressKey(key: string): void;
    abstract releaseKey(key: string): void;
    abstract listenKeyPush(event: string, func: Function): void;
};

export { KeyStrokeTemplate };