import { qs, writeToLS, readFromLS, bindTouch, arrayRemove } from "./utils.js";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let currentGameList = null;
let listTotal = null;

function getSavedList(key) {
    currentGameList = readFromLS(key) || [];
    return currentGameList;
}

function totalGames(gameList) {
    let total = 0;
    gameList.forEach(i => {
      total++;
    });
    setTotal(total);
  }

function setTotal(total) {
    listTotal = total;
}

function getTotal() {
    return listTotal;
}

function saveGameList(key, value) {
    writeToLS(key, value)
}

function setCurrentGameList(gameList) {
    currentGameList = gameList
}


function displayGames(list, element, gameList) {
    element.innerHTML = "";

    list.forEach(game => {
        const item = document.createElement("li");
        let button = document.createElement('button');
        button.innerHTML="X";
        button.className="delete";
        item.innerHTML = `<label><input type="checkbox"> ${game.content}</label>`;          
        item.appendChild(button);
        //Event Listeners for delete button.
          button.addEventListener("click",function() {
          gameList.deleteGame(game.id);
        });
    
        element.appendChild(item);
      });
    
      const listTotal = document.createElement("li");
      listTotal.innerHTML = `<p class="totalGames">${getTotal()} games</p>`;
    
      element.appendChild(listTotal);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// public
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class GameList {
    constructor(displayElement, key, listName) {
        this.displayElement = displayElement;
        this.key = key;
        this.listName = listName;

        //this.listGames();
        
    }

    listGames() {
        let savedList = getSavedList(this.key);
        totalGames(savedList);
        displayGames(savedList, this.displayElement, this)
    }

    findGame(id) {
        let game = currentGameList.find( element => {
            return element.id === id;
          });
          return game;
    }

    deleteGame(id) {
        saveGameList(this.key, arrayRemove(currentGameList, this.findGame(id)));
        currentGameList = getSavedList(this.key);
        this.listGames();

    }
    addGameToList(game, gameList) {
        setCurrentGameList(gameList)
        currentGameList.push(game);
        writeToLS(this.key, currentGameList);
    }
}