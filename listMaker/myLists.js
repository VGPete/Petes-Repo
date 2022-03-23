import { writeToLS, readFromLS, bindTouch, arrayRemove } from "./utils.js";
import  GameList from "./gameList.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let myCurrentLists = null;
let listTotal = null;
let selectedId = 0;

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
    const newList = {
        id: Date.now(),
        content: listName,
        gameList: null,
    };

    newList.gameList = new GameList(document.getElementById("activeListContents"), newList.id, newList.content);

    myCurrentLists.push(newList);
    writeToLS(key, myCurrentLists);
    setSelectedId(newList.id)
    refreshActiveList()
}

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
            resetClasses();
            setSelectedId(l.id);
            refreshActiveList()
        });
    
        element.appendChild(item);
      });
    
}

function resetClasses() {
    let ul = document.getElementById("myListsDisplay").children;

    for(let i = 0; i < ul.length; i++) {
        if (ul[i].nodeName.toLowerCase() === 'li') {
            ul[i].className=""
        }
    }
    
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

function findList(id) {
    let list = myCurrentLists.find( element => {
        return element.id === id;
      });
      return list;
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
}