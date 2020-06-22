//*******************************************************//
// 每个 Node 模块都打包在类似如下的函数包装程序中
/*
(function(exports, require, module, __filename, __dirname) {
    // Module code actually lives in here
});

1. __filename，即模块的 JavaScript 源文件的标准名称，此名称由 Node 随其他几个参数一起传递到函数包装程序：
2. exports - module.exports 的简短表示形式
3. require - 大家很熟悉的用于包含其他模块的函数
4. module - 对当前模块的引用
5. __dirname - 模块的 JavaScript 源文件所在目录的完整路径
*/
//*******************************************************//


const lib = require('package/lib');

// behaviour for our module
const foo = () => {
    lib.log('hello world!');
};

// export (expose) foo to other modules
exports.foo = foo;

//********************** Snippet 2 **********************//
// [ES2015+] Below we used new class declaration, using keyword class
// [ES2015+] We used new constructor method and method declaration
// [ES2015+] Classes are syntactic sugar over JavaScript's prototype-based inheritance

// define more behaviour we would like to expose
class Foobar {
    constructor() {
        this.foo = function() {
            console.log('Hello foo');
        };

        this.bar = function() {
            console.log('Hello bar');
        };
    }
}

// expose foobar to other modules
exports.Foobar = Foobar;

// an application consuming "foobar"

// access the module relative to the path
// where both usage and module files exist
// in the same directory

const Foobar = require('./foobar').Foobar;
const test = new Foobar();

// Outputs: "Hello bar"
test.bar();

//********************** Snippet 3 **********************//
define(function(require) {
    var lib = require('package/lib');

    // some behaviour for our module
    function foo() {
        lib.log('hello world!');
    }

    // export (expose) foo for other modules
    return {
        foobar: foo,
    };
});

//********************** Snippet 4 **********************//

const modA = require('./foo');
const modB = require('./bar');

exports.app = () => {
    console.log('Im an application!');
};

// [ES2015+] Equivalent to: => { return modA.helloWorld(); }
exports.foo = () => modA.helloWorld();

//********************** Snippet 5 **********************//
exports.name = 'bar';

//********************** Snippet 6 **********************//
require('./bar');
// [ES2015+] Equivalent to: => { return "Hello World!!"; }
exports.helloWorld = () => 'Hello World!!';
