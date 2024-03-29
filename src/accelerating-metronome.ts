import { ui, exerciseMarkupElement, MetronomeState } from "./sm-globals";
import { AcceleratingMetronome } from "./am-metronome";
import { AcceleratingSchedule } from "./am-schedule";
import { EggTimer } from "./egg-timer";
import { Click } from "./click";

const INTERRUPT_INTERVAL: string = "10ms"
let schedule: AcceleratingSchedule;
let eggTimer: EggTimer;


function registerScheduled(metronome: AcceleratingMetronome, selector: string) {
    metronome.direction = 1;
    let element = $(".interrupt-timer");
    let audio: HTMLAudioElement = $(selector)[0] as HTMLAudioElement;
    let then: number = Date.now();
    element[0].style.animationDuration = INTERRUPT_INTERVAL;
    element.on("animationiteration", () => {
        switch (metronome.state) {
            case MetronomeState.Starting:
                audio.play().then(() => {
                    let now = Date.now();
                    let click: Click | undefined = schedule.GetClick();
                    if (click !== undefined) {
                        then = now + click.durationMS;
                        metronome.tempo = click.tempo;
                        metronome.durationMS = click.durationMS;
                        metronome.direction = 1;
                        metronome.state = MetronomeState.Running;
                        metronome.setStyle();
                    }
                });
                break;
            case MetronomeState.Running:
                if (eggTimer.isRunning) {
                    let now = Date.now();
                    if (now >= then) {
                        audio.play().then(() => {
                            let click: Click | undefined = schedule.GetClick();
                            if (click === undefined) {
                                metronome.state = MetronomeState.MakeItStop;
                            } else {
                                then = Date.now() + click.durationMS;
                                metronome.tempo = click.tempo;
                                metronome.durationMS = click.durationMS;
                                metronome.direction = (metronome.direction + 1) % 2;
                                metronome.state = MetronomeState.Running;
                                metronome.setStyle();
                            }
                        });
                    }
                }
                break;
            case MetronomeState.MakeItStop:
                if (metronome.direction) {
                    metronome.state = MetronomeState.StoppingRL;
                } else {
                    metronome.state = MetronomeState.StoppingLR;
                }
                metronome.setStyle();
                break;
            case MetronomeState.StoppingLR:
            case MetronomeState.StoppingRL:
            case MetronomeState.Stopped:
                // metronome.animationName = AnimationName.stopped;
                // metronome.animationPlayState = AnimationPlayState.paused;
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
    schedule = new AcceleratingSchedule(eggTimer);
    schedule.metronome = new AcceleratingMetronome();
    eggTimer.initialize(() => { schedule.update(); }, () => { schedule.lineCompleted(); });

    w.onPlayPause = () => { schedule.onPlayPause(); };
    w.createLink = () => { schedule.createLink(); };

    registerScheduled(schedule.metronome, ".audio-click");
    registerFormRowListener(exerciseMarkupElement);
});
