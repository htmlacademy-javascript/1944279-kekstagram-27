import {drawBigPicture} from './big-picture.js';
import {drawPictures, removePictures} from './picture.js';
import {showAlert, debounce, shuffleArray} from './util.js';
import {getData} from './api.js';

const COUNT_OF_FILTER = 10;

const picturesContainer = document.querySelector('.pictures');
const galleryFilter = document.querySelector('.img-filters');

let picturesData;
const onPhotoLoadError = () => showAlert('Не удалось загрузить фотографии');
getData((pics) => {
  drawPictures(pics);
  galleryFilter.classList.remove('img-filters--inactive');
  picturesData = pics;
}, onPhotoLoadError);


const onPicturesContainerClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const pictureUrl = evt.target.src;
    picturesData.forEach((picture) => {
      if (pictureUrl.includes(picture.url)) {
        return drawBigPicture(picture);
      }
    });
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

const redrawGallery = debounce((filterName) => {
  removePictures();
  drawPictures(availableFilters[filterName]());
});

const onGalleryFilterClick = (evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const selected = galleryFilter.querySelector('.img-filters__button--active');
    if (selected) {
      selected.classList.remove('img-filters__button--active');

      evt.target.classList.add('img-filters__button--active');
      redrawGallery(evt.target.id);
    }
  }
};


picturesContainer.addEventListener('click', onPicturesContainerClick);
galleryFilter.addEventListener('click', onGalleryFilterClick);


