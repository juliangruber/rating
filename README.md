
# rating

Star rating widget.

## Example

Create a 5-star rating widget, add it to them DOM and get updates about its state.

Make sure that you style the `.glow` class so you can actually see the stars changing.

```js
var Rating = require('rating');

var rating = new Rating([1, 2, 3, 4, 5]);
document.body.appendChild(rating.el);

rating.on('rate', function(weight) {
  console.log('rated: ' + weight);
});

rating.on('current', function(weight) {
  console.log('current: ' + weight);
});
```

## Custom dom

Instead of using the default DOM you can provide your own:

```html
<span class="rating">
  <span class="star">★</span>
</span>
```

```js
var Rating = require('rating');

var container = document.querySelector('.rating');
var star = document.querySelector('.star');
star.parentNode.removeChild(star);

var rating = new Rating([1, 2, 3, 4, 5], {
  container: container,
  star: star
});

rating.on('rate', function(weight) {
  console.log('rated: ' + weight);
});

rating.on('select', function(weight) {
  console.log('current: ' + weight);
});
```

## API

### Rating(weights[, opts])

Create a new rating widget with the given array of `weights`.

Make sure that you style the `.glow` class so you can actually see the stars changing.

Possible options:

* `container (Element)`: Instead of creating a new DOM element for the widget, render everything into `container`.
* `star (Element)`: Clone the `star` element for every star that is to be shown, instead of using the default star element.
* `readOnly (Boolean)`: If `true`, the rating can't be modified.

### Rating#el

The widget's dom element.

### Rating#set(weight)

Set the current `weight`.

### Rating#on('rate', fn)

Calls `fn` with the the weight the user chose by clicking on a star, or when you set it via `Rating#set` manually.

### Rating#on('select', fn)

Calls `fn` with the current selected `weight`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install rating
```

Then bundle for the browser with
[browserify](https://github.com/substack/node-browserify).

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
