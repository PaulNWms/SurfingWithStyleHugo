import $ from "jquery";
import { ui, exerciseMarkupElement } from "./scheduled-metronome-globals";
import { MiniMetronome } from "./mini-metronome";
import { Schedule } from "./schedule";
import { EggTimer } from "./egg-timer";

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
    eggTimer = new EggTimer();
    metronome = new MiniMetronome();
    schedule = new Schedule(eggTimer, metronome);
    eggTimer.initialize(() => { schedule.update(); }, () => { schedule.lineCompleted(); });

    let w = window as any;
    w.onPlayPause = () => { schedule.onPlayPause(); };
    w.createLink = () => { schedule.createLink(); };

    registerScheduled(metronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
