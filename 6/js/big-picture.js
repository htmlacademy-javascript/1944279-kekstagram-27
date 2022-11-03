const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const closePictureButton = bigPicture.querySelector('.big-picture__cancel');

const drawBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  for (const comment of comments){
    const newComment = commentTemplate.cloneNode(true);
    const {avatar, name, message} = comment;

    newComment.querySelector('img').src = avatar;
    newComment.querySelector('img').alt = name;
    newComment.querySelector('.social__text').textContent = message;

    commentsFragment.append(newComment);
  }
  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  closePictureButton.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }
  });

};

export {drawBigPicture};
