// types of user defined modules:
// 1. Named module (way 1)
// 2. Default module (way 2)


// _________ Way 1 _______________________

// exports.add = function add(a, b) {
//     return a + b;
// }

// exports.sub = function sub(a, b) {
//     return a - b;
// };



// _________ Way 2 _______________________

const printHelloWorld = () => {
    console.log("Hello World!");
}

module.exports = printHelloWorld;