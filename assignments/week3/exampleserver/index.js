const express = require("express");
// const bodyParser = require("body-parser"); DEPRECATED

//"Run" the Express package.
const app = express();

// Allows our Express server to understand HTTP requests.
const http = require("http").Server(app);

// Use body-parser to convert our POST data to proper JS datatypes. CALL METHODS FROM EXPRESS PACKAGE INSTEAD.
app.use(express.json());
app.use(express.urlencoded(
    {extended: true}
    ));

const port = 3000; // Most common "development" port is 8080.

// Provide the port number to listen to for Express.
http.listen(port);

console.log("Running Express Server on " + port + ". Use CTRL+C to stop server.")

// Create a winning number on the backend (no visitor can see backend code)
const winningNumber = Math.floor((Math.random() * 10) + 1);
console.log("Winning Number: " + winningNumber);

// Set up Express Routes

//Root Route, when someone types "http://localhost:3000/"
app.use("/", express.static("public_html/"));
app.use("/funnywebsite", express.static("public_html/funny/"));

// POST routes, the request paramater will hold the data from the Front-end request, response has a reference on where to send the response to.

app.post("/submitNumber", function(request, response) {
    console.log(typeof winningNumber);

    // Build object to send to front-end.
    let responseObject = {
        message: "",
        someObject: {
            someNumber: 10
        }
    };

   // Grab the object sent from the front-end.
    let dataFromFrontEnd = request.body;
    console.log(dataFromFrontEnd);

    // Grab and convert the number provided by the front-end.
    let userNumber = parseInt(dataFromFrontEnd.numberGuess);

    console.log(userNumber);

    // Check if the number is valid, if not, send back a error message. Otherwise check if winning or losing and send proper message.
    if (Number.isNaN(userNumber)) {
        responseObject.message = "Sorry but your number is invalid.";
    } else if (winningNumber === userNumber) {
        responseObject.message = "Congratulations! You won!";
    } else {
        responseObject.message = "Sorry, but it wasn't a match!";
    }

    console.log("Our visitor says: " + dataFromFrontEnd.numberGuess);

     // Send the completed object back to front-end.
    response.send(responseObject);
});