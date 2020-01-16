import $ from "jquery";
import moment from "moment";
import { Action } from "./lib/binding";
import { ui, onTimer, roundAndTrimDuration } from "./scheduled-metronome-globals";

class EggTimer {
    //public timeRemaining: moment.Duration = moment.duration(2, "minutes");
    //public targetTime: number = moment.now();
    public timerDisplay: string = "";
    private ui;

    public stateHasChanged: Action = () => { console.log("eggTimer: stateHasChanged uninitialized") };
    public onTimerTick: Action = () => { console.log("eggTimer: onTimerTick uninitialized") };
    private onTimerExpired: Action = () => { console.log("eggTimer: onTimerExpired uninitialized") };
    private timer: ReturnType<typeof setInterval> = setInterval(() => { }, 1000000);

    private _isRunning: boolean = false;
    public get isRunning() { return this._isRunning; }
    public set isRunning(value: boolean) {
        this._isRunning = value;

        if (this._isRunning) {
            this.ui.buttonFace = "⏸";
            this.start();
        }
        else {
            this.ui.buttonFace = "▶️";
            clearInterval(this.timer);
        }
    }

    constructor(ui, stateHasChanged) {
        this.ui = ui;
        this.stateHasChanged = stateHasChanged;
    }

    public initialize(onTimerTick: Action, onTimerExpired: Action) {
//        ui.onTimerTick = onTimerTick;
        this.onTimerExpired = onTimerExpired;
    }

    private start() {
        ui.targetTime = moment.now() + ui.timeRemaining.asMilliseconds();
        this.uncolorBody();
        this.ui.timerDisplay = roundAndTrimDuration(ui.timeRemaining);
        this.timer = setInterval(onTimer, 1000);
    }

    public colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

    private uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

    public timerExpired() {
        ui.targetTime = moment.now();
        clearInterval(this.timer);
        this.onTimerExpired();
    }
}

export { EggTimer };