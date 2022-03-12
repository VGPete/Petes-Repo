import { getJSON, getLocation } from './utilities.js'
import QuakesController from './QuakesController.js'

const radiusInput = document.getElementById('radius')

const qc = new QuakesController('#quakeList')
qc.init()
document.getElementById('form').onsubmit = function (e) {
  e.preventDefault()
  const radius = parseInt(radiusInput.value)
  qc.getQuakesByRadius(radius)
}
