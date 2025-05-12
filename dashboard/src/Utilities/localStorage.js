export function set(key, value) {
  let tmpValue = value;
  if (typeof value === 'object') {
    tmpValue = JSON.stringify(value);
  }
  localStorage.setItem(key, tmpValue);
  window.dispatchEvent(new Event('storage'));
}

export function get(key) {
  const data = localStorage.getItem(key);
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    parsedData = data;
  }
  return parsedData;
}

export function remove(key) {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event('storage'));
}
