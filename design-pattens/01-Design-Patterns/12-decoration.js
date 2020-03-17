// TODO:
class Vehicle {
    constructor(vehicleType) {
        this.vehicleType = vehicleType || 'car';
        this.model = 'default';
        this.license = '00000-000';
    }
}
const truck = new Vehicle('truck');

// New functionality we're decorating vehicle with
truck.setModel = function(modelName) {
    this.model = modelName;
};

truck.setColor = function(color) {
    this.color = color;
};

// The constructor to decorate
class MacBook {
    constructor() {
        this.cost = 997;
        this.screenSize = 11.6;
    }
    getCost() {
        return this.cost;
    }
    getScreenSize() {
        return this.screenSize;
    }
}

// Decorator 1
class Memory extends MacBook {
    constructor(macBook) {
        super();
        this.macBook = macBook;
    }

    getCost() {
        return this.macBook.getCost() + 75;
    }
}

// Decorator 2
class Engraving extends MacBook {
    constructor(macBook) {
        super();
        this.macBook = macBook;
    }

    getCost() {
        return this.macBook.getCost() + 200;
    }
}

// Decorator 3
class Insurance extends MacBook {
    constructor(macBook) {
        super();
        this.macBook = macBook;
    }

    getCost() {
        return this.macBook.getCost() + 250;
    }
}

// init main object
let mb = new MacBook();

// init decorators
mb = new Memory(mb);
mb = new Engraving(mb);
mb = new Insurance(mb);

// Outputs: 1522
console.log(mb.getCost());

// Outputs: 11.6
console.log(mb.getScreenSize());

// Pseudo-classical Decorators
const reminder = new Interface('List', ['summary', 'placeOrder']);

const properties = {
    name: 'Remember to buy the milk',
    date: '05/06/2016',
    actions: {
        summary() {
            return 'Remember to buy the milk, we are almost out!';
        },
        placeOrder() {
            return 'Ordering milk from your local grocery store';
        },
    },
};

// Now create a constructor implementing the above properties
// and methods

class Todo {
    constructor({ actions, name }) {
        Interface.ensureImplements(actions, reminder);

        this.name = name;
        this.methods = actions;
    }
}

// Create a new instance of our Todo constructor

const todoItem = new Todo(properties);

// Finally test to make sure these function correctly

console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());

// Outputs:
// Remember to buy the milk, we are almost out!
// Ordering milk from your local grocery store

//********************** Snippet 2 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class expression, using keyword class

const Macbook = class {
    //...
};

const MacbookWith4GBRam = class {};
const MacbookWith8GBRam = class {};
const MacbookWith4GBRamAndEngraving = class {};
const MacbookWith8GBRamAndEngraving = class {};
const MacbookWith8GBRamAndParallels = class {};
const MacbookWith4GBRamAndParallels = class {};
const MacbookWith8GBRamAndParallelsAndCase = class {};
const MacbookWith4GBRamAndParallelsAndCase = class {};
const MacbookWith8GBRamAndParallelsAndCaseAndInsurance = class {};
const MacbookWith4GBRamAndParallelsAndCaseAndInsurance = class {};

//********************** Snippet 3 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] Below we used new class declaration, using keyword class

const Macbook = new Interface('Macbook', [
    'addEngraving',
    'addParallels',
    'add4GBRam',
    'add8GBRam',
    'addCase',
]);

// A Macbook Pro might thus be represented as follows:
class MacbookPro {
    // implements Macbook
}

// [ES2015+] We still could use Object.prototype for adding new methods, because internally we use the same structure
MacbookPro.prototype = {
    addEngraving() {},
    addParallels() {},
    add4GBRam() {},
    add8GBRam() {},
    addCase() {},
    getPrice() {
        // Base price
        return 900.0;
    },
};

//********************** Snippet 4 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration

// Macbook decorator abstract decorator class

class MacbookDecorator {
    constructor(macbook) {
        Interface.ensureImplements(macbook, Macbook);
        this.macbook = macbook;
    }

    addEngraving() {
        return this.macbook.addEngraving();
    }

    addParallels() {
        return this.macbook.addParallels();
    }

    add4GBRam() {
        return this.macbook.add4GBRam();
    }

    add8GBRam() {
        return this.macbook.add8GBRam();
    }

    addCase() {
        return this.macbook.addCase();
    }

    getPrice() {
        return this.macbook.getPrice();
    }
}

class CaseDecorator extends MacbookDecorator {
    constructor(macbook) {
        super(macbook);
    }

    addCase() {
        return `${this.macbook.addCase()}Adding case to macbook`;
    }

    getPrice() {
        return this.macbook.getPrice() + 45.0;
    }
}

//********************** Snippet 6 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration

// Instantiation of the macbook
const myMacbookPro = new MacbookPro();

// Outputs: 900.00
console.log(myMacbookPro.getPrice());

// Decorate the macbook
const decoratedMacbookPro = new CaseDecorator(myMacbookPro);

// This will return 945.00
console.log(decoratedMacbookPro.getPrice());

//*******************************************************//
// Decorators With jQuery
//*******************************************************//

//********************** Snippet 1 **********************//
// [ES2015+] We used new keyword const for immutable constant declaration
// [ES2015+] We used new keyword let for mutable variable declaration
// [ES2015+] We used new arrow function syntax
// [ES2015+] We used new template literals for string interpolation

let decoratorApp = decoratorApp || {};

// define the objects we're going to use
decoratorApp = {
    defaults: {
        validate: false,
        limit: 5,
        name: 'foo',
        welcome() {
            console.log('welcome!');
        },
    },

    options: {
        validate: true,
        name: 'bar',
        helloWorld() {
            console.log('hello world');
        },
    },

    settings: {},

    printObj(obj) {
        const arr = [];
        let next;
        $.each(obj, (key, val) => {
            next = `${key}: `;
            next += $.isPlainObject(val) ? printObj(val) : val;
            arr.push(next);
        });

        return `{ ${arr.join(', ')} }`;
    },
};

// merge defaults and options, without modifying defaults explicitly
decoratorApp.settings = $.extend(
    {},
    decoratorApp.defaults,
    decoratorApp.options
);

// what we have done here is decorated defaults in a way that provides
// access to the properties and functionality it has to offer (as well as
// that of the decorator "options"). defaults itself is left unchanged

$('#log').append(
    decoratorApp.printObj(decoratorApp.settings) +
        +decoratorApp.printObj(decoratorApp.options) +
        +decoratorApp.printObj(decoratorApp.defaults)
);

// settings -- { validate: true, limit: 5, name: bar, welcome: function (){ console.log( "welcome!" ); },
// helloWorld: function (){ console.log( "hello world" ); } }
// options -- { validate: true, name: bar, helloWorld: function (){ console.log( "hello world" ); } }
// defaults -- { validate: false, limit: 5, name: foo, welcome: function (){ console.log("welcome!"); } }
