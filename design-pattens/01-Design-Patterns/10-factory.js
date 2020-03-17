class Car {
    constructor({ doors, state, color }) {
        this.doors = doors || 4;
        this.state = state || 'brand new';
        this.color = color || 'silver';
    }
}
class Truck {
    constructor({ state, wheelSize, color }) {
        this.state = state || 'used';
        this.wheelSize = wheelSize || 'large';
        this.color = color || 'blue';
    }
}

class VehicleFactory {
    constructor() {
        this.vehicleClass = Car;
    }
    createVehicle(options) {
        switch (options.vehicleType) {
            case 'car':
                this.vehicleClass = Car;
                break;
            case 'truck':
                this.vehicleClass = Truck;
                break;
        }
        return new this.vehicleClass(options);
    }
}

const carFactory = new VehicleFactory();
const car = carFactory.createVehicle({
    vehicleType: 'car',
    color: 'yellow',
    doors: 6,
});

class TruckFactory extends VehicleFactory {
    constructor() {
        super();
        this.vehicleClass = Truck;
    }
}
const truckFactory = new TruckFactory();
const myBigTruck = truckFactory.createVehicle({
    state: 'omg..so bad.',
    color: 'pink',
    wheelSize: 'so big',
});


class AbstractVehicleFactory {
    constructor() {
        // Storage for our vehicle types
        this.types = {};
    }

    static getVehicle(type, customizations) {
        const Vehicle = this.types[type];

        return Vehicle ? new Vehicle(customizations) : null;
    }

    static registerVehicle(type, Vehicle) {
        const proto = Vehicle.prototype;

        // only register classes that fulfill the vehicle contract
        if (proto.drive && proto.breakDown) {
            this.types[type] = Vehicle;
        }

        return abstractVehicleFactory;
    }
}

// Usage:

abstractVehicleFactory.registerVehicle('car', Car);
abstractVehicleFactory.registerVehicle('truck', Truck);

// Instantiate a new car based on the abstract vehicle type
const car = abstractVehicleFactory.getVehicle('car', {
    color: 'lime green',
    state: 'like new',
});

// Instantiate a new truck in a similar manner
const truck = abstractVehicleFactory.getVehicle('truck', {
    wheelSize: 'medium',
    color: 'neon yellow',
});
