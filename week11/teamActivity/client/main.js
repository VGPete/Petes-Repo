import { makeRequest, Errors } from './authHelpers.js'
import Auth from './Auth.js'

const postsList = document.getElementById('posts')
export const errors = new Errors('errors')
const auth = new Auth(errors)

// content: "I can't believe I got first post."
// id: 4
// title: "First Post!"
// userId: 1

const getPosts = async () => {
  try {
    const posts = await makeRequest('posts', 'GET', null, auth.token)
    console.log(posts)

    postsList.innerHTML = posts
      .map(
        (post) => `
      <li>
      <strong>${post.title}</strong>
      <p>${post.content}</p>
      </li>`
      )
      .join('')
  } catch (error) {
    errors.showError(error)
  }
}

const form = document.getElementById('login')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  auth.login(getPosts)
})

const postTitle = document.getElementById('postTitle')
const postContent = document.getElementById('postContent')

document.getElementById("addPost").addEventListener('click', (e) => {
  const id = Math.floor(Math.random() * 100000)
  const userId = auth.user.id
  const post = {
    id,
    userId,
    title: postTitle.value,
    content: postContent.value,
  }
  makeRequest('posts', 'POST', post, auth.token)  
})
