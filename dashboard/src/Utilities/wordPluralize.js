export default function wordPluralize(number, word) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  const nominative = word;
  const genitiveSingular = word.replace(/я$/, 'и').replace(/а$/, 'ы');
  const genitivePlural = word.replace(/я$/, 'й').replace(/а$/, '');

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${number} ${genitivePlural}`;
  }

  if (lastDigit === 1) {
    return `${number} ${nominative}`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} ${genitiveSingular}`;
  }

  return `${number} ${genitivePlural}`;
}
