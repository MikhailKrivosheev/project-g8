/**
 * Retrieves the value from a nested object using a dot-separated path string.

 * Example:
 * const data = { a: { b: { c: 42 } } };
 * getNestedValue(data, 'a.b.c'); // returns 42
 */

export default function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
