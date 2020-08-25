'use strict';

function DomElement(selector, styles) {
  this.selector = selector;

  styles = styles || {};
  this.position = styles.position;
  this.width = styles.width;
  this.height = styles.height;
  this.bg = styles.bg;
  this.fontSize = styles.fontSize;
}

DomElement.prototype.create = function () {
  let element;
  switch (this.selector[0]) {
    case '.':
      element = document.createElement('div');
      element.classList.add(this.selector.slice(1));
      element.textContent = 'div' + this.selector;
      break;
    case '#':
      element = document.createElement('p');
      element.id = this.selector.slice(1);
      element.textContent = 'p' + this.selector;
      break;
    default:
      element = document.createElement('div');
      element.textContent = 'div';
  }

  element.style.cssText = `position: ${this.position};
                     width: ${this.width};
                     height: ${this.height};
                     background: ${this.bg};
                     font-size: ${this.fontSize};`;

  document.body.append(element);
}

const square = new DomElement('.square', {
  position: 'absolute',
  width: '400px',
  height: '400px',
  bg: '#cccccc',
  fontSize: '64px'
});

document.addEventListener('DOMContentLoaded', () => {
  square.create();
  const squareElem = document.querySelector(`.${square.selector.slice(1)}`);

  squareElem.style.top = '0px';
  squareElem.style.left = '0px';

  document.addEventListener('keydown', evt => {
    let top = +squareElem.style.top.replace('px', ''),
      left = +squareElem.style.left.replace('px', '');

    switch (evt.key) {
      case 'ArrowUp':
        top -= 10;
        squareElem.style.top = top + 'px';
        break;
      case 'ArrowRight':
        left += 10;
        squareElem.style.left = left + 'px';
        break;
      case 'ArrowDown':
        top += 10;
        squareElem.style.top = top + 'px';
        break;
      case 'ArrowLeft':
        left -= 10;
        squareElem.style.left = left + 'px';
        break;
    }
  });
});

