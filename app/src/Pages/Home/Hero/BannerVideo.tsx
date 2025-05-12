import Video from 'Components/Video';
import React from 'react';

export default function BannerVideo() {
  return (
    <Video
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      className="hero__video"
    />
  );
}
