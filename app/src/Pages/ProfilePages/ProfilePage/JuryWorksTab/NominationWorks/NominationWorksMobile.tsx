import Button from 'Components/UI/Button';
import React, { forwardRef, useEffect, useRef } from 'react';
import cn from 'classnames';
import useTranslate from 'Hooks/useTranslate';
import ErrorBoundary from 'Components/ErrorBoundary';
import LazyLoad from 'Components/LazyLoad';
import { INominationData, VoteType } from './types';
import ResetVoteTooltip from '../../ResetVoteTooltip';

interface IWorksList {
  active: number;
  data: INominationData[];
}

type RatingType = {
  activeNomination: number;
  vote: VoteType;
  isVoted?: boolean;
  isRated?: boolean;
  id: number;
};

const Rating = ({
  isVoted,
  workVotes,
  isRated,
  workRatings,
  id,
  activeNomination,
}: RatingType) => {
  const translate = useTranslate();

  return (
    <ErrorBoundary>
      <div className="works-preview__item-bottom">
        <div className="works-preview__label">{translate('Ваша оценка')}</div>
        <div className="works-preview__text">
          <ResetVoteTooltip
            activeNomination={activeNomination}
            id={id}
            is_voted={isVoted}
            is_rated={isRated}
            work_votes={workVotes}
            work_ratings={workRatings}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

function WorkListMobile({ data, activeNomination }: IWorksList, ref: any) {
  const translate = useTranslate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <div className="works-preview__list works-nomination__list" ref={ref}>
        {data?.map((nomination) => {
          const {
            name,
            preview_url: previewUrl,
            account,
            client_name: clientName,
            vote_by_account: vote,
            work_votes: workVotes,
            is_voted: isVoted,
            work_ratings: workRatings,
            is_rated: isRated,
            id,
          } = nomination;
          const itemClassName = cn('works-preview__item', {
            'works-preview__item--rated': !vote,
          });
          return (
            <div className={itemClassName} key={id}>
              <div className="works-preview__item-top">
                <LazyLoad
                  src={previewUrl}
                  className="works-preview__image"
                  alt=""
                />
                <div className="works-preview__text">{name}</div>
              </div>
              <div className="works-preview__item-middle">
                <div className="works-preview__label">{translate('Автор')}</div>
                <div className="works-preview__text">{account?.first_name}</div>
              </div>
              <div className="works-preview__item-bottom">
                <div className="works-preview__label">
                  {translate('Клиент')}
                </div>
                <div className="works-preview__text">{clientName}</div>
              </div>
              <Rating
                activeNomination={activeNomination}
                isVoted={isVoted}
                workVotes={workVotes}
                workRatings={workRatings}
                isRated={isRated}
                id={id}
              />
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
}

export default forwardRef(WorkListMobile);
