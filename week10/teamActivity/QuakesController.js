import { getLocation } from './utilities.js'
import Quake from './Quake.js'
import QuakesView from './QuakesView.js'

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent
    this.parentElement = null
    this.position = position || {
      lat: 0,
      lon: 0,
    }
    this.quakes = new Quake()
    this.quakesView = new QuakesView()
  }
  async init() {
    this.parentElement = document.querySelector(this.parent)
    await this.initPos()
    this.getQuakesByRadius(300)
  }
  async initPos() {
    if (this.position.lat === 0) {
      try {
        const position = await getLocation()
        const { latitude, longitude } = position.coords
        this.position = { lat: latitude, lon: longitude }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async getQuakesByRadius(radius) {
    document.getElementById('quakeDetails').innerHTML = ''
    this.parentElement.innerHTML = 'Loading...'
    const quakeList = await this.quakes.getEarthQuakesByRadius(this.position, radius)
    this.quakesView.renderQuakeList(quakeList, this.parentElement)
    this.parentElement.addEventListener('click', (e) => {
      if (!e.target.matches('ul')) {
        const target = e.target.closest('li')
        const quakeId = target.dataset.id
        this.getQuakeDetails(quakeId, quakeList, radius)
      }
    })
  }
  async getQuakeDetails(quakeId, quakeList, radius) {
    const quake = quakeList.features.find((item) => item.id === quakeId)
    this.parentElement.innerHTML = ''
    const element = document.querySelector('#quakeDetails')
    const callback = () => {
      this.getQuakesByRadius(radius)
      element.innerHTML = ''
    }
    this.quakesView.renderQuake(quake, element, callback)
  }
}
