var Binding = /** @class */ (function () {
    function Binding(b) {
        var _this = this;
        this.elementBindings = [];
        this.value = b.object[b.property];
        this.valueGetter = function () {
            return _this.value;
        };
        this.valueSetter = function (val) {
            _this.value = val;
            for (var i = 0; i < _this.elementBindings.length; i++) {
                var binding = _this.elementBindings[i];
                binding.element[binding.attribute] = val;
            }
        };
        // For 1-way binding, omit 'event'
        this.addBinding = function (element, attribute, event) {
            var binding = {
                element: element,
                attribute: attribute,
                event: null
            };
            if (event) {
                element.addEventListener(event, function (event) {
                    _this.valueSetter(element[attribute]);
                });
                binding.event = event;
            }
            this.elementBindings.push(binding);
            element[attribute] = _this.value;
            return _this;
        };
        Object.defineProperty(b.object, b.property, {
            get: this.valueGetter,
            set: this.valueSetter
        });
        b.object[b.property] = this.value;
    }
    return Binding;
}());
var Card = /** @class */ (function () {
    function Card() {
        this.front = '';
        this.back = [];
    }
    return Card;
}());
function loadFile(file) {
    var rawFile = new XMLHttpRequest();
    var text = 'Failed to get file contents.';
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                text = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    var lines = text.split("\n");
    var trimmed = lines.map(function (line) { return line.trim(); });
    return trimmed;
}
function range(start, stop) {
    var array = [];
    var length = stop - start;
    for (var i = 0; i <= length; i++) {
        array[i] = start;
        start++;
    }
    return array;
}
function lineConcat(lines) {
    var result = "";
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (result.length > 0) {
            result = result.concat("\n");
        }
        result = result.concat(line);
    }
    return result;
}
function showQuestion(card, reverse) {
    if (reverse) {
        ui.question = lineConcat(card.back);
    }
    else {
        if (card.back.length > 1) {
            ui.question = card.front + " (" + card.back.length + ")";
        }
        else {
            ui.question = card.front;
        }
    }
    if (ui.question.match("^\\$\\$.*\\$\\$$")) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionElement]);
    }
    ui.answer = "\n";
}
function showAnswer(card, reverse) {
    if (reverse) {
        if (card.back.length > 1) {
            ui.answer = card.front + " (" + card.back.length + ")";
        }
        else {
            ui.answer = card.front;
        }
    }
    else {
        ui.answer = lineConcat(card.back);
    }
    if (ui.answer.match("^\\$\\$.*\\$\\$$")) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, answerElement]);
    }
}
function getCards(lines) {
    var cards = [];
    var card = new Card();
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line = lines_2[_i];
        if (line.trim().length === 0) {
            cards.push(card);
            card = new Card();
            continue;
        }
        else {
            if (!card.front) {
                card.front = line;
            }
            else {
                card.back.push(line);
            }
        }
    }
    if (card.front) {
        cards.push(card);
    }
    return cards;
}
function shuffleCards(cards) {
    var _a;
    var array = cards.slice();
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
var dirUrl = window.location.protocol + "//" + window.location.host + "/flashcards/";
var ui = {
    total: 0,
    remaining: 0,
    question: "",
    answer: "",
    from: 0,
    to: 0,
    count: 0
};
var hiddenJaxDiv = document.getElementById("hidden-jax");
var selectDeckDiv = document.getElementById("selectDeckDiv");
var fromToDiv = document.getElementById("fromToDiv");
var countDiv = document.getElementById("countDiv");
var mainDiv = document.getElementById("mainDiv");
var totalElement = document.getElementById("total");
new Binding({ object: ui, property: "total" }).addBinding(totalElement, "innerText");
var remainingElement = document.getElementById("remaining");
new Binding({ object: ui, property: "remaining" }).addBinding(remainingElement, "innerText");
var deckElement = document.getElementById("select-deck");
var fromElement = document.getElementById("from");
new Binding({ object: ui, property: "from" }).addBinding(fromElement, "value", "change");
var toElement = document.getElementById("to");
new Binding({ object: ui, property: "to" }).addBinding(toElement, "value", "change");
var countElement = document.getElementById("count");
new Binding({ object: ui, property: "count" }).addBinding(countElement, "value", "change");
var questionElement = document.getElementById("question");
new Binding({ object: ui, property: "question" }).addBinding(questionElement, "innerText");
var answerElement = document.getElementById("answer");
new Binding({ object: ui, property: "answer" }).addBinding(answerElement, "innerText");
var flipElement = document.getElementById("flip");
var rightElement = document.getElementById("right");
var wrongElement = document.getElementById("wrong");
var lines = [];
var fullDeck = [];
var partialDeck = [];
var cards = [];
var current;
var selected = 0;
var correct = 0;
var wrongPile = [];
function populateDecks() {
    var subjects = loadFile(dirUrl + "subjects.txt");
    for (var _i = 0, subjects_1 = subjects; _i < subjects_1.length; _i++) {
        var subject = subjects_1[_i];
        deckElement[deckElement.length] = new Option(subject, subject);
    }
}
function updateStats() {
    selected = 0;
    correct = 0;
    ui.total = ui.count;
    ui.remaining = cards.length + wrongPile.length;
}
function selectDeck() {
    var selectedDeck = deckElement.options[deckElement.selectedIndex].value;
    var fileUrl = dirUrl + selectedDeck + ".txt";
    lines = loadFile(fileUrl);
    fullDeck = getCards(lines);
    selectDeckDiv.style.display = "block";
    fromToDiv.style.display = "block";
    countDiv.style.display = "none";
    mainDiv.style.display = "none";
    ui.total = ui.remaining = ui.to = ui.count = selected = fullDeck.length;
    ui.from = 1;
}
function selectRange() {
    partialDeck = fullDeck.slice(ui.from - 1, ui.to);
    selectDeckDiv.style.display = "block";
    fromToDiv.style.display = "block";
    countDiv.style.display = "block";
    mainDiv.style.display = "none";
    ui.total = ui.remaining = ui.count = selected = partialDeck.length;
}
function start() {
    cards = shuffleCards(partialDeck);
    cards = cards.slice(0, ui.count);
    selectDeckDiv.style.display = "none";
    fromToDiv.style.display = "none";
    countDiv.style.display = "none";
    mainDiv.style.display = "block";
    drawCard();
}
function drawCard() {
    if (cards.length) {
        current = cards.pop();
    }
    else if (wrongPile.length) {
        alert("" + ui.remaining + " cards remaining.");
        cards = wrongPile;
        wrongPile = [];
        current = cards.pop();
    }
    else {
        alert("Congratulations!");
        selectDeckDiv.style.display = "block";
        fromToDiv.style.display = "none";
        countDiv.style.display = "none";
        mainDiv.style.display = "none";
    }
    showQuestion(current, false);
}
function flipCard() {
    flipElement.setAttribute("disabled", "true");
    rightElement.removeAttribute("disabled");
    wrongElement.removeAttribute("disabled");
    showAnswer(current, false);
}
function setRight() {
    flipElement.removeAttribute("disabled");
    rightElement.setAttribute("disabled", "true");
    wrongElement.setAttribute("disabled", "true");
    updateStats();
    drawCard();
}
function setWrong() {
    flipElement.removeAttribute("disabled");
    rightElement.setAttribute("disabled", "true");
    wrongElement.setAttribute("disabled", "true");
    wrongPile.push(current);
    updateStats();
    drawCard();
}
(function () {
    populateDecks();
    selectDeckDiv.style.display = "block";
    fromToDiv.style.display = "none";
    countDiv.style.display = "none";
    mainDiv.style.display = "none";
})();
