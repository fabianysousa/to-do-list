let listElement = document.querySelector("div.list ul.list__all");
let inputElement = document.querySelector("div.task form.task__form input");
let buttonElement = document.querySelector("div.task form.task__form div.button__add button");

let todos = JSON.parse(localStorage.getItem('list_todos')) || [];

window.addEventListener('load', start);

function start() {
    
    buttonElement.onclick = createToDo;
    showToDos();
}

function showToDos() {
    listElement.innerHTML = '';
    let id = 0;

    for (todo of todos){
        let todoElement = document.createElement('li');
        todoElement.setAttribute('ondblclick', `changeState(this, ${id})`)

        const classValue = todo.selected ? 'list__items--selected' : 'list__items'; 
        todoElement.setAttribute('class', `${classValue}`);
        console.log(todo);

        let toDoText = document.createElement('p');
        toDoText.setAttribute('class', 'item');
        toDoText.setAttribute('id', `${id}`);
        toDoText.setAttribute('value', todo.liText);
        toDoText.innerHTML = todo.liText;

        let toDoButton = document.createElement('button');
        toDoButton.setAttribute('class', 'button__delete');
        toDoButton.setAttribute('value', 'X');
        toDoButton.setAttribute('onclick', `removeToDo(${id})`)
        toDoButton.innerHTML = 'X';

        todoElement.appendChild(toDoText);
        todoElement.appendChild(toDoButton);

        listElement.appendChild(todoElement);

        id++;
    }
    console.log(todos);
}

function createToDo() {
    if(!inputElement.value) return;
    let liText = inputElement.value;
    todos.push({liText, selected: false});
    inputElement.value = '';
    saveToStorage();
    showToDos();
}

function removeToDo(toDoID) {
    if(toDoID< 0 || toDoID>todos.length) return;
    console.log(toDoID);
    todos.splice(toDoID, 1);
    saveToStorage(); 
    showToDos();
}

function changeState(liElement, id){
    if(!liElement || typeof todos[id] == 'undefined') return;
    todos[id].selected = todos[id].selected ? false : true;
    console.warn(liElement);
    saveToStorage();
    console.log(todos);
    showToDos();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}