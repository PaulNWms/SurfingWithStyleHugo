class Exercise {
    constructor(tempo: number, duration: string, description: string) {
        this.tempo = tempo;
        this.tempo2 = 120;
        this.duration = duration;
        this.description = description;
    }

    public tempo: number;
    public tempo2: number;
    public description: string;
    
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
}

export { Exercise };
