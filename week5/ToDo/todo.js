import { qs, writeToLS, readFromLS, bindTouch, arrayRemove } from "./utils.js";
//  private code here. Not exported from the module
// we need a place to store our list of todos in memory
let liveToDos = null;
let activeTotal = null;

// View code here
function renderList(list, element, toDos) {
  console.log(list);
  element.innerHTML = "";

  list.forEach(toDo => {
    const item = document.createElement("li");
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");
    let cb = null;
    let button = document.createElement('button');
    button.innerHTML="X";
    button.className="delete";
    
    if(toDo.completed){
      item.innerHTML = `<label><input type="checkbox" checked><strike> ${toDo.content}</strike></label>`;
    }
    else {
      item.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label>`;
    }
    item.appendChild(button);
    //Event Listeners for delete button.
      button.addEventListener("click",function() {
      toDos.deleteToDo(toDo.id);
    });

    //Wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];
    if(cb){
      cb.addEventListener("change",function() {
        toDos.completeToDo(toDo.id);
      });  
    };

    element.appendChild(item);
  });

  // add a filter line item to the list.
  const filterMenu = document.createElement("li");
  filterMenu.innerHTML = `<p class="menu">${getTotal()} tasks remaining</p>`;

  // Create buttons for filtering
  let buttonAll = document.createElement('button');
  let buttonActive = document.createElement('button');
  let buttonCompleted = document.createElement('button');
  buttonAll.className="button";
  buttonActive.className="button";
  buttonCompleted.className="button";

  // update the filter ALL button ///////////////////////////////
  buttonAll.innerHTML="All";
  filterMenu.appendChild(buttonAll);
  //Event Listener for Filter All button.
    buttonAll.addEventListener("click",function() {
    toDos.listToDos();
  });

  // update the filter ACTIVE button /////////////////////////////
  buttonActive.innerHTML="Active";
  filterMenu.appendChild(buttonActive);
  //Event Listener for Filter Active button.
    buttonActive.addEventListener("click",function() {
    toDos.listFilteredToDos(toDos.filterIt(toDos.key,false));
  });

  // update the filter COMPLETED button ///////////////////////////
  buttonCompleted.innerHTML="Completed";
  filterMenu.appendChild(buttonCompleted);
  //Event Listener for Filter Completed button.
    buttonCompleted.addEventListener("click",function() {
    toDos.listFilteredToDos(toDos.filterIt(toDos.key,true));
  });

  element.appendChild(filterMenu);

}

function getToDos(key) {
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

function writeToDo(key, value) {
  writeToLS(key, value);
}

// Gets list from local storage and filters based on button selection passed to the function.
function filterToDos(key, completed) {
  let toDos =getToDos(key);
  
 
  //Filter the list and then total the active items.
  let filteredList = toDos.filter(item => item.completed === completed);
  totalActive(filteredList);
  console.log(getTotal());
  return filteredList;
}

function getTotal() {
  return activeTotal;
}

function setTotal(total){
  activeTotal = total;
}

function totalActive(list) {
  let total = 0;
  let newList = list.filter(item => item.completed === false);
  newList.forEach(i => {
    total++;
  });
  setTotal(total);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      this.listToDos()
    }  
  }

  listToDos() {
    let newList = getToDos(this.key);
    totalActive(newList);
    console.log(getTotal());
    renderList(newList, this.listElement, this);
  }

  // Function to display the filtered todo list
  listFilteredToDos(list) {
    renderList(list, this.listElement, this);
  }

  // Function to return a filtered list depending on if the item is completed or not.
  filterIt(key, completed) {
    return filterToDos(key, completed);
  }

  // function to delete items from the ToDo list
  deleteToDo(id) {
    writeToDo(this.key, arrayRemove(liveToDos, this.findTodo(id)));
    liveToDos = getToDos(this.key);
    this.listToDos();
  }
}
