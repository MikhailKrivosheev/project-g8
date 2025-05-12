import { IAlbum, IPreview } from 'Components/AlbumPreview';
import LazyLoad from 'Components/LazyLoad';
import Section from 'Components/UI/Section';
import Slider from 'Components/UI/Slider';
import Vimeo from 'Components/Video/Vimeo';
import useGetParams from 'Hooks/useGetParams';
import React from 'react';
import ReturnButton from '../ReturnButton';

interface ISlider {
  data: IAlbum;
  // eslint-disable-next-line react/no-unused-prop-types
  setState: (state: boolean) => void;
}

function Slide({ data }: { data: IPreview }) {
  if (data?.video_url) {
    return <Vimeo src={data?.video_url} preview={data?.image} />;
  }

  return (
    <article className="album-slide">
      <LazyLoad className="album-preview__image" src={data} alt="gallery" />
    </article>
  );
}

export default function AlbumSlider({ data, setState }: ISlider) {
  const params = useGetParams();

  return (
    <Section>
      <ReturnButton onClick={() => setState(false)} />
      <Slider
        initialSlide={
          params?.activeSlide ? parseInt(params?.activeSlide, 10) : 1
        }
        fullWidthSlide
        className="album-slider"
        slides={1}
        elements={data.gallery_url}
        slide={Slide}
        pagination
      />
    </Section>
  );
}
