import { MIN_TEMPO, AnimationName, AnimationPlayState, MetronomeState } from "./sm-globals";

class ScheduledMetronome {
    private _tempo: number = 120;
    private pendulumElement: HTMLDivElement = $(".pendulum-parent")[0] as HTMLDivElement;
    private tempoDisplayElement: HTMLElement = $(".display")[0] as HTMLElement

    public state: MetronomeState = MetronomeState.Stopped;

    public get tempo(): number { return this._tempo; }
    public set tempo(value: number) {
        this._tempo = value;

        if (this._tempo < MIN_TEMPO) {
            this.isRunning = false;
        }
        else {
            this.duration = (Math.round(60000 / this._tempo)).toString() + "ms";
        }

        this.tempoDisplayElement.innerHTML = this.tempoDisplay;
    }

    public get tempoDisplay() {
        return (this._tempo >= 0) ? this._tempo.toString() : "";
    }

    private _isRunning: boolean = false;
    public get isRunning(): boolean { return this._isRunning; }
    public set isRunning(value: boolean) {
        if (value !== this._isRunning) {
            this._isRunning = value;
            if (this.tempo < MIN_TEMPO) { this._isRunning = false; }
            this.setAnimation();
        }
    }

    private setAnimation() {
        if (this.isRunning) { this._animationName = AnimationName.starting; }
    }

    private _animationName: AnimationName = AnimationName.starting;
    public get animationName(): AnimationName { return this._animationName; }
    public set animationName(value: AnimationName) {
        if (value !== this._animationName) {
            this._animationName = value;
        }
    }

    private _duration: string = "0s";
    public get duration(): string { return this._duration; }
    public set duration(value: string) {
        if (value !== this._duration) {
            this._duration = value;
        }
    }

    private _animationPlayState: AnimationPlayState = AnimationPlayState.paused;
    public get animationPlayState(): AnimationPlayState { return this._animationPlayState; }
    public set animationPlayState(value: AnimationPlayState) {
        if (value !== this._animationPlayState) {
            this._animationPlayState = value;
        }
    }

    private _animationDirection: string = "alternate";
    public get animationDirection(): string { return this._animationDirection; }
    public set animationDirection(value: string) {
        if (value !== this._animationDirection) {
            this._animationDirection = value;
        }
    }

    public setStyle() {
        this.pendulumElement.style.animationDuration = this.duration;
        this.pendulumElement.style.animationDirection = this.animationDirection;
        this.pendulumElement.style.animationName = AnimationName[this.animationName];
        this.pendulumElement.style.animationPlayState = AnimationPlayState[this.animationPlayState];
        //console.log(this.pendulumElement.style);
    }
}

export { ScheduledMetronome };
