'use strict';

const booksWrapper = document.querySelector('.books'),
  books = booksWrapper.querySelectorAll('.book'),
  adWrapper = document.querySelector('.adv'),
  book2Content = books[0].querySelectorAll('li'),
  book5Content = books[5].querySelectorAll('li');

booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[3].before(books[4]);

document.body.classList.add('background-image');

books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

adWrapper.remove();

book2Content[8].after(book2Content[5]);
book2Content[8].after(book2Content[4]);
book2Content[5].after(book2Content[7]);
book2Content[9].after(book2Content[2]);

book5Content[2].before(book5Content[9]);
book5Content[6].before(book5Content[2]);
book5Content[8].before(book5Content[5]);
