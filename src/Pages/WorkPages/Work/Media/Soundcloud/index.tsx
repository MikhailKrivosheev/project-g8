import React from 'react';

interface ISoundcloud {
  name: string;
  link: string;
}

export default function Soundcloud({ name, link }: ISoundcloud) {
  return (
    <iframe
      className="soundcloud"
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      title={name}
      src={link}
    />
  );
}
