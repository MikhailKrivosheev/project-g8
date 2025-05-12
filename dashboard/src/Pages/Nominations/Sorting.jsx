import Typography from 'Components/UI/Typography';
import useQueryParams from 'Hooks/useQueryParams';
import SortingArrows from 'Icons/SortingArrows';
import cn from 'classnames';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Sorting() {
  const { nominationPublished } = useQueryParams();
  const { search } = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(search);

  const getSortingClasses = useCallback((sorting) => {
    return cn('nominations-list__sorting', {
      [`nominations-list__sorting-${sorting}`]: sorting,
    });
  }, []);

  return (
    <div className="nominations-list__sorting-holder">
      <button
        type="button"
        className={getSortingClasses('published')}
        onClick={() => {
          if (!nominationPublished) {
            params.set('sort_by_published', 'asc');
          } else if (nominationPublished === 'asc') {
            params.set('sort_by_published', 'desc');
          } else {
            params.set('sort_by_published', 'asc');
          }
          history.replace({ search: params.toString() });
        }}
      >
        <Typography type="caption" color="gray">
          Опубликовано
        </Typography>
        <SortingArrows />
      </button>
    </div>
  );
}
