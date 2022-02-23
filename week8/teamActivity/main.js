const cards = document.getElementById('cards')
const pages = document.getElementById('pages')
const currentPageElement = document.getElementById('currentPage')
const baseUrl = 'https://swapi.dev/api/people/?page='

let currentPage = 1
let numPages = 1

// fetches the data for the current page and lists it to the screen.
const loadResults = async (page) => {
  const data = await fetch(`${baseUrl}${page}`)
  const json = await data.json()
  const results = json.results

  cards.innerHTML = ''

  results.forEach((person) => {
    const details = document.createElement('details')
    details.innerHTML = `
    <summary>${person.name}</summary>`
    const ul = document.createElement('ul')
    const attributes = [
      'height',
      'mass',
      'hair_color',
      'skin_color',
      'eye_color',
      'birth_year',
      'gender',
    ]
    ul.innerHTML = attributes
      .map(
        (attribute) =>
          `<li>${attribute.charAt(0).toUpperCase() + attribute.replace('_', ' ').slice(1)}: ${
            person[attribute]
          }</li>`
      )
      .join('')
    details.appendChild(ul)
    cards.appendChild(details)
  })
}

// function to update the current page variable.
const updateCurrentPage = (newPage) => {
  currentPageElement.textContent = newPage
}

// this function sets up the page and adds buttons and event listeners for clicks.
const setup = async () => {
  const data = await fetch(baseUrl)
  const json = await data.json()
  numPages = Math.ceil(json.count / 10)

  // adds a previous button
  const prevButton = document.createElement('button')
  prevButton.textContent = `<`
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      loadResults(currentPage - 1)
      currentPage = currentPage - 1
      updateCurrentPage(currentPage)
    }
  })
  pages.appendChild(prevButton)

  // adds a page button for each page
  for (let i = 1; i <= numPages; i++) {
    const button = document.createElement('button')
    button.textContent = i
    button.addEventListener('click', () => {
      currentPage = i
      loadResults(i)
      updateCurrentPage(currentPage)
    })
    pages.appendChild(button)
  }

  // adds a next button
  const nextButton = document.createElement('button')
  nextButton.textContent = `>`
  nextButton.addEventListener('click', () => {
    if (currentPage < numPages) {
      loadResults(currentPage + 1)
      currentPage = currentPage + 1
      updateCurrentPage(currentPage)
    }
  })
  pages.appendChild(nextButton)

  loadResults(1)
  updateCurrentPage(1)
}

//loads everything to setup the page
setup()

