/* eslint-disable import/prefer-default-export */
function get(obj, path, defValue) {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value if exist return otherwise return undefined value;
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
  );
}

export const getColumnWidth = (
  data,
  accessor,
  headerText,
  // вызвается для каждого элемента data (для словарей), когда текстовые данные берутся не напрамую из объекта
  accessorCallback
) => {
  const cellLength = Math.max(
    ...data.map((row) => {
      let value = '';

      if (typeof accessor === 'string') {
        if (accessorCallback) {
          value = accessorCallback(row[accessor]);
        } else {
          value = get(row, accessor, '');
        }
      } else if (Array.isArray(accessor)) {
        value = accessor
          .map((accessorItem) => get(row, accessorItem, ''))
          .join(' ');
      } else {
        value = accessor(row);
      }

      if (typeof value === 'number') return value;
      return (value || '').length;
    }),
    headerText.length
  );
  const magicSpacing = 10;
  return Math.min(cellLength * magicSpacing, 450);
};
