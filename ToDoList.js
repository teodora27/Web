window.onload = function() {
    var input = document.getElementById("taskInput");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
};

function addTask() {
    var input = document.getElementById("taskInput");
    var colorInput = document.getElementById("taskColor");
    var fontSizeInput = document.getElementById("taskFontSize");
    var task = input.value.trim();
    var color = colorInput.value;
    var fontSize = fontSizeInput.value + "px";

    if (task !== "") {
        var list = document.getElementById("taskList");
        var li = document.createElement("li");
        var completeButton = document.createElement("button");
        var deleteButton = document.createElement("button");

        completeButton.innerHTML = "Complete";
        completeButton.setAttribute("onclick", "completeTask(this)");
        completeButton.style.marginRight = "10px"; 

        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("onclick", "deleteTask(this)");
        
        li.innerHTML = task + " ";
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        li.style.backgroundColor = color; 
        li.style.fontSize = fontSize; 
        li.style.padding = "10px"; 
        li.onclick = function() { showTaskInfo(this); }; 
        
        list.appendChild(li);
        input.value = "";
        colorInput.value = "#ffffff"; 
        fontSizeInput.value = 16; 

        saveTasks();
    }
}

function completeTask(button) {
    var li = button.parentElement;
    li.classList.toggle("completed");
    
    saveTasks();
}

function deleteTask(button) {
    var li = button.parentElement;
    li.remove();

    saveTasks();
}

function showTaskInfo(task) {
    var computedStyle = getComputedStyle(task);
    var info = document.getElementById("taskInfo");
    info.innerHTML = "Task Info:<br>" +
                     "Text: " + task.firstChild.textContent.trim() + "<br>" +
                     "Background Color: " + computedStyle.backgroundColor + "<br>" +
                     "Font Size: " + computedStyle.fontSize;
                     
    var reuseButton = document.getElementById("reuseStyleButton");
    reuseButton.setAttribute("data-color", computedStyle.backgroundColor);
    reuseButton.setAttribute("data-font-size", computedStyle.fontSize);

     // Stop propagation
     task.onclick = function(event) {
        event.stopPropagation();
    };
}

function saveTasks() {
    var list = document.getElementById("taskList");
    var tasks = [];
    for (var i = 0; i < list.children.length; i++) {
        var li = list.children[i];
        var task = {
            text: li.firstChild.textContent.trim(),
            completed: li.classList.contains("completed"),
            color: li.style.backgroundColor,
            fontSize: li.style.fontSize
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        var list = document.getElementById("taskList");
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var li = document.createElement("li");
            var completeButton = document.createElement("button");
            var deleteButton = document.createElement("button");

            completeButton.innerHTML = "Complete";
            completeButton.setAttribute("onclick", "completeTask(this)");
            completeButton.style.marginRight = "10px"; 
            
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("onclick", "deleteTask(this)");
            
            li.innerHTML = task.text + " ";
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            li.style.backgroundColor = task.color; 
            li.style.fontSize = task.fontSize; 
            li.style.padding = "10px"; 
            li.onclick = function() { showTaskInfo(this); }; 

            if (task.completed) {
                li.classList.add("completed");
            }

            list.appendChild(li);
        }
    }
}
