//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
//Functions

function addTodo(event){
    //Prevent form from submitting
    if(todoInput.value==''){
        alert("Task deleted as it was empty");
    } else{
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value ;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to local storage
    saveLocalTodos(todoInput.value, false);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>' ;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>' ;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    }
    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    const todos = Array.from(todoList.children);
    const todoIndex = todos.indexOf(todo);
  
    // Delete
    if (item.classList[0] === 'trash-btn') {
      todo.classList.add("fall");
      removeLocalTodos(todoIndex); // Pass the index to remove the correct task
      todo.addEventListener('transitionend', function () {
        todo.remove();
      })
    }
  
    // Checkmark
    if (item.classList[0] === 'complete-btn') {
      const completed = !todo.classList.contains('completed');
      todo.classList.toggle('completed');
      updateLocalTodo(todoIndex, completed);
    }
  }
  

  function updateLocalTodo(index, completed) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos[index].completed = completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  

function filterTodo(e){
    const todos= todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo, completed = false) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push({ description: todo, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todoItem, index) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
  
      // Create li
      const newTodo = document.createElement('li');
      newTodo.innerText = todoItem.description;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);
  
      // Check mark button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
  
      // Trash button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);
  
      // Update completed state
      if (todoItem.completed) {
        todoDiv.classList.add('completed');
      }
  
      // Append to list
      todoList.appendChild(todoDiv);
    });
  }
  
  
  function removeLocalTodos(index) {
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(index, 1); // Remove the task by its index
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  