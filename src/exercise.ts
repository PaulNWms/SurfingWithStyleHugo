import moment from "moment";
import { Click } from "./click";

class Exercise {
    constructor(tempo: number, duration: string, description: string, tempo2: number = 120, clicks: Array<Click> = []) {
        this.tempo = tempo;
        this.tempo2 = tempo2;
        this.duration = duration;
        this.description = description;
        this.clicks = clicks;
    }

    public tempo: number;
    public tempo2: number;
    public description: string;
    public clicks: Array<Click>;
    
    public durationSec: number = 0;
    public get duration(): string {
        let min: string = Math.floor(this.durationSec / 60).toString();
        let sec: string = `0${this.durationSec % 60}`.slice(-2);
        return `${min}:${sec}`;
    }
    public set duration(value: string) {
        let sec: number = 0;
        let regex: RegExp = /(\d+):(\d\d)/;
        let match: RegExpMatchArray | null = value.match(regex);
        let minutes: number;
        let seconds: number;

        if (match != null) {
            minutes = parseInt(match[1]);
            seconds = parseInt(match[2]);
            sec = 60 * minutes + seconds;
        }
        else if (Number(value) !== NaN) {
            sec = Number(value)
        }

        if (sec === 0) {
            throw `Invalid time format: ${value}`;
        }

        this.durationSec = sec;
    }

    public CalculateClicks() {
        this.clicks = new Array<Click>();
        let plateauMS: number = moment.duration(3, "seconds").asMilliseconds();
        // EggTimer.TimeRemaining is updated on timer callback, more accurate to recalculate
        let exerciseDurationMS: number = 1000*this.durationSec;
        let timeRemainingMS: number = exerciseDurationMS

        while (timeRemainingMS >= 0) {
            let tempo: number = 0;

            if (exerciseDurationMS - timeRemainingMS < plateauMS) {
                tempo = this.tempo;
            }
            else if (timeRemainingMS < plateauMS) {
                tempo = this.tempo;
            }
            else if (Math.abs(timeRemainingMS - exerciseDurationMS / 2) < plateauMS) {
                tempo = this.tempo2;
            }
            else if (timeRemainingMS > exerciseDurationMS / 2) {
                let climbDuration: number = exerciseDurationMS / 2 - 2 * plateauMS;
                let tempoChange: number = this.tempo2 - this.tempo;
                let progress: number = exerciseDurationMS - plateauMS - timeRemainingMS;
                tempo = this.tempo + progress * tempoChange / climbDuration;
            }
            else {
                let descentDuration: number = exerciseDurationMS / 2 - 2 * plateauMS;
                let tempoChange: number = this.tempo2 - this.tempo;
                let progress: number = exerciseDurationMS / 2 - plateauMS - timeRemainingMS;
                tempo = this.tempo2 - progress * tempoChange / descentDuration;
            }
            
            let durationMS: number = Math.round(60000 / tempo);
            let click: Click = new Click(Math.round(tempo), durationMS);
            console.log("click tempo: " + click.tempo + "durationMS: " + click.durationMS);
            this.clicks.push(click);
            timeRemainingMS -= durationMS;
        }

        console.log("clicks: " + this.clicks.length);
    }
}

export { Exercise };
