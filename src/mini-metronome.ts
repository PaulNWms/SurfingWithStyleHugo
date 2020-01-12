import moment from "moment";

class MiniMetronome {
    public static MIN_TEMPO: number = 20;
    public static MAX_TEMPO: number = 240;

    private ui;

    constructor(ui) {
        this.ui = ui;
    }

    private _tempo: number = 120;
    public get tempo(): number { return this._tempo; }
    public set tempo(value: number) {
        this._tempo = value;
        this.duration = (Math.round(60000 / this._tempo)).toString() + "ms";
        // Need to change the animation for the duration change to take effect
        this.animation = "starting";
        this.ui.display = this._tempo;
    }

    private _animation: string = "none";
    public get animation(): string { return this._animation; }
    public set animation(value: string) {
        this._animation = value;
        this.setStyle();
    }

    private _duration: string = "500ms";
    public get duration(): string { return this._duration; }
    public set duration(value: string) {
        this._duration = value;
        this.setStyle();
    }

    private _playState: string = "paused";
    public get playState(): string { return this._playState; }
    public set playState(value: string) {
        this._playState = value;
        this.setStyle();
    }

    private _isRunning: boolean = false
    public get isRunning(): boolean { return this._isRunning; }
    public set isRunning(value: boolean) {
        this._isRunning = value;
        if (this.tempo < MiniMetronome.MIN_TEMPO) { this._isRunning = false; }
        this.setAnimation();
    }

    private setAnimation() {
        if (this.isRunning) { this.animation = "starting"; }
        this.setStyle();
    }

    private setStyle() {
        this.ui.style = `animation-name: ${this.animation}; animation-duration: ${this.duration}; animation-play-state: ${this.playState}; animation-direction: alternate;`;
    }
}

export { MiniMetronome };
