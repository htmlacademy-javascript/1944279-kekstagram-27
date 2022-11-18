import {isEscapeKey} from './util.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {resetScale} from './scale.js';

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
};

const closeForm = () =>{
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onEscKey);

  uploadForm.reset();
  pristine.reset();
  resetEffects();
  resetScale();
};

function onEscKey(evt) {
  if (isEscapeKey(evt)
   && document.activeElement !== hashTagField
   && document.activeElement !== descriptionField
   && !document.querySelector('.error')) {
    evt.preventDefault();

    closeForm();
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
  document.body.removeEventListener('keydown', onEscCloseErrorPopup);
};

const onClickCloseError = (evt) => {
  if (evt.target === document.querySelector('.error') || evt.target === document.querySelector('.error__button')) {
    closeError();
  }
};

function onEscCloseErrorPopup (evt) {
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
  document.body.addEventListener('keydown', onEscCloseErrorPopup);
  document.querySelector('.error__button').addEventListener('click', onClickCloseError);
  document.querySelector('.error').addEventListener('click', onClickCloseError);
};

const closeSuccess = () => {
  document.body.removeChild(document.querySelector('.success'));
  document.body.removeEventListener('keydown', onEscCloseSuccessPopup);
  closeForm();
};

const onClickCloseSuccessPopup = (evt) => {
  if (evt.target === document.querySelector('.success') || evt.target === document.querySelector('.success__button')) {
    closeSuccess();
  }
};

function onEscCloseSuccessPopup (evt) {
  if (isEscapeKey(evt) && document.querySelector('.success')) {
    evt.preventDefault();

    closeSuccess();
  }
}

const showSuccessPopup = () => {
  const successPopup = successTemplate.cloneNode(true);
  document.body.appendChild(successPopup);
  document.body.addEventListener('keydown', onEscCloseSuccessPopup);
  document.querySelector('.success__button').addEventListener('click', onClickCloseSuccessPopup);
  document.querySelector('.success').addEventListener('click', onClickCloseSuccessPopup);
};

const onFormSubmit = (evt) => {
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

uploadForm.addEventListener('submit', onFormSubmit);
uploadFileField.addEventListener('change', onFileFieldChange);
cancelButton.addEventListener('click', onCancelButton);
