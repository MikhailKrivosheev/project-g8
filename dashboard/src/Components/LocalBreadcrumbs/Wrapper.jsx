import useQueryParams from 'Hooks/useQueryParams';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocalBreadcrumbs from '.';

export default function Wrapper({ editLink, backLinkRoute }) {
  const { pathname } = useLocation();
  const { seasonName, contestName, nominationName } = useQueryParams();

  const [breadCrumbs, setBreadCrumbs] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const prevSegment = pathSegments[pathSegments.length - 2];

    if (prevSegment === 'contests') {
      setTitle(
        lastSegment === 'create'
          ? 'Создание категории'
          : 'Редактирование категории'
      );
    } else if (prevSegment === 'seasons') {
      setTitle(
        lastSegment === 'create' ? 'Создание сезона' : 'Редактирование сезона'
      );
    } else if (prevSegment === 'nominations') {
      setTitle(
        lastSegment === 'create'
          ? 'Создание номинации'
          : 'Редактирование номинации'
      );
    }

    if (lastSegment === 'nominations') {
      setTitle(contestName);
    }

    setBreadCrumbs([seasonName, contestName, nominationName]);
  }, [pathname]);

  if (!breadCrumbs) return null;

  return (
    <LocalBreadcrumbs
      path={breadCrumbs}
      backLinkRoute={backLinkRoute}
      title={title}
      editLink={editLink}
    />
  );
}
