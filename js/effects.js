import {EFFECTS} from './effects-settings.js';
const DEFAULT_EFFECT = EFFECTS[0];

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const picture = uploadForm.querySelector('.img-upload__preview img');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const effectSliderBackdrop = uploadForm.querySelector('.effect-level');

let selectedEffect = DEFAULT_EFFECT;

const updateSlider = () => {
  effectSlider.classList.remove('hidden');
  effectSliderBackdrop.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    step: selectedEffect.step,
    start: selectedEffect.max,
  });

  if(selectedEffect === DEFAULT_EFFECT) {
    effectSlider.classList.add('hidden');
    effectSliderBackdrop.classList.add('hidden');
  }
};

const onEffectButtonClick = (evt) => {
  if (evt.target.type === 'radio') {
    selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateSlider();
  }
};

noUiSlider.create(effectSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

const onSliderUpdate = () => {
  picture.style.filter = 'none';
  picture.className = '';
  effectLevelValue.value = '';
  if(selectedEffect === DEFAULT_EFFECT){
    return;
  }
  const sliderValue = effectSlider.noUiSlider.get();
  picture.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  picture.classList.add(`effects__preview--${selectedEffect.name}`);
  effectLevelValue.value = sliderValue;
};

updateSlider();

effectsList.addEventListener('click', onEffectButtonClick);
effectSlider.noUiSlider.on('update', onSliderUpdate);

const resetEffects = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

export {resetEffects};

