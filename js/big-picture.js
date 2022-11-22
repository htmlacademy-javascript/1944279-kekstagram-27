import {isEscapeKey} from './util.js';

const NUMBER_OF_COMMENTS_TO_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const closePictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoaderButton = bigPicture.querySelector('.comments-loader');

const commentsFragment = document.createDocumentFragment();

let numberOfLoadedComments = 0;
const loadComments = (commentObjects, index) => {
  for (let i = index; i < index + NUMBER_OF_COMMENTS_TO_LOAD && i < commentObjects.length; i++) {
    const newComment = commentTemplate.cloneNode(true);
    const {avatar, name, message} = commentObjects[i];

    newComment.querySelector('img').src = avatar;
    newComment.querySelector('img').alt = name;
    newComment.querySelector('.social__text').textContent = message;

    commentsFragment.append(newComment);
    numberOfLoadedComments++;
  }

  commentsList.append(commentsFragment);

  commentCount.firstChild.textContent = `${numberOfLoadedComments} из `;

  if (numberOfLoadedComments === commentObjects.length) {
    commentLoaderButton.classList.add('hidden');
  }
};

const drawBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  commentLoaderButton.classList.remove('hidden');
  loadComments(comments, numberOfLoadedComments);

  const onCommentLoaderButtonClick = () => {
    loadComments(comments, numberOfLoadedComments);
  };

  commentLoaderButton.addEventListener('click', onCommentLoaderButtonClick);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      hidePictureModal();
    }
  };

  const onClosePictureButtonClick = () => {
    hidePictureModal();
  };

  function hidePictureModal () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeydown);
    commentLoaderButton.removeEventListener('click', onCommentLoaderButtonClick);
    closePictureButton.removeEventListener('click', onClosePictureButtonClick);
    numberOfLoadedComments = 0;
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closePictureButton.addEventListener('click', onClosePictureButtonClick);
};


export {drawBigPicture};
