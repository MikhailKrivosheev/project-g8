/* eslint-disable react/no-array-index-key */
import Api from 'Api';
import { IAlbum } from 'Components/AlbumPreview';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useState } from 'react';
import AlbumCard from './Card';
import AlbumGrid from './Grid';

interface IAlbums {
  images: IAlbum[];
  videos: IAlbum[];
}

export default function Albums() {
  const [albums, setAlbums] = useState<IAlbums | null>(null);

  const ROUTES = useRoutes();

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await Api.get(Api.routes.api.albums());

        setAlbums(
          response?.results?.reduce(
            (acc: IAlbums, item: IAlbum) => {
              if (item.type === 'video') {
                acc.videos = [...acc.videos, item];
                return acc;
              }
              acc.images = [...acc.images, item];
              return acc;
            },
            { videos: [], images: [] }
          )
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchAlbums();
  }, []);

  if (!albums) return null;

  return (
    <Section>
      <Title>Галерея</Title>
      {albums.images?.length > 0 && (
        <>
          <Title marginSizeName="l" sizeName="m">
            Фото
          </Title>
          <AlbumGrid>
            {albums.images.map((album) => (
              <AlbumCard
                key={album?.id}
                link={ROUTES.album(`${album?.id}`)}
                image={album?.image_cover_url}
                title={album?.title}
                description={album?.album_season}
              />
            ))}
          </AlbumGrid>
        </>
      )}
      {albums.videos?.length > 0 && (
        <>
          <Title marginSizeName="l" sizeName="m">
            Видео
          </Title>
          <AlbumGrid>
            {albums.videos.map((album) => (
              <AlbumCard
                key={album?.id}
                link={ROUTES.album(`${album?.id}`)}
                image={album?.image_cover_url}
                title={album?.title}
                description={album?.album_season}
              />
            ))}
          </AlbumGrid>
        </>
      )}
    </Section>
  );
}
