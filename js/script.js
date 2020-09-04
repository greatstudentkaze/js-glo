'use strict';

const car = document.querySelector('.car'),
  sun = document.querySelector('.sun');

const animation = () => {
  stopAnimationId = requestAnimationFrame(animation);

  if (parseFloat(car.style.right) <= document.documentElement.clientWidth) {
    car.style.right = parseFloat(car.style.right) + 10 + 'px';
  }
  else {
    cancelAnimationFrame(stopAnimationId);
    car.style.right = '-379px';
    moving = false;
  }
};

car.style.right = '-379px';
let moving = false,
  stopAnimationId;

sun.addEventListener('click', () => {
  if (!moving) {
    moving = true;
    stopAnimationId = requestAnimationFrame(animation);
  } else {
    moving = false;
    cancelAnimationFrame(stopAnimationId);
  }
});
