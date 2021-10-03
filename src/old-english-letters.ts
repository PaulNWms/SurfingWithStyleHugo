let ampersand = document.getElementById("ampersand") as HTMLInputElement;
let ampersandRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /(\W)[aA][nN][dD](\W)/g, "$1&$2" ],]);

let that = document.getElementById("thornWithStroke") as HTMLInputElement;
let thatRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /(\W)t[hH][aA][tT](\W)/g, "$1ꝥ$2" ], [ /(\W)T[hH][aA][tT](\W)/g, "$1Ꝥ$2" ],]);

let the = document.getElementById("theShorthand") as HTMLInputElement;
let theRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /(\W)t[hH][eE](\W)/g, "$1þͤ$2"], [ /(\W)T[hH][eE](\W)/g, "$1Þͤ$2" ],]);

let ash = document.getElementById("ash") as HTMLInputElement;
let ashRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /a[eE]/g, "æ" ], [ /A[eE]/g, "Æ" ],]);

let eng = document.getElementById("eng") as HTMLInputElement;
let engRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /ng/g, "ŋ" ], [ /NG/g, "Ŋ" ],]);

let eth = document.getElementById("eth") as HTMLInputElement;

let ethel = document.getElementById("ethel") as HTMLInputElement;
let ethelRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /o[eE]/g, "œ" ], [ /O[eE]/g, "Œ" ],]);

let gh = document.getElementById("gh2yogh") as HTMLInputElement;
let ghRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /gh/g, "ȝ" ], [ /G[hH]/g, "Ȝ" ],]);

let jg = document.getElementById("j2insularG") as HTMLInputElement;
let jgRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /j/g, "ᵹ"], [ /J/g, "Ᵹ"],]);

let longS = document.getElementById("longS") as HTMLInputElement;
let longSRegex: Map<RegExp, string> = new Map<RegExp, string>([
    [ /ss([abcdeghijhlmnopqrstuvwxyz-])/g, "ſſ$1"],
    [ /([\WabcdeghijhlmnopqrstuvwxyzABCDEGHIJKLMNOPQRSTUVWXYZ])s([abcdeghijhlmnopqrstuvwxyz-])/g, "$1ſ$2"],]);

let thorn = document.getElementById("thorn") as HTMLInputElement;

let wynn = document.getElementById("wynn") as HTMLInputElement;
let wynnRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /w/g, "ƿ" ], [ /W/g, "Ƿ" ],]);

let xg = document.getElementById("x2insularG") as HTMLInputElement;
let xgRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /x/g, "ᵹ"], [ /X/g, "Ᵹ"],]);

let y = document.getElementById("y2yogh") as HTMLInputElement;
let yRegex: Map<RegExp, string> = new Map<RegExp, string>([[ /y/g, "ȝ" ], [ /Y/g, "Ȝ" ],]);

function apply(result: string, substitutes: Map<RegExp, string>): string {
    substitutes.forEach((value: string, regex: RegExp) => { result = result.replace(regex, value); });
    return result;
}

function applyThornEth(result: string): string {
    let substitutes: Map<RegExp, string> = new Map<RegExp, string>([]);
    if (thorn.checked && eth.checked) {
        substitutes = new Map<RegExp, string>([
            [ /(\W)th/g, "$1þ" ], [ /(\W)T[hH]/g, "$1Þ" ],
            [ /t[hH]/g, "ð" ], [ /T[hH]/g, "Ð" ],
        ]);
    }
    else if (thorn.checked) {
        substitutes = new Map<RegExp, string>([[ /th/g, "þ" ], [ /T[hH]/g, "Þ" ],]);
    }
    else if (eth.checked) {
        substitutes = new Map<RegExp, string>([[ /t[hH]/g, "ð" ], [ /T[hH]/g, "Ð" ],]);
    }
    return apply(result, substitutes);
}
 
function convert() {
    let p: HTMLTextAreaElement = document.getElementById("prose") as HTMLTextAreaElement;
    let result: string = p.value;

    if (ampersand.checked) { result = apply(result, ampersandRegex); }
    if (that.checked) { result = apply(result, thatRegex); }
    if (the.checked) { result = apply(result, theRegex); }

    result = applyThornEth(result);

    if (ash.checked) { result = apply(result, ashRegex); }
    if (eng.checked) { result = apply(result, engRegex); }
    if (ethel.checked) { result = apply(result, ethelRegex); }
    if (gh.checked) { result = apply(result, ghRegex); }
    if (jg.checked) { result = apply(result, jgRegex); }
    if (longS.checked) { result = apply(result, longSRegex); }
    if (wynn.checked) { result = apply(result, wynnRegex); }
    if (xg.checked) { result = apply(result, xgRegex); }
    if (y.checked) { result = apply(result, yRegex); }

    let q: HTMLTextAreaElement = document.getElementById("converted") as HTMLTextAreaElement;
    q.value = result
}

(function () {
    let w = window as any;
    w.convert = convert;
})();
