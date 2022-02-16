export const readLS = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
export const writeLS = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const clearStorage = () => {
  window.localStorage.clear()
}
