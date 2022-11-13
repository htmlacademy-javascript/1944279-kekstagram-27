import {
  getRandomPositiveInteger,
  checkLength,
  getRandomArrayElement
} from './util.js';

const PHOTOS_COUNT = 25;
const LIKES_COUNT = {
  min: 15,
  max: 200,
};
const COMMENT_COUNT_MAX = 20;
const AVATAR_NUM = 6;

const DESCRIPTIONS = [
  'Отель',
  'Вход на пляж',
  'Остров',
  'Пляж',
  'Японский карри',
  'Чёрная машина',
  'Клубника',
  'Морс',
  'Самолёт на пляже',
  'Обувь',
  'Забор на пляже',
  'Белая машина',
  'Салат',
  'Суши-кот',
  'На диване',
  'Небо',
  'Хор',
  'Красная машина',
  'Ночные тапочки',
  'Вечерний город',
  'Курица по-тайски',
  'Вечер на пляже',
  'Краб',
  'Концерт',
  'Экскурсия',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Яков',
  'Амина',
  'Мирон',
  'Валерия',
  'Анна',
  'Татьяна',
  'Тимур',
  'Лидия',
  'Владислава',
  'Макар',
  'Иван',
  'Екатерина',
  'Всеволод',
  'Кристина',
  'Алиса',
];


const createComment = (Index) => ({
  id: Index,
  avatar: `img/avatar-${getRandomPositiveInteger(1, AVATAR_NUM)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (Index) => ({
  id: Index,
  url: `photos/${Index}.jpg`,
  description: DESCRIPTIONS[Index - 1],
  likes: getRandomPositiveInteger(LIKES_COUNT.min, LIKES_COUNT.max),
  comments: Array.from({length: getRandomPositiveInteger(0, COMMENT_COUNT_MAX)}, (_, commentIndex) => createComment(commentIndex + 1)),
});

const createPhotosArray = () => Array.from({length: PHOTOS_COUNT}, (_, Index) => createPhotoDescription(Index + 1));

checkLength('');
export {createPhotosArray};
