import dictionary from '../Configs/dictionary.json';

// TODO Rewrite this functions

function hasTranslation(
  key: any,
  language: any,
  dictionaryInUse: any
): boolean {
  return dictionaryInUse[key] && dictionaryInUse[key][language];
}

export function translate(
  key: any,
  language: string,
  dictionaryInUse: any = dictionary
) {
  if (hasTranslation(key, language, dictionaryInUse)) {
    return dictionaryInUse[key][language];
  }
  return key;
}
