type Action = () => void;

type Action1 = (p1: any) => void;

type Action2 = (p1: any, p2: any) => void;

class Binding {
    elementBindings: any[];
    value: any;
    valueGetter: () => any;
    valueSetter: (val: any) => void;
    addBinding: (element: HTMLElement, attribute: string, event?: string) => this;

    constructor(b: any) {
        let _this = this;
        this.elementBindings = [];
        this.value = b.object[b.property];
        this.valueGetter = function () {
            return _this.value;
        }
        this.valueSetter = function (val: any) {
            _this.value = val;
            for (var i = 0; i < _this.elementBindings.length; i++) {
                var binding = _this.elementBindings[i];
                binding.element[binding.attribute] = val;
            }
        }
        // For 1-way binding, set 'event' to null
        this.addBinding = function (element: HTMLElement, attribute: string, event?: string) {
            let binding = {
                element: element,
                attribute: attribute,
                event: event
            }
            if (event) {
                element.addEventListener(event, function (event: any) {
                    _this.valueSetter(element[attribute]);
                })
                binding.event = event;
            }
            this.elementBindings.push(binding);
            element[attribute] = _this.value;
            return _this;
        }

        Object.defineProperty(b.object, b.property, {
            get: this.valueGetter,
            set: this.valueSetter
        });

        b.object[b.property] = this.value;
    }
}

export { Binding, Action, Action1, Action2 }