let substitutes: Map<string, string> = new Map<string, string>([
    [ "([aAeEiIoOuU])ss([aeiou])", "$1sſ$2"], [ "ss", "ß" ], [ "sz", "ß" ],  [ "s([abcsefghijklmnopqrtuvwxy])", "ſ$1" ],
    [ "and", "&" ],
    [ "that", "ꝥ" ], [ "That", "Ꝥ" ], [ "THAT", "Ꝥ" ],
    [ "th", "þ" ], [ "Th", "Þ" ], [ "TH", "Þ" ],
    [ "th", "ð" ], [ "Th", "Ð" ], [ "TH", "Ð" ],
    [ "ae", "æ" ], [ "Ae", "Æ" ], [ "AE", "Æ" ],
    [ "oe", "œ" ], [ "Oe", "Œ" ], [ "OE", "Œ" ],
    [ "w", "ƿ" ], [ "W", "Ƿ" ],
    [ "gh", "ȝ" ], [ "GH", "Ȝ" ],
    [ "ng", "ŋ" ], [ "NG", "Ŋ" ]
]);

function convert() {
    let p: HTMLTextAreaElement = document.getElementById("prose") as HTMLTextAreaElement;
    let result: string = p.value;

    substitutes.forEach((value: string, key: string) => {
        let regex: RegExp = new RegExp(key, "g");
        let res = result.replace(regex, value);
        result = res
    });

    let q: HTMLTextAreaElement = document.getElementById("converted") as HTMLTextAreaElement;
    q.value = result
}

(function () {
    let w = window as any;
    w.convert = convert;
})();
