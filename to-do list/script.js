// load data from the localstorage
window.onload = loadTasks;
// submit the task
document.querySelector("form").addEventListener("submit",e =>{
    e.preventDefault();
    addTask();
});

// for load task
function loadTasks(){
    // check if the local stroage has any tasks or not
    // if not then return
    if(localStorage.getItem("tasks") == null) return ;
    // if there is any local task present then store it in to an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // add the task in the list
    tasks.forEach(task =>{
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskCompleted(this)"class="check" ${tasks.completed ? "checked" : ""}>
        <input type="text" value = "${task.task}"class= "task ${task.completed} ? 'completed' : ''}"onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick = "removeTask(this)"></i>`;
        list.insertBefore(li,list.children[0]);
    }
        );
}

// for add task
function addTask(){
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");
    // if task is empty

    if(task.value === ""){
        alert("Please add some task");
        return false;
    }

    // check if task already exist
    if(document.querySelector(`input[value = "${task.value}"]`)){
        alert("Task already exist..");
        return false;
    }

    // if task present
    // let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // task already exist
    // tasks.forEach(todo =>{
    //     if (todo.task == task.value){
    //         alert("Task alraedy exist..");
    //         task.value = "";
    //         return;
    //     }
    // }
    //     );
    localStorage.setItem("tasks",JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"),{task:task.value,completed:false}]));

        // create list items,add innerhtml and append to ul
const li = document.createElement("li");
li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)"class="check"> 
        <input type="text" value = "${task.value}"class= "task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick = "removeTask(this)"></i>`;
        list.insertBefore(li,list.children[0]);

        // clear input 
        task.value= "";
    }


// task completed
function taskComplete(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // task already exist
    tasks.forEach(task => {
        if(task.task === event.nextElementSibling.value){
            task.completed = !task.completed;
        }

    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

// remove element
function removeTask(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // task already exist
    tasks.forEach(task => {
        if(task.task === event.parentNode.children[1].value){
            // delete task
            tasks.splice(tasks.indexOf(task),1);
        }
     } );
     localStorage.setItem("tasks",JSON.stringify(tasks));
     event.parentElement.remove();
}

// store current task
var currentTask = null;

// get current task
function getCurrentTask(event){
    currentTask = event.value;
}
        // edit the task in local storage
        function editTask(event){
            let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
            if(event.value === ""){
            alert("Task is empty");
        event.value = currentTask;
        return
        }

        // task already exist
        tasks.forEach(task =>{
            if(task.task === event.value){
                alert("Task is already exist!");
                event.value = currentTask;
                return;
            }
        });

        // update task
        tasks.forEach(task =>{
            if(task.task === currentTask){
                task.task = event.value;
            }

            
        });

        // update local storage
        localStorage.setItem("tasks",JSON.stringify(tasks));
        }