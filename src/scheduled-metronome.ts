import { ui, exerciseMarkupElement, MetronomeState, AnimationName, AnimationPlayState } from "./sm-globals";
import { ScheduledMetronome } from "./sm-metronome";
import { Schedule } from "./sm-schedule";
import { EggTimer } from "./egg-timer";

let schedule: Schedule;
let eggTimer: EggTimer;

function registerScheduled(metronome: ScheduledMetronome, selector: string) {
    let direction = 1;
    let element = $(".pendulum-parent")
    let audio: HTMLAudioElement = $(selector)[0] as HTMLAudioElement;
    element.on("animationstart", () => {
        if (metronome.isRunning) {
            audio.play().then(() => {
                direction = 1;
            });
        }
    });
    element.on("animationiteration", () => {
        switch (metronome.state) {
            case MetronomeState.Starting:
                direction = 1;
                metronome.animationName = AnimationName.running;
                metronome.state = MetronomeState.Running;
                metronome.setStyle();
                break;
            case MetronomeState.Running:
                audio.play().then(() => {
                    direction = (direction + 1) % 2;
                });
                break;
            case MetronomeState.MakeItStop:
                if (direction) {
                    metronome.animationName = AnimationName.stopping_rl;
                    metronome.state = MetronomeState.StoppingRL;
                } else {
                    metronome.animationName = AnimationName.stopping_lr
                    metronome.state = MetronomeState.StoppingLR;
                }
                metronome.setStyle();
                break;
            case MetronomeState.StoppingLR:
            case MetronomeState.StoppingRL:
            case MetronomeState.Stopped:
                metronome.animationName = AnimationName.stopped;
                metronome.animationPlayState = AnimationPlayState.paused;
                metronome.state = MetronomeState.Stopped;
                metronome.setStyle();
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
    schedule = new Schedule(eggTimer);
    eggTimer.initialize(() => { schedule.update(); }, () => { schedule.lineCompleted(); });

    w.onPlayPause = () => { schedule.onPlayPause(); };
    w.createLink = () => { schedule.createLink(); };

    registerScheduled(schedule.metronome as ScheduledMetronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
