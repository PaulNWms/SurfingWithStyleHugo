import $ from "jquery";
import moment from "moment";
import { Action } from "./lib/binding";

class EggTimer {
    public buttonFace: string = "▶️";
    public timeRemaining: moment.Duration = moment.duration(2, "minutes");
    public targetTime: number = moment.now();
    public timerDisplay: string = "2:00";


    private stateHasChanged: Action = () => { };
    private onTimerTick: Action = () => { };
    private onTimerExpired: Action = () => { };
    private timer: ReturnType<typeof setTimeout> = setTimeout(() => { }, moment.now());

    private _isRunning: boolean = false;
    public get isRunning() { return this._isRunning; }
    public set isRunning(value: boolean) {
        this._isRunning = value;

        if (this._isRunning) {
            this.buttonFace = "⏸";
            this.start();
        }
        else {
            this.buttonFace = "▶️";
            clearTimeout(this.timer);
        }
    }

    constructor(stateHasChanged) {
        this.stateHasChanged = stateHasChanged;
    }

    public initialize(onTimerTick: Action, onTimerExpired: Action) {
        this.onTimerTick = onTimerTick;
        this.onTimerExpired = onTimerExpired;
    }

    public roundAndTrimDuration(span: moment.Duration): string {
        const factor: number = 1000;
        let boundedTicks: number = Math.max(span.asMilliseconds(), 0);
        let roundedTicks: number = Math.round(boundedTicks / factor) * factor;
        let roundedTimeSpan: moment.Duration = moment.duration(roundedTicks, "ms");
        let str: string = moment.utc(roundedTimeSpan.asMilliseconds()).format("HH:mm:ss");
        let i: number = 0;

        for (i = 0; i < str.length - 4; i++) {
            if (str[i] != '0' && str[i] != ':')
                break;
        }

        return str.substring(i);
    }

    private start() {
        this.targetTime = moment.now() + this.timeRemaining.asMilliseconds();
        this.uncolorBody();
        this.timerDisplay = this.roundAndTrimDuration(this.timeRemaining);
        this.timer = setTimeout(this.onTimer, this.targetTime);
    }

    public colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

    private uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

    public onTimer() {
        this.timeRemaining = moment.duration(this.targetTime - moment.now(), "ms");
        this.timerDisplay = this.roundAndTrimDuration(this.timeRemaining);
        document.title = this.timerDisplay;
        this.onTimerTick();

        if (this.timerDisplay == "0:00") {
            this.timerExpired();
        }

        this.stateHasChanged();
    }

    public timerExpired() {
        this.targetTime = moment.now();
        clearTimeout(this.timer);
        this.onTimerExpired();
    }
}

export { EggTimer };