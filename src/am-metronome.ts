import { MetronomeState } from "./sm-globals";
class AcceleratingMetronome {
    public static MIN_TEMPO: number = 20;
    public static MAX_TEMPO: number = 240;

    private _tempo: number = 120;
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
}

export { AcceleratingMetronome };