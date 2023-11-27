/* Version 2.10 - 11/26/2023 - Added Save button                                     */
/* Version 2.0  - 11/18/2023 - Moved & updated files to enable backend modifications */
/* Version 1.11 - 11/07/2023 - Submit task by pressing enter key                     */
/* Version 1.10 - 11/05/2023 - Added Delete All button                               */
/* Version 1.00 - 11/05/2023 - Initial build of the application                      */
/*===================================================================================*/


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const btn_reset = document.getElementById("reset");
const btn_save = document.getElementById("save");

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
        btn_reset.style.display = 'flex';
        btn_save.style.display = 'flex';

    } else {
        alert('Please enter a task');
    }

    inputBox.value = "";
    saveData();
}

function save(){

    if (listContainer) {
        listContainer.innerHTML = '';
        btn_save.style.display = 'none';
        btn_reset.style.display = 'none';
        saveData();
    } 
}

function reset(){

    if (listContainer) {
        listContainer.innerHTML = '';
        btn_save.style.display = 'none';
        btn_reset.style.display = 'none';
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