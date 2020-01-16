import moment from "moment";
import { Binding } from "./lib/binding";
import { EggTimer } from "./egg-timer";

let ui = {
    buttonFace: "▶️",
    display: "",
    endWithBell: true,
    exerciseDisplay: "",
    exerciseMarkup: "",
    onTimerTick: () => { },
    rest: 3,
    startWithRest: true,
    style: "",
    targetTime: moment.now(),
    timeRemaining: moment.duration(2, "minutes"),
    timerDisplay: "2:00",
}

let buttonFaceElement: HTMLSpanElement = $(".button-face")[0] as HTMLSpanElement
new Binding({ object: ui, property: "buttonFace" }).addBinding(buttonFaceElement, "innerText");

let endWithBellElement: HTMLInputElement = $(".end-with-bell")[0] as HTMLInputElement
new Binding({ object: ui, property: "endWithBell" }).addBinding(endWithBellElement, "checked");

let exerciseMarkupElement: HTMLElement = $(".exerciseMarkup")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseMarkup" }).addBinding(exerciseMarkupElement, "innerHTML");

let restElement: HTMLInputElement = $(".rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "rest" }).addBinding(restElement, "value");

let startWithRestElement: HTMLInputElement = $(".start-with-rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "startWithRest" }).addBinding(startWithRestElement, "checked");

let timerDisplayElement: HTMLSpanElement = $(".timer-display")[0] as HTMLSpanElement
new Binding({ object: ui, property: "timerDisplay" }).addBinding(timerDisplayElement, "innerText");

function roundAndTrimDuration(span: moment.Duration): string {
    const factor: number = 1000;
    let boundedTicks: number = Math.max(span.asMilliseconds(), 0);
    let roundedTicks: number = Math.round(boundedTicks / factor) * factor;
    let roundedTimeSpan: moment.Duration = moment.duration(roundedTicks, "ms");
    let str: string = moment.utc(roundedTimeSpan.asMilliseconds()).format("HH:mm:ss");
    let i: number = 0;

    for (i = 0; i < str.length - 4; i++) {
        if (str[i] != '0' && str[i] != ':')
            break;
    }

    return str.substring(i);
}

function timerExpired() {
    ui.targetTime = moment.now();
    //clearInterval(this.timer);
    //this.onTimerExpired();
}

function onTimer() {
    ui.timeRemaining = moment.duration(ui.targetTime - moment.now(), "ms");
    ui.timerDisplay = roundAndTrimDuration(ui.timeRemaining);
    console.log(`onTimer 3 ${ui.timerDisplay}`)
    document.title = ui.timerDisplay;
    ui.onTimerTick();

    if (ui.timerDisplay == "0:00") {
        timerExpired();
    }

    //eggTimer.stateHasChanged();
}

export { ui, exerciseMarkupElement, onTimer, roundAndTrimDuration }