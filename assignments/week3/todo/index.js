//backend 
// DO NOT USE "name" as a variable name when using Node.

const express = require("express");
const fs = require("fs");
const task = require("./Task.js");
const app = express();
const http = require("http").Server(app);
const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port);

// Variables for the task object, and filename.
let tasks;
let taskFileName = "tasks.json";

// Prepare JSON tasks file
if (fs.existsSync(taskFileName)) {
   // Read file
   let fileContents = fs.readFileSync(taskFileName, "utf-8");
   // Convert JSON to actual JavaScript Objects.
   tasks = JSON.parse(fileContents);
   // TODO: Write code that converts generic Objects into Task Objects.

   // Convert the JS object from JSON to proper Task Objects.
      convertedObjects = [];

      tasks.incompleted.forEach(function (jsonTask) {
         let newTaskObject = new task.Task();
         convertedObjects.push(newTaskObject.jsonConvert(jsonTask));
      });

      tasks.incompleted = convertedObjects;
} else {
   // Otherwise, if file does not exist, create task Object...
   tasks = {
      incompleted: [],
   }
   // ...Write task object to filename.
   fs.writeFileSync(taskFileName, JSON.stringify(tasks), "utf-8");
}

console.log(tasks.incompleted);

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

// Routes

// The default route for when a visitor requests the URL without a file path. 
app.use("/", express.static("public_html/"));

// POST Handler for adding a new task.
app.post("/add-task", function (req, res) {
   let taskData = req.body;
   // TODO: detect if there is actual text in text property.
   // Create a Task Object based on the data recieved from the front-end.
   let taskObject = new task.Task(taskData.text, taskData.priority, taskData.dueDate);

   // Store new Task Object into the tasks incompleted array.
   tasks.incompleted.push(taskObject);

   // "Update" the json file.
   saveFile();

   // Send a response to the front-end.
   res.send({error: null});
});

// POST Handler for getting all tasks.
app.post("/get-tasks", function (req, res) {
   
   // Filter out the tasks that have been completed or deleted.
   let incompleteArray = tasks.incompleted.filter(function (task) {
      console.log(task);
      // If the task has a deleted or completed date, it fails the filter test.
      if (task.isDeleted() || task.isCompleted()) {
         return false;
      } else {
         return true;
      }
   });

   // Build an object holding all the Task objects that passed the filter test.
   let responseObject = {
      incompleted: incompleteArray
   };

   // Send the resulting object back to the front-end.
   res.send(responseObject);
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

   // Just send a message to the front-end.
   res.send({});
});


// TODO: Find out a way to delay multiple calls of this function.

// the saveFile function will convert our task Object into JSON and save it to filename.
function saveFile() {
   let json = JSON.stringify(tasks);
   fs.writeFileSync(taskFileName, json, "utf-8");
}