import $ from "jquery";
import { Action, Binding } from "./lib/binding";
import { MiniMetronome } from "./mini-metronome";
import { Schedule } from "./schedule";
import { EggTimer } from "./egg-timer";

let ui = {
    //    buttonFace: "▶️",
    //    timerDisplay: "25:00",
    display: "",
    formattedDuration: "25",
    exerciseMarkup: "",
    style: "",
}

// let formattedDurationElement: HTMLInputElement = $("#formatted-duration")[0] as HTMLInputElement
// new Binding({ object: ui, property: "formattedDuration" }).addBinding(formattedDurationElement, "value");

let exerciseMarkupElement: HTMLElement = $(".exerciseMarkup")[0] as HTMLElement
new Binding({ object: ui, property: "exerciseMarkup" }).addBinding(exerciseMarkupElement, "innerHTML");

let schedule: Schedule;
let metronome: MiniMetronome;
let eggTimer: EggTimer;

function colorBody() { $("body").css({ "background-color": "#001912", "color": "#009871" }); }

function uncolorBody() { $("body").css({ "background-color": "", "color": "" }); }

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
        console.log("blur form-control " + index);
        schedule.parseControl(index);
        ui.exerciseMarkup = schedule.toHtml();
        registerFormRowListener(html);
    });
    $(".add-schedule-row").click(function () {
        let index: number = $(".add-schedule-row").index(this);
        console.log("add form-control " + index);
        schedule.insertRow(index);
        ui.exerciseMarkup = schedule.toHtml();
        //        $(this).parent().parent().after(html);
        registerFormRowListener(html);
        //        $(this).parent().parent().next().children().children(".tempo").focus();
    });
    $(".delete-schedule-row").click(function () {
        let index: number = $(".delete-schedule-row").index(this);
        console.log("delete form-control " + index);
        schedule.deleteRow(index);
        ui.exerciseMarkup = schedule.toHtml();
        registerFormRowListener(html);
        //        var row = $(this).parent().parent();
        //        if (row.siblings().length > 0) {
        //            row.remove();
        //        }
    });
}

$(document).ready(function () {
    eggTimer = new EggTimer(() => { alert("eggTimer: stateHasChanged"); })
    metronome = new MiniMetronome(ui);
    schedule = new Schedule(() => { alert("schedule: stateHasChanged"); }, eggTimer, metronome);
    eggTimer.initialize(schedule.update, schedule.lineCompleted);

    let w = window as any;
    w.onPlayPause = schedule.onPlayPause;
    w.createLink = schedule.createLink;
    ui.exerciseMarkup = schedule.toHtml();

    registerScheduled(metronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
