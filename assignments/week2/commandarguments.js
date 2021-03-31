let arguments = process.argv;

// console.log(arguments);

let request = arguments[2];

if (request === "hi") {
    console.log("Hi there, how are you doing?");
} else if (request === "food") {
    console.log("Just ordered it and it is on the way...");
} else {
    console.log("I'm sorry, but I don't understand your request.");
}