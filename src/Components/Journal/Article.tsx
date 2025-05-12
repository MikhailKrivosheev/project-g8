import React from 'react';
import Title from 'Components/UI/Title';
import Arrow from 'Icons/Arrow';
import { IArticle } from 'Types';
import { parseToDate } from 'Utilities/date';
import { Link } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import { isValidHttpUrl } from 'Utilities/urlValidation';

const SourceLink = ({ source }: { source: string }): JSX.Element => {
  if (source && isValidHttpUrl(source)) {
    return (
      <a href={source} className="articles__source articles__source--link">
        {source}
      </a>
    );
  }

  return <span className="articles__source">{source}</span>;
};

export default function Article(article: IArticle) {
  const { title, id, source, date_publish: date } = article;
  const ROUTES = useRoutes();

  return (
    <div className="articles" key={id}>
      <Title tag="h2" sizeName="m" className="articles__title">
        <Arrow className="articles__icon articles__icon--1" />
        <Arrow className="articles__icon articles__icon--2" />
        <Arrow className="articles__icon articles__icon--3" />
        {title}
      </Title>
      <Link to={ROUTES.article(id)} className="articles__link">
        Link to article
      </Link>
      <SourceLink source={source} />
      <span className="articles__date">{parseToDate(date)}</span>
    </div>
  );
}
