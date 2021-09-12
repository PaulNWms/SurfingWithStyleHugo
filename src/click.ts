class Click {
    constructor(tempo: number, durationMS: number) {
        this.tempo = tempo;
        this.durationMS = durationMS;
    }

    public tempo: number = 0;
    public durationMS: number = 0;
    public get durationString(): string { return this.durationMS.toString() + "ms"; }
}

export { Click };