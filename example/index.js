var Rating = require('../');
var insertCSS = require('insert-css');
var style = require('./style.css.js');

insertCSS(style);

var container = document.createElement('span');

var star = document.createElement('span');
star.innerHTML = '★';
star.className = 'star';

var rating = new Rating([1, 2, 3, 4, 5], {
  container: container,
  star: star,
  readOnly: false
});

document.body.appendChild(rating.el);
window.rating = rating;

var current = document.createElement('p');
document.body.appendChild(current);

var rate = document.createElement('p');
document.body.appendChild(rate);

rating.on('rate', function(weight) {
  rate.innerHTML = 'rated: ' + weight;
});

rating.on('select', function(weight) {
  current.innerHTML = 'current: ' + weight;
});

