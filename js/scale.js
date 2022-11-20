const scaleControlBlock = document.querySelector('.scale');
const scaleField = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const SCALE = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

scaleField.value = `${SCALE.DEFAULT}%`;

const setScale = (scaleValue) => {
  picture.style.transform = `scale(${scaleValue / 100})`;
  scaleField.value = `${scaleValue}%`;
};

const calculateScale = (scaleMultiply) => {
  const currentScale = parseInt(scaleField.value, 10);
  const newScale = currentScale + SCALE.STEP * scaleMultiply;
  if (newScale < SCALE.MIN || newScale > SCALE.MAX) {
    return;
  }
  setScale(newScale);
};

const onScaleButtonClick = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')) {
    calculateScale(1);
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    calculateScale(-1);
  }
};

const resetScale = () => {
  setScale(SCALE.DEFAULT);
};

scaleControlBlock.addEventListener('click', onScaleButtonClick);

export {resetScale};
