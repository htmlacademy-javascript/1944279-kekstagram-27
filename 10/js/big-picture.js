import {isEscapeKey} from './util.js';

const NUMBER_OF_COMMENTS_TO_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const closePictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');


const drawBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';
  let numberOfComments = 0;
  commentLoaderButton.classList.remove('hidden');
  const commentLoad = (commentsArray, index) => {
    for (let i = index; i < index + NUMBER_OF_COMMENTS_TO_LOAD && i < commentsArray.length; i++) {
      const newComment = commentTemplate.cloneNode(true);
      const {avatar, name, message} = commentsArray[i];

      newComment.querySelector('img').src = avatar;
      newComment.querySelector('img').alt = name;
      newComment.querySelector('.social__text').textContent = message;

      commentsFragment.append(newComment);
      numberOfComments++;
    }

    commentsList.append(commentsFragment);

    commentCount.firstChild.textContent = `${numberOfComments} из `;

    if (numberOfComments === commentsArray.length) {
      commentLoaderButton.classList.add('hidden');
    }
  };
  commentLoad(comments, numberOfComments);

  const onLoadKeyClick = () => {
    commentLoad(comments, numberOfComments);
  };

  commentLoaderButton.addEventListener('click', onLoadKeyClick);


  const onModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      hidePictureModal();
    }
  };

  function hidePictureModal () {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');

    document.removeEventListener('keydown', onModalEscKeydown);
    commentLoaderButton.removeEventListener('click', onLoadKeyClick);
  }

  document.addEventListener('keydown', onModalEscKeydown);
  closePictureButton.addEventListener('click', () => {
    hidePictureModal();
  });

};


export {drawBigPicture};
