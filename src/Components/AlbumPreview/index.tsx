/* eslint-disable jsx-a11y/iframe-has-title */
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import Link from 'Components/UI/Link';
import React, { useState, useEffect } from 'react';
import Api from 'Api';
import PlayIcon from 'Icons/PlayIcon';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import useRoutes from 'Hooks/useRoutes';
import LazyLoad from 'Components/LazyLoad';

export interface IPreview {
  image: string;
  is_cover: boolean;
  is_vertical: boolean;
  video_url: string;
}

export interface IAlbum {
  id: number;
  title: string;
  album_season: string;
  // image: string;
  type: string;
  gallery_url: IPreview[];
  image_cover_url: string;
}

interface IData {
  data: IAlbum[];
  albumsAmount: number;
}

export default function AlbumPreview() {
  const [data, setData] = useState<IData | null>(null);
  const translate = useTranslate();
  const { handleAPIError } = useAPIError();
  const ROUTES = useRoutes();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.albums(), {
          is_home: 1,
        });
        setData({
          data: response.results.slice(0, 2),
          albumsAmount: response.meta.total_without_params,
        });
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  if (!data) return null;

  return (
    <>
      <Section>
        <Title color="black" sizeName="m">
          {translate('Как это было')}
        </Title>
        <div className="album-preview">
          {data?.data.map((album: IAlbum) => {
            if (album.image_cover_url) {
              return (
                <a
                  href={ROUTES.album(album.id.toString())}
                  key={album.id}
                  className="album-preview__item"
                >
                  <LazyLoad
                    src={album.image_cover_url}
                    className="album-preview__image"
                    alt={album.type}
                  />

                  {album.type === 'video' && (
                    <div className="album-preview__icon">
                      <PlayIcon />
                    </div>
                  )}
                </a>
              );
            }
            return null;
          })}
        </div>
      </Section>
      <Section noMargin isWide>
        <Link href={ROUTES.albums()}>
          <span>{translate('Все альбомы')}</span>
          <span>{data?.albumsAmount}</span>
        </Link>
      </Section>
    </>
  );
}
