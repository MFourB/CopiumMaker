class KeyStroke {
    w: Boolean = false;
    a: Boolean = false;
    s: Boolean = false;
    d: Boolean = false;
    space: Boolean = false;

    top: number = 0;
    left: number = 0;

    keyDown: Boolean = false;

    keyDownEvent: CustomEvent = new CustomEvent("keyStrokeDown");
    keyUpEvent: CustomEvent = new CustomEvent("keyStrokeUp");

    pressKey(key: string): void {
        switch(key) {
            case "w":
                if (this.w) return;

                this.w = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("w", key);
                break;
            case "a":
                if (this.a) return;

                this.a = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("a", key);
                break;
            case "s":
                if (this.s) return;

                this.s = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("s", key);
                break;
            case "d":
                if (this.d) return;

                this.d = true;
                dispatchEvent(this.keyDownEvent);
                // console.log("d", key);
                break;
        }

        // console.log("A key was pressed!");
    };

    releaseKey(key: string): void {
        switch(key) {
            case "w":
                if (!this.w) return;

                this.w = false;
                //console.log("w", key);
                break;
            case "a":
                if (!this.a) return;

                this.a = false;
                //console.log("a", key);
                break;
            case "s":
                if (!this.s) return;

                this.s = false;
                //console.log("s", key);
                break;
            case "d":
                if (!this.d) return;

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

    isKeyPressed(): Boolean {
        return this.w || this.a || this.s || this.d || this.space;
    };

    listenKeyPush(event: string, func: Function): void {
        addEventListener(event, () => func());
    }
    listenKeyRelease(event: string, func: Function): void {
        addEventListener(event, () => func());
    }
}

export { KeyStroke };