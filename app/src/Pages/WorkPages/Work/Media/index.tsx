import LazyLoad from 'Components/LazyLoad';
import Section from 'Components/UI/Section';
import Vimeo from 'Components/Video/Vimeo';
import React from 'react';
import Soundcloud from './Soundcloud';

export default function WorkMedia({ data }: any) {
  return (
    <Section className="work__media">
      {data.soundcloud_link ? (
        <>
          <Soundcloud
            name={data.name_ru || 'soundcloud'}
            link={data.soundcloud_link}
          />
          {data.image_1_url && (
            <LazyLoad
              className="work__content-image"
              src={data?.image_1_url}
              alt="projectImage"
            />
          )}
          {data.vimeo_link && (
            <Vimeo src={data?.vimeo_link} preview={data?.video_preview_url} />
          )}
          {data.image_4_url && (
            <div className="work__image-container">
              <img src={data?.image_4_url} alt="" />
            </div>
          )}
        </>
      ) : (
        <>
          {data.image_1_url && (
            <LazyLoad
              className="work__content-image"
              src={data?.image_1_url}
              alt="projectImage"
            />
          )}
          {data.image_2_url && data.image_3_url && (
            <div className="work__image-gallery">
              <img src={data?.image_2_url} alt="" />
              <img src={data?.image_3_url} alt="" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
