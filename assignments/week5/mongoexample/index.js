// Allows us to use the mongoose software.
const mongoose = require("mongoose");
const credentials = require("./credentials.js");

// Credentials and location for our Mongo database.
const databaseConnect = credentials.dbURL;

// Settings and options for Mongoose connection.
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

// Connect to database. Test if we have an error, if we do, console log it, otherwise say successful connection.opening the connection
mongoose.connect(databaseConnect, options, function(error) {
    if(error) {
        console.log("Something happened!" + error);
    } else {
        console.log("Successfully connected to MongoDB Atlas!");
    }

});

//Object representing the MongoDB connecion. actual connection
let db = mongoose.connection;

//Send MongoDB errors to the console.Binding the db error to the javascript console
db.on("error", console.error.bind(console, "We had a Mongo Error "));

// Let mongoose have a copy of Promise class.
mongoose.Promise = global.Promise;

//Schema, describes how our MongoDB documents should look like, including properties and values. Show how a object supposed to be built

let Schema = mongoose.Schema;
let ourSchema = new Schema({
    food: String,
    location: String,
   

});

//Mongoose Model, describes where to save documents and how the document should look like using a specific schema.
let exampleModel = new mongoose.model("example_collections", ourSchema);

// Creating our first Document, we provide and object to fulfill schema requirements. New document
let firstDocument = new exampleModel({
    food: "Avacado chicken sandwich",
    location: "SOMA"
      
});

// Saving our first Document, callback function checking for errors or console logs success.
firstDocument.save(function (error){
    if(error){
        console.log("Failed to save document" + error);
    } else {
        console.log("Sucessfully saved document!");
    }

});

//Searches the exampleModel with a specified ID, and updates that document
exampleModel.findByIdAndUpdate("6083127d557e4005b82c9c53", {location: "SOMA"},function (error, results) {
    if(error){
        console.log("Failed to update: " + error);
    }else{
        console.log("Successfully updated, here is the old copy: ", results);
    }
});

exampleModel.findByIdAndDelete("6083591be7658006d69fb397", function(error, results){
if(error) {
        console.log("Failed to delete:" + error);
    } else {
        console.log("Successfully deleted the following: "+ results)
    }
});
//can use wildcard to search, put this empty {} and not specific item will receive every documents in that object
exampleModel.find({food: "Hamburger"}, function (error, results) {
    if(error) {
        console.log("Failed to find: " + error)
    } else {
        console.log("Found the following: " + results);
    }
});