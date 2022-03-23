import  GameList from "./gameList.js";
import Game from "./game.js";
import  myLists from "./myLists.js";

const imageWidth = 280
const imageHeight = 180
const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const myListsDisplay = document.getElementById('myListsDisplay')

    // fetches the data and lists it to the screen.
export async function loadContent(URL, type) {
    const myList = new myLists(myListsDisplay, 'myLists');

    const data = await fetch(`${URL}`)
    const json = await data.json()
    const results = json.results

    console.log(results)


    content.innerHTML = ''
    results.forEach((result) => {
        const game = new Game(result);
        //console.log(game)


        const details = document.createElement('ul')
        details.className="gameItem"
        const addButton = document.createElement('button')
        addButton.className = "addToList"
        addButton.innerHTML = "+";
        addButton.id = "addToListButton"
        details.appendChild(addButton)
        const background = document.createElement('img')
        background.src = game.background_image
        background.width = imageWidth
        background.height = imageHeight
        background.className = "thumbnail"
        details.appendChild(background)
        const name = document.createElement('p')
        name.innerHTML = `${game.name}`
        name.className = "gameName"
        details.appendChild(name)
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

        details.appendChild(ul)
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
            let foundGame = contentList.findGame(game.id)
            console.log(foundGame)
            console.log(myList)
            let foundList = myList.getCurrentList()
            console.log(foundList)
            foundList.addGameToList(foundGame, foundList)

        });

    })
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
