export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomCompare = (min, max, compare) => {
  const rnd = getRandom(min, max);
  if (typeof compare !== 'undefined' && rnd === compare) {
    return getRandomCompare(min, max, compare);
  }
  return rnd;
};
