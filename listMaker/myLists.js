import { writeToLS, readFromLS, bindTouch, arrayRemove, gameRemove } from "./utils.js";
import Game from "./game.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Global variables
const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const myListsDisplay = document.getElementById('myListsDisplay')
const activeListContents = document.getElementById('activeListContents')
const apiKey = 'key=5fcfbcd5288a49eaab7b27d6c0574021'
const baseURL = 'https://api.rawg.io/api/games/'

let myCurrentLists = null;
let listTotal = null;
let selectedId = 0;
let currentPage = 1;
let numPages = 1
let gameListTotal = null;


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

function getCurrentList() {
    return myCurrentLists;
}

function getGamesTotal() {
    return gameListTotal;
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

function setGamesTotal(total) {
    gameListTotal = total;
}

function totalLists(lists) {
    let total = 0;
    lists.forEach(i => {
      total++;
    });
    setTotal(total);
}

function totalgames(games) {
    let total = 0;
    games.forEach(i => {
        total++;
    });
    setGamesTotal(total);
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
    clearSelection();
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
            clearSelection();
            refreshActiveList();
            text.className = "selected";
        });
    
        element.appendChild(item);
      });
}

function clearSelection() {
    const display = document.getElementById("myListsDisplay").childNodes
    display.forEach((li) => {
        let item = li.childNodes
        item.forEach((node) => {
            if(node.nodeName === 'P')
            node.className = "none"
        });
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
        let name = listName.content
        const display = document.getElementById("myListsDisplay").childNodes
        display.forEach((li) => {
            const child = li.childNodes

            child.forEach((node) => {
                if(node.textContent === name) {
                    node.className = "selected"
                }
                
            });
        });
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

function displayActiveListGames() {
    const list = findList(getSelectedId());
    let element = activeListContents
    element.innerHTML = "";
    if (list !== undefined) {
        if (list.list) {
            totalgames(list.list)

            const displayTotal = document.createElement("li");
            displayTotal.innerHTML = `<p class="totalGames">(${getGamesTotal()}) Games:</p>`;

            element.appendChild(displayTotal);

            list.list.forEach(game => {
                const display = document.createElement("ul");
                const item = document.createElement("li");
                let button = document.createElement('button');
                button.innerHTML="X";
                button.className="delete";
                item.innerHTML = `${game.name}`;          
                item.appendChild(button);

                //Event Listeners for delete button.
                button.addEventListener("click",function() {
                deleteGame(game.id);
                refreshGameList()
                });

                element.appendChild(display)
                display.appendChild(item);
            });
        } 
    }
    else {
        setGamesTotal(0)
        const displayTotal = document.createElement("li");
        displayTotal.innerHTML = `<p class="totalGames">(${getGamesTotal()}) Games:</p>`;
    }
}

//Function to turn API objects into strings
function getString(array, type) {
    let string = "";

    if (array) {
        for (let i=0; i < array.length; i++) {
            if (type === "genres") {
                if (i === array.length - 1) {
                    string += array[i].name;
                }
                else {
                    string += array[i].name + ", ";
                }
            }
            else {
                if (i === array.length - 1) {
                    string += array[i].platform.name;
                }
                else {
                    string += array[i].platform.name + ", ";
                }

            }

        }
        return string;
    }
    else {
        return "N/A"
    }
}

function deleteGame(gameId) {
    const gameList = getCurrentList()
    gameList.forEach(list => {
        if(getSelectedId() === list.id) {
            list.list.forEach(game => {
                if (gameId === game.id) {
                    list.list = gameRemove(list.list, gameId)
                }
            })
        }
    })
    saveLists("myLists", gameList)
    refreshGameList()
}

function refreshGameList() {
    //refresh gamelist 
    let lists = document.getElementById('myListsDisplay').childNodes
    lists.forEach((list) => {
        let clicks = list.childNodes
        clicks.forEach((click) => {
            click.addEventListener("click",function() {
                displayActiveListGames()
            });
        })

    })
    displayActiveListGames()
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
        const verification = /^[\w\-\_\s]+$/
        if (task.value.match(verification)) {
            addNewList(task.value, this.key);
            document.getElementById("inputError").className="inputErrorHidden"
            task.value = "";
            this.listLists();
        }
        else {
            document.getElementById("inputError").className="inputError"
            document.getElementById("inputError").innerHTML="Invalid list name: characters must only be a-z, 0-9, -, _ and spaces."
            task.value = "";
            setTimeout(function(){
                document.getElementById("inputError").className = "inputErrorHidden"
                document.getElementById("inputError").innerHTML = ""
            }, 3000)
        }


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
        refreshGameList()

    }

    loadResults(URL, newPage) {
        this.loadContent(URL, newPage)
    }


    // fetches the data and lists it to the screen.
    async loadContent(URL, page) {
        currentPage = page
        
        const data = await fetch(`${URL}${page}`)
        const json = await data.json()
        const results = json.results
        numPages = Math.ceil(json.count / 20)
        console.log(results)

        // initial refresh prior to any changes made
        refreshGameList()

        content.innerHTML = '<p class="currentPage">Current Page: ' + currentPage + ' </p>'

        // adds a previous button
        const prevButton = document.createElement('button')
        prevButton.textContent = `<`
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
            this.loadResults(URL, currentPage - 1)
            currentPage = currentPage - 1
            }
        })
        content.appendChild(prevButton)

        // adds a page button for each page
        if(currentPage <= 5 && numPages > 10) {
            for (let i = 1; i < 11; i++) {
                const button = document.createElement('button')
                button.textContent = i
                button.addEventListener('click', () => {
                currentPage = i
                this.loadResults(URL, i)
                })
                content.appendChild(button)
            }
        }
        else if(currentPage <= 5 && numPages < 10) {
            for (let i = 1; i < numPages; i++) {
                const button = document.createElement('button')
                button.textContent = i
                button.addEventListener('click', () => {
                currentPage = i
                this.loadResults(URL, i)
                })
                content.appendChild(button)
            }
        }

        else if(currentPage > 5 && currentPage <= (numPages - 5)) {
            for (let i = (currentPage -  5); i < (currentPage + 6); i++) {
                const button = document.createElement('button')
                button.textContent = i
                button.addEventListener('click', () => {
                currentPage = i
                this.loadResults(URL, i)
                })
                content.appendChild(button)
            }
        }
        else {
            for (let i = (numPages - 5); i < numPages + 1; i++) {
                const button = document.createElement('button')
                button.textContent = i
                button.addEventListener('click', () => {
                currentPage = i
                this.loadResults(URL, i)
                })
                content.appendChild(button)
            }
        }

        // adds a next button
        const nextButton = document.createElement('button')
        nextButton.textContent = `>`
        nextButton.addEventListener('click', () => {
            if (currentPage < numPages) {
            this.loadResults(URL, currentPage + 1)
            currentPage = currentPage + 1
            updateCurrentPage(currentPage)
            }
        })
        content.appendChild(nextButton)

        results.forEach((result) => {

            let game = new Game(result);
            const details = document.createElement('ul')
            details.className="gameItem"

            const flex1 = document.createElement('div')
            flex1.className = "flex1"
            const addButton = document.createElement('button')
            addButton.className = "addGameButton"
            addButton.innerHTML = "+";
            addButton.id = "addToListButton"
            addButton.dataset.id = game.id
            flex1.appendChild(addButton)
            details.appendChild(flex1)

            const flex2 = document.createElement('div')
            flex2.className = "flex2"
            const background = document.createElement('img')
            if (game.background_image === null) {
                background.src = "./image_missing.jpg"
            }
            else {
                background.src = game.background_image
            }            
            background.className = "thumbnail"
            flex2.appendChild(background)
            details.appendChild(flex2)

            const flex3 = document.createElement('div')
            flex3.className = "flex3"
            const name = document.createElement('p')
            name.innerHTML = `${game.name}`
            name.className = "gameName"
            flex3.appendChild(name)

            const ul = document.createElement('ul')
            ul.className = "listDetailsHidden"

        
            let esrbRating
            if (game.esrb_rating === null) {
                esrbRating = "N/A";
            }
            else
            {
                esrbRating = game.esrb_rating.name;
            }
            let metacritic
            if (game.metacritic === null) {
                metacritic = "N/A";
            }
            else
            {
                metacritic = game.metacritic + "/100";
            }
            ul.innerHTML = `
            <li><b>Release Date:</b>      ${game.released}</li>
            <li><b>Genres:</b>            ${getString(game.genres, "genres")}</li>
            <li><b>Platforms:</b>         ${getString(game.platforms, "platforms")}</li>
            <li><b>Metacritic Rating:</b> ${metacritic}</li>
            <li><b>Average Playtime:</b>  ${game.playtime} hours</li>
            <li><b>ESRB Rating:</b>       ${esrbRating}</li>       
            `
            
            flex3.appendChild(ul)
            details.appendChild(flex3)
            content.appendChild(details)

            

            //event listeners
            background.addEventListener("click",function() {
                if (ul.className === "listDetailsHidden") {
                    ul.className = "listDetails"
                }
                else {
                    ul.className = "listDetailsHidden"
                }
            });
            name.addEventListener("click",function() {
                if (ul.className === "listDetailsHidden") {
                    ul.className = "listDetails"
                }
                else {
                    ul.className = "listDetailsHidden"
                }
            });

            //active list display
            addButton.addEventListener("click",function() {
                game.addGameToList(findList(getSelectedId()), game)
                saveLists('myLists', getCurrentList())
                refreshGameList()

            });

            //add list event listener
            document.getElementById('addAList').addEventListener("click",function() {
                refreshGameList()
            });
            //add list delete event listener
            document.getElementById('addAList').addEventListener("click",function() {
                refreshGameList()
            });
        });

        // baseURL + 'games/' + slug + '?' + apiKey
        
    }
}