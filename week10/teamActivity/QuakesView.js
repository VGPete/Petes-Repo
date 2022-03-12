const earthquakeListTemplate = (quake) => `
  <li data-id="${quake.id}">
    <b>${quake.properties.title}</b>
    ${new Date(quake.properties.time).toLocaleString()}
  </li>
`

const generateListMarkup = (quakes, template) => `
  ${quakes.map((quake) => template(quake)).join('')}
`

// Quake View handler
export default class QuakesView {
  renderQuakeList(quakeList, listElement) {
    if (quakeList.features.length === 0) {
      listElement.innerHTML = '<p>No quakes were found in the radius provided.</p>'
    } else {
      listElement.innerHTML = generateListMarkup(quakeList.features, earthquakeListTemplate)
    }
  }
  renderQuake(quake, element, callback) {
    const quakeProperties = Object.entries(quake.properties)
    const backButton = document.createElement('button')
    backButton.textContent = 'Back'
    backButton.onclick = callback
    element.innerHTML = `
    <h2>${quake.properties.title}</h2>
    <h3>${new Date(quake.properties.time).toLocaleString()}</h3>
    ${quakeProperties
      .map((item) => {
        if (item[0] === 'time' || item[0] === 'updated') {
          return `<li><strong>${item[0]}</strong>: ${new Date(item[1])}</li>`
        } else {
          return `<li><strong>${item[0]}</strong>: ${item[1]}</li>`
        }
      })
      .join('')}`
    element.insertAdjacentElement('afterbegin', backButton)
  }
}
