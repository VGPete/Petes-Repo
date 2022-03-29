import { writeToLS, readFromLS, bindTouch, arrayRemove } from "./utils.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myCurrentLists = null;
let listTotal = null;
let selectedId = 0;


////////////////////////////
// Getters
////////////////////////////
function getSavedList(key) {
    myCurrentLists = readFromLS(key) || [];
    return myCurrentLists;
}

function getTotal() {
    return listTotal;
}

function getSelectedId() {
    return selectedId;
}

function findList(id) {
    let list = myCurrentLists.find( element => {
        return element.id === id;
      });
      return list;
}

function getCurrent() {
    return myCurrentLists;
}

////////////////////////////
// Setters
////////////////////////////
function setSelectedId(id) {
    selectedId = id;
}

function setTotal(total) {
    listTotal = total;
}

function totalLists(lists) {
    let total = 0;
    lists.forEach(i => {
      total++;
    });
    setTotal(total);
}

function saveLists(key, value) {
    writeToLS(key, value)
}

function addNewList(listName, key) {
    let gameList = []
    const newList = {
        id: Date.now(),
        content: listName,
        list: gameList 
    };

    myCurrentLists.push(newList);
    writeToLS(key, myCurrentLists);
    setSelectedId(newList.id)
    refreshActiveList()
}

////////////////////////////
// Display
////////////////////////////
function displayLists(list, element, listList) {
    element.innerHTML = "";
    displayListTotal()
    list.forEach(l => {
        let item = document.createElement("li");
        let button = document.createElement('button');
        let text = document.createElement('p');
        button.innerHTML="X";
        button.className="delete";
        text.innerHTML=`${l.content}`;
        item.appendChild(text);       
        item.appendChild(button);
        //Event Listener for delete button.
          button.addEventListener("click",function() {
          listList.deleteList(l.id);
        });
        //Event Listener for list selection
        text.addEventListener("click",function() {
            setSelectedId(l.id);
            refreshActiveList()
        });
    
        element.appendChild(item);
      });
}

function displayListTotal() {
    const total = document.getElementById("listTotal");
    if (getTotal() === 1) {
        total.innerHTML = `<p class="totalLists">(${getTotal()}) List:</p>`;
    }

    else {
        total.innerHTML = `<p class="totalLists">(${getTotal()}) Lists:</p>`;
    }
}

function refreshActiveList() {
    if (initializeActiveList()) {
        let listName = findList(selectedId);
        document.getElementById("activeList").innerHTML = `${listName.content}`
    }
}

function initializeActiveList() {

    if (getSelectedId() === 0 && myCurrentLists[0]){
        setSelectedId(myCurrentLists[0].id)
        return true;
    }
    else if (getSelectedId() === 0) {
        document.getElementById("activeList").innerHTML = `There are no lists`
        return false;
    }
    else {
        return true;
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class myLists {
    constructor(displayElement, key) {
        // opted to store the listElement inside the class.
        this.displayElement = displayElement;
        // key for localStorage saving and lookup
        this.key = key;
        bindTouch("#addAList", this.newList.bind(this));
        this.listLists();
    }

    newList() {
        const task = document.getElementById("listName");
        addNewList(task.value, this.key);
        task.value = "";
        this.listLists();
      }

    listLists() {
        let savedList = getSavedList(this.key);
        totalLists(savedList);
        displayLists(savedList, this.displayElement, this)
        initializeActiveList();
        refreshActiveList();
    }

    deleteList(id) {

        if (getSelectedId() === id) {
            setSelectedId(0)
        }
        else {
            setSelectedId(getSelectedId())
        }
        saveLists(this.key, arrayRemove(myCurrentLists, findList(id)));
        this.listLists();
        refreshActiveList()

    }
    
    getCurrentList() {
        return findList(getSelectedId())
    }

    getMyCurrentLists() {
        return getCurrent()
    }

    getCurrentListId() {
        return getSelectedId()
    }

    saveTheList(key, value) {
        saveLists(key, value)
    }
}