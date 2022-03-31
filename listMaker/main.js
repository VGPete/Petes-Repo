import MyLists from "./myLists.js";

const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const myListsDisplay = document.getElementById('myListsDisplay')
const apiKey = 'key=5fcfbcd5288a49eaab7b27d6c0574021'
const baseURL = 'https://api.rawg.io/api/'
const myList = new MyLists(myListsDisplay, 'myLists');
// this function sets up the page.
const setup = () => {
    let slug = 'grand-theft-auto-v'
    //myList.testAPI(baseURL + 'games/' + slug + '?' + apiKey)
       

    myList.loadContent(baseURL + 'games?' + apiKey + '&page_size=20&page=', 1);

    document.getElementById("searchButton").addEventListener("click",function() {
    let input = document.getElementById("searchInput").value
        let search = 'https://api.rawg.io/api/games?' + apiKey + '&search=' + input + '&page_size=20&page='
    myList.loadContent(search, 1);
    })


}

//loads everything to setup the page
setup()