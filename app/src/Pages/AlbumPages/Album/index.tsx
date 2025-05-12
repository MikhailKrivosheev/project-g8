/* eslint-disable react/no-array-index-key */
import Api from 'Api';
import routes from 'Api/routes';
import classNames from 'classnames';
import { IAlbum } from 'Components/AlbumPreview';
import LazyLoad from 'Components/LazyLoad';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import Vimeo from 'Components/Video/Vimeo';
import useAPIError from 'Hooks/useAPIError';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Utilities from 'Utilities';
import ReturnButton from '../ReturnButton';
import AlbumSlider from './Slider';

export interface IGalleryItem {
  isVertical?: boolean;
  image: string;
  callback: () => void;
}

function GalleryItem({ isVertical, image, callback }: IGalleryItem) {
  const { isDesktop } = useResize();
  const galleryClassNames = classNames('album-gallery__card', {
    'album-gallery__card--vertical': isVertical,
  });
  return (
    <button
      type="button"
      onClick={() => {
        if (isDesktop) callback();
      }}
      className={galleryClassNames}
    >
      <LazyLoad className="album-preview__image" src={image} alt="gallery" />
    </button>
  );
}

export default function Album() {
  const { id } = useParams();
  const { isDesktop } = useResize();
  const ROUTES = useRoutes();
  const { handleAPIError } = useAPIError();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [isSliderMode, setSliderMode] = useState<boolean>(false);

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const { results } = await Api.get(routes.api.album(id));
        setAlbum(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    fetchAlbum();
  }, [id]);

  if (!album) return null;

  return isSliderMode ? (
    <AlbumSlider setState={setSliderMode} data={album} />
  ) : (
    <Section>
      <ReturnButton link={ROUTES.albums()} />
      <Title className="album-title" marginSizeName="xss" sizeName="m">
        {album?.title}
      </Title>
      <Description sizeName="xs" color="gray">
        {album?.album_season}
      </Description>
      <div className="album-gallery">
        {album?.type === 'photo'
          ? album?.gallery_url?.map((item, index) => (
              <GalleryItem
                key={index}
                callback={() => {
                  navigate(
                    `${ROUTES.album(id)}${Utilities.params.toString({
                      activeSlide: index,
                    })}`
                  );
                  setSliderMode(true);
                }}
                image={item as unknown as string}
              />
            ))
          : album?.gallery_url?.map(({ image, video_url: videoUrl }, index) => (
              <Vimeo key={index} src={videoUrl} preview={image} />
            ))}
      </div>
    </Section>
  );
}
