import { MIN_TEMPO, MetronomeState, ScheduleState, ui } from "./sm-globals";
import { Exercise } from "./exercise";
import { EggTimer } from "./egg-timer";
import { AcceleratingMetronome } from "./am-metronome";
import { Click } from "./click";

class AcceleratingSchedule {
    public timeline: Array<Exercise> = [];
    public currentStep: Exercise | undefined;
    public lastStep: Exercise | undefined;
    public metronome: AcceleratingMetronome;

    protected status: ScheduleState = ScheduleState.Stopped;
    protected url: URL;
    protected eggTimer: EggTimer;
    protected exercises: Array<Exercise> = [];

    constructor(eggTimer: EggTimer) {
        this.eggTimer = eggTimer;
        this.metronome = new AcceleratingMetronome();
        this.url = new URL(window.location.href);
        ui.rest = 3;
        ui.startWithRest = true;
        ui.endWithBell = true;
        this.parseUrl();
        ui.exerciseMarkup = this.toHtml();
    }

    public GetClick(): Click | undefined {
        let cs: Exercise = this.currentStep as Exercise;
        if (cs === undefined || cs.clicks === undefined) { return undefined; }
        return cs.clicks.shift();
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
                catch (err) {
                    if (err instanceof Error) {
                        alert(err.message + err.stack);
                    }
                }
                break;

            case ScheduleState.Paused:
                this.status = ScheduleState.Running;
                this.eggTimer.isRunning = true;
                break;

            case ScheduleState.Running:
                this.status = ScheduleState.Paused;
                this.eggTimer.isRunning = false;
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
        catch (err) {
            if (err instanceof Error) {
                alert(err.message + err.stack);
            }
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
                this.metronome.isRunning = this.metronome.tempo >= MIN_TEMPO;
                this.eggTimer.timeRemainingMS = 1000 * this.currentStep.durationSec;
                this.eggTimer.isRunning = true;
                this.status = ScheduleState.Running;

                if (this.metronome.isRunning) {
                    this.metronome.state = MetronomeState.Starting;
                }

                break;

            case ScheduleState.Settling:
                this.status = ScheduleState.Running;
                break;

            default:
                break;
        }
    }

    public lineCompleted() {
        if (this.currentStep === undefined) { throw "currentStep is undefined"; }

        if (this.currentStep.tempo > -1) {
            this.metronome.state = MetronomeState.MakeItStop;
        }

        if (this.timeline.length > 0) {
            if (ui.endWithBell &&
                (this.currentStep.tempo != -1 || this.timeline[0].tempo < MIN_TEMPO)) {
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

        if (raw[0].length != raw[1].length || raw[1].length != raw[2].length || raw[2].length != raw[3].length) {
            throw `Lists are different lengths: ${raw[0].length} ${raw[1].length} ${raw[2].length}  ${raw[3].length}`;
        }

        for (let i: number = 0; i < raw[0].length; i++) {
            let tempo1: number = parseInt(raw[0][i]);
            let tempo2: number = parseInt(raw[1][i]);
            let exercise: Exercise = new Exercise(tempo1, raw[2][i], raw[3][i], tempo2);
            exercise.CalculateClicks();
            this.exercises.push(exercise);
        }
    }

    public parseControl(index: number) {
        let raw: Array<Array<string>> = this.getExerciseValues();
        let row: number = Math.floor(index / 4);
        let col: number = index % 4;

        // parse and transpose at the same time
        switch (col) {
            case 0:
                this.exercises[row].tempo = this.myParseInt(raw[col][row]);
                break;
            case 1:
                this.exercises[row].tempo2 = this.myParseInt(raw[col][row]);
                break;
            case 2:
                this.exercises[row].duration = raw[col][row];
                break;
            case 3:
                this.exercises[row].description = raw[col][row];
                break;
        }
    }

    protected parseUrl() {
        let params: URLSearchParams = new URL(document.URL).searchParams;
        let tempo1s: Array<number> = [];
        let tempo2s: Array<number> = [];
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

                    case "l":
                        {
                            let strs: Array<string> = value.split('-');

                            for (let str of strs) {
                                let tempo: number = parseInt(str);
                                tempo1s.push(tempo);
                            }
                        }
                        break;

                    case "h":
                        {
                            let strs: Array<string> = value.split('-');

                            for (let str of strs) {
                                let tempo: number = parseInt(str);
                                tempo2s.push(tempo);
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

            for (let i: number = 0; i < tempo1s.length; i++) {
                let ex: Exercise = new Exercise(tempo1s[i], "2:00", exes[i], tempo2s[i]);
                ex.durationSec = durations[i];
                this.exercises.push(ex);
            }
        }
        else {
            this.exercises.push(new Exercise(60, "2:00", "", 120));
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
        let tempo1s: Array<number> = [];
        let tempo2s: Array<number> = [];
        let durations: Array<number> = [];
        let descriptions: Array<string> = [];

        for (let exercise of this.exercises) {
            tempo1s.push(exercise.tempo);
            tempo2s.push(exercise.tempo2);
            durations.push(exercise.durationSec);
            descriptions.push(exercise.description);
        }

        let t1s: string = tempo1s.join('-');
        let t2s: string = tempo2s.join('-');
        let ds: string = durations.map(d => d.toString()).join('-');
        let es: string = descriptions.map(e => encodeURI(e)).join('-');

        return URL_TEMPLATE
            .replace("{0}", this.url.origin + this.url.pathname)
            .replace("{1}", ui.rest.toString())
            .replace("{2}", ui.startWithRest.toString())
            .replace("{3}", ui.endWithBell.toString())
            .replace("{4}", t1s)
            .replace("{5}", t2s)
            .replace("{6}", ds)
            .replace("{7}", es);
    }

    public toHtml(): string {
        let result = "";

        for (let exercise of this.exercises) {
            result = result.concat(HTML_TEMPLATE
                .replace("{0}", exercise.tempo.toString())
                .replace("{1}", exercise.tempo2.toString())
                .replace("{2}", exercise.duration)
                .replace("{3}", exercise.description));
        }

        return result;
    }

    public getNewRow(): string {
        return HTML_TEMPLATE
            .replace("{0}", "60")
            .replace("{1}", "120")
            .replace("{2}", "2:00")
            .replace("{3}", "");
    }

    public appendRow(index: number) {
        this.exercises.splice(index + 1, 0, new Exercise(60, "2:00", "", 120));
    }

    public deleteRow(index: number) {
        if (this.exercises.length > 1) {
            this.exercises.splice(index, 1);
        }
    }

    protected getExerciseValues() {
        var tempo1s: Array<string> = [];
        var tempo2s: Array<string> = [];
        var durations: Array<string> = [];
        var exercises: Array<string> = [];
        $(".tempo-0").each(function () { tempo1s.push("" + $(this).val()); });
        $(".tempo-1").each(function () { tempo2s.push("" + $(this).val()); });
        $(".midpoint-0").each(function () { durations.push("" + $(this).val()); });
        $(".exercise").each(function () { exercises.push("" + $(this).val()); });
        // CAREFUL: columns are returned as rows
        return [tempo1s, tempo2s, durations, exercises];
    }
}

const URL_TEMPLATE: string = "{0}?r={1}&s={2}&b={3}&l={4}&h={5}&d={6}&e={7}";

const HTML_TEMPLATE: string = `\
    <tr class="d-flex">
        <td class="col-1">
            <button type="button" class="btn btn-primary delete-schedule-row">␡</button>
        </td>
        <td class="col-1">
            <input type='text' class='form-control digit-filter tempo tempo-0' placeholder='Tempo 1' autocomplete='off' value='{0}' />
        </td>
        <td class="col-1">
            <input type='text' class='form-control digit-filter tempo tempo-1' placeholder='Tempo 2' autocomplete='off' value='{1}' />
        </td>
        <td class="col-1">
            <input type='text' class='form-control time-filter midpoint midpoint-0' placeholder='Duration' autocomplete='off' value='{2}' />
        </td>
        <td class="col-7">
            <input type='text' class='form-control exercise' placeholder='Exercise' value='{3}' />
        </td>
        <td class="col-1">
            <button type="button" class="btn btn-primary add-schedule-row">⎀</button>
        </td>
    </tr>`;

export { AcceleratingSchedule };