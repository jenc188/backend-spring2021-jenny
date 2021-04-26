//BACKEND. DO NOT USE "name" as a variable name when using Node.
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const task = require("./Task.js");
const credentials = require ("./credentials.js");
const app = express();
const http = require("http").Server(app);
const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port);

mongoose.connect(credentials.dbURL, credentials.dbOptions, function (error){
   if (error) {
      console.log("Failed to connect to MongoDB: " + error);
   } else {
      console.log("Successfully connected to MongoDB.");
   }
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "We had a Mongo Error "));
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let TaskSchema = Schema({
   text: String,
   priority: String,
   dueDate: String,
   dateCreated: String,
   dateDeleted: String,
   dateCompleted: String
});

TaskSchema.loadClass(task.Task);

let TodoModel = new mongoose.model("tasks", TaskSchema);

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

   // The default route for when a visitor requests the URL without a file path. 
   app.use("/", express.static("public_html/"));

   // POST Handler for adding a new task.
   app.post("/add-task", function (req, res) {
      let taskData = req.body;
      
   let newTask = new TodoModel({
      text: taskData.text,
      priority: taskData.priority,
      dueDate: taskData.dueDate
   });

   console.log(newTask.isDeleted());

   newTask.save(function(error) {
      if (error) {
         console.lg("Something happened in MongoDB for saving: " + error);
         res.sendStatus(500);
      } else {
         // Send a response to the front-end.
         res.send({error: null});
      }
   });

});

// POST Handler for getting all tasks.
app.post("/get-tasks", function (req, res) {
   
   

   // Build an object holding all the Task objects that passed the filter test.
   let responseObject = {
      
   };

   // Send the resulting object back to the front-end.
   res.send(responseObject);
});

app.post("/complete-task", function (req, res) {

   let id = req.body.id;

   // Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id) {
         // If ID matches them mark the Task Object completed.
         tasks.incompleted[i].markCompleted();
         break;
      }
   }
   saveFile();
   
   // Just send a message to the front-end.
   res.send({});
});

// POST Handler for deleting a single task.
app.post("/delete-task", function (req, res) {

   let id = req.body.id;

   // Go through each task in the tasks array and find the one with the matching ID.
   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (tasks.incompleted[i].id === id) {
         // If ID matches them mark the Task Object deleted.
         tasks.incompleted[i].markDeleted();
         break;
      }
   }
   saveFile();
   // Just send a message to the front-end.
   res.send({});
});

app.post("/update-task", function (req, res) {
   let id = req.body.id;
   let updates = req.body;

   for (let i = 0; i < tasks.incompleted.length; i++) {
      if (id === tasks.incompleted[i].id) {
         tasks.incompleted[i].setText(updates.text);
         tasks.incompleted[i].setDueDate(updates.dueDate);
         tasks.incompleted[i].setPriority(updates.priority);
      }
   }
   
   saveFile();

   res.send({});
});

// TODO: Find out a way to delay multiple calls of this function.

// the saveFile function will convert our task Object into JSON and save it to filename.
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8");
}