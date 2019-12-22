class Binding {
    elementBindings: any[];
    value: any;
    valueGetter: () => any;
    valueSetter: (val: any) => void;
    addBinding: (element: any, attribute: any, event: any) => this;

    constructor(b: any) {
        let _this = this
        this.elementBindings = []
        this.value = b.object[b.property]
        this.valueGetter = function () {
            return _this.value;
        }
        this.valueSetter = function (val: any) {
            _this.value = val
            for (var i = 0; i < _this.elementBindings.length; i++) {
                var binding = _this.elementBindings[i]
                binding.element[binding.attribute] = val
            }
        }
        // For 1-way binding, omit 'event'
        this.addBinding = function (element: any, attribute: any, event: any) {
            let binding = {
                element: element,
                attribute: attribute,
                event: null
            }
            if (event) {
                element.addEventListener(event, function (event: any) {
                    _this.valueSetter(element[attribute]);
                })
                binding.event = event
            }
            this.elementBindings.push(binding)
            element[attribute] = _this.value
            return _this
        }

        Object.defineProperty(b.object, b.property, {
            get: this.valueGetter,
            set: this.valueSetter
        })

        b.object[b.property] = this.value;
    }
}

class Card {
    public front: string = ''
    public back: string[] = []
}

function loadFile(file: string): string[] {
    let rawFile = new XMLHttpRequest()
    let text = 'Failed to get file contents.'
    rawFile.open("GET", file, false)
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                text = rawFile.responseText
            }
        }
    }
    rawFile.send(null)
    let lines = text.split("\n")
    let trimmed = lines.map(line => line.trim())
    return trimmed
}

function range(start: number, stop: number) {
    let array: number[] = []
    let length: number = stop - start
    for (let i = 0; i <= length; i++) {
        array[i] = start
        start++
    }
    return array
}

function lineConcat(lines: string[]) {
    let result: string = ""
    for (let line of lines) {
        if (result.length > 0) { result = result.concat("\n"); }
        result = result.concat(line)
    }
    return result
}

function showQuestion(card: Card, reverse: boolean) {
    if (reverse) {
        ui.question = lineConcat(card.back)
    }
    else {
        if (card.back.length > 1) {
            ui.question = `${card.front} (${card.back.length})`
        }
        else {
            ui.question = card.front
        }
    }
    ui.answer = "\n"
}

function showAnswer(card: Card, reverse: boolean) {
    if (reverse) {
        if (card.back.length > 1) {
            ui.answer = `${card.front} (${card.back.length})`
        }
        else {
            ui.answer = card.front
        }
    }
    else {
        ui.answer = lineConcat(card.back)
    }
}

function getCards(lines: string[]): Card[] {
    let cards: Card[] = []
    let card: Card = new Card()

    for (let line of lines) {
        if (line.trim().length === 0) {
            cards.push(card)
            card = new Card()
            continue
        }
        else {
            if (!card.front) {
                card.front = line
            }
            else {
                card.back.push(line)
            }
        }
    }

    if (card.front) {
        cards.push(card)
    }

    return cards
}

function shuffleCards(cards: Card[]): Card[] {
    let array = cards.slice()
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const dirUrl: string = window.location.protocol + "//" + window.location.host + "/flashcards/"
let ui = {
    total: 0,
    remaining: 0,
    question: "",
    answer: "",
    from: 0,
    to: 0,
    count: 0
}

let selectDeckDiv: HTMLDivElement = document.getElementById("selectDeckDiv") as HTMLDivElement
let fromToDiv: HTMLDivElement = document.getElementById("fromToDiv") as HTMLDivElement
let countDiv: HTMLDivElement = document.getElementById("countDiv") as HTMLDivElement
let mainDiv: HTMLDivElement = document.getElementById("mainDiv") as HTMLDivElement

let totalElement: HTMLSpanElement = document.getElementById("total") as HTMLSpanElement
new (Binding as any)({ object: ui, property: "total" }).addBinding(totalElement, "innerText");

let remainingElement: HTMLSpanElement = document.getElementById("remaining") as HTMLSpanElement
new (Binding as any)({ object: ui, property: "remaining" }).addBinding(remainingElement, "innerText");

let deckElement: HTMLSelectElement = document.getElementById("select-deck") as HTMLSelectElement

let fromElement: HTMLInputElement = document.getElementById("from") as HTMLInputElement
new (Binding as any)({ object: ui, property: "from" }).addBinding(fromElement, "value", "change");

let toElement: HTMLInputElement = document.getElementById("to") as HTMLInputElement
new (Binding as any)({ object: ui, property: "to" }).addBinding(toElement, "value", "change");

let countElement: HTMLInputElement = document.getElementById("count") as HTMLInputElement
new (Binding as any)({ object: ui, property: "count" }).addBinding(countElement, "value", "change");

let questionElement: HTMLDivElement = document.getElementById("question") as HTMLDivElement
new (Binding as any)({ object: ui, property: "question" }).addBinding(questionElement, "innerText");

let answerElement: HTMLDivElement = document.getElementById("answer") as HTMLDivElement
new (Binding as any)({ object: ui, property: "answer" }).addBinding(answerElement, "innerText");

let flipElement: HTMLButtonElement = document.getElementById("flip") as HTMLButtonElement

let rightElement: HTMLButtonElement = document.getElementById("right") as HTMLButtonElement

let wrongElement: HTMLButtonElement = document.getElementById("wrong") as HTMLButtonElement

let lines: string[] = []
let fullDeck: Card[] = []
let partialDeck: Card[] = []
let cards: Card[] = []
let current: Card
let selected: number = 0
let correct: number = 0
let wrongPile: Card[] = []

function populateDecks() {
    let subjects: string[] = loadFile(dirUrl + "subjects.txt")
    for (let subject of subjects) {
        deckElement[deckElement.length] = new Option(subject, subject)
    }
}

function updateStats() {
    selected = 0
    correct = 0
    ui.total = ui.count
    ui.remaining = cards.length + wrongPile.length
}

function selectDeck() {
    let selectedDeck: string = deckElement.options[deckElement.selectedIndex].value
    let fileUrl = dirUrl + selectedDeck + ".txt"
    lines = loadFile(fileUrl)
    fullDeck = getCards(lines)
    selectDeckDiv.style.display = "block"
    fromToDiv.style.display = "block"
    countDiv.style.display = "none"
    mainDiv.style.display = "none"
    ui.total = ui.remaining = ui.to = ui.count = selected = fullDeck.length
    ui.from = 1
}

function selectRange() {
    partialDeck = fullDeck.slice(ui.from - 1, ui.to)
    selectDeckDiv.style.display = "block"
    fromToDiv.style.display = "block"
    countDiv.style.display = "block"
    mainDiv.style.display = "none"
    ui.total = ui.remaining = ui.count = selected = partialDeck.length
}

function start() {
    cards = shuffleCards(partialDeck)
    cards = cards.slice(0, ui.count)
    selectDeckDiv.style.display = "none"
    fromToDiv.style.display = "none"
    countDiv.style.display = "none"
    mainDiv.style.display = "block"
    drawCard()
}

function drawCard() {
    if (cards.length) {
        current = cards.pop() as Card
    }
    else if (wrongPile.length) {
        alert("" + ui.remaining + " cards remaining.")
        cards = wrongPile
        wrongPile = []
        current = cards.pop() as Card
    }
    else {
        alert("Congratulations!")
        selectDeckDiv.style.display = "block"
        fromToDiv.style.display = "none"
        countDiv.style.display = "none"
        mainDiv.style.display = "none"
    }
    showQuestion(current, false)
}

function flipCard() {
    flipElement.setAttribute("disabled", "true")
    rightElement.removeAttribute("disabled")
    wrongElement.removeAttribute("disabled")
    showAnswer(current, false)
}

function setRight() {
    flipElement.removeAttribute("disabled")
    rightElement.setAttribute("disabled", "true")
    wrongElement.setAttribute("disabled", "true")
    updateStats()
    drawCard()
}

function setWrong() {
    flipElement.removeAttribute("disabled")
    rightElement.setAttribute("disabled", "true")
    wrongElement.setAttribute("disabled", "true")
    wrongPile.push(current)
    updateStats()
    drawCard()
}

(function () {
    populateDecks()
    selectDeckDiv.style.display = "block"
    fromToDiv.style.display = "none"
    countDiv.style.display = "none"
    mainDiv.style.display = "none"
})()