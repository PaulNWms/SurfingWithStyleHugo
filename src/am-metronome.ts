import { MetronomeState } from "./sm-globals";
class AcceleratingMetronome {
    public static MIN_TEMPO: number = 20;
    public static MAX_TEMPO: number = 240;

    private _tempo: number = 120;
    private pendulumElement: HTMLDivElement = $(".pendulum-parent")[0] as HTMLDivElement;
    private tempoDisplayElement: HTMLElement = $(".display")[0] as HTMLElement

    public direction: number = 1;
    public state: MetronomeState = MetronomeState.Stopped;

    public get tempo(): number { return this._tempo; }
    public set tempo(value: number) {
        this._tempo = value;

        if (this._tempo < AcceleratingMetronome.MIN_TEMPO) {
            this.isRunning = false;
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
            if (this.tempo < AcceleratingMetronome.MIN_TEMPO) { this._isRunning = false; }
        }
    }

    private _durationMS: number = 500;
    public get durationMS(): number { return this._durationMS; }
    public get durationString(): string { return this._durationMS.toString() + "ms"; }
    public set durationMS(value: number) {
        this._durationMS = value;
    }

    constructor() {
        this.pendulumElement.style.transitionProperty = "all";
        this.pendulumElement.style.transitionTimingFunction = "ease-in-out";
    }

    public setStyle() {
        this.pendulumElement.style.transitionDuration = `${this.durationString}`;
        if (this.isRunning) {
            let degrees = -40 * (2 * this.direction - 1);
            this.pendulumElement.style.transform = `rotate(${degrees}deg)`
        }
        else {
            this.pendulumElement.style.transform = "rotate(0deg)"
        }
        //console.log(this.pendulumElement.style.transform);
    }
}

export { AcceleratingMetronome };