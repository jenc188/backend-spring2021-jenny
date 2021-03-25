// Variables are used to hold data.
var myFirstVariable = "Hello Friends!";
let myFirstLetVariable = null;

// A variable that doesn't change once you have assigned a value.
const myFirstConstVariable;

myFirstConstVariable = 10;

// I cannot write the following line as it will break the script. Constant variable can only be assigned and NOT reassigned.
//myFirstConstVariable = 9;

// Datatypes
900;
"900 Is a number!";
'<p>This looks like HTML, but it is just a string to JavaScript</p>';
true;
false;

// Arrays & Objects
// arrays are objects, BUT objects are not arrays!
let myArray = [];
let myArray2 = new Array(10);

myArray[0] = "hello";
myArray[1000] = "goodbye";


let myObject = {};
let myObject2 = new Object();

// Comparison Operators
// == compares and coerces values if different datatypes.
// === compares values AND datatypes
// < or <=
// > or >=
// != or !==

// Mathematical Operators
// +, -, /, *, %

// Logical Operators
// && ||

// If statements
if (false) {}

if (false) {} else {}

// the else if will only run if the PREVIOUS condition was false
if (false) {} else if (false) {}

// both if statements will run regardless of eachother's condition.
if (false) {}
if (false) {}


if (false) {} else if (false) {} else {}


// Loops

// Similar as an if statement, but once done runs it again if the condition is true.

while (false) {};

do {} while (false);

for (let i = 0; i < 10; i++) {};

// Functions

let actualPINumber = Math.PI;

function myFunction() {

}

myFunction();

let a = 100;
let b = a;
let c = b;
let d = c;

var z = myFunction;
var y = z;
var x = y;

// Test if we can pass function definitions when we use "Traditional" function defnition.
x();


function myFunction2(myFirstParameter) {

    myFirstParameter;

    return null;
// return only single value. to return multiple values use array and object
//null-intentional leave it empty as a placeholder
//undefined-would be red flag and should be never be undefined
}

myFunction2("Hello Friends!");
myFunction2("Goodbye Friends!");
