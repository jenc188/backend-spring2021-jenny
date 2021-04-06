// Get the FS package from node.
const fs = require("fs");

// Create a Task class.
class Task {
    constructor(text, priority, dueDate){
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority = priority;
        this.dateCompleted = null;
    }
}

// Load the existing tasks saved in tasks.json.
let fileContents = fs.readFileSync("tasks.json", "utf-8");
let previousTasks = JSON.parse(fileContents);
let taskArray = previousTasks.tasksList;
let taskArrayCompleted = previousTasks.tasksListComplete;

// Get arguments from the CLI.
let action = process.argv[2];
// For add
let text = process.argv[3];
let priority = process.argv[4];

// Check what argument the user has provided.
if (action === "add"){

    // add newly created Task into our array.
    taskArray.push(new Task(text, priority));
    console.log("You have added this task");
} else if (action === "list"){

     // set current list to the default array.
     let currentList = taskArray;

      // check if they wanted the completed list instead and replace the current list with completed array if so.
      if (text == "completed" || text === "complete") {
          currentList = taskArrayCompleted;
      }
     
    //go through each item in the current list
    for (let i = 0; i < currentList.length; i++) {

        // ...display if complete or not...
        if (currentList[i].dateCompleted === null) {
            var completed = "No";
        } else { 
            var completed = "Yes";
        }

        //...and write out the information of the task.
        let taskList = ` 
${i + 1}) Priority: ${currentList[i].priority}
    Task:${currentList[i].text}
    Due Date:${currentList[i].dueDate}
    Completed:${completed}`;

        console.log(taskList);
    }
    
    
} else if (action === "complete") {

    // convert the user's number into a proper array index number.
    const taskNumber = parseInt(text) - 1;

    // if not a valid number, tell the user and end the script.
    if (Number.isNaN(taskNumber)) {
        console.log("Use numbers for Task Number, please try again.");

        return;
    }

    //store a copy of the Task we are going to complete.
    let task = taskArray[taskNumber];

    //give a date to the corresponding property.
    task.dateCompleted = new Date();

    //remove the original Task from the todo list.
    taskArray.splice(taskNumber, 1);

    //remove the original Task from the todo list.
    taskArrayCompleted.push(task);

} else if (action === "delete") {

    // If they typed complete...
    if (text === "complete" || text === "completed") {

        //...check if the value after it is a valid number, if it's not a valid number, tell the user and end the script...
        if (Number.isNaN(parseInt(priority))) {
            console.log("I'm sorry, but that is not a valid number.");

            return;
        }
        // convert the user's number into a proper index number.
        let indexNumber = parseInt(priority) - 1;

        // remove the Task from the completed list.
        taskArrayCompleted.splice(indexNumber, 1);
        console.log("Task successfully deleted from the complete list.");
    } else {

        // check if there is a valid number in the fourth argument and if it's not a valid number, tell the user and end the script.
        if (Number.isNaN(parseInt(text))) {
            console.log("I'm sorry, but that is not a valid number.");

            return;
        }

        // convert the user's number into a proper index number.
        let indexNumber = parseInt(text) - 1;

        // remove the Task from the todo list.
        taskArray.splice(indexNumber, 1);

        console.log("Task successfully deleted from the todo list.");
    }

} else {
    // if no proper action argument, then provide this introductory message.
    console.log("Welcome to Todo-CLI, to use this script, type an action and data at the end of the command.");

    console.log(`
Examples:
    node . add "task description" "priority number"
    node . list
    node . complete "task number"
    node . delete "task number"
    node . delete completed "task number"
    node . edit (work in progress!)
    node . edit dueDate completed 1 "July 2, 2021"
    node . edit text 3 "get coffee"
    `);
}

// Create an object to save as JSON to tasks.json (replacing the old copy).
let objectToSave = {
    tasksList: taskArray,
    tasksListComplete: taskArrayCompleted
}

// stringify the object and write it to the tasks.json
objectToSave = JSON.stringify(objectToSave);
fs.writeFileSync("tasks.json", objectToSave, "utf-8");

