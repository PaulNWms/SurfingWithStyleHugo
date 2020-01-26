import moment from "moment";
import { AnimationPlayState, MetronomeState, ScheduleState, ui, AnimationName } from "./scheduled-metronome-globals";
import { Exercise } from "./exercise";
import { Schedule } from "./schedule";
import { MiniMetronome } from "./mini-metronome";

class AcceleratingSchedule extends Schedule {
    public CalculateTempo(): number {
        let plateauMs: number = moment.duration(3, "seconds").asMilliseconds();
        // EggTimer.TimeRemaining is updated on timer callback, more accurate to recalculate
        let timeRemainingMs: number = this.eggTimer.targetTime - moment.now();
        let cs: Exercise = this.currentStep as Exercise;
        let durationMs: number = 1000*cs.durationSec;

        if (durationMs - timeRemainingMs < plateauMs) {
            return cs.tempo;
        }
        else if (timeRemainingMs < plateauMs) {
            return cs.tempo;
        }
        else if (Math.abs(timeRemainingMs - durationMs / 2) < plateauMs) {
            return cs.tempo2;
        }
        else if (timeRemainingMs > durationMs / 2) {
            let duration: number = durationMs / 2 - 2 * plateauMs;
            let tempoChange: number = cs.tempo2 - cs.tempo;
            let progress: number = durationMs - plateauMs - timeRemainingMs;
            let tempo: number = cs.tempo + progress * tempoChange / duration;
            return Math.floor(tempo);
        }
        else {
            let duration: number = durationMs / 2 - 2 * plateauMs;
            let tempoChange: number = cs.tempo2 - cs.tempo;
            let progress: number = durationMs / 2 - plateauMs - timeRemainingMs;
            let tempo: number = cs.tempo2 - progress * tempoChange / duration;
            return Math.floor(tempo);
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
            this.exercises.push(new Exercise(tempo1, raw[2][i], raw[3][i], tempo2));
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
    <tr>
        <td>
            <button type="button" class="btn btn-primary delete-schedule-row">␡</button>
        </td>
        <td>
            <input type='text' class='form-control digit-filter tempo tempo-0' placeholder='Tempo 1' autocomplete='off' value='{0}' />
        </td>
        <td>
            <input type='text' class='form-control digit-filter tempo tempo-1' placeholder='Tempo 2' autocomplete='off' value='{1}' />
        </td>
        <td>
            <input type='text' class='form-control time-filter midpoint midpoint-0' placeholder='Duration' autocomplete='off' value='{2}' />
        </td>
        <td>
            <input type='text' class='form-control exercise' placeholder='Exercise' value='{3}' />
        </td>
        <td>
            <button type="button" class="btn btn-primary add-schedule-row">⎀</button>
        </td>
    </tr>`;

export { AcceleratingSchedule };