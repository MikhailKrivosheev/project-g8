import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import { INomination } from 'Pages/ContestPages/Nominations/types';
import LazyLoad from 'Components/LazyLoad';
import Like from '../../Like';
import Description from '../Description';

export interface ICard {
  id?: number;
  image: string;
  logo?: string;
  company?: string;
  title?: string;
  likes: number;
  isWide?: boolean;
  className?: string;
  nominations?: INomination[];
  isLiked?: boolean;
}

export default function Card({
  id,
  image,
  logo,
  company,
  title,
  likes,
  isLiked,
  nominations,
  isWide,
  className,
}: ICard) {
  const ROUTES = useRoutes();
  const sliderClassNames = cn('card', className, {
    'card--wide': isWide,
  });

  const cardNominations = useMemo(() => {
    if (nominations) {
      const list = nominations?.reduce((acc, nomination) => {
        acc.push(nomination?.name);
        return acc;
      }, [] as string[]);
      return list.join(' | ');
    }
    return '';
  }, []);

  return (
    <article className={sliderClassNames}>
      <div className="card__image-holder">
        <LazyLoad className="card__image" src={image} alt="gallery" />
      </div>
      <div className="card__info">
        {logo && <img className="card__logo" src={logo} alt="card logo" />}
        <p className="card__company">{company}</p>
        {title && <h3>{title}</h3>}
        {cardNominations && (
          <Description sizeName="s" color="gray">
            {cardNominations}
          </Description>
        )}
      </div>
      <Like workId={id} count={likes} isLiked={isLiked} />
      <Link to={ROUTES.work(`${id}`)} className="card__link" />
    </article>
  );
}
