import {createPhotosArray} from './data.js';
import {drawPictures} from './picture.js';
import {drawBigPicture} from './big-picture.js';

const picturesData = createPhotosArray();

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

drawPictures(picturesData);

document.querySelector('.pictures').addEventListener('click', onPictureClick);
