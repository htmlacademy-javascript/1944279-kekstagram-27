//import {createPhotosArray} from './data.js';
import {drawBigPicture} from './big-picture.js';
import {drawPictures} from './picture.js';
import {showAlert} from './util.js';
import {getData} from './api.js';


let picturesData;
const onPhotoLoadError = () => showAlert('Не удалось загрузить фотографии');
getData((pics) => {
  drawPictures(pics);
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


document.querySelector('.pictures').addEventListener('click', onPictureClick);
