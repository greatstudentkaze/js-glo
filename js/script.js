'use strict';

const booksWrapper = document.querySelector('.books'),
  books = booksWrapper.querySelectorAll('.book');

booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[3].before(books[4]);

document.body.classList.add('background-image');
