import CommentModel from './comments.js'

//create an array of hikes
const hikeList = [
  {
    name: 'Bechler Falls',
    imgSrc: 'bechler.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short hike along the Bechler river to Bechler Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.',
  },
  {
    name: 'Teton Canyon',
    imgSrc: 'teton.jpg',
    imgAlt: 'Image of Teton Canyon',
    distance: '3 miles',
    difficulty: 'Easy',
    description: 'Beautiful short (or long) hike through Teton Canyon.',
    directions:
      'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.',
  },
  {
    name: 'Denanda Falls',
    imgSrc: 'dunanda.jpg',
    imgAlt: 'Image of Denanda Falls',
    distance: '7 miles',
    difficulty: 'Moderate',
    description: 'Beautiful hike through Bechler meadows river to Denanda Falls',
    directions:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.',
  },
]

const imgBasePath = '//pwatson25.github.io/wdd330/images/'
const hikeComments = new CommentModel('hike')
const hikeCommentsElement = document.getElementById('comments')

export default class Hikes {
  renderOneHike(hike) {
    const item = document.createElement('li')

    item.innerHTML = ` 
    <div class="two-column">
      <div class="image">
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
      </div>
      <div>
        <div>
          <h3>Distance</h3>
          <p>${hike.distance}</p>
        </div>
        <div>
          <h3>Difficulty</h3>
          <p>${hike.difficulty}</p>
        </div>
      </div>
    </div>
    `

    return item
  }
  renderHikeList(hikes, parent) {
    hikes.forEach((hike) => {
      const heading = document.createElement('h2')
      const hikeInfo = document.createElement('div')
      hikeInfo.classList.add('hidden')
      heading.innerText = hike.name
      parent.appendChild(heading)
      parent.appendChild(hikeInfo)
      hikeInfo.appendChild(this.renderOneHike(hike))
      const commentSection = document.createElement('ul')
      const form = document.createElement('form')
      const input = document.createElement('input')
      const button = document.createElement('button')
      button.textContent = 'Add Comment'
      form.appendChild(input)
      form.appendChild(button)

      hikeInfo.appendChild(commentSection)
      hikeInfo.appendChild(form)

      hikeComments.renderCommentList(commentSection, hike.name)
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const comment = input.value.trim()
        input.value = ''
        if (comment) {
          hikeComments.addComment(hike.name, comment)
          hikeComments.renderCommentList(commentSection, hike.name)
          hikeComments.renderCommentList(hikeCommentsElement)
        }
      })
      heading.addEventListener('click', () => {
        hikeInfo.classList.toggle('hidden')
      })
    })
  }
  showHikeList() {
    const hikeListElement = document.getElementById('hikes')
    hikeListElement.innerHTML = ''
    this.renderHikeList(hikeList, hikeListElement)
    hikeComments.renderCommentList(hikeCommentsElement)
  }
}
