import { writeToLS, readFromLS, bindTouch, arrayRemove, gameRemove } from "./utils.js";
import Game from "./game.js";
import  myLists from "./myLists.js";

const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const myListsDisplay = document.getElementById('myListsDisplay')
const activeListContents = document.getElementById('activeListContents')
let gameListTotal = null;

    // fetches the data and lists it to the screen.
export async function loadContent(URL, type) {
    const myList = new myLists(myListsDisplay, 'myLists');
    const data = await fetch(`${URL}`)
    const json = await data.json()
    const results = json.results

    console.log(results)
    displayActiveListGames(myList.getCurrentList(),activeListContents, myList)

    content.innerHTML = ''
    results.forEach((result) => {
        const game = new Game(result);
        //console.log(game)


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
        background.src = game.background_image
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


        if (type === 'games') {
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
            <li><b>ESRB Rating:</b>       ${esrbRating}</li>`
        }
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

            let activeList = myList.getCurrentList()
            console.log(activeList)
            game.addGameToList(activeList, game)
            myList.saveTheList('myLists', myList.getMyCurrentLists())
            displayActiveListGames(activeList,activeListContents, myList)

        });

        

    })

    

}

function displayActiveListGames(list, element, myList) {
    element.innerHTML = "";

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
        deleteGame(game.id, myList.getMyCurrentLists(), myList.getCurrentListId(), list, element, myList);
        });

        
    
        element.appendChild(item);
    });


}

function displayLists() {

}

function getString(array, type) {
    let string = "";

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

function getGamesTotal() {
    return gameListTotal;
}

function setGamesTotal(total) {
    gameListTotal = total;
}

function totalgames(games) {
    let total = 0;
    games.forEach(i => {
      total++;
    });
    setGamesTotal(total);
}

function deleteGame(gameId, gameList, listId, list, element, myList) {
    console.log("Delete Game pressed")
    gameList.forEach(list => {
        if(listId === list.id) {
            list.list.forEach(game => {
                if (gameId === game.id) {
                    list.list = gameRemove(list.list, gameId)
                }
            })
        }
    })
    saveLists("myLists", gameList)
    console.log(gameList)
    displayActiveListGames(list, element, myList)
    
    //saveGameList(this.key, arrayRemove(currentGameList, this.findGame(id)));
    //currentGameList = getSavedList(this.key);
    //this.listGames();

}

function saveLists(key, value) {
    writeToLS(key, value)
}
