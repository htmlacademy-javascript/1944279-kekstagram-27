// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Источник => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

function getRandomInt(min, max) {
  if (isNaN(min) || isNaN(max)) {
    return NaN;
  }
  if (min < 0 || max <0) {
    return NaN;
  }
  if (max <= min) {
    let temp = min;
    min = max;
    max = temp;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для проверки максимальной длины строки.

function checkStringLength(controlText, sizeText) {
  if (controlText.length <= sizeText) {
    return true
  }
  return false
}
