var important = false;
var serverURL = "https://fsdiapi.azurewebsites.net/";
var myTasks = [];
var defaultTaskStatus = 1;
// inv homework: variable scope on JS

function toggleImportant() {
    if (!important) {
        important = true;
        $("#iImportant").removeClass("far").addClass("fas");
    } else {
        important = false;
        $("#iImportant").removeClass("fas").addClass("far");
    }
}

function saveTask() {
    //read values from controls
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let category = $("#selCategory").val();
    let location = $("#txtLocation").val();
    let dueDate = $("#selDueDate").val();
    let color = $("#selColor").val();

    let task = new Task(title, important, description, category, location, dueDate, color);
    // set default status as new task --- assigning variable not working
    //1 is new task, 2 is done task, 3 is delete
    task.status = 1;
    console.log(task);
    console.log(JSON.stringify(task));

    //send obj. to backend server
    $.ajax({
        url: serverURL + "api/tasks/",
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
            let task = JSON.parse(res);
            myTasks.push(task);
            displayTask(task);
        },
        error: function (eDetails) {
            console.error("error saving", eDetails);
        }
    });

}

function displayTask(task) {
    let syntax =
        `<div id="${task._id}"class="task">
        <i class='important fas fa-star'></i> 
        <div class="description">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <label class="due-date">${task.dueDate}</label>
        <label class="location">${task.location}</label>`;

        if(task.status==1){
            syntax+=`<button onclick="doneTask('${task._id}')" class="btn btn-sm btn-primary"> Done </button></div>`;
            $("#pendingList").append(syntax);
        }
        else if(task.status==2){
            syntax+=`<button onclick="removeTask('${task._id}')" class="btn btn-sm btn-danger"> Remove </button></div>`;
            $("#doneList").append(syntax);
        }

}

function doneTask(id) {
    // get the object
    for (let i = 0; i < myTasks.length; i++) {
        let task = myTasks[i];
        if (task._id == id) {
            task.status = 2;

            $.ajax({
                url: serverURL + "api/tasks",
                type: "PUT",
                data: JSON.stringify(task),
                contentType: 'application/json',
                success: function (res) {
                    console.log("server response to Jake request:", res);

                    //remove task from Pending list
                    $(`#${id}`).remove();
                    //display task
                    displayTask(task);

                },
                error: function (err) {
                    console.error("server error response to Jake request", err);
                }
            });
        }

        // update status
        // send on put requrest

        //ajax put
        //url: serverUrl + "api/tasks"
    }
}

function removeTask(id) {
    // get the object
    for (let i = 0; i < myTasks.length; i++) {
        let task = myTasks[i];
        if (task._id == id) {
            task.status = 3;

            $.ajax({
                url: serverURL + "api/tasks",
                type: "PUT",
                data: JSON.stringify(task),
                contentType: 'application/json',
                success: function (res) {
                    console.log("server response to Jake request:", res);

                    //remove task from done list
                    $(`#${id}`).remove();

                },
                error: function (err) {
                    console.error("server error response to Jake request", err);
                }
            });
        }

        // update status
        // send on put requrest

        //ajax put
        //url: serverUrl + "api/tasks"
    }
}

function fetchTasks() {
    $.ajax({
        url: serverURL + "api/tasks",
        type: 'GET',
        success: function (res) {
            let data = JSON.parse(res);
            for (let i = 0; i < data.length; i++) {
                let task = data[i];
                if (task.name == "Jake") {
                    myTasks.push(task);
                    displayTask(task);
                }
            }
        },
        error: function (err) {
            console.error("error getting data", err);
        }
    });
}

function init() {
    console.log("my task manager");
    //load data
    fetchTasks();

    //hook events
    $("#iImportant").click(toggleImportant);
    $("#btnSave").click(saveTask);
}

window.onload = init;