import { readLS, writeLS } from './utils.js'

// private

// public

export default class CommentModel {
  constructor(type) {
    // this.listElement = listElement
    this.type = type
    this.comments = readLS(this.type) || []
  }

  addComment(name, content) {
    const newComment = {
      name,
      date: new Date().toLocaleString('en-US'),
      content,
    }
    this.comments.push(newComment)
    writeLS(this.type, this.comments)
  }

  // filterCommentsByName(name) {}

  // getAllComments() {}

  renderCommentList(element, filter = null) {
    element.innerHTML = ''
    let filtered = this.comments
    if (filter) {
      filtered = this.comments.filter((comment) => comment.name === filter)
    }
    console.log(filtered)
    filtered.forEach((comment) => {
      const li = document.createElement('li')
      li.innerHTML = `
      ${filter ? '' : `<strong>${comment.name}</strong>`}
      <em>${comment.date}</em>
      <br />
      <span>${comment.content}</span>
      `
      element.appendChild(li)
    })
  }
}
