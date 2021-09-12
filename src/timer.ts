import moment from 'moment';
import { Binding } from './lib/binding'

enum TimerState { Stopped, Running, Paused };

let ui = {
    buttonFace: "▶️",
    timerDisplay: "25:00",
    formattedDuration: "25",
}

let buttonFaceElement: HTMLSpanElement = $("#button-face")[0] as HTMLSpanElement
new Binding({ object: ui, property: "buttonFace" }).addBinding(buttonFaceElement, "innerText");

let timerDisplayElement: HTMLSpanElement = $("#timer-display")[0] as HTMLSpanElement
new Binding({ object: ui, property: "timerDisplay" }).addBinding(timerDisplayElement, "innerText");

let formattedDurationElement: HTMLInputElement = $("#formatted-duration")[0] as HTMLInputElement
new Binding({ object: ui, property: "formattedDuration" }).addBinding(formattedDurationElement, "value", "blur");

let timerStatus: TimerState = TimerState.Stopped;
let timeRemaining: moment.Duration = moment.duration(25, "minutes");
let targetTime: number = moment.now();
let timer: ReturnType<typeof setInterval>;

function min1() { usePreset("1-minute-timer", 1); }
function min2() { usePreset("2-minute-timer", 2); }
function min3() { usePreset("egg-timer", 3); }
function min5() { usePreset("5-minute-timer", 5); }
function min10() { usePreset("10-minute-timer", 10); }
function min15() { usePreset("15-minute-timer", 15); }
function min20() { usePreset("20-minute-timer", 20); }
function min25() { usePreset("tomato-timer", 25); }
function min30() { usePreset("30-minute-timer", 30); }
function min45() { usePreset("45-minute-timer", 45); }
function min60() { usePreset("1-hour-timer", 60); }

function updateButton(state: TimerState) {
    timerStatus = state;
    switch (timerStatus) {
        case TimerState.Stopped:
        case TimerState.Paused:
            ui.buttonFace = "▶️";
            break;

        case TimerState.Running:
            ui.buttonFace = "⏸";
            break;
    }
}

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

function usePreset(url: string, minutes: number) {
    timeRemaining = moment.duration(minutes, "minutes");
    ui.formattedDuration = minutes.toString();
    ui.timerDisplay = roundAndTrimDuration(timeRemaining);
    updateButton(TimerState.Stopped);
    clearInterval(timer);
}

function onTimer() {
    timeRemaining = moment.duration(targetTime - moment.now(), "ms");
    ui.timerDisplay = roundAndTrimDuration(timeRemaining);
    setTitle(ui.timerDisplay);

    if (timeRemaining.asMilliseconds() <= 0) {
        timerExpired();
    }
}

function timerExpired() {
    targetTime = moment.now();
    timeRemaining = moment.duration(0, "ms");
    colorBody();
    playAudio(".audio-bell");
    updateButton(TimerState.Stopped);
    clearInterval(timer);
}

function onStartPause() {
    switch (timerStatus) {
        case TimerState.Stopped:
            {
                let match: RegExpMatchArray | null = ui.formattedDuration.match(/(\d+):(\d\d)/);
                let hours: number = 0;
                let minutes: number = 0;

                if (match !== null) {
                    hours = parseInt(match[1]);
                    minutes = parseInt(match[2]);
                    timeRemaining = moment.duration(60 * hours + minutes, "minutes");
                }
                else if (Number(ui.formattedDuration) !== NaN) {
                    timeRemaining = moment.duration(Number(ui.formattedDuration), "minutes");
                }

                targetTime = (moment as any)(moment.now()).add(timeRemaining.asMilliseconds(), "ms") as number;
                uncolorBody();
                ui.timerDisplay = roundAndTrimDuration(timeRemaining);
                updateButton(TimerState.Running);
                timer = setInterval(onTimer, 1000);
            }
            break;

        case TimerState.Running:
            updateButton(TimerState.Paused);
            clearInterval(timer);
            onTimer();
            break;

        case TimerState.Paused:
            if (timeRemaining.asMilliseconds() > 0) {
                targetTime = moment.now() + timeRemaining.asMilliseconds();
                updateButton(TimerState.Running);
                timer = setInterval(onTimer, 1000);
            }
            else {
                timerStatus = TimerState.Stopped;
                onStartPause();
            }
            break;
    }
}

function colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

function uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

function playAudio(selector) { $(selector)[0].play(); }

function setTitle(title) { document.title = title; }

$(document).ready(function() {
    let w = window as any;
    w.onStartPause = onStartPause;
    w.min1 = min1;
    w.min2 = min2;
    w.min3 = min3;
    w.min5 = min5;
    w.min10 = min10;
    w.min15 = min15;
    w.min20 = min20;
    w.min25 = min25;
    w.min30 = min30;
    w.min45 = min45;
    w.min60 = min60;
    updateButton(TimerState.Stopped);
});
