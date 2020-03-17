  var vehicle = {
    getModel: function() {
      console.log("The model of this vehicle is.." + this.model);
    }
  };

  var car = Object.create(vehicle, {

    "id": {
      value: MY_GLOBAL.nextId(),
      // writable:false, configurable:false by default
      enumerable: true
    },

    "model": {
      value: "Ford",
      enumerable: true
    }

  });

  //********************** Snippet 3 **********************//

  var vehiclePrototype = {

    init: function(carModel) {
      this.model = carModel;
    },

    getModel: function() {
      console.log("The model of this vehicle is.." + this.model);
    }
  };


  function vehicle(model) {

    function F() {};
    F.prototype = vehiclePrototype;

    var f = new F();
    console.log(F.prototype.constructor, f.constructor) // Object Object

    console.log(f instanceof F) //true
    f.init(model);
    return f;

  }

  var car = vehicle("Ford Escort");
  car.getModel();

  //********************** Snippet 1 **********************//
  const myCar = {
    name: 'Ford Escort',

    drive() {
      console.log("Weeee. I'm driving!");
    },

    panic() {
      console.log('Wait. How do you stop this thing?');
    },
  };

  // Use Object.create to instantiate a new car
  const yourCar = Object.create(myCar);

  // Now we can see that one is a prototype of the other
  console.log(yourCar.name);

  //********************** Snippet 2 **********************//

  const vehicle = {
    getModel() {
      console.log(`The model of this vehicle is..${this.model}`);
    },
  };

  const car = Object.create(vehicle, {
    id: {
      value: MY_GLOBAL.nextId(),
      enumerable: true,
    },

    model: {
      value: 'Ford',
      enumerable: true,
    },
  });

  class VehiclePrototype {
    constructor(model) {
      this.model = model;
    }

    getModel() {
      console.log('The model of this vehicle is..' + this.model);
    }

    Clone() {}
  }
  class Vehicle extends VehiclePrototype {
    constructor(model) {
      super(model);
    }
    Clone() {
      return new Vehicle(this.model);
    }
  }

  const car = new Vehicle('Ford Escort');
  const car2 = car.Clone();
  car2.getModel();