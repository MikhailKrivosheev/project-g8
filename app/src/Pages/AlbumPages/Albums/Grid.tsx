import React, { ReactNode } from 'react';

export default function AlbumGrid({ children }: { children: ReactNode }) {
  return <div className="album-grid">{children}</div>;
}
