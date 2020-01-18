import { Binding } from "./lib/binding";

let ui = {
    buttonFace: "▶️",
    display: "",
    endWithBell: true,
    exerciseDisplay: "",
    exerciseMarkup: "",
    rest: 3,
    startWithRest: true,
    style: "",
    timerDisplay: "2:00",
}

let buttonFaceElement: HTMLSpanElement = $(".button-face")[0] as HTMLSpanElement
new Binding({ object: ui, property: "buttonFace" }).addBinding(buttonFaceElement, "innerText");

let endWithBellElement: HTMLInputElement = $(".end-with-bell")[0] as HTMLInputElement
new Binding({ object: ui, property: "endWithBell" }).addBinding(endWithBellElement, "checked");

let exerciseDisplayElement: HTMLElement = $(".exercise-display")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseDisplay" }).addBinding(exerciseDisplayElement, "innerHTML");

let exerciseMarkupElement: HTMLElement = $(".exercise-markup")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseMarkup" }).addBinding(exerciseMarkupElement, "innerHTML");

let restElement: HTMLInputElement = $(".rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "rest" }).addBinding(restElement, "value");

let startWithRestElement: HTMLInputElement = $(".start-with-rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "startWithRest" }).addBinding(startWithRestElement, "checked");

let timerDisplayElement: HTMLSpanElement = $(".timer-display")[0] as HTMLSpanElement
new Binding({ object: ui, property: "timerDisplay" }).addBinding(timerDisplayElement, "innerText");

export { ui, exerciseMarkupElement }