import MyLists from "./myLists.js";

const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const myListsDisplay = document.getElementById('myListsDisplay')
const apiKey = 'key=5fcfbcd5288a49eaab7b27d6c0574021'
const baseURL = 'https://api.rawg.io/api/'

// this function sets up the page.
const setup = () => {
    const myList = new MyLists(myListsDisplay, 'myLists');
    //loadContent(baseURL + 'collections/must-play/games', 'games');
    myList.loadContent(baseURL + 'games?' + apiKey + '&page_size=40&page=1', 'games');
}

//loads everything to setup the page
setup()