function DomElement(selector, styles) {
  this.selector = selector;

  styles = styles || {};
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

  element.style.cssText = `width: ${this.width};
                     height: ${this.height};
                     background: ${this.bg};
                     font-size: ${this.fontSize};`;

  document.body.append(element);
}

const paragraph = new DomElement('#paragraph', {
  width: '300px',
  height: '150px',
  bg: '#f2f2f2',
  fontSize: '32px'
});

paragraph.create();

const square = new DomElement('.square', {
  width: '400px',
  height: '400px',
  bg: '#cccccc',
  fontSize: '64px'
});

square.create();
