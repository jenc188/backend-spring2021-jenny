const fs = require("fs");

// renaming arguments array to a variable called arguments.
const arguments = process.argv;

// grab third argument directly and place it into a variable called filename.
let filename = arguments[2];

// Check if the argument was empty.
if (filename === undefined){

// if it was empty, provide a message that is for a new person.
console.log(`
Welcome to my file reader! Please provide the file name you want to read after the command.

Example:
    node filereader.js myFile.txt
`);  
// end the script early so we don't run the code below.
return;

}

// Check if the file exist.
if (fs.existsSync(filename)) {

    // if it does exist...
    // Read the file based on the argument in the command.
    let fileContents =  fs.readFileSync(filename, "utf-8");

    console.log(fileContents);

} else {
    // Otherwise tell the user that we couldn't find the file.
    console.log("Sorry but we couldn't find that file! Please check the file name.");
}







