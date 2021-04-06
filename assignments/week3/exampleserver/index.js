const express = require("express");

//"Run" the Express package.
const app = express();

// Allows our Express server to understand HTTP requests.
const http = require("http").Server(app);

const port = 3000; // Most common "development" port is 8080.

// Provide the port number to listen to for Express.
http.listen(port);

console.log("Running Express Server on " + port + ". Use CTRL+C to stop server.")

// Set up Express Routes

//Root Route, when someone types "http://localhost:3000/"
app.use("/", express.static("public_html/"));
app.use("/funnywebsite", express.static("public_html/funny/"));

//POST routes

app.post("/submitNumber", function(request, response) {

    response.send("Thank you for our request.");
});