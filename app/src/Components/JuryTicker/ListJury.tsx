import Description from 'Components/UI/Description';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import LazyLoad from 'Components/LazyLoad';
import { Link } from 'react-router-dom';

interface IData {
  data: {
    first_name: string;
    last_name: string;
    image_url: string;
    id: number;
  }[];
}

export default function ListJury({ data }: IData) {
  const ROUTES = useRoutes();
  return (
    <ul className="jury__list">
      {data.map(
        ({
          first_name: firstName,
          last_name: lastName,
          image_url: imageUrl,
          id,
        }) => (
          <li key={id} className="jury__item">
            <Link to={ROUTES.profile(id)} className="jury__link">
              ссылка на жюри
            </Link>

            <LazyLoad src={imageUrl} alt="" className="jury__avatar" />

            <Description sizeName="m" className="jury__name">
              {firstName} {lastName}
            </Description>
          </li>
        )
      )}
    </ul>
  );
}
