import LazyLoad from 'Components/LazyLoad';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { workType } from './types';

export default function NominationWorks({ works }: { works: workType[] }) {
  const ROUTES = useRoutes();
  const { isDesktop } = useResize();

  if (!works.length) {
    return null;
  }

  return (
    <ul className="nomination__works">
      {works.slice(0, isDesktop ? 5 : 3).map((work) => {
        return (
          <li className="nomination__work">
            <a href={ROUTES.work(work.id)} className="nomination__link">
              link to work
            </a>
            <LazyLoad
              src={work.preview_url}
              alt="work image"
              className="nomination__image"
            />
          </li>
        );
      })}
    </ul>
  );
}
