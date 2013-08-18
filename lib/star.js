var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;

module.exports = Star;

function Star(el) {
  Emitter.call(this);

  this.el = el;

  this.el.addEventListener('mouseover', this.emit.bind(this, 'hover'));
  this.el.addEventListener('mousedown', this.emit.bind(this, 'click'));
}

inherits(Star, Emitter);

Star.prototype.bright = function() {
  this.el.classList.add('glow');
}

Star.prototype.dark = function() {
  this.el.classList.remove('glow');
}
