import { AnimationName, AnimationPlayState, ui, MetronomeState } from "./scheduled-metronome-globals";

class MiniMetronome {
    public static MIN_TEMPO: number = 20;
    public static MAX_TEMPO: number = 240;

    private _tempo: number = 120;
    public get tempo(): number { return this._tempo; }
    public set tempo(value: number) {
        this._tempo = value;

        if (this._tempo < MiniMetronome.MIN_TEMPO) {
            this.isRunning = false;
        }
        else {
            this.duration = (Math.round(60000 / this._tempo)).toString() + "ms";
        }

        ui.tempoDisplay = this.tempoDisplay;
    }

    public get tempoDisplay() {
        return (this._tempo >= 0) ? this._tempo.toString() : "";
    }

    private _isRunning: boolean = false;
    public get isRunning(): boolean { return this._isRunning; }
    public set isRunning(value: boolean) {
        if (value !== this._isRunning) {
            this._isRunning = value;
            if (this.tempo < MiniMetronome.MIN_TEMPO) { this._isRunning = false; }
            this.setAnimation();
        }
    }

    private setAnimation() {
        if (this.isRunning) { this._animationName = AnimationName.starting; }
        this.setStyle();
    }

    private _animationName: AnimationName = AnimationName.starting;
    public get animationName(): AnimationName { return this._animationName; }
    public set animationName(value: AnimationName) {
        if (value !== this._animationName) {
            this._animationName = value;
            this.setStyle();
        }
    }

    private _duration: string = "0s";
    public get duration(): string { return this._duration; }
    public set duration(value: string) {
        if (value !== this._duration) {
            this._duration = value;
            this.setStyle();
        }
    }

    private _animationPlayState: AnimationPlayState = AnimationPlayState.paused;
    public get animationPlayState(): AnimationPlayState { return this._animationPlayState; }
    public set animationPlayState(value: AnimationPlayState) {
        if (value !== this._animationPlayState) {
            this._animationPlayState = value;
            this.setStyle();
        }
    }

    private _animationDirection: string = "normal";
    public get animationDirection(): string { return this._animationDirection; }
    public set animationDirection(value: string) {
        if (value !== this._animationDirection) {
            this._animationDirection = value;
            this.setStyle();
        }
    }

    public setStyle() {
        ui.metronomeStyle = `animation-name: ${AnimationName[this.animationName]}; animation-duration: ${this.duration}; animation-play-state: ${AnimationPlayState[this.animationPlayState]}; animation-direction: ${this.animationDirection};`;
    }
}

export { MiniMetronome };
