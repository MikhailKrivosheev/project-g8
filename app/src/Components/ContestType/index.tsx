import cn from 'classnames';
import React from 'react';
import { TContestType } from 'Types';

type TContestBillet = {
  className?: string;
  type: TContestType;
  color: 'gray' | 'light-green' | 'medium-green' | 'dark-green' | 'dark-blue';
  isUpperCase?: boolean;
};

const BLOCK_NAMES = {
  creative_advertising: 'CREATIVE ADVERTISING',
  creative_industries: 'CREATIVE INDUSTRIES',
};

export default function ContestBillet({
  type,
  className,
  color,
  isUpperCase = false,
}: TContestBillet) {
  const typeBlockClassNames = cn('contest__type', className, {
    [`contest__type--${color}`]: color,
    'contest__type--uppercase': isUpperCase,
  });

  if (!BLOCK_NAMES[type]) return null;

  return (
    <div className={typeBlockClassNames}>
      <span>{BLOCK_NAMES[type]}</span>
    </div>
  );
}
