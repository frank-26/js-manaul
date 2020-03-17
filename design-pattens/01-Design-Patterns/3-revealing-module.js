let privateVar = 'Ben Cherry';
const publicVar = 'Hey there!';

const privateFunction = () => {
  console.log(`Name:${privateVar}`);
};
const publicSetName = strName => {
  privateVar = strName;
};

const publicGetName = () => {
  privateFunction();
};
const myRevealingModule = {
  setName: publicSetName,
  greeting: publicVar,
  getName: publicGetName,
};

export default myRevealingModule;