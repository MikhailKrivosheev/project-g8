import classNames from 'classnames';
import useTranslate from 'Hooks/useTranslate';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useResetRecoilState } from 'recoil';
import conferenceFilterAtom from 'Recoil/Atoms/ConferenceFilter';

interface IInfo {
  isClose: boolean;
}

export default function Info({ isClose }: IInfo) {
  const { watch, reset } = useFormContext();
  const translate = useTranslate();
  const resetFilter = useResetRecoilState(conferenceFilterAtom);

  const watchers = watch(['tag_ids', 'room_id']);

  const resetButtonClassNames = classNames('conference-filter-reset', {
    'conference-filter-reset--hidden': isClose,
  });

  const filterCount = useMemo(() => {
    return watchers.reduce((acc, watcher) => {
      if (typeof watcher === 'object') return acc + watcher.length;
      if (watcher) return acc + 1;
      return acc;
    }, 0);
  }, [watchers]);

  return (
    <div className="conference__filter-info">
      <span>{translate('Фильтры')}</span>
      <span>{filterCount}</span>
      <button
        onClick={() => {
          resetFilter();
          reset({ room_id: '', tag_ids: [] });
        }}
        className={resetButtonClassNames}
        type="button"
      >
        {translate('Очистить')}
      </button>
    </div>
  );
}
