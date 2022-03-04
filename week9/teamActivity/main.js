const keys = Array.from(document.querySelector('.keys').children)
const audios = Array.from(document.querySelectorAll('audio'))

const playAudio = (code) => {
  const audio = audios.find((audio) => audio.dataset.key == code)
  const key = keys.find((key) => key.dataset.key == code)
  audio.currentTime = 0
  audio.play()
  key.classList.add('playing')
  // move key
  let y = parseInt(key.dataset.y)
  y += 10
  if (y > 100) {
    y = 0
  }
  key.dataset.y = y
  key.style = `transform: translateY(${y}%)`
}

audios.forEach((audio) => {
  audio.volume = 0.5
  audio.addEventListener('ended', () => {
    audio.currentTime = 0
    const code = audio.dataset.key
    const key = keys.find((key) => key.dataset.key == code)
    key.classList.remove('playing')
  })
})

keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    const code = e.currentTarget.dataset.key
    playAudio(code)
  })
})

window.addEventListener('keydown', (e) => {
  const key = e.key
  if (key.length === 1) {
    const code = key.toUpperCase().charCodeAt(0)
    playAudio(code)
  }
})
