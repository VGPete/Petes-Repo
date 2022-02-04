import Hikes from './hikes.js'

const myHike = new Hikes()
//on load grab the array and insert it into the page
window.addEventListener('load', () => {
  myHike.showHikeList()
})
