import $ from "jquery";
import { ui, exerciseMarkupElement, MetronomeState, AnimationName, AnimationPlayState } from "./scheduled-metronome-globals";
import { MiniMetronome } from "./mini-metronome";
import { Schedule } from "./schedule";
import { AcceleratingSchedule } from "./accelerating-schedule";
import { EggTimer } from "./egg-timer";

let schedule: Schedule | AcceleratingSchedule;
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
        switch (ui.metronomeState) {
            case MetronomeState[MetronomeState.Starting]:
                audio.play();
                direction = 1;
                metronome.animationName = AnimationName.running;
                ui.metronomeState = MetronomeState[MetronomeState.Running];
                break;
            case MetronomeState[MetronomeState.Running]:
                audio.play();
                direction = (direction + 1) % 2;
                metronome.animationDirection = direction ? "normal" : "reverse";
                metronome.animationName = AnimationName.running;
                metronome.tempo = schedule.CalculateTempo();
                break;
            case MetronomeState[MetronomeState.MakeItStop]:
                if (direction) {
                    metronome.animationName = AnimationName.stopping_rl;
                    ui.metronomeState = MetronomeState[MetronomeState.StoppingRL];
                } else {
                    metronome.animationName = AnimationName.stopping_lr
                    ui.metronomeState = MetronomeState[MetronomeState.StoppingLR];
                }
                break;
            case MetronomeState[MetronomeState.StoppingLR]:
            case MetronomeState[MetronomeState.StoppingRL]:
            case MetronomeState[MetronomeState.Stopped]:
                metronome.animationName = AnimationName.stopped;
                metronome.animationPlayState = AnimationPlayState.paused;
                ui.metronomeState = MetronomeState[MetronomeState.Stopped];
                break;
            default:
                console.log("data-metronome-state invalid");
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
    let w = window as any;
    eggTimer = new EggTimer();
    metronome = new MiniMetronome();
    if (w.accelerating) {
        schedule = new AcceleratingSchedule(eggTimer, metronome);
    }
    else {
        schedule = new Schedule(eggTimer, metronome);
    }
    eggTimer.initialize(() => { schedule.update(); }, () => { schedule.lineCompleted(); });

    w.onPlayPause = () => { schedule.onPlayPause(); };
    w.createLink = () => { schedule.createLink(); };

    registerScheduled(metronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
