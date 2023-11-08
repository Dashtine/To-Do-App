/* Version 1.11 - 11/07/2023 - Submit task by pressing enter key*/
/* Version 1.1 - 11/05/2023 - Added Delete All button           */
/* Version 1.0 - 11/05/2023 - Initial build of the application  */
/*==============================================================*/


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const btn_deleteAll = document.getElementById("deleteAll");

function addTask(){

    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        btn_deleteAll.style.display = 'block';
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
            form.dispatchEvent(new Event("submit"));
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