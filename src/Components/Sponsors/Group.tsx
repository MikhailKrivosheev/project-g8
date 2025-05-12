/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ISponsor } from 'Types/index';
import Sponsor from 'Components/Sponsor';
import cn from 'classnames';
import { IGroup } from './types';

export default function Group({
  title,
  sponsors_published: sponsorsPublished,
  block_type: blockType,
}: Partial<IGroup>) {
  const sponsorsClassname = cn('sponsors__group', {
    'sponsors__group--big': blockType === 'high',
  });
  return (
    <>
      <div className={sponsorsClassname}>{title}</div>{' '}
      {sponsorsPublished?.map((sponsor: ISponsor) => {
        return <Sponsor key={sponsor.id} data={sponsor} size={blockType} />;
      })}
    </>
  );
}
