export function qs(selectorName) {
  return document.querySelector(selectorName);
}
export function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function writeToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// uses a touchend for mobile devices and falls back to a click for desktop
export function bindTouch(selector, callback) {
  const element = qs(selector);
  element.addEventListener("touchend", e => {
    e.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}
// function to remove a value from an array. used for the delete feature.
export function arrayRemove(array, value) {
  return array.filter(function(ele){
    return ele != value;
  });
}
