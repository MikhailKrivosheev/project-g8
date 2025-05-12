import React from 'react';
import cn from 'classnames';
import useTranslate from 'Hooks/useTranslate';

interface ICounterBlock {
  title: string;
  description: string;
  descriptionAdditional?: string;
  backgroundColor: 'green' | 'gray';
  counterType: 'general' | 'personal' | 'mutual';
  myVotesCount?: number;
  availableCount?: number;
  allCount?: number;
}

export default function CounterBlock({
  title,
  description,
  descriptionAdditional,
  myVotesCount,
  backgroundColor,
  availableCount,
  counterType,
  allCount,
}: ICounterBlock) {
  const counterClassNames = cn('works-jury__counter', {
    [`works-jury__counter--${backgroundColor}`]: backgroundColor,
  });

  const translate = useTranslate();

  return (
    <div className={counterClassNames}>
      <span className="works-jury__counter-title">{translate(title)}</span>
      {counterType === 'mutual' ? (
        <div className="works-jury__counters-wrapper">
          <div className="works-jury__counter-holder">
            <span className="works-jury__counter-description">
              {translate(description)}
            </span>
            <span className="works-jury__counter-count">{myVotesCount}</span>
          </div>
          <div className="works-jury__counter-holder">
            <span className="works-jury__counter-description">
              {translate(descriptionAdditional)}
            </span>
            <span className="works-jury__counter-count">{allCount}</span>
          </div>
        </div>
      ) : (
        <>
          <span className="works-jury__counter-description">
            {translate(description)}
          </span>
          <div>
            <span className="works-jury__counter-count">
              {counterType === 'personal' && myVotesCount}
              {counterType === 'general' && availableCount}
            </span>
            {allCount && (
              <span className="works-jury__counter-count--additional">
                из{` ${allCount}`}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
