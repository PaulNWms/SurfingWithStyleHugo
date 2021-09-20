import { Action } from "./lib/binding";
import { ui } from "./sm-globals";

class EggTimer {
    public timeRemainingMS: number = 2 * 60 * 1000;
    public targetTime: number = Date.now();
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

    private roundAndTrimDuration(spanMS: number): string {
        let boundedTicks: number = Math.max(spanMS, 0);
        let nonPaddedIntl = Intl.NumberFormat('en-us', { minimumIntegerDigits: 1 });
        let paddedIntl = Intl.NumberFormat('en-us', { minimumIntegerDigits: 2 })

        let [delimiter] = ':';
        let duration = Math.round(boundedTicks / 1000);
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor(duration / 60) % 60;
        let seconds = duration % 60;
        let indexToPad = hours ? 0 : 1;
        let timeFormat =
            [hours, minutes, seconds]
                .map((val, i) => {
                    return (val < 10 && i > indexToPad) ? paddedIntl.format(val) : nonPaddedIntl.format(val);
                })
                .filter((val, i) => {
                    if (i === 0) {
                        return !(val === '00' || val === '0');
                    }

                    return true;
                })
                .join(delimiter); // 4:32
        return timeFormat;
    }

    private start() {
        this.targetTime = Date.now() + this.timeRemainingMS;
        this.uncolorBody();
        ui.timerDisplay = this.roundAndTrimDuration(this.timeRemainingMS);
        this.timer = setInterval(() => this.onTimer(), 1000);
    }

    public onTimer() {
        this.timeRemainingMS = this.targetTime - Date.now();
        ui.timerDisplay = this.roundAndTrimDuration(this.timeRemainingMS);
        document.title = ui.timerDisplay;

        if (ui.timerDisplay == "0:00") {
            this.timerExpired();
        }
    }

    public colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

    private uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

    public timerExpired() {
        this.targetTime = Date.now();
        clearInterval(this.timer);
        this.onTimerExpired();
    }
}

export { EggTimer };