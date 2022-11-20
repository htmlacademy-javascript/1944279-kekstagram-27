const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');


const drawPictures = (picturesData) => {
  for(const pictureElement of picturesData){
    const picture = pictureTemplate.cloneNode(true);

    const {url, description, comments, likes} = pictureElement;

    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;

    fragment.append(picture);
  }

  picturesContainer.append(fragment);
};

const removePictures = () => {
  document.querySelectorAll('.picture')
    .forEach((photo) => {
      photo.remove();
    });
};

export {drawPictures, removePictures};
