import React from 'react';
import FileField from 'Components/Form/File';
import GalleryVideo from './GalleryVideo';

export default function Gallery({ type }) {
  return (
    <>
      <h3>Галерея</h3>
      <FileField
        name="image_cover"
        label="Обложка для блока на главной"
        accept={['.png', '.jpg', '.jpeg', '.svg']}
        required
      />
      {type === 'video' && <GalleryVideo />}
      {type === 'photo' && (
        <FileField
          name="gallery_photo"
          label="Изображения галереи"
          accept={['.png', '.jpg', '.jpeg', '.svg']}
          required
          multiple
          unregisterOnUnmount
        />
      )}
    </>
  );
}
