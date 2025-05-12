import Button from 'Components/UI/Button';
import React, { Dispatch, forwardRef } from 'react';
import useTranslate from 'Hooks/useTranslate';
import { INominationWork } from './types';

interface INominationList {
  data: INominationWork[];
  setActiveNomination: Dispatch<INominationWork>;
}

function AllWorksMobile(props: INominationList, ref: any) {
  const { data, setActiveNomination } = props;
  const translate = useTranslate();
  return (
    <div className="works-preview__list" ref={ref}>
      {data?.map((nomination) => (
        <div className="works-preview__item" key={nomination.id}>
          <div className="works-preview__item-top">
            <div className="works-preview__label">{translate('Категория')}</div>
            <div className="works-preview__text">{nomination.contest.name}</div>
          </div>
          <div className="works-preview__item-middle">
            <div className="works-preview__label">{translate('Номинация')}</div>
            <Button
              sizeName="s"
              color="gray"
              strached
              onClick={() => setActiveNomination(nomination)}
              className="works-preview__button"
            >
              {nomination.name}
            </Button>
          </div>
          <div className="works-preview__item-bottom">
            <div className="works-preview__label">
              {translate('Осталось работ')}
            </div>
            <div className="works-preview__text">
              {nomination.work_count - nomination.work_voting_count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default forwardRef(AllWorksMobile);
