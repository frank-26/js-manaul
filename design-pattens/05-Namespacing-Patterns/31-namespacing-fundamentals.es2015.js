const myApplication = (() => ({
  function() {
  },
}))();


// 2. Prefix namespacing
const myApplication_propertyA = {};
const myApplication_propertyB = {};
function myApplication_myMethod() {
}

// 3. Object literal notation
const myApplication = {
  getInfo() {
  },
  models: {},
  views: {
    pages: {},
  },
  collections: {},
};

myApplication.foo = () => 'bar';

myApplication.utils = {
  toString() {
    //...
  },
  export() {
    //...
  },
};

const myApplication = {};

myApplication || (myApplication = {});

const foo = () => {
  myApplication || (myApplication = {});
}

foo();


const foo = (myApplication) => {
  myApplication || (myApplication = {});
}

foo();


const myPlugin = $.fn.myPlugin = () => { };
 
// Then later rather than having to type:
$.fn.myPlugin.defaults = {};
 
// We can do:
myPlugin.defaults = {};

const namespace = ((() => {
  // defined within the local scope
  const privateMethod1 = () => { /* ... */ };

  const privateMethod2 = () => { /* ... */ };
  const privateProperty1 = "foobar";

  return {

    // the object literal returned here can have as many
    // nested depths as we wish, however as mentioned,
    // this way of doing things works best for smaller,
    // limited-scope applications in my personal opinion
    publicMethod1: privateMethod1,

    // nested namespace with public properties
    properties: {
        publicProperty1: privateProperty1
    },

    // another tested namespace
    utils: {
        publicMethod2: privateMethod2
    }
  }
}))();


