import React from 'react';
import StarIcon from 'Icons/StarIcon';
import cn from 'classnames';
import ErrorBoundary from 'Components/ErrorBoundary';
import useTranslate from 'Hooks/useTranslate';
import LazyLoad from 'Components/LazyLoad';

interface ISponsor {
  title?: string;
  logoUrl?: string;
  sponsorLink?: string;
  bordered?: boolean;
}

export default function Sponsor({
  title,
  logoUrl,
  bordered,
  sponsorLink,
}: ISponsor) {
  const translate = useTranslate();
  const sponsorClassNames = cn('sponsor__holder', {
    'sponsor__holder--bordered': bordered,
  });

  if (!logoUrl && !title) return null;
  return (
    <ErrorBoundary>
      {sponsorLink ? (
        <a
          href={sponsorLink}
          target="_blank"
          className={sponsorClassNames}
          rel="noreferrer"
        >
          {bordered && <StarIcon />}
          <span className="sponsor__title">
            {translate('При поддержке компании')} {title}
          </span>
          {logoUrl && (
            <img src={logoUrl} className="sponsor__logo" alt="sponsor logo" />
          )}
        </a>
      ) : (
        <div className={sponsorClassNames}>
          {bordered && <StarIcon />}
          <span className="sponsor__title">
            {translate('При поддержке компании')} {title}
          </span>
          {logoUrl && (
            <LazyLoad
              className="sponsor__logo"
              src={logoUrl}
              alt="sponsor logo"
            />
          )}
        </div>
      )}
    </ErrorBoundary>
  );
}
