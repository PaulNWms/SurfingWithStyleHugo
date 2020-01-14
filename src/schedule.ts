import moment from "moment";
import { Action, Binding } from "./lib/binding";
import { Exercise } from "./exercise";
import { EggTimer } from "./egg-timer";
import { MiniMetronome } from "./mini-metronome";

enum TimerState { Stopped, Running, Paused, StartNext, Settling };

class Schedule {
    public startWithRest: boolean;
    public endWithBell: boolean;
    public timeline: Array<Exercise> = [];
    public currentStep: Exercise | undefined;
    public lastStep: Exercise | undefined;
    public exerciseDisplay: string = "";

    protected stateHasChanged: Action;
    protected status: TimerState = TimerState.Stopped;
    protected url: URL;
    protected eggTimer: EggTimer;
    protected metronome: MiniMetronome;
    protected exercises: Array<Exercise> = [];

    protected rest: number;
    public get restDisplay(): string { return this.rest.toString(); }
    public set restDisplay(value: string) { this.rest = this.myParseInt(value); }

    constructor(stateHasChanged: Action, eggTimer: EggTimer, metronome: MiniMetronome) {
        this.eggTimer = eggTimer;
        this.metronome = metronome;
        this.stateHasChanged = stateHasChanged;
        this.url = new URL(window.location.href);
        this.rest = 3;
        this.startWithRest = true;
        this.endWithBell = true;
        this.parseUrl();
    }

    public onPlayPause() {
        switch (this.status) {
            case TimerState.Stopped:
                try {
                    if (this.timeline == null || this.timeline.length === 0) {
                        this.parseControls();
                        this.timeline = this.toTimeline();

                        if (this.timeline.length === 0) {
                            return;
                        }
                    }

                    this.status = TimerState.StartNext;
                    this.update();
                    this.stateHasChanged();
                }
                catch (e) {
                    alert(e.Message + e.StackTrace);
                }
                break;

            case TimerState.Paused:
                this.status = TimerState.Running;
                this.eggTimer.isRunning = true;
                this.metronome.playState = "running";
                break;

            case TimerState.Running:
                this.status = TimerState.Paused;
                this.eggTimer.isRunning = false;
                this.metronome.playState = "paused";
                this.eggTimer.onTimer();
                break;

            default:
                this.update();
                break;
        }
    }

    public createLink() {
        try {
            this.parseControls();
            let url: string = this.toUrl();
            window.open(url);
        }
        catch (e) {
            alert(e.Message + e.StackTrace);
        }
    }

    public update() {
        switch (this.status) {
            case TimerState.StartNext:
                this.lastStep = this.currentStep;
                this.currentStep = this.timeline.shift();
                if (this.currentStep === undefined) { throw "currentStep is undefined"; }
                this.exerciseDisplay = this.currentStep.description;
                this.metronome.tempo = this.currentStep.tempo;
                this.metronome.isRunning = this.metronome.tempo >= MiniMetronome.MIN_TEMPO;
                this.eggTimer.timeRemaining = moment.duration(this.currentStep.duration, "seconds");
                this.eggTimer.isRunning = true;
                this.status = TimerState.Running;

                if (this.metronome.isRunning) {
                    this.metronome.playState = "starting";
                }

                this.stateHasChanged();
                //            JSRuntime.Current.InvokeAsync<object>("alert", "lineCompleted " + metronome.State);
                //            JSRuntime.Current.InvokeAsync<object>("showState");
                break;

            case TimerState.Settling:
                this.status = TimerState.Running;
                break;

            default:
                break;
        }
    }

    public lineCompleted() {
        if (this.currentStep === undefined) { throw "currentStep is undefined"; }

        if (this.currentStep.tempo != -1) {
            this.metronome.playState = "makeitstop";
        }

        if (this.timeline.length > 0) {
            if (this.endWithBell &&
                (this.currentStep.tempo != -1 || this.timeline[0].tempo < MiniMetronome.MIN_TEMPO)) {
                let audio: HTMLAudioElement = $(".audio-end-exercise")[0] as HTMLAudioElement;
                audio.play();
            }

            this.status = TimerState.StartNext;
            this.update();
        }
        else {
            if (this.endWithBell) {
                let audio: HTMLAudioElement = $(".audio-end-routine")[0] as HTMLAudioElement;
                audio.play();
            }

            this.metronome.tempo = 0;
            this.metronome.isRunning = false;
            this.eggTimer.isRunning = false;
            this.status = TimerState.Stopped;
            this.colorBody();
            this.exerciseDisplay = "Done!";
        }
    }

    public parseControls() {
        this.exercises = [];
        let raw: Array<Array<string>> = this.getExerciseValues();

        if (raw[0].length != raw[1].length || raw[1].length != raw[2].length) {
            throw `Lists are different lengths: ${raw[0].length} ${raw[1].length} ${raw[2].length}`;
        }

        for (let i: number = 0; i < raw[0].length; i++) {
            let tempo: number = parseInt(raw[0][i]);
            this.exercises.push(new Exercise(tempo, raw[1][i], raw[2][i]));
        }
    }

