import { readLS, writeLS } from './utils.js'

const searchBar = document.getElementById('searchBar')
const sideBar = document.getElementById('sideBar')
const content = document.getElementById('content')
const listBar = document.getElementById('listBar')
const apiKey = 'key=5fcfbcd5288a49eaab7b27d6c0574021'
const baseURL = 'https://api.rawg.io/api/'
const imageWidth = 120
const imageHeight = 90


// this function sets up the page.
const setup = () => {

  
    loadContent(baseURL + 'collections/must-play/games', 'games')
  }

  // fetches the data and lists it to the screen.
const loadContent = async (URL, type) => {
    const data = await fetch(`${URL}`)
    const json = await data.json()
    const results = json.results
    let attributes
  
    content.innerHTML = ''
    results.forEach((result) => {
      const details = document.createElement('details')
      let background = document.createElement('img')
        background.src = result.background_image
        background.width = imageWidth
        background.height = imageHeight
        background.className = "thumbnail"
      details.innerHTML = `
      <summary>${result.name}</summary>`
      const ul = document.createElement('ul')
      ul.className = "listDetails"
      if (type === 'games') {
        attributes = [
            'id',
            'description',
            'released',
            'rating',
            'platforms',
          ]
      }
      else {
        attributes = [
            'id',
            'description',
            'year_start',
            'year_end',
            'games_count',
          ]
      }
      ul.innerHTML = attributes
        .map(
          (attribute) =>
            `<li>${attribute.charAt(0).toUpperCase() + attribute.replace('_', ' ').slice(1)}: ${
              result[attribute]
            }</li>`
        )
        .join('')
      details.appendChild(background)
      details.appendChild(ul)
      details.open = true
      content.appendChild(details)
      
    })
  }

//loads everything to setup the page
setup()