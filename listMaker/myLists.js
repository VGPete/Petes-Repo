import { writeToLS, readFromLS, bindTouch, arrayRemove, gameRemove } from "./utils.js";
import Game from "./game.js";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// private
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Global variables
const content = document.getElementById('content')
const pages = document.getElementById('pages')
const activeListContents = document.getElementById('activeListContents')

let myCurrentLists = null;
let listTotal = null;
let selectedId = 0;
let currentPage = 1;
let numPages = 1
let gameListTotal = null;
let customListActive = false;


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
        let text = document.createElement('button');
        button.innerHTML="X";
        button.className="delete";
        text.innerHTML=`${l.content}`;
        text.className="none";
        item.appendChild(text);       
        item.appendChild(button);
        //Event Listener for delete button.
          button.addEventListener("click",function() {
          listList.deleteList(l.id);
          listList.loadActiveList(listList.findCurrentList().list, 1)
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
            item[0].className = "none"
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

        document.getElementById("activeList").innerHTML = `Expand: ${listName.content}`
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
    if (list !== undefined) {
        if (list.list) {
            totalgames(list.list)
            element.innerHTML = "";
            const displayTotal = document.createElement("li");
            displayTotal.innerHTML = `<p class="totalGames">(${getGamesTotal()}) Games:</p>`;

            element.appendChild(displayTotal);
            const display = document.createElement("ul");
            list.list.forEach(game => {
                const item = document.createElement("li");
                const text = document.createElement("p");
                let button = document.createElement('button');
                button.innerHTML="X";
                button.className="delete";
                text.innerHTML = `${game.name}`;   
                item.appendChild(text);       
                item.appendChild(button);

                //Event Listeners for delete button.
                button.addEventListener("click",function() {
                deleteGame(game.id);
                refreshGameList()
                });


                display.appendChild(item);
            });
            element.appendChild(display)
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
        document.getElementById("listName").addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.newList()
                refreshGameList()
            }
        })

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

    loadActiveListResults(list, page) {
        this.loadActiveList(list, page)
    }

    findCurrentList() {
        refreshActiveList();
        let list = getCurrentList()
        for (let i = 0; i < list.length; i++) {
            if(list[i].id === getSelectedId()) {
                return list[i];
            }
        }


    }

    loadActiveList(list, page) {
        content.innerHTML=''
        console.log(list)

        
        customListActive =  true;
        currentPage = page

        numPages = Math.ceil(list.length / 20)
 
        pages.innerHTML = '<p class="currentPage">Current Page: ' + currentPage + ' </p>'

        // adds a previous button
        const previousButton = document.createElement('button')
        previousButton.textContent = `<`
        previousButton.addEventListener('click', () => {
            if (currentPage > 1) {
                let newPage = currentPage - 1
                this.loadActiveListResults(list, newPage)
            }
        })
        pages.appendChild(previousButton)

        // adds a page button for each page
        if(currentPage <= 5 && numPages > 10) {
            for (let i = 1; i < 11; i++) {
                const pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.addEventListener('click', () => {
                currentPage = i
                this.loadActiveListResults(list, i)
                })
                pages.appendChild(pageButton)
            }
        }
        else if(currentPage <= 5 && numPages < 10) {
            for (let i = 1; i < numPages + 1; i++) {
                const pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.addEventListener('click', () => {
                currentPage = i
                this.loadActiveListResults(list, i)
                })
                pages.appendChild(pageButton)
            }
        }

        else if(currentPage > 5 && currentPage <= (numPages - 5)) {
            for (let i = (currentPage -  5); i < (currentPage + 6); i++) {
                const pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.addEventListener('click', () => {
                currentPage = i
                this.loadActiveListResults(list, i)
                })
                pages.appendChild(pageButton)
            }
        }
        else {
            for (let i = (numPages - 5); i < numPages + 1; i++) {
                const pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.addEventListener('click', () => {
                currentPage = i
                this.loadActiveListResults(list, i)
                })
                pages.appendChild(pageButton)
            }
        }

        // adds a next button
        const nxtButton = document.createElement('button')
        nxtButton.textContent = `>`
        nxtButton.addEventListener('click', () => {
            if (currentPage < numPages) {
                let newPage = currentPage+1
            this.loadActiveListResults(list, newPage)
            }
        })
        pages.appendChild(nxtButton)
        
        // This sets up the pages for the list
        let pageTop = currentPage * 20;
        let pageBottom = pageTop - 20;
        if (pageTop > list.length) {
            pageTop = list.length;
        }

        for (let i = pageBottom; i < pageTop ; i++) {
            const game = list[i]


            const details = document.createElement('ul')
            details.className="gameItem"

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


            const flex3 = document.createElement('div')
            flex3.className = "flex3"
            const name = document.createElement('p')
            name.innerHTML = `${game.name}`
            name.className = "gameName"
            flex3.appendChild(name)

            const hidden = document.createElement('div')
            hidden.className = "listDetailsHidden"
            const detailsName = document.createElement('p')
            detailsName.innerHTML = `${game.name}`
            detailsName.className = "detailsName"
            hidden.appendChild(detailsName)
            const ul = document.createElement('ul')
            hidden.appendChild(ul)
        
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
            flex3.appendChild(hidden)


            details.appendChild(flex2)
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

                //event listeners
                background.addEventListener("mouseover",function() {
                    hidden.className = "listDetails"
                    name.className = "gameNameHidden"
            });

            background.addEventListener("mouseleave",function() {
                hidden.className = "listDetailsHidden"
                name.className = "gameName"
            });

            //add list event listener
            document.getElementById('addAList').addEventListener("click",function() {
                refreshGameList()
            });
        };     
        const gridBottom = document.createElement('div')
        gridBottom.className = "gridBottom"
        content.appendChild(gridBottom)     
        const gridBottom2 = document.createElement('div')
        gridBottom2.className = "gridBottom"
        content.appendChild(gridBottom2)   

        const activeListDisplay = document.getElementById('activeListContents').childNodes;
        activeListDisplay.forEach((child1)=> {
            if (child1.nodeName === 'UL') {
                const activeListDisplay2 = child1.childNodes
                activeListDisplay2.forEach((child2)=>{
                    if (child2.nodeName === 'LI') {
                        const activeListDisplay3 = child2.childNodes
                        activeListDisplay3.forEach((child3)=> {
                            if (child3.nodeName === 'BUTTON') {
                                child3.addEventListener("click", () => {
                                    console.log("button Clicked")
                                    if (customListActive === true) {
                                        console.log("active list is true")
                                        this.loadActiveListResults(this.findCurrentList().list, currentPage)
                                    }
                                });

                            }
                        })
                    }

                })
            }

        })
    }

    // fetches the data and lists it to the screen.
    async loadContent(URL, page) {

        content.innerHTML=`<div class="ring">Loading<span></span></div>`

        customListActive = false;
        currentPage = page
        
        const data = await fetch(`${URL}${page}`)
        const json = await data.json()
        const results = json.results
        numPages = Math.ceil(json.count / 20)
        console.log(results)

        // initial refresh prior to any changes made
        refreshGameList()

        pages.innerHTML = '<p class="currentPage">Current Page: ' + currentPage + ' </p>'

        // adds a previous button
        const prevButton = document.createElement('button')
        prevButton.textContent = `<`
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                let newPage = currentPage-1;
            this.loadResults(URL, newPage)
            }
        })
        pages.appendChild(prevButton)

        // adds a page button for each page
        if(currentPage <= 5 && numPages > 10) {
            for (let i = 1; i < 11; i++) {
                const button = document.createElement('button')
                button.textContent = i
                button.addEventListener('click', () => {
                currentPage = i
                this.loadResults(URL, i)
                })
                pages.appendChild(button)
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
                pages.appendChild(button)
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
                pages.appendChild(button)
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
                pages.appendChild(button)
            }
        }

        // adds a next button
        const nextButton = document.createElement('button')
        nextButton.textContent = `>`
        nextButton.addEventListener('click', () => {
            if (currentPage < numPages) {
                let newPage = currentPage + 1;
            this.loadResults(URL, newPage)
            }
        })
        pages.appendChild(nextButton)
        content.innerHTML=''
        results.forEach((result) => {

            let game = new Game(result);
            const details = document.createElement('ul')
            details.className="gameItem"

            const flex1 = document.createElement('div')
            flex1.className = "flex1"
            const addButton = document.createElement('button')
            addButton.className = "addGameButton"
            addButton.innerHTML = "Add to List";
            addButton.id = "addToListButton"
            addButton.dataset.id = game.id
            flex1.appendChild(addButton)
            
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
            

            const flex3 = document.createElement('div')
            flex3.className = "flex3"
            const name = document.createElement('p')
            name.innerHTML = `${game.name}`
            name.className = "gameName"
            flex3.appendChild(name)
            const hidden = document.createElement('div')
            hidden.className = "listDetailsHidden"
            const detailsName = document.createElement('p')
            detailsName.innerHTML = `${game.name}`
            detailsName.className = "detailsName"
            hidden.appendChild(detailsName)
            const ul = document.createElement('ul')
            hidden.appendChild(ul)
        
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
            

            flex3.appendChild(hidden)
            

            details.appendChild(flex2)
            details.appendChild(flex1)
            details.appendChild(flex3)
       
            content.appendChild(details)
           

            //event listeners
            background.addEventListener("mouseover",function() {
                    hidden.className = "listDetails"
                    name.className = "gameNameHidden"
            });

            background.addEventListener("mouseleave",function() {
                hidden.className = "listDetailsHidden"
                name.className = "gameName"
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
        });   
        const gridBottom = document.createElement('div')
        gridBottom.className = "gridBottom"
        content.appendChild(gridBottom)     
        const gridBottom2 = document.createElement('div')
        gridBottom2.className = "gridBottom"
        content.appendChild(gridBottom2)   
    }
}