import MyLists from "./myLists.js";

const platforms = document.getElementById('platforms')
const discover = document.getElementById('discover')
const myListsDisplay = document.getElementById('myListsDisplay')
const apiKey = 'key=5fcfbcd5288a49eaab7b27d6c0574021'
const baseURL = 'https://api.rawg.io/api/'
const myList = new MyLists(myListsDisplay, 'myLists');
// this function sets up the page.
const setup = () => {
    //myList.loadContent(baseURL + 'games?' + apiKey + '&page_size=20&page=', 1);
    myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&dates=2022-01-01,2022-12-31&page_size=20&page=', 1);

    sidebar()    
}

function sidebar() {
    // Search button
    document.getElementById("searchButton").addEventListener("click",function() {
        let input = document.getElementById("searchInput").value
        let search = 'https://api.rawg.io/api/games?' + apiKey + '&search=' + input + '&ordering=-metacritic&search_exact=true&page_size=20&page='
        myList.loadContent(search, 1);
    })

    // explore list structure
    const ul = document.createElement("ul")
    ul.className="explore"
    const li1 = document.createElement("li")
    const li2 = document.createElement("li")
    const li3 = document.createElement("li")
    ul.appendChild(li1)
    ul.appendChild(li2)
    ul.appendChild(li3)
    discover.appendChild(ul)
    
    // Highest Rated 2022
    const hr2022 = document.createElement("button")
    hr2022.id="top2022"
    hr2022.innerText = "Top: 2022"
    li1.appendChild(hr2022)
    document.getElementById("top2022").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&dates=2022-01-01,2022-12-31&page_size=20&page=', 1);
    })


    // Highest Rated 2021
    const hr2021 = document.createElement("button")
    hr2021.id="top2021"
    hr2021.innerText = "Top: 2021"
    li2.appendChild(hr2021)
    document.getElementById("top2021").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&dates=2021-01-01,2021-12-31&page_size=20&page=', 1);
    })

    // Greatest of all time
    const hrAllTime = document.createElement("button")
    hrAllTime.id="topAllTime"
    hrAllTime.innerText = "Top: All Time"
    li3.appendChild(hrAllTime)
    document.getElementById("topAllTime").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&page_size=20&page=', 1);
    })

    // platform list structure
    const ul2 = document.createElement("ul")
    ul2.className="gamePlatforms"
    const list1 = document.createElement("li")
    const list2 = document.createElement("li")
    const list3 = document.createElement("li")
    const list4 = document.createElement("li")
    const list5 = document.createElement("li")
    const list6 = document.createElement("li")
    ul2.appendChild(list1)
    ul2.appendChild(list2)
    ul2.appendChild(list3)
    ul2.appendChild(list4)
    ul2.appendChild(list5)
    ul2.appendChild(list6)
    platforms.appendChild(ul2)
    
    // Mobile
    const mobile = document.createElement("button")
    mobile.id="mobile"
    mobile.innerText = "Mobile"
    list1.appendChild(mobile)
    document.getElementById("mobile").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=4,8&page_size=20&page=', 1);
    })


    // Nintendo
    const nintendo = document.createElement("button")
    nintendo.id="nintendo"
    nintendo.innerText = "Nintendo"
    list2.appendChild(nintendo)
    document.getElementById("nintendo").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=7&page_size=20&page=', 1);
    })

    // PC
    const pc = document.createElement("button")
    pc.id="pc"
    pc.innerText = "PC"
    list3.appendChild(pc)
    document.getElementById("pc").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=1&page_size=20&page=', 1);
    })

    // Playstation
    const playstation = document.createElement("button")
    playstation.id="playstation"
    playstation.innerText = "Playstation"
    list4.appendChild(playstation)
    document.getElementById("playstation").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=2&page_size=20&page=', 1);
    })

    // Sega
    const sega = document.createElement("button")
    sega.id="sega"
    sega.innerText = "Sega"
    list5.appendChild(sega)
    document.getElementById("sega").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=11&page_size=20&page=', 1);
    })

    // Xbox
    const xbox = document.createElement("button")
    xbox.id="xbox"
    xbox.innerText = "Xbox"
    list6.appendChild(xbox)
    document.getElementById("xbox").addEventListener("click",function() {
        myList.loadContent(baseURL + 'games?' + apiKey + '&ordering=-metacritic&parent_platforms=3&page_size=20&page=', 1);
    })
}

//loads everything to setup the page
setup()