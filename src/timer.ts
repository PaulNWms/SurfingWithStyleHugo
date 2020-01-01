import $ from "jquery";
import { Binding } from './lib/binding'
import { DateTime, TimeSpan } from './lib/datetime';

enum TimerState { Stopped, Running, Paused };

let timerStatus: TimerState = TimerState.Stopped;
let timeRemaining: TimeSpan = new TimeSpan(0, 25, 0);
let targetTime: DateTime = DateTime.Now;
let timerDisplay: string = "25:00";
let formattedDuration: string = "25";
let timer: any = createTimer(1000);
let buttonFace: string = "oi-media-play";

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
            buttonFace = "oi-media-play";
            break;

        case TimerState.Running:
            buttonFace = "oi-media-pause";
            break;
    }
}

function RoundAndTrimDuration(span: TimeSpan): string {
    const factor: number = 10000000;
    let boundedTicks: number = Math.max(span.Ticks, 0);
    let roundedTicks: number = Math.round(boundedTicks / factor) * factor;
    let roundedTimeSpan: TimeSpan = new TimeSpan(roundedTicks);
    let str: string = roundedTimeSpan.ToString();
    let i: number = 0;

    for (i = 0; i < str.length - 4; i++) {
        if (str[i] != '0' && str[i] != ':')
            break;
    }

    return str.substring(i);
}

function usePreset(url: string, minutes: number) {
    timeRemaining = new TimeSpan(0, minutes, 0);
    formattedDuration = minutes.toString();
    timerDisplay = RoundAndTrimDuration(timeRemaining);
    updateButton(TimerState.Stopped);
    timer.Stop();
}

function onTimer() {
    timeRemaining = targetTime - DateTime.Now;
    timerDisplay = RoundAndTrimDuration(timeRemaining);
    setTitle(timerDisplay);

    if (timerDisplay == "0:00") {
        timerExpired();
    }

    //this.StateHasChanged();
}

function timerExpired() {
    targetTime = DateTime.Now;
    timeRemaining = new TimeSpan(0);
    colorBody();
    playAudio("audio-bell");
    updateButton(TimerState.Stopped);
    timer.Stop();
}

function onStartPause() {
    switch (timerStatus) {
        case TimerState.Stopped:
            {
                let match: RegExpMatchArray | null = formattedDuration.match(/(\d+):(\d\d)/);
                let hours: number = 0;
                let minutes: number = 0;

                if (match !== null) {
                    hours = parseInt(match[1]);
                    minutes = parseInt(match[2]);
                    timeRemaining = new TimeSpan(hours, minutes, 0);
                }
                else if (Number(formattedDuration) !== NaN) {
                    timeRemaining = new TimeSpan(0, Number(formattedDuration), 0);
                }

                targetTime = DateTime.Now + timeRemaining;
                uncolorBody();
                timerDisplay = RoundAndTrimDuration(timeRemaining);
                updateButton(TimerState.Running);
                timer.Start();
            }
            break;

        case TimerState.Running:
            updateButton(TimerState.Paused);
            timer.Stop();
            onTimer();
            break;

        case TimerState.Paused:
            if (timeRemaining.Ticks > 0) {
                targetTime = DateTime.Now + timeRemaining;
                updateButton(TimerState.Running);
                timer.Start();
            }
            else {
                timerStatus = TimerState.Stopped;
                onStartPause();
            }
            break;
    }
}

// function OnInit() {
//     timer.Elapsed += OnTimer;
// }

// public function Dispose() {
//     timer.Elapsed -= OnTimer;
// }

function colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

function uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

function playAudio(selector) { $(selector)[0].play(); }

function setTitle(title) { document.title = title; }

function createTimer(callback) {
    var timer = ($ as any).timer(function () {
        callback();
    });
    timer.set({ time: 1000, autostart: false });
    return timer;
}