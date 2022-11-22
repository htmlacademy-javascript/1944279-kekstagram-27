import {isEscapeKey} from './util.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {resetScale} from './scale.js';

const MAX_LENGTH_HASHTAG = 20;
const MAX_COUNT_HASHTAG = 5;
const VALID_SIMBOLS_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileField = uploadForm.querySelector('#upload-file');
const pictureUploadOverlay = uploadForm.querySelector('.img-upload__overlay');//
const cancelButton = pictureUploadOverlay.querySelector('#upload-cancel');
const uploadButton = pictureUploadOverlay.querySelector('#upload-submit');
const hashTagField = pictureUploadOverlay.querySelector('.text__hashtags');
const inputHashtag = pictureUploadOverlay.querySelector('.text__hashtags');
const descriptionField = pictureUploadOverlay.querySelector('.text__description');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-valid',
  successClass:'form-invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-error'
});

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const checkHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const tags = inputText.split(/\s+/);

  if (tags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: tags.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами',
    },
    {
      check: tags.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: tags.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      check: tags.some((item) => item.length > MAX_LENGTH_HASHTAG),
      error: `Максимальная длина одного хэш-тега ${MAX_LENGTH_HASHTAG} символов, включая решётку`
    },
    {
      check: tags.length > MAX_COUNT_HASHTAG,
      error: `Нельзя указать больше ${MAX_COUNT_HASHTAG} хэш-тегов`,
    },
    {
      check: tags.some((item) => !VALID_SIMBOLS_HASHTAG.test(item)),
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

pristine.addValidator(inputHashtag, checkHashtags, getErrorMessage, 2, false);

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

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () =>{
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);

  uploadForm.reset();
  pristine.reset();
  resetEffects();
  resetScale();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)
   && document.activeElement !== hashTagField
   && document.activeElement !== descriptionField
   && !document.querySelector('.error')) {
    evt.preventDefault();

    closeForm();
  }
}

function onCancelButtonClick(evt) {
  evt.preventDefault();

  closeForm();
}

const onUploadFileFieldChange = (evt) =>{
  evt.preventDefault();

  showForm();
};


const blockSubmitButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'ОТПРАВКА...';
};

const unblockSubmitButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'ОПУБЛИКОВАТЬ';
};

const closeError = () => {
  document.body.removeChild(document.querySelector('.error'));
  document.removeEventListener('keydown', onEscCloseErrorKeydown);
};

const onCloseErrorClick = () => {
  closeError();
};

const onOutsideErrorModalClick = (evt) => {
  if (evt.target.matches('.error')) {
    closeError();
  }
};

function onEscCloseErrorKeydown (evt) {
  if (isEscapeKey(evt) && document.querySelector('.error')) {
    evt.preventDefault();

    setTimeout(() => {
      closeError();
    }, 50);
  }
}

const showErrorPopup = () => {
  const errorPopup = errorTemplate.cloneNode(true);
  document.body.appendChild(errorPopup);
  document.addEventListener('keydown', onEscCloseErrorKeydown);
  document.querySelector('.error__button').addEventListener('click', onCloseErrorClick);
  document.querySelector('.error').addEventListener('click', onOutsideErrorModalClick);
};

const closeSuccess = () => {
  document.body.removeChild(document.querySelector('.success'));
  document.removeEventListener('keydown', onEscCloseSuccessKeydown);
  closeForm();
};

const onCloseSuccessButtonClick = () => {
  closeSuccess();
};

const onOutsideSuccessModalClick = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccess();
  }
};

function onEscCloseSuccessKeydown (evt) {
  if (isEscapeKey(evt) && document.querySelector('.success')) {
    evt.preventDefault();

    closeSuccess();
  }
}

const showSuccessPopup = () => {
  const successPopup = successTemplate.cloneNode(true);
  document.body.appendChild(successPopup);
  document.addEventListener('keydown', onEscCloseSuccessKeydown);
  document.querySelector('.success__button').addEventListener('click', onCloseSuccessButtonClick);
  document.querySelector('.success').addEventListener('click', onOutsideSuccessModalClick);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessPopup();
        unblockSubmitButton();
      },
      () => {
        showErrorPopup();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);
uploadFileField.addEventListener('change', onUploadFileFieldChange);
cancelButton.addEventListener('click', onCancelButtonClick);
