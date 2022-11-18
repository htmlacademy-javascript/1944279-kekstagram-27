import {drawBigPicture} from './big-picture.js';
import {drawPictures, removePictures} from './picture.js';
import {showAlert, debounce, shuffleArray} from './util.js';
import {getData} from './api.js';

const COUNT_OF_FILTER = 10;

const galleryFilters = document.querySelector('.img-filters');

let picturesData;
const onPhotoLoadError = () => showAlert('Не удалось загрузить фотографии');
getData((pics) => {
  drawPictures(pics);
  galleryFilters.classList.remove('img-filters--inactive');
  picturesData = pics;
}, onPhotoLoadError);


const onPictureClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const pictureUrl = evt.target.getAttribute('src');
    for (let i = 0; i < picturesData.length; i++){
      if(pictureUrl.includes(picturesData[i].url)){
        drawBigPicture(picturesData[i]);
        break;
      }
    }
  }
};

const availableFilters = {
  'filter-default': () => picturesData,
  'filter-random': () => shuffleArray(picturesData.slice()).slice(0, COUNT_OF_FILTER),
  'filter-discussed': () => {
    const popularPhotos = picturesData.slice().sort((firstItem, secondItem) => secondItem.comments.length - firstItem.comments.length);
    return popularPhotos;
  }
};

const onSortButtonClick = debounce((evt) => {
  const selected = galleryFilters.querySelector('.img-filters__button--active');
  if (selected) {
    selected.classList.remove('img-filters__button--active');

    evt.target.classList.add('img-filters__button--active');
    removePictures();
    drawPictures(availableFilters[evt.target.id]());
  }
});

document.querySelector('.pictures').addEventListener('click', onPictureClick);

galleryFilters.addEventListener('click', onSortButtonClick);


