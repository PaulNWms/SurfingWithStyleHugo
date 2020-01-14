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
    
    private _duration: number = 0;
    public get duration(): string {
        let min: string = Math.floor(this._duration / 60).toString();
        let sec: string = `0${this._duration % 60}`.slice(-2);
        return `${min}:${sec}`;
    }
    public set duration(value: string) {
        console.log(`>${value}<`);
        let duration: number = 0;
        let regex: RegExp = /(\d+):(\d\d)/;
        let match: RegExpMatchArray | null = value.match(regex);
        let minutes: number;
        let seconds: number;

        if (match != null) {
            minutes = parseInt(match[1]);
            seconds = parseInt(match[2]);
            duration = 60 * minutes + seconds;
        }
        else if (Number(value) !== NaN) {
            duration = Number(value)
        }

        if (duration === 0) {
            throw `Invalid time format: ${value}`;
        }

        this._duration = duration;
    }
}

export { Exercise };