    public parseControl(index: number) {
        let raw: Array<Array<string>> = this.getExerciseValues();
        let row: number = Math.floor(index / 3);
        let col: number = index % 3;

        // parse and transpose at the same time
        switch (col) {
            case 0:
                this.exercises[row].tempo = this.myParseInt(raw[col][row]);
                break;
            case 1:
                this.exercises[row].duration = raw[col][row];
                break;
            case 2:
                this.exercises[row].description = raw[col][row];
                break;
        }

        console.log(`${raw[0].length} ${row} ${col} ${raw[col][row]} ${this.exercises[row][col]}`);
    }

    protected parseUrl() {
        let params: URLSearchParams = new URL(document.URL).searchParams;
        let tempos: Array<number> = [];
        let durations: Array<string> = [];
        let exes: Array<string> = [];
        this.exercises = [];

        if (params.has("r")) {
            params.forEach((value, key) => {
                switch (key) {
                    case "r":
                        this.restDisplay = value;
                        break;

                    case "s":
                        this.startWithRest = (value === "true");
                        break;

                    case "b":
                        this.endWithBell = (value === "true");
                        break;

                    case "t":
                        {
                            let strs: Array<string> = value.split('-');

                            for (let str of strs) {
                                let tempo: number = parseInt(str);
                                tempos.push(tempo);
                            }
                        }
                        break;

                    case "d":
                        durations = value.split('-');
                        break;

                    case "e":
                        {
                            let strs: Array<string> = value.split('-');

                            for (let str of strs) {
                                str = str.replace("%26", "&");
                                str = str.replace("%2D", "-");
                                exes.push(str);
                            }
                        }
                        break;
                }

                for (let i: number = 0; i < tempos.length; i++) {
                    this.exercises.push(new Exercise(tempos[i], durations[i], exes[i]));
                }
            });
        }
        else {
            this.exercises.push(new Exercise(120, "2:00", ""));
        }
    }

    private myParseInt(value: string): number {
        if (value) { return parseInt(value); }
        else { return 0; }
    }

    public toTimeline(): Array<Exercise> {
        let timeline: Array<Exercise> = [];
        let restStep: Exercise = new Exercise(-1, this.rest.toString(), "Resting...");

        if (this.exercises.length > 0 && this.rest > 0 && this.startWithRest) {
            timeline.push(restStep);
        }

        for (let i: number = 0; i < this.exercises.length; i++) {
            timeline.push(this.exercises[i]);

            if (i < this.exercises.length - 1 && this.rest > 0) {
                timeline.push(restStep);
            }
        }

        return timeline;
    }

    public toUrl(): string {
        let tempos: Array<number> = [];
        let durations: Array<string> = [];
        let descriptions: Array<string> = [];

        for (let exercise of this.exercises) {
            tempos.push(exercise.tempo);
            durations.push(exercise.duration);
            descriptions.push(exercise.description);
        }

        let ts: string = tempos.join('-');
        let ds: string = durations.map(d => d.toString()).join('-');
        let es: string = descriptions.map(e => encodeURI(e)).join('-');

        return this.URL_TEMPLATE
            .replace("{0}", this.url.origin)
            .replace("{1}", this.rest.toString())
            .replace("{2}", this.startWithRest.toString())
            .replace("{3}", this.endWithBell.toString())
            .replace("{4}", ts)
            .replace("{5}", ds)
            .replace("{6}", es);
    }

    public toHtml(): string {
        let result = "";

        for (let exercise of this.exercises) {
            console.log(exercise);

            result = result.concat(this.HTML_TEMPLATE
                .replace("{0}", exercise.tempo.toString())
                .replace("{1}", exercise.duration)
                .replace("{2}", exercise.description));
        }

        return result;
    }

    public getNewRow(): string {
        return this.HTML_TEMPLATE
            .replace("{0}", "120")
            .replace("{1}", "2:00")
            .replace("{2}", "");
    }

    public appendRow(index: number) {
        this.exercises.splice(index + 1, 0, new Exercise(120, "2:00", ""));
    }

    public deleteRow(index: number) {
        if (this.exercises.length > 1) {
            this.exercises.splice(index, 1);
        }
    }

    private colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

    private uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

    private getExerciseValues() {
        var tempos: Array<string> = [];
        var durations: Array<string> = [];
        var exercises: Array<string> = [];
        $(".tempo-0").each(function () { tempos.push("" + $(this).val()); });
        $(".midpoint-0").each(function () { durations.push("" + $(this).val()); });
        $(".exercise").each(function () { exercises.push("" + $(this).val()); });
        console.log(tempos);
        console.log(durations);
        console.log(exercises);
        // CAREFUL: columns are returned as rows
        return [tempos, durations, exercises];
    }

    private URL_TEMPLATE: string = "{0}?r={1}&s={2}&b={3}&t={4}&d={5}&e={6}";

    private HTML_TEMPLATE: string = `\
        <tr>
            <td>
                <button type='button' class='btn btn-primary delete-schedule-row'>␡</button>
            </td>
            <td>
                <input type='text' class='form-control digit-filter tempo tempo-0' placeholder='Tempo' autocomplete='off' value='{0}' />
            </td>
            <td>
                <input type='text' class='form-control time-filter midpoint midpoint-0' placeholder='Duration' autocomplete='off' value='{1}' />
            </td>
            <td>
                <input type='text' class='form-control exercise' placeholder='Exercise' value='{2}' />
            </td>
            <td>
                <button type='button' class='btn btn-primary add-schedule-row'>⎀</button>
            </td>
        </tr>`;
}

export { Schedule };