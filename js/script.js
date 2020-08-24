function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  let color = getRandomIntInclusive(0x000000, 0xffffff).toString(16);

  if (color.length < 6) {
    for (let i = 0; i < 6 - color.length; i++) {
      color = '0' + color;
    }
  }

  return color;
}

const color = document.querySelector('.color'),
  changeColorBtn = document.querySelector('.color-change');

changeColorBtn.addEventListener('click', () => {
  const newColor = getRandomColor();

  document.body.style.backgroundColor = `#${newColor}`;
  color.textContent = `#${newColor}`;
  color.style.color = `#${newColor}`;
  changeColorBtn.style.color = `#${newColor}`;
});
