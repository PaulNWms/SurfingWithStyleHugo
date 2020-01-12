import $ from "jquery";
import { Binding } from "./lib/binding";

enum TimerState { Running, Paused };

const MIN_TEMPO: number = 20;
const MAX_TEMPO: number = 240;

class Properties {
    private _tempo: number = 120;
    public get tempo(): number { return this._tempo; }
    public set tempo(value: number) {
        this._tempo = value;
        this.duration = (Math.round(60000 / this._tempo)).toString() + "ms";
        // Need to change the animation for the duration change to take effect
        this.animation = "starting";
        ui.display = this._tempo;
    }

    private _animation: string = "none";
    public get animation(): string { return this._animation; }
    public set animation(value: string) {
        this._animation = value;
        this.setStyle();
    }

    private _duration: string = "500ms";
    public get duration(): string { return this._duration; }
    public set duration(value: string) {
        this._duration = value;
        this.setStyle();
    }

    private _playState: string = "paused";
    public get playState(): string { return this._playState; }
    public set playState(value: string) {
        this._playState = value;
        this.setStyle();
    }

    private setStyle() {
        ui.style = `animation-name: ${this.animation}; animation-duration: ${this.duration}; animation-play-state: ${this.playState}; animation-direction: alternate;`;
    }
}

let ui = {
    buttonFace: "▶️",
    display: 120,
    tempoSlider: 120,
    style: "animation-name: none; animation-duration: 500ms; animation-play-state: paused; animation-direction: alternate;",
}

let buttonFaceElement: HTMLSpanElement = $(".button-face")[0] as HTMLSpanElement;
new Binding({ object: ui, property: "buttonFace" }).addBinding(buttonFaceElement, "innerText");

let displayElement: HTMLSpanElement = $(".display")[0] as HTMLSpanElement;
new Binding({ object: ui, property: "display" }).addBinding(displayElement, "innerText");

let pendulumElement: HTMLDivElement = $(".pendulum-parent")[0] as HTMLDivElement;
new Binding({ object: ui, property: "style" }).addBinding(pendulumElement, "style");

let tempoSliderElement: HTMLInputElement = $(".tempo-slider")[0] as HTMLInputElement;
new Binding({ object: ui, property: "tempoSlider" }).addBinding(tempoSliderElement, "value");

let status: TimerState = TimerState.Paused;
let prop: Properties = new Properties();

function registerListener(selector) {
    let pendulum: JQuery = $(".pendulum-parent");
    let audio: HTMLAudioElement = $(selector)[0];
    pendulum.on("animationstart", function () { audio.play(); });
    pendulum.on("animationiteration", function () {
        audio.play();
        if (pendulum.css("animation-name") === "starting") {
            prop.animation = "running";
        }
    });
}

function decrementTempo() { onSliderChanged(Math.max(prop.tempo - 1, MIN_TEMPO)); }
function incrementTempo() { onSliderChanged(Math.min(+prop.tempo + 1, MAX_TEMPO)); }
function onSliderChanged(value: number) { prop.tempo = value; }

function onPlayPause() {
    switch (status) {
        case TimerState.Paused:
            status = TimerState.Running;

            if (prop.animation === "none") {
                prop.animation = "starting";
            }

            ui.buttonFace = "⏸";
            prop.playState = "running";
            break;

        case TimerState.Running:
            status = TimerState.Paused;
            ui.buttonFace = "▶️";
            prop.playState = "paused";
            break;

        default:
            break;
    }
}

$(document).ready(function () {
    let w = window as any;
    w.decrementTempo = decrementTempo;
    w.incrementTempo = incrementTempo;
    w.onPlayPause = onPlayPause;
    w.onSliderChanged = onSliderChanged;

    registerListener(".audio-click");
});
