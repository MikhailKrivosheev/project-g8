import ErrorBoundary from 'Components/ErrorBoundary';
import LazyLoad from 'Components/LazyLoad';
import Tooltip from 'Components/Tooltip';
import Description from 'Components/UI/Description';
import React from 'react';

export default function JuryTooltip({
  workVotesApprovedCount,
  workVotesCount,
  jury,
}) {
  return (
    <ErrorBoundary content={<Description>Что-то пошло не так</Description>}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {workVotesApprovedCount} / {workVotesCount}
        {jury?.length > 0 && (
          <Tooltip type="white">
            <ul className="jury-tooltip">
              {jury?.map(({ account, approved }) => (
                <li className="jury-tooltip__item">
                  <LazyLoad
                    className="jury-tooltip__image"
                    src={account?.image_url}
                    alt="avatar"
                  />
                  <Description className="jury-tooltip__name">
                    {account?.first_name}
                  </Description>
                  <Description className="jury-tooltip__approved" color="green">
                    {approved ? 'да' : 'нет'}
                  </Description>
                </li>
              ))}
            </ul>
          </Tooltip>
        )}
      </div>
    </ErrorBoundary>
  );
}
