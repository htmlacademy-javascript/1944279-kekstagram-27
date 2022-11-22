const scaleControlBlock = document.querySelector('.scale');
const scaleField = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
};

scaleField.value = `${Scale.DEFAULT}%`;

const setScale = (scaleValue) => {
  picture.style.transform = `scale(${scaleValue / Scale.DEFAULT})`;
  scaleField.value = `${scaleValue}%`;
};

const calculateScale = (scaleMultiply) => {
  const currentScale = parseInt(scaleField.value, 10);
  const newScale = currentScale + Scale.STEP * scaleMultiply;
  if (newScale < Scale.MIN || newScale > Scale.MAX) {
    return;
  }
  setScale(newScale);
};

const onScaleControlBlockClick = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')) {
    calculateScale(1);
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    calculateScale(-1);
  }
};

const resetScale = () => {
  setScale(Scale.DEFAULT);
};

scaleControlBlock.addEventListener('click', onScaleControlBlockClick);

export {resetScale};
