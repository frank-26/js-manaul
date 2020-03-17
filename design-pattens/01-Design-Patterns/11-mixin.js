class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = 'male';
    }
}

const clark = new Person('Clark', 'Kent');

class Superhero extends Person {
    constructor(firstName, lastName, powers) {

        super(firstName, lastName);

        this.powers = powers;
    }
}

const superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);
console.log(superman);


// Mixins
const myMixins = {
    moveUp() {
        console.log('move up');
    },

    moveDown() {
        console.log('move down');
    },

    stop() {
        console.log('stop! in the name of love!');
    },
};
// A skeleton carAnimator constructor
class CarAnimator {
    moveLeft() {
        console.log('move left');
    }
}
// A skeleton personAnimator constructor
class PersonAnimator {
    moveRandomly() {
    }
}
// [ES2015+] New Object.assign() method copies enumerable and own properties 
//from a source object (second argument) to a target object (first argument).
Object.assign(CarAnimator.prototype, myMixins);
Object.assign(PersonAnimator.prototype, myMixins);

// Create a new instance of carAnimator
const myAnimator = new CarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// Define a simple Car constructor
class Car {
    constructor({ model, color }) {
        this.model = model || 'no model provided';
        this.color = color || 'no colour provided';
    }
}

// Mixin
class Mixin {
    driveForward() {
        console.log('drive forward');
    }

    driveBackward() {
        console.log('drive backward');
    }

    driveSideways() {
        console.log('drive sideways');
    }
}

// Extend an existing object with a method from another
const augment = (receivingClass, givingClass, ...methodsNames) => {
    if (methodsNames.length !== 0) {
        methodsNames.map(methodName => {
            receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        });
    } else {
        Object.getOwnPropertyNames(givingClass.prototype).map(methodName => {
            if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        });
    }
};

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment(Car, Mixin, 'driveForward', 'driveBackward');

// Create a new Car
const myCar = new Car({
    model: 'Ford Escort',
    color: 'blue',
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

augment(Car, Mixin);

const mySportsCar = new Car({
    model: 'Porsche',
    color: 'red',
});

mySportsCar.driveSideways();
