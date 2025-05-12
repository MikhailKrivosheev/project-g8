import cn from 'classnames';
import SearchIcon from 'Icons/SearchIcon';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchInput({ paramName, placeholder }) {
  const location = useLocation();
  const history = useHistory();

  const urlParams = new URLSearchParams(location?.search);
  const initialYear = urlParams?.get(paramName) || '';

  const [value, setValue] = useState(initialYear);

  const searchClasses = cn('search-filter', {
    'search-filter--filled': value.length > 0,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      history.replace({ search: params.toString() });
    }, 500);

    return () => clearTimeout(handler);
  }, [value, history, location.search]);

  if (!paramName) return null;

  return (
    <div className={searchClasses}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-filter__input"
      />
      <SearchIcon />

      {value.length > 0 && (
        <button
          type="button"
          className="search-filter__clear"
          onClick={() => setValue('')}
          aria-label="Очистить"
        />
      )}
    </div>
  );
}
