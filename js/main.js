import {createPhotosArray} from './data.js';
import {drawPictures} from './picture.js';
import {drawBigPicture} from './big-picture.js';

drawPictures(createPhotosArray());
drawBigPicture(createPhotosArray()[10]);


