import React, { Fragment, useMemo } from 'react';
import Collapsable from 'Components/UI/Collapsable';
import CustomLink from 'Components/UI/Link';
import Title from 'Components/UI/Title';
import Utilities from 'Utilities';
import { Link } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import Description from 'Components/UI/Description';
import useTranslate from 'Hooks/useTranslate';
import LazyLoad from 'Components/LazyLoad';

const ReportResponsible = (props: any) => {
  const ROUTES = useRoutes();
  const { responsibles } = props;
  const names = useMemo(() => {
    return responsibles.map(
      ({ first_name: firstName, last_name: lastName, id }: any) => ({
        name: [firstName, lastName].filter((item) => item).join(' '),
        id,
      })
    );
  }, []);

  return names.map(({ name, id }: any, index: any) => (
    <Fragment key={id}>
      {index === 0 ? '' : ', '}
      <CustomLink className="link--simple" href={ROUTES.profile(id)}>
        {name}
      </CustomLink>
    </Fragment>
  ));
};

const Avatars = (props: any) => {
  const ROUTES = useRoutes();
  const { data } = props;
  const images = useMemo(() => {
    return data
      .filter(({ image_url: imageUrl }: any) => imageUrl)
      .map(
        ({
          image_url: imageUrl,
          id,
          first_name: firstName,
          last_name: lastName,
        }: any) => ({
          name: [firstName, lastName].filter((name) => name).join(' '),
          image_url: imageUrl,
          id,
        })
      );
  }, []);

  return (
    <>
      {images.slice(0, 3).map(({ image_url: imageUrl, id, name }: any) => (
        <Link
          className="conference-report__item-avatar"
          key={id}
          to={ROUTES.profile(id)}
        >
          <LazyLoad src={imageUrl} alt={name} />
        </Link>
      ))}
      {images?.length > 3 && (
        <div className="conference-report__item-avatar conference-report__item-avatar--empty">
          + {images?.length || 0 - 3}
        </div>
      )}
    </>
  );
};

export default function Report(props: any) {
  const { report } = props;
  const {
    name,
    description,
    tags,
    started_at: startedTime,
    ended_at: endedTime,
    room,
    curators,
    speakers,
  } = report;
  const translate = useTranslate();

  return (
    <article className="conference-report__item">
      <div className="conference-report__timing-wrapper">
        <span className="conference-report__item-timing">
          {Utilities.date.parseToTime(startedTime)}–
          {Utilities.date.parseToTime(endedTime)}
        </span>
        <span className="conference-report__item-place">{room?.name}</span>
      </div>
      <div className="conference-report__item-info">
        <dl>
          <div className="conference-report__item-responsible">
            <dt>{translate('Кураторы')}:</dt>
            <dd>
              <ReportResponsible linkEntity="curator" responsibles={curators} />
            </dd>
          </div>
          <div className="conference-report__item-responsible">
            <dt>{translate('Спикеры')}:</dt>
            <dd>
              <ReportResponsible linkEntity="speaker" responsibles={speakers} />
            </dd>
          </div>
        </dl>
        <Title className="conference-report__item-title">{name}</Title>
        <Collapsable>
          <p className="conference-report__item-description">{description}</p>
        </Collapsable>
        <div className="conference-report__item-tags">
          {tags.length > 0 &&
            tags.map(({ name: tagName, id }: any) => (
              <Description key={id} className="conference-report__item-tag">
                {tagName}
              </Description>
            ))}
        </div>
      </div>
      <div className="conference-report__item-curators">
        <Avatars data={[...speakers, ...curators]} />
      </div>
    </article>
  );
}
