// _________ Way 1 _______________________

// const { add } = require("./export");
// const { sub } = require("./export");

//// Using destructure for shortcut:

//// const { add, sub } = require("./export");

// console.log(add(10, 20)); // 30
// console.log(sub(10, 20)); // -10



// _________ Way 2 _______________________

import printHelloWorld from "./export.js";
printHelloWorld();
