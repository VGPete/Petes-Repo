/*
 Start by brainstorming with class what methods the app will need to work.
Add Todo
Complete Todo
Edit ToDo?
Delete ToDo?
List Todos
Show/hide completed
Filter ToDos (complete/not complete)
Read toDos from local storage
Write ToDos to local storage

Then organize it into things that the interface needs (public) and things that it doesn't need direct access to (private)
Public:
Add Todo
Edit Todo
filter Todos
Delete todo
list todos


private:
read/write localStorage

*/
import { qs, writeToLS, readFromLS, bindTouch, arrayRemove } from "./utils.js";
//  private code here. Not exported from the module
// we need a place to store our list of todos in memory
let liveToDos = null;

// View code here
function renderList(list, element, toDos, hidden) {
  console.log(list);
  element.innerHTML = "";

  list.forEach(toDo => {
    const item = document.createElement("li");
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");
    let cb = null;
    let button = document.createElement('button');
    button.innerHTML="X";
    
    if(hidden && toDo.completed){
      item.innerHTML = `<label><input type="checkbox" checked><strike> ${toDo.content}</strike></label>`;
    }
    else {
      item.innerHTML = `<label><input type="checkbox"> ${toDo.content}</strike></label>`;
    }
    item.appendChild(button);
    //Event Listener for delete button.
      button.addEventListener("click",function() {
      toDos.deleteToDo(toDo.id);
    });


    //Wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];

    if(cb){
      cb.addEventListener("change",function() {
        toDos.completeToDo(toDo.id);
      });  
    }

    element.appendChild(item);

  });
}

function getToDos(key) {
  if (liveToDos === null) {
    // we need to go read the list from the data store
    liveToDos = readFromLS(key) || [];
  }

  return liveToDos;
}

function refreshToDos(key) {
  liveToDos = readFromLS(key) || [];

  return liveToDos;
}

function addToDo(value, key) {
  // use Date.now() for UTC millisecond string.
  const newToDo = {
    id: new Date(),
    content: value,
    completed: false
  };

  liveToDos.push(newToDo);
  writeToLS(key, liveToDos);
}


// this would be done last if you still have time...and if you haven't blown too many minds yet :)  If you do get here...mention how similar this method is with getToDos...they could probably be combined easily.
function filterToDos(key, completed = true) {
  let toDos = getToDos(key);

  // return a list of either completed or not completed toDos based on the parameter.
  return toDos.filter(item => item.completed === hidden);
}

// public
export default class ToDos {
  constructor(listElement, key) {
    // opted to store the listElement inside the class.
    this.listElement = listElement;
    // key for localStorage saving and lookup
    this.key = key;
    // why bind here?
    bindTouch("#addToDo", this.newToDo.bind(this));
    this.listToDos();
  }

  newToDo() {
    const task = document.getElementById("todoInput");
    addToDo(task.value, this.key);
    task.value = "";
    this.listToDos();
  }
  
  findTodo(id) {
    let toDo = liveToDos.find( element => {
      return element.id === id;
    });
    return toDo;
  }
  completeToDo(id) {
    console.log(id + "checked");
    let toDo = this.findTodo(id);
  
    if(toDo){
      toDo.completed = !toDo.completed;
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement,this, true);
    }  
  }

  listToDos(hidden = true) {
    renderList(getToDos(this.key), this.listElement, this, hidden);
  }

  // function to delete items from the ToDo list
  deleteToDo(id) {
    console.log("deleteToDo function was triggered");
    let toDo = this.findTodo(id);
    let newArray = arrayRemove(liveToDos, toDo);  
    writeToLS(this.key, newArray);
    liveToDos = refreshToDos(this.key);
    this.listToDos();
  }
}
