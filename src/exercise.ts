import moment from "moment";

class Exercise {
    constructor(tempo: number, duration: moment.Duration, description: string) {
        this.tempo = tempo;
        this.tempo2 = 120;
        this.duration = duration;
        this.description = description;
    }

    public tempo: number;
    public tempo2: number;
    public duration: moment.Duration;
    public description: string;
}

export { Exercise };
