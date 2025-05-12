import LazyLoadComponent from 'Components/LazyLoad';
import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import React from 'react';
import { Link } from 'react-router-dom';

interface IAlbumCard {
  link: string;
  image: string;
  title: string;
  description: string;
}

export default function AlbumCard({
  link,
  image,
  title,
  description,
}: IAlbumCard) {
  return (
    <article>
      <Link to={link} className="album-preview__item">
        <LazyLoadComponent
          className="album-preview__image"
          src={image}
          alt="preview"
        />
      </Link>
      {title && (
        <Title marginSizeName="xs" sizeName="xs">
          {title}
        </Title>
      )}
      {description && (
        <Description sizeName="xs" color="gray">
          {description}
        </Description>
      )}
    </article>
  );
}
