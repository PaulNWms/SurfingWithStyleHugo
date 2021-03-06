﻿import $ from "jquery";
import moment from "moment";
import { Action } from "./lib/binding";
import { ui } from "./scheduled-metronome-globals";

class EggTimer {
    public timeRemaining: moment.Duration = moment.duration(2, "minutes");
    public targetTime: number = moment.now();
    public timerDisplay: string = "2:00";

    public stateHasChanged: Action = () => { };
    public onTimerTick: Action = () => { };
    public onTimerExpired: Action = () => { };
    private timer: ReturnType<typeof setInterval> = setInterval(() => { }, 999999);

    private _isRunning: boolean = false;
    public get isRunning() { return this._isRunning; }
    public set isRunning(value: boolean) {
        this._isRunning = value;

        if (this._isRunning) {
            ui.buttonFace = "⏸";
            this.start();
        }
        else {
            ui.buttonFace = "▶️";
            clearInterval(this.timer);
        }
    }

    public initialize(onTimerTick: Action, onTimerExpired: Action) {
        this.onTimerTick = onTimerTick;
        this.onTimerExpired = onTimerExpired;
    }

    private roundAndTrimDuration(span: moment.Duration): string {
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
        ui.timerDisplay = this.roundAndTrimDuration(this.timeRemaining);
        this.timer = setInterval(() => this.onTimer(), 1000);
    }

    public onTimer() {
        this.timeRemaining = moment.duration(this.targetTime - moment.now(), "ms");
        ui.timerDisplay = this.roundAndTrimDuration(this.timeRemaining);
        document.title = ui.timerDisplay;

        if (ui.timerDisplay == "0:00") {
            this.timerExpired();
        }
    }

    public colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

    private uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

    public timerExpired() {
        this.targetTime = moment.now();
        clearInterval(this.timer);
        this.onTimerExpired();
    }
}

export { EggTimer };