import {isEscapeKey} from './util.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_COUNT_HASHTAG = 5;
const VALID_SIMBOLS_HASHTAG = new RegExp('^#[a-zа-яё0-9{1, 19}$]', 'i');

const uploadForm = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const uploadFileField = document.querySelector('#upload-file');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const uploadButton = document.querySelector('#upload-submit');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-valid',
  successClass:'form-invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
});

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_LENGTH_HASHTAG),
      error: `Максимальная длина одного хэш-тега ${MAX_LENGTH_HASHTAG} символов, включая решётку`
    },
    {
      check: inputArray.length > MAX_COUNT_HASHTAG,
      error: `Нельзя указать больше ${MAX_COUNT_HASHTAG} хэш-тегов`,
    },
    {
      check: inputArray.some((item) => !VALID_SIMBOLS_HASHTAG.test(item)),
      error: 'Хеш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {
  if (pristine.validate()) {
    uploadButton.disabled = false;
  } else {
    uploadButton.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});


const showForm = () =>{
  document.body.classList.add('modal-open');
  pictureUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onEscKey);
  cancelButton.addEventListener('click', onCancelButton);
};

const closeForm = () =>{
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onEscKey);
  cancelButton.removeEventListener('click', onCancelButton);

  uploadForm.reset();
  pristine.reset();
};

function onEscKey(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== hashTagField && document.activeElement !== descriptionField) {
      evt.preventDefault();

      closeForm();
    }
  }
}

function onCancelButton(evt) {
  evt.preventDefault();

  closeForm();
}

const onFileFieldChange = (evt) =>{
  evt.preventDefault();

  showForm();
};

uploadFileField.addEventListener('change', onFileFieldChange);

