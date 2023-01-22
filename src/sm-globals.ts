import { Binding } from "./lib/binding";

const MIN_TEMPO: number = 20;
const MAX_TEMPO: number = 240;

enum AnimationPlayState { running, paused }

enum MetronomeState { Starting, Running, MakeItStop, StoppingLR, StoppingRL, Stopped }

enum ScheduleState { Stopped, Running, Paused, StartNext, Settling };

enum AnimationName { stopped, starting, running, stopping_lr, stopping_rl };

let ui = {
    buttonFace: "▶️",
    clickOnOff: false,
    display: "",
    endWithBell: true,
    exerciseDisplay: "",
    exerciseMarkup: "",
    pendulumParent: "",
    rest: 3,
    startWithRest: true,
    metronomeState: MetronomeState[MetronomeState.Stopped],
    tempoDisplay: "120",
    timerDisplay: "2:00",
}

let buttonFaceElement: HTMLSpanElement = $(".button-face")[0] as HTMLSpanElement
new Binding({ object: ui, property: "buttonFace" }).addBinding(buttonFaceElement, "innerText");

let clickOnOffElement: HTMLInputElement = $(".click-on-off")[0] as HTMLInputElement
new Binding({ object: ui, property: "clickOnOff" }).addBinding(clickOnOffElement, "checked");

let endWithBellElement: HTMLInputElement = $(".end-with-bell")[0] as HTMLInputElement
new Binding({ object: ui, property: "endWithBell" }).addBinding(endWithBellElement, "checked");

let exerciseDisplayElement: HTMLElement = $(".exercise-display")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseDisplay" }).addBinding(exerciseDisplayElement, "innerHTML");

let tempoDisplayElement: HTMLElement = $(".display")[0] as HTMLElement
new Binding({ object: ui, property: "tempoDisplay" }).addBinding(tempoDisplayElement, "innerHTML");

let timerDisplayElement: HTMLSpanElement = $(".timer-display")[0] as HTMLSpanElement
new Binding({ object: ui, property: "timerDisplay" }).addBinding(timerDisplayElement, "innerText");

let exerciseMarkupElement: HTMLElement = $(".exercise-markup")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseMarkup" }).addBinding(exerciseMarkupElement, "innerHTML");

let stateElement: HTMLDivElement = $(".jumbotron")[0] as HTMLDivElement;
new Binding({ object: ui, property: "metronomeState" }).addBinding(stateElement, "data-metronome-state");

let restElement: HTMLInputElement = $(".rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "rest" }).addBinding(restElement, "value");

let startWithRestElement: HTMLInputElement = $(".start-with-rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "startWithRest" }).addBinding(startWithRestElement, "checked");

export {
    MIN_TEMPO, MAX_TEMPO,
    AnimationPlayState, MetronomeState, ScheduleState, AnimationName,
    ui, exerciseMarkupElement
}