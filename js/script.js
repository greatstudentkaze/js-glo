'use strict';

const booksWrapper = document.querySelector('.books'),
  books = booksWrapper.querySelectorAll('.book'),
  adWrapper = document.querySelector('.adv');

booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[3].before(books[4]);

document.body.classList.add('background-image');

books[4].getElementsByTagName('a')[0].textContent = 'Книга 3. this и Прототипы Объектов';

adWrapper.remove();
