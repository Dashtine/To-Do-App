/* Version 1.11 - 11/07/2023 - Submit task by pressing enter key*/
/* Version 1.10 - 11/05/2023 - Added Delete All button          */
/* Version 1.00 - 11/05/2023 - Initial build of the application */
/*==============================================================*/


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const btn_deleteAll = document.getElementById("deleteAll");

async function addTask() {
    const inputBox = document.getElementById('input-box');
    const task = inputBox.value;

    if (task.trim() !== '') {
        const response = await fetch('/api/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
        });

        const responseData = await response.json();
        console.log(responseData);

        // ... rest of your code
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        btn_deleteAll.style.display = 'block';

    } else {
        alert('Please enter a task');
    }

    inputBox.value = "";
    saveData();
}

function deleteAll(){

    if (listContainer) {
        listContainer.innerHTML = '';
        btn_deleteAll.style.display = 'none';
        saveData();
    } 

}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

document.addEventListener("DOMContentLoaded", function()
{
    const form = document.getElementById("taskForm");
    const input = document.getElementById("input-box");

    form.addEventListener("submit", function(event) {
        const inputValue = input.value;
        addTask();
        input.value = "";
    });

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTasks();