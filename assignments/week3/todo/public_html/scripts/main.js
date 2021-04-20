//frontend js
let base_URL = "http://localhost:3000";

$(function () {
    refreshTaskList();

    $("#add-task").click(function () {
        let taskObject = {
            text: $("#task-text").val(),
            priority: $("#new-task div input[type=radio]:checked").val(),
            dueDate: $("#due-date").val()
        };

        console.log(taskObject);

        $.post(base_URL + "/add-task", taskObject, function (data) {
            refreshTaskList();
        });
    });
});
    
//function to refresh and load 
function refreshTaskList() {
    $("div#tasks").empty();

    $.post(base_URL + "/get-tasks", {}, function(data) {
        let tasks = data.incompleted;

        tasks.forEach(function (task) {
            let html = `
<div class="task" data-id=${task.id}>
    <button><i class="fas fa-check"></i></button>
    <p>${task.text}</p><p>${task.dueDate}</p>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    <button class="edit"><i class="far fa-edit"></i></button>
</div>`;

            $("div#tasks").append(html);
        });

        $("button.delete").click(function () {

            let button = $(this);

            let deleteObject = {
                id: button.parent().attr("data-id")
            }

            $.post("/delete-task", deleteObject, function (data) {
                console.log("responded!");
                button.parent().remove();
            });
        });

        $("button.edit").click(function () {
            let htmlDrawer = `
<div class="edit-panel">
    <label for="task-text">Task</label>
    <input type="text" id="task-text" />
    <br />
    <label for="priority-1">Priority 1</label>
    <input type="radio" name="priority" id="priority-1" />
    <label for="priority-2">Priority 2</label>
    <input type="radio" name="priority" id="priority-2" />
    <label for="priority-3">Priority 3</label>
    <input type="radio" name="priority" id="priority-3" />
    <br />
    <label for="due-date">Due Date</label>
    <input type="date" id="due-date" />
</div>`;

            $(this).parent().append(htmlDrawer);
        });
    });
}