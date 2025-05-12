export function isEmpty(value) {
  if (value === '' || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

export function isFile(value) {
  return value instanceof File || value instanceof Blob;
}

export function formatData(values, originalValues) {
  const formatted = Array.isArray(values) ? [...values] : { ...values };

  Object.entries(values).forEach(([key, value]) => {
    const original = originalValues?.[key];

    // Примитивы
    if (typeof value !== 'object' || value === null) {
      if (value === original || (!(key in originalValues) && isEmpty(value))) {
        delete formatted[key];
      }
    }

    // Объекты (НЕ файлы)
    else if (typeof value === 'object' && !isFile(value)) {
      const cleaned = formatData(value, original ?? {});

      if (
        (!(key in originalValues) && isEmpty(cleaned)) ||
        JSON.stringify(cleaned) === JSON.stringify(original)
      ) {
        delete formatted[key];
      } else {
        formatted[key] = cleaned;
      }
    }
  });

  return formatted;
}
