import LazyLoad from 'Components/LazyLoad';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ConferenceList({ data }) {
  const ROUTES = useRoutes();

  if (!data) return null;

  return (
    <div className="ticker-avatars">
      {data.map(({ image_url: imageUrl, id }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link to={ROUTES.profile(id)} key={index}>
          <LazyLoad src={imageUrl} />
        </Link>
      ))}
    </div>
  );
}
