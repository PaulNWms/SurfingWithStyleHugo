import moment from "moment";
import { AnimationPlayState, MetronomeState, ScheduleState, ui, AnimationName } from "./scheduled-metronome-globals";
import { Exercise } from "./exercise";
import { EggTimer } from "./egg-timer";
import { MiniMetronome } from "./mini-metronome";

class Schedule {
    public timeline: Array<Exercise> = [];
    public currentStep: Exercise | undefined;
    public lastStep: Exercise | undefined;

    protected status: ScheduleState = ScheduleState.Stopped;
    protected url: URL;
    protected eggTimer: EggTimer;
    protected metronome: MiniMetronome;
    protected exercises: Array<Exercise> = [];

    constructor(eggTimer: EggTimer, metronome: MiniMetronome) {
        this.eggTimer = eggTimer;
        this.metronome = metronome;
        this.url = new URL(window.location.href);
        ui.rest = 3;
        ui.startWithRest = true;
        ui.endWithBell = true;
        this.parseUrl();
        ui.exerciseMarkup = this.toHtml();
    }

    public CalculateTempo(): number {
        return (this.currentStep as Exercise).tempo;
    }

    public onPlayPause() {
        switch (this.status) {
            case ScheduleState.Stopped:
                try {
                    if (this.timeline == null || this.timeline.length === 0) {
                        this.parseControls();
                        this.timeline = this.toTimeline();

                        if (this.timeline.length === 0) {
                            return;
                        }
                    }

                    this.status = ScheduleState.StartNext;
                }
                catch (e) {
                    alert(e.Message + e.StackTrace);
                }
                break;

            case ScheduleState.Paused:
                this.status = ScheduleState.Running;
                this.eggTimer.isRunning = true;
                this.metronome.animationPlayState = AnimationPlayState.running;
                break;

            case ScheduleState.Running:
                this.status = ScheduleState.Paused;
                this.eggTimer.isRunning = false;
                this.metronome.animationPlayState = AnimationPlayState.paused;
                break;

            default:
                break;
        }
        this.update();
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
            case ScheduleState.StartNext:
                this.lastStep = this.currentStep;
                this.currentStep = this.timeline.shift();
                if (this.currentStep === undefined) { throw "currentStep is undefined"; }
                ui.exerciseDisplay = this.currentStep.description;
                this.metronome.tempo = this.currentStep.tempo;
                ui.tempoDisplay = this.metronome.tempoDisplay;
                this.metronome.isRunning = this.metronome.tempo >= MiniMetronome.MIN_TEMPO;
                this.eggTimer.timeRemaining = moment.duration(this.currentStep.durationSec, "seconds");
                this.eggTimer.isRunning = true;
                this.status = ScheduleState.Running;

                if (this.metronome.isRunning) {
                    ui.metronomeState = MetronomeState[MetronomeState.Starting];
                    this.metronome.animationName = AnimationName.starting;
                    this.metronome.animationPlayState = AnimationPlayState.running;
                    this.metronome.setStyle();
                }

                break;

            case ScheduleState.Settling:
                this.status = ScheduleState.Running;
                break;

            default:
                break;
        }
        this.metronome.setStyle();
    }

    public lineCompleted() {
        if (this.currentStep === undefined) { throw "currentStep is undefined"; }

        if (this.currentStep.tempo > -1) {
            this.metronome.animationPlayState = AnimationPlayState.running;
            ui.metronomeState = MetronomeState[MetronomeState.MakeItStop];
        }

        if (this.timeline.length > 0) {
            if (ui.endWithBell &&
                (this.currentStep.tempo != -1 || this.timeline[0].tempo < MiniMetronome.MIN_TEMPO)) {
                let audio: HTMLAudioElement = $(".audio-end-exercise")[0] as HTMLAudioElement;
                audio.play();
            }

            this.status = ScheduleState.StartNext;
            this.update();
        }
        else {
            if (ui.endWithBell) {
                let audio: HTMLAudioElement = $(".audio-end-routine")[0] as HTMLAudioElement;
                audio.play();
            }

            this.metronome.tempo = 0;
            this.eggTimer.isRunning = false;
            this.eggTimer.isRunning = false;
            this.status = ScheduleState.Stopped;
            this.eggTimer.colorBody();
            ui.exerciseDisplay = "Done!";
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
    }

    protected parseUrl() {
        let params: URLSearchParams = new URL(document.URL).searchParams;
        let tempos: Array<number> = [];
        let durations: Array<number> = [];
        let exes: Array<string> = [];
        this.exercises = [];

        if (params.has("r")) {
            params.forEach((value, key) => {
                switch (key) {
                    case "r":
                        ui.rest = parseInt(value);
                        break;

                    case "s":
                        ui.startWithRest = (value === "true");
                        break;

                    case "b":
                        ui.endWithBell = (value === "true");
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
                        {
                            let strs: Array<string> = value.split('-');

                            for (let str of strs) {
                                let dur: number = parseInt(str);
                                durations.push(dur);
                            }
                        }
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
            });

            for (let i: number = 0; i < tempos.length; i++) {
                let ex: Exercise = new Exercise(tempos[i], "2:00", exes[i]);
                ex.durationSec = durations[i];
                this.exercises.push(ex);
            }
        }
        else {
            this.exercises.push(new Exercise(120, "2:00", ""));
        }
    }

    protected myParseInt(value: string): number {
        if (value) { return parseInt(value); }
        else { return 0; }
    }

    public toTimeline(): Array<Exercise> {
        let timeline: Array<Exercise> = [];
        let restStep: Exercise = new Exercise(-1, ui.rest.toString(), "Resting...");

        if (this.exercises.length > 0 && ui.rest > 0 && ui.startWithRest) {
            timeline.push(restStep);
        }

        for (let i: number = 0; i < this.exercises.length; i++) {
            timeline.push(this.exercises[i]);

            if (i < this.exercises.length - 1 && ui.rest > 0) {
                timeline.push(restStep);
            }
        }

        return timeline;
    }

    public toUrl(): string {
        let tempos: Array<number> = [];
        let durations: Array<number> = [];
        let descriptions: Array<string> = [];

        for (let exercise of this.exercises) {
            tempos.push(exercise.tempo);
            durations.push(exercise.durationSec);
            descriptions.push(exercise.description);
        }

        let ts: string = tempos.join('-');
        let ds: string = durations.map(d => d.toString()).join('-');
        let es: string = descriptions.map(e => encodeURI(e)).join('-');

        return URL_TEMPLATE
            .replace("{0}", this.url.origin + this.url.pathname)
            .replace("{1}", ui.rest.toString())
            .replace("{2}", ui.startWithRest.toString())
            .replace("{3}", ui.endWithBell.toString())
            .replace("{4}", ts)
            .replace("{5}", ds)
            .replace("{6}", es);
    }

    public toHtml(): string {
        let result = "";

        for (let exercise of this.exercises) {
            result = result.concat(HTML_TEMPLATE
                .replace("{0}", exercise.tempo.toString())
                .replace("{1}", exercise.duration)
                .replace("{2}", exercise.description));
        }

        return result;
    }

    public getNewRow(): string {
        return HTML_TEMPLATE
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

    protected getExerciseValues() {
        var tempos: Array<string> = [];
        var durations: Array<string> = [];
        var exercises: Array<string> = [];
        $(".tempo-0").each(function () { tempos.push("" + $(this).val()); });
        $(".midpoint-0").each(function () { durations.push("" + $(this).val()); });
        $(".exercise").each(function () { exercises.push("" + $(this).val()); });
        // CAREFUL: columns are returned as rows
        return [tempos, durations, exercises];
    }
}

const URL_TEMPLATE: string = "{0}?r={1}&s={2}&b={3}&t={4}&d={5}&e={6}";

const HTML_TEMPLATE: string = `\
    <tr>
        <td>
            <button type="button" class="btn btn-primary delete-schedule-row">␡</button>
        </td>
        <td>
            <input type="text" class="form-control digit-filter tempo tempo-0" placeholder="Tempo" autocomplete="off" value="{0}" />
        </td>
        <td>
            <input type="text" class="form-control time-filter midpoint midpoint-0" placeholder="Duration" autocomplete="off" value="{1}" />
        </td>
        <td>
            <input type="text" class="form-control exercise" placeholder="Exercise" value="{2}" />
        </td>
        <td>
            <button type="button" class="btn btn-primary add-schedule-row">⎀</button>
        </td>
    </tr>`;

export { Schedule };