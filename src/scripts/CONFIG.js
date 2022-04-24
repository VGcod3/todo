export  const htmlElements = {
    HIGH_INPUT: document.getElementById("high-input"),
    LOW_INPUT: document.getElementById("low-input"),
    HIGH_BTN: document.getElementById("high-btn"),
    LOW_BTN: document.getElementById("low-btn"),
    HIGH_TASKS: document.getElementById("todo-box-high"),
    LOW_TASKS: document.getElementById("todo-box-low"),
}

export default function taskTemplate(value,status) {
return `<div class="task ${status ? 'task-done' : ''}">
        <div class="done-btn ${status ? 'done' : ''}"></div>
        <p>${value}</p>
        <div class="delete-btn"></div>
        </div>
   `
}