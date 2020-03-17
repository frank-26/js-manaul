let instance;
// Private methods and variables
const privateMethod = () => {
    console.log('I am private');
  };
const privateVariable = 'Im also private';
const randomNumber = Math.random();
  
// Singleton
class MySingleton {
  constructor() {
    if (!instance) {
      // Public property
      this.publicProperty = 'I am also public';
      instance = this;
    }

    return instance;
  }

  // Public methods
  publicMethod() {
    console.log('The public can see me!');
  }

  getRandomNumber() {
    return randomNumber;
  }
}
export default MySingleton;
  