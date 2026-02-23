import { Binding } from './lib/binding'

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

function populateDecks() {
    let subjects: string[] = loadFile(dirUrl + "subjects.txt")
    for (let subject of subjects) {
        deckElement[deckElement.length] = new Option(subject, subject)
    }
}

function updateStats() {
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
    ui.total = ui.remaining = ui.to = ui.count = fullDeck.length
    ui.from = 1
}

function selectRange() {
    partialDeck = fullDeck.slice(ui.from - 1, ui.to)
    partialDeck = shuffleCards(partialDeck)
    selectDeckDiv.style.display = "block"
    fromToDiv.style.display = "block"
    countDiv.style.display = "block"
    mainDiv.style.display = "none"
    ui.total = ui.remaining = ui.count = partialDeck.length
}

function start() {
    cards = partialDeck.slice(0, ui.count)
    cards = shuffleCards(cards)
    selectDeckDiv.style.display = "none"
    fromToDiv.style.display = "none"
    countDiv.style.display = "none"
    mainDiv.style.display = "block"
    updateStats()
    drawCard()
}

function drawCard() {
    if (cards.length) {
        current = cards.pop() as Card
    }
    else if (wrongPile.length) {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <p>${ui.remaining} cards remaining.</p>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button onclick="this.closest('dialog').close(); this.closest('dialog').remove();">OK</button>
            </div>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
        cards = shuffleCards(wrongPile)
        wrongPile = []
        current = cards.pop() as Card
    }
    else if (partialDeck.slice(ui.total).length === 0) {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <p>Congratulations!  Session complete</p>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button onclick="this.closest('dialog').close(); this.closest('dialog').remove();">Close</button>
            </div>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
        selectDeckDiv.style.display = "block"
        fromToDiv.style.display = "none"
        countDiv.style.display = "none"
        mainDiv.style.display = "none"
        return
    }
    else {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <p>Congratulations!</p>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button onclick="continueWithNextCards()">Next ${Math.min(ui.total, partialDeck.length)}</button>
                <button onclick="this.closest('dialog').close(); this.closest('dialog').remove();">OK</button>
            </div>
        `;
        document.body.appendChild(dialog);
        dialog.showModal();
        selectDeckDiv.style.display = "block"
        fromToDiv.style.display = "none"
        countDiv.style.display = "none"
        mainDiv.style.display = "none"
        return
    }
    showQuestion(current, false)
}

function continueWithNextCards() {
    const dialog = document.querySelector('dialog');
    if (dialog) {
        dialog.close();
        dialog.remove();
    }
    partialDeck = partialDeck.slice(ui.total)
    start()
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
new Binding({ object: ui, property: "total" }).addBinding(totalElement, "innerText");

let remainingElement: HTMLSpanElement = document.getElementById("remaining") as HTMLSpanElement
new Binding({ object: ui, property: "remaining" }).addBinding(remainingElement, "innerText");

let deckElement: HTMLSelectElement = document.getElementById("select-deck") as HTMLSelectElement

let fromElement: HTMLInputElement = document.getElementById("from") as HTMLInputElement
new Binding({ object: ui, property: "from" }).addBinding(fromElement, "value", "change");

let toElement: HTMLInputElement = document.getElementById("to") as HTMLInputElement
new Binding({ object: ui, property: "to" }).addBinding(toElement, "value", "change");

let countElement: HTMLInputElement = document.getElementById("count") as HTMLInputElement
new Binding({ object: ui, property: "count" }).addBinding(countElement, "value", "change");

let questionElement: HTMLDivElement = document.getElementById("question") as HTMLDivElement
new Binding({ object: ui, property: "question" }).addBinding(questionElement, "innerHTML");

let answerElement: HTMLDivElement = document.getElementById("answer") as HTMLDivElement
new Binding({ object: ui, property: "answer" }).addBinding(answerElement, "innerHTML");

let flipElement: HTMLButtonElement = document.getElementById("flip") as HTMLButtonElement

let rightElement: HTMLButtonElement = document.getElementById("right") as HTMLButtonElement

let wrongElement: HTMLButtonElement = document.getElementById("wrong") as HTMLButtonElement

let lines: string[] = []
let fullDeck: Card[] = []
let partialDeck: Card[] = []
let cards: Card[] = []
let current: Card
let wrongPile: Card[] = [];

(function () {
    populateDecks()
    selectDeckDiv.style.display = "block";
    fromToDiv.style.display = "none";
    countDiv.style.display = "none";
    mainDiv.style.display = "none";
    let w = window as any;
    w.selectDeck = selectDeck;
    w.selectRange = selectRange;
    w.start = start;
    w.flipCard = flipCard;
    w.setRight = setRight;
    w.setWrong = setWrong;
    w.continueWithNextCards = continueWithNextCards;
})();
