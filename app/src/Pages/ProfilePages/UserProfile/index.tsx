import Api from 'Api';
import LazyLoad from 'Components/LazyLoad';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../../../../public/Images/fakeAvatar.png';

interface IUser {
  first_name: string;
  image_url: string;
  last_name: string;
  facebook: string;
  telegram: string;
  vkontakte: string;
  instagram: string;
  site: string;
  job_title: string;
  company: string;
  biography: string;
  role: string;
  role_description: string;
}

export default function User() {
  const [data, setData] = useState<IUser | null>(null);
  const { handleAPIError } = useAPIError();
  const params = useParams();
  const translate = useTranslate();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.profile(params.id));
        setData({ ...response.results });
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  const userRoles = useMemo(() => {
    if (data) {
      return Object.values(data?.role_description).join(', ');
    }
    return null;
  }, [data]);

  if (!data) return null;

  return (
    <Section>
      <div className="user__personal">
        <LazyLoad
          className="user__image"
          src={data?.image_url || avatar}
          alt="userImage"
        />
        <div className="user__personal-info">
          <Description sizeName="l">
            {data?.first_name} {data?.last_name}
          </Description>
          <div className="user__socials">
            {data.facebook && (
              <a className="user__social" href={data?.facebook}>
                {translate('Фб')}
              </a>
            )}
            {data.telegram && (
              <a
                className="user__social"
                href={`https://t.me/${data?.telegram?.split('@').join('')}`}
                target="_blank"
                rel="noreferrer"
              >
                {translate('Тг')}
              </a>
            )}
            {data.instagram && (
              <a
                className="user__social"
                href={data?.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {translate('Инст')}
              </a>
            )}
            {data.vkontakte && (
              <a
                className="user__social"
                href={data?.vkontakte}
                target="_blank"
                rel="noreferrer"
              >
                {translate('Вк')}
              </a>
            )}
          </div>
          {data.site && (
            <a className="user__link" href={data?.site}>
              {data?.site.replace(/(^\w+:|^)\/\//, '')}
            </a>
          )}
        </div>
      </div>
      <div className="user__info">
        {data.job_title && (
          <div className="user-info__item">
            <Description className="user-info__item-headline">
              Должность
            </Description>
            <Description>{data?.job_title}</Description>
          </div>
        )}
        {data.company && (
          <div className="user-info__item">
            <Description className="user-info__item-headline">
              Компания
            </Description>
            <Description>{data?.company}</Description>
          </div>
        )}
        {data.biography && (
          <div className="user-info__item">
            <Description className="user-info__item-headline">
              История
            </Description>
            <Description dangerHTML={data?.biography} />
          </div>
        )}
        {userRoles && (
          <div className="user-info__item">
            <Description className="user-info__item-headline">
              На фестивале
            </Description>
            <Description>
              {userRoles}
              {data.contests.length ? `, ${data?.contests[0]?.name}` : ''}
            </Description>
          </div>
        )}
      </div>
    </Section>
  );
}
