import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Button from 'Components/UI/Button';
import PlayIcon from 'Icons/PlayIcon';
import useObserver from 'Hooks/useIntersectionObserver';

interface IVideo {
  src: string;
  className?: string;
  preview?: string;
  muted?: boolean;
  playsInline?: boolean;
}

export default function Video({
  src,
  className,
  preview,
  muted = true,
  playsInline = false,
}: IVideo) {
  const [url, setUrl] = useState(preview ? '' : src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstMount = useRef(true);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [, setStopped] = useState<boolean>(true);
  const videoClassName = cn('video__iframe-wrapper', className);

  const playButtonClassNames = cn('video__play-button', {
    'video__play-button--pause': !isPlaying,
  });

  const onScrollEnd = ([entry]: IntersectionObserverEntry[]) => {
    if (videoRef.current) {
      if (!entry?.isIntersecting) {
        setPlaying(false);
      } else {
        setStopped((currentValue) => {
          if (!currentValue) setPlaying(true);
          return currentValue;
        });
      }
    }
  };

  useEffect(() => {
    if (!firstMount.current && preview && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  const { setObservable } = useObserver({
    triggerOnce: false,
    callback: onScrollEnd,
  });

  return (
    <div className={videoClassName}>
      <div className="video__iframe-holder">
        {!url && <img src={preview} alt="video preview" />}
        <video
          ref={videoRef as React.Ref<HTMLVideoElement>}
          playsInline={playsInline}
          autoPlay
          muted={muted}
          loop
          src={url}
        >
          <track kind="captions" label="video" />
        </video>
        {preview && (
          <button
            type="button"
            className={playButtonClassNames}
            onClick={() => {
              setStopped((prev) => !prev);
              if (!url) {
                setUrl(src);
                setObservable(videoRef.current);
              } else {
                setPlaying((prev) => !prev);
              }
            }}
          >
            play video
          </button>
        )}
      </div>
    </div>
  );
}
