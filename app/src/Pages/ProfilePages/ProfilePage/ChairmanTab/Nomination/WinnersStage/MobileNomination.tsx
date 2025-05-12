import classNames from 'classnames';
import Button from 'Components/UI/Button';
import useTranslate from 'Hooks/useTranslate';
import React, { forwardRef, useEffect } from 'react';
import useRoutes from 'Hooks/useRoutes';
import LazyLoad from 'Components/LazyLoad';
import AwardButton from '../../AwardButton';

function WinnersMobileNominations({ data, activeNominationId }, ref) {
  const translate = useTranslate();
  // const itemClassName = classNames('works-preview__item', {
  //   'works-preview__item--rated': !vote,
  // });

  const ROUTES = useRoutes();

  return (
    <div className="works-preview__list works-nomination__list" ref={ref}>
      {data?.map((nomination) => {
        const {
          name,
          preview_url: previewUrl,
          account,
          client_name: clientName,
          vote_by_account: vote,
          is_awarded: isAwarded,
          work_votes: workVotes,
          is_voted: isVoted,
          work_ratings: workRatings,
          is_rated: isRated,
          id,
        } = nomination;

        return (
          <div className="works-preview__item" key={id}>
            <div className="works-preview__item-top">
              <LazyLoad
                src={previewUrl}
                className="works-preview__image"
                alt=""
              />
              <a href={ROUTES.work(id)} className="works-preview__text">
                {name}
              </a>
            </div>
            <div className="works-preview__item-middle">
              <div className="works-preview__label">
                {translate('Автор / Клиент')}
              </div>
              <div className="works-preview__text">
                {account.first_name} / {clientName}
              </div>
            </div>
            <AwardButton
              id={id}
              isAwarded={isAwarded}
              nominationId={activeNominationId}
            />
            {/* <div className="works-preview__item-bottom">
            </div> */}
            {/* <Rating
              isVoted={isVoted}
              workVotes={workVotes}
              workRatings={workRatings}
              isRated={isRated}
              id={id}
            /> */}
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef(WinnersMobileNominations);
