import $ from "jquery";
import { Action, Binding } from "./lib/binding";
import { MiniMetronome } from "./mini-metronome";
import { Schedule } from "./schedule";
import { EggTimer } from "./egg-timer";

let ui = {
    //    buttonFace: "▶️",
    //    timerDisplay: "25:00",
    display: "",
    endWithBell: true,
    exerciseMarkup: "",
    rest: 3,
    startWithRest: true,
    style: "",
}

let exerciseMarkupElement: HTMLElement = $(".exerciseMarkup")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseMarkup" }).addBinding(exerciseMarkupElement, "innerHTML");

let restElement: HTMLInputElement = $(".rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "rest" }).addBinding(restElement, "value");

let startWithRestElement: HTMLInputElement = $(".start-with-rest")[0] as HTMLInputElement
new Binding({ object: ui, property: "startWithRest" }).addBinding(startWithRestElement, "checked");

let endWithBellElement: HTMLInputElement = $(".end-with-bell")[0] as HTMLInputElement
new Binding({ object: ui, property: "endWithBell" }).addBinding(endWithBellElement, "checked");

let schedule: Schedule;
let metronome: MiniMetronome;
let eggTimer: EggTimer;

function playAudio(selector) { $(selector)[0].play(); }

function setTitle(title) { document.title = title; }

function registerListener(selector, dotnetHelper) {
    var element = $(".pendulum-parent");
    var audio = $(selector)[0];
    element.on("animationstart", function () { audio.play(); });
    element.on("animationiteration", function () {
        audio.play();
        if (element.css("animation-name") === "starting") {
            dotnetHelper.invokeMethodAsync("SetAnimationToRunning");
        }
    });
}

function registerScheduled(metronome: MiniMetronome, selector: string) {
    let direction = 1;
    let element = $(".pendulum-parent");
    let audio: HTMLAudioElement = $(selector)[0] as HTMLAudioElement;
    element.on("animationstart", function () { audio.play(); });
    element.on("animationiteration", function () {
        switch (element[0].getAttribute("data-metronome-state")) {
            case "starting":
                audio.play();
                direction = 1;
                metronome.animation = "running";
                break;
            case "running":
                audio.play();
                direction = (direction + 1) % 2;
                break;
            case "makeitstop":
                if (direction) {
                    metronome.animation = "stopping-rl";
                } else {
                    metronome.animation = "stopping-lr";
                }
                break;
            case "stopping-lr":
            case "stopping-rl":
            case "stopped":
                metronome.animation = "stopped";
                break;
            default:
                alert("metronome-state invalid");
                break;
        }
    });
}

function registerFormRowListener(html) {
    $(".form-control").off("onblur");
    $(".add-schedule-row").off("click");
    $(".delete-schedule-row").off("click");
    $(".form-control").blur(function () {
        let index: number = $(".form-control").index(this);
        schedule.parseControl(index);
        ui.exerciseMarkup = schedule.toHtml();
        registerFormRowListener(html);
    });
    $(".add-schedule-row").click(function () {
        let index: number = $(".add-schedule-row").index(this);
        schedule.appendRow(index);
        ui.exerciseMarkup = schedule.toHtml();
        registerFormRowListener(html);
    });
    $(".delete-schedule-row").click(function () {
        let index: number = $(".delete-schedule-row").index(this);
        schedule.deleteRow(index);
        ui.exerciseMarkup = schedule.toHtml();
        registerFormRowListener(html);
    });
}

$(document).ready(function () {
    eggTimer = new EggTimer(() => { alert("eggTimer: stateHasChanged"); })
    metronome = new MiniMetronome(ui);
    schedule = new Schedule(ui, () => { alert("schedule: stateHasChanged"); }, eggTimer, metronome);
    eggTimer.initialize(schedule.update, schedule.lineCompleted);

    let w = window as any;
    w.onPlayPause = function() { schedule.onPlayPause(); }
    w.createLink = function() { schedule.createLink(); }

    registerScheduled(metronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
