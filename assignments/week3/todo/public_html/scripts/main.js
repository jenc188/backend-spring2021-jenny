let base_URL = "http://localhost:3000";

$(function () {
    refreshTaskList();

    $("#add-task").click(function () {
        let taskObject = {
            text: $("#task-text").val(),
            priority: $("new-task div input[type=radio]:checked").val(),
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
    <button class="deleted><i class="fas fa-trash-alt"></i></button>
    <button><i class="far fa-edit"></i></button>
</div>`;
        
            $("div#tasks").append(html);
        });

        $("button.delete").click(function (){

            let deleteObject = {
                id: $(this).parent().attr("data-id")
            }

            $.post("/delete-task", deleteObject, function (data) {
                $(this).parent().remove();
            });
        });
    });
}
    