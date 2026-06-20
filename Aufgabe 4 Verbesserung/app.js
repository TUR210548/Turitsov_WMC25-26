// 1. APPLICATION STATE
import TodoItem from './todo-item.js';

const todos = [
  new TodoItem('WMC programmieren', false, 1),
  new TodoItem('CABS lernen', false, 3),
  new TodoItem('NSCS lernen', true, 2),
  new TodoItem('POS/Theorie lernen', false, 2),
  new TodoItem('POS/Java üben', false, 1)
];

// 2. STATE ACCESSORS/MUTATORS FN'S
function addTodoItem(todo) {
    todos.push(todo);
}

function removeTodoItem(todo) {
    const idx = todos.indexOf(todo);
    if (idx !== -1) {
        todos.splice(idx, 1);
    } 
}

function toggleTodoStatus(todo) {
    todo.toggleCompleted();
}

// 3. DOM Node Refs
const newTodoText = document.getElementById("todo-input");
const newTodoPriority = document.getElementById("todo-priority");
const addBtn = document.getElementById("todo-add");
const todoList = document.getElementById("todo-list");
const todoListDone = document.getElementById("todo-list-done");

// 4. DOM Node Creation Fn's
function createTodoElement(todo) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    if (todo.completed) {
        listItem.classList.add("is-complete");
    }

    const cbDone = document.createElement("input");
    cbDone.type = "checkbox";
    cbDone.className = "todo-toggle";
    cbDone.checked = todo.completed;
    cbDone.addEventListener('change', _ => onTodoStatusChanged(todo));

    // Container für Text und Badge nebeneinander
    const textContainer = document.createElement("div");
    textContainer.style.display = "flex";
    textContainer.style.alignItems = "center";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.innerText = todo.text;
    textContainer.append(todoText);

    // Visuelles Badge für die Priorität erstellen
    if (todo.priority) {
        const badge = document.createElement("span");
        badge.className = `priority-badge prio-${todo.priority}`;
        badge.innerText = `P${todo.priority}`;
        textContainer.append(badge);
    }

    const deleteBtn = document.createElement("input");
    deleteBtn.className = "todo-delete";
    deleteBtn.value = "Delete";
    deleteBtn.type = "button";
    deleteBtn.addEventListener('click', _ => onDeleteButtonClicked(todo));

    listItem.append(cbDone, textContainer, deleteBtn);
    return listItem;
}

// 5. RENDER FN
function render() {
    todoList.innerHTML = "";
    todoListDone.innerHTML = "";
    
    // Aufgaben vor dem Rendern nach Priorität sortieren (Prio 1 ganz oben)
    const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);

    for (const ti of sortedTodos) {
        const todoElement = createTodoElement(ti);
        if (!ti.completed) {
            todoList.append(todoElement);
        } else {
            todoListDone.append(todoElement);
        }
    }
}

// 6. EVENT HANDLERS
function onAddButtonClicked() {
    if (newTodoText.value.trim() !== "") {
        // Gewählte Priorität aus dem Dropdown auslesen
        const priorityValue = parseInt(newTodoPriority.value, 10);
        
        const ti = new TodoItem(newTodoText.value.trim(), false, priorityValue);
        addTodoItem(ti);
        
        // Felder zurücksetzen
        newTodoText.value = "";
        newTodoPriority.value = "3"; // Zurück auf Normal (Prio 3)
        render();
    }
}

function onDeleteButtonClicked(todo) {
    removeTodoItem(todo);
    render();
}

function onTodoStatusChanged(todo) {
    toggleTodoStatus(todo);
    render();
}

function onKeyDownEvent(e) {
    if (e.key === "Enter") {
        onAddButtonClicked();
    }   
}

// 7. INIT BINDINGS
addBtn.addEventListener('click', _ => onAddButtonClicked());
newTodoText.addEventListener('keydown', e => onKeyDownEvent(e));

// 8. INITIAL RENDER
render();