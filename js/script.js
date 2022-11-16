import { UI_ELEMENT, STATUS, PRIORITY, TODO_CLASS } from "./constants.js";
import { render } from "./render.js";

UI_ELEMENT.MAIN.addEventListener('click', todoHandler);
Array.from(document.forms).forEach(form => form.addEventListener('submit', formHandler));

let taskListToShow = [
    {name: 'Выпить пива', priority: PRIORITY.HIGH, status: STATUS.TODO, remove: false},
    {name: 'Сделать это Ту дУ', priority: PRIORITY.HIGH, status: STATUS.DONE, remove: false},
    {name: 'Сказать Ту ду ду', priority: PRIORITY.LOW, status: STATUS.TODO, remove: false},
    {name: 'Порадоваться', priority: PRIORITY.LOW, status: STATUS.DONE, remove: false}
];

function formHandler(e){
    e.preventDefault();
    let form = e.target;
    let input = form.firstElementChild;
    createTaskObj(input.value, input.dataset.priority);
    input.value = '';
}
function todoHandler(e){
    let target = e.target;
    if(isRemove(target))
        removeTask(target);
    if(isCheckbox(target))
        changeStatus(target);
}

function createTaskObj(taskName, taskPriority){
    if(deniedToCreate(taskName, taskPriority)) return;
    let task = {
        name: taskName,
        status: STATUS.TODO,
        priority: taskPriority,
        remove: false,
    }
    taskListToShow.push(task);
    render(taskListToShow);
}

function changeStatus(target){
    let taskName = target.nextElementSibling.textContent;
    taskListToShow = taskListToShow.filter(element =>{
        if(element.name === taskName){
            element.status = target.checked ? STATUS.DONE : STATUS.TODO;
        }
        return element;
    });
    render(taskListToShow);
}
function removeTask(target){
    let taskName = target.previousElementSibling.textContent;
    taskListToShow = taskListToShow.filter(element =>{
        if(element.name === taskName){
            element.remove = true;
        }
        return element;
    });
    render(taskListToShow);
}

const deniedToCreate = (taskName, taskPriority) =>
    isTask(taskListToShow, taskName) || !taskName || !isPriority(taskPriority);    

const isPriority = (priority) =>
    Object.values(PRIORITY).includes(priority);

const isCheckbox = (target) =>
    target.className === TODO_CLASS.CHECKBOX;

const isTask = (list, task) =>
    list.some(item => item.name === task);

const isRemove = (target) =>
    target.className === TODO_CLASS.REMOVE;

render(taskListToShow);
