let alltasks = [];

let isLocalDataPresent = localStorage.getItem("todoTaskList");

if(isLocalDataPresent != null) {
    alltasks = JSON.parse(isLocalDataPresent);
    showTask();
}

function blank() {
    if(alltasks.length === 0) {
        const ul = document.querySelector("#todo-list");
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("p-3");
    
        li.innerHTML = "<center> No Tasks, Add Now... </center>"
    
        ul.appendChild(li);
    
    }
}

blank();

const subheading = document.querySelector("#subheading");

const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
})

subheading.innerHTML = date;

function addTask() {
    let inputArea = document.querySelector("#inputarea");

    let task = {
        task_id: alltasks.length+1,
        task: inputArea.value,
        strike: 0
    }

    alltasks.push(task);
    localStorage.setItem("todoTaskList", JSON.stringify(alltasks));
    inputArea.value = "";
    showTask();
}

function showTask() {
    let limit = alltasks.length;
    document.querySelector("#todo-list").innerHTML = "";

    for(let index=0; index<limit; index++) {
        let ul = document.querySelector("#todo-list");
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("p-3");

        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `todo-${index+1}`);
        input.addEventListener("change", changed);
        input.check_id = alltasks[index].task_id;
        input.classList.add("form-check-input");
        input.classList.add("me-2");

        let label = document.createElement("label");
        label.classList.add("form-check-label");
        label.setAttribute("for", `todo-${index+1}`);

        label.innerHTML = ` ${alltasks[index].task} `;
        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);

        if(alltasks[index].strike == 1) {
            label.style.textDecoration = "line-through";
            input.checked = true;
        } else {
            label.style.textDecoration = "none";
            input.checked = false;
        }
    }
}

function changed(event) {
    let input = document.querySelector(`#todo-${event.target.check_id}`);
    
    if(input.checked) {
        alltasks[event.target.check_id-1].strike = 1;
        input.checked = true;
    } else {
        alltasks[event.target.check_id-1].strike = 0;
        input.checked = false;
    }
    localStorage.setItem("todoTaskList", JSON.stringify(alltasks));
    showTask();
}

function clearAll() {
    alltasks.splice(0);
    localStorage.setItem("todoTaskList", JSON.stringify(alltasks));
    showTask();
    blank();
}