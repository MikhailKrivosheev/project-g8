import Card from 'Components/UI/Card';
import React, { useRef } from 'react';
import { ISeason } from 'Recoil/Atoms/Season';

interface IWork {
  gallery_with_url: string;
  preview_url: string;
  company: string;
  name: string;
  season: ISeason;
  brand: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
}

export default function WorksCards({ works }: { works: IWork[] }) {
  const workContainerRef = useRef<HTMLDivElement | null>(null);

  return works?.length > 0 ? (
    <div className="winners__cards" ref={workContainerRef}>
      {works.map(
        ({
          id,
          preview_url: previewUrl,
          company: companyRu,
          name: nameRu,
          likes_count: likesCount,
          is_liked: isLiked,
        }) => (
          <Card
            key={id}
            id={id}
            className="winners__card"
            image={previewUrl}
            company={companyRu}
            title={nameRu}
            isLiked={isLiked}
            likes={likesCount}
          />
        )
      )}
    </div>
  ) : null;
}
