var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var Star = require('./lib/star');
var contains = require('contains');

module.exports = Rating;

function Rating(weights, opts) {
  if (!(this instanceof Rating)) return new Rating(weights, opts);
  Emitter.call(this);

  opts = opts || {};

  if (opts.container) {
    this.el = opts.container;
  } else {
    this.el = document.createElement('span');
    this.el.className = 'rating';
  }

  if (opts.star) {
    this.tmpl = opts.star;
  } else {
    this.tmpl = document.createElement('span');
    this.tmpl.className = 'star';
    this.tmpl.innerHTML = '&#9733;';
  }

  this.readOnly = !!opts.readOnly;
  this.weights = weights;
  this.stars = [];
  this.ratingIdx = null;
  this.build();
}

inherits(Rating, Emitter);

Rating.prototype.build = function() {
  var self = this;

  self.weights.forEach(function(weight, idx) {
    var star = new Star(self.tmpl.cloneNode(true));
    self.el.appendChild(star.el);
    self.stars.push(star);
  });

  process.nextTick(function() {
    self.emit('select', self.weights[self.ratingIdx]);
  });

  if (self.readOnly) return;

  self.stars.forEach(function(star, idx) {
    star.on('click', function() {
      self.ratingIdx = idx;
      self.emit('rate', self.weights[self.ratingIdx]);
    });

    star.on('hover', function() {
      self.update(idx + 1);
      self.emit('select', self.weights[idx]);
    });
  });

  self.el.addEventListener('mouseout', function(ev) {
    if (contains(this, ev.relatedTarget)) return;

    var idx = self.ratingIdx !== null
      ? self.ratingIdx + 1
      : 0;
    self.update(idx);
    self.emit('select', self.weights[self.ratingIdx]);
  });
};

Rating.prototype.set = function(weight) {
  this.ratingIdx = this.weights.indexOf(weight);
  this.update(this.ratingIdx + 1);
  this.emit('select', weight);
  this.emit('rate', weight);
};

Rating.prototype.update = function(idx) {
  this.stars.slice(0, idx).forEach(call('bright'));
  this.stars.slice(idx).forEach(call('dark'));
};

function call(method) {
  return function(obj) {
    obj[method]();
  }
}
