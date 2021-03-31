const fs = require("fs");

// TO-DO
// Detect what OS they are using, and remove any invalid characters when creating a file.

// console.log("You are currently running " + process.platform);


// renaming arguments array to a variable called arguments.
const arguments = process.argv;

// grab third argument directly and place it into a variable called filename.
let filename = arguments[3];
let action = arguments[2];
let contents = arguments[4];
let filename2 = contents;
let mergedFilename = arguments[5];

if(contents === undefined) {
    contents = "";
}

// Check if the argument was empty.
if (filename === undefined){

    // if it was empty, provide a message that is for a new person.
    console.log(`
Welcome to my file reader! Please provide the file name you want to use after the command.

Example:
    Read an existing File:   node filereader.js read myFile.txt
    Write a new File:        node filereader.js write newFile.txt "Text to write"
    Update an existing file: node filereader.js update myFile.txt "Text to add"
    Merge two existing files: node filereader.js merge file1.txt file2.txt mergedfile.txt
    Delete an existing file: node filereader.js delete myFile.txt
`);  

    // end the script early so we don't run the code below.
    return;
}

if (action === "read") {

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

} else if (action === "write") {

    if(fs.existsSync(filename)) {
        console.log("Sorry but this file already exists! Please use a different file name.");
    } else {
        fs.writeFileSync(filename, contents, "utf-8");
        console.log("Finished writing the file: " + filename);
    }

} else if (action === "update") {

    if (fs.existsSync(filename)) {
        fs.appendFileSync(filename, "\n" + contents, "utf-8");
        console.log("Updated file: " + filename);
    } else {
        console.log("This file doesn't exist, but we created it for you.");
        fs.appendFileSync(filename, contents, "utf-8");
    }

} else if (action === "delete") {
    if(fs.existsSync(filename)) {
        fs.unlinkSync(filename, "utf-8");
        console.log("File deleted!")
    } else {
        console.log("Sorry but we can't find the file");
    }    

} else if (action === "merge") {

    if(fs.existsSync(filename) && fs.existsSync(filename2)) {

        let fileContents = fs.readFileSync(filename, "utf-8");
        let fileContents2 = fs.readFileSync(filename2, "utf-8");
        let mergedContents = fileContents + "\n" + fileContents2;

        if(fs.existsSync(mergedFilename)) {
            console.log("Sorry but we can't create the merged file, as the file name already exists."); 
        } else {
            fs.writeFileSync(mergedFilename, mergedContents, "utf-8");
            console.log("Finished merging your files!");
        }
     } else {
         console.log("Sorry but one of your files that you chose does not exist! Please double check your spelling.");
     }
}













