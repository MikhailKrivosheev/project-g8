/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import PlayIcon from 'Icons/PlayIcon';
import { useLocation } from 'react-router-dom';

interface IVideo {
  src: string;
  className?: string;
  preview?: string;
}

export default function Vimeo({ src, className, preview }: IVideo) {
  const { pathname } = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl('');
  }, [pathname]);

  const vimeoClassName = cn('vimeo', className);
  const vimeoPreviewClassName = cn('vimeo__preview', {
    'vimeo__preview--hidden': url,
  });
  const vimeoIconClassName = cn('vimeo__icon', {
    'vimeo__icon--hidden': url,
  });

  function onPreviewClick() {
    setUrl(
      `${
        src.includes('player')
          ? src
          : src.replace('vimeo.com', 'player.vimeo.com/video')
      }?autoplay=1`
    );
  }

  return (
    <div className={vimeoClassName}>
      {preview && (
        <>
          <img
            className={vimeoPreviewClassName}
            role="presentation"
            src={preview}
            alt="vimeoPreview"
            onClick={onPreviewClick}
          />
          <button
            type="button"
            onClick={onPreviewClick}
            className={vimeoIconClassName}
          >
            <PlayIcon />
          </button>
        </>
      )}
      <iframe
        className="vimeo__iframe"
        title={src}
        src={preview ? url : src}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
