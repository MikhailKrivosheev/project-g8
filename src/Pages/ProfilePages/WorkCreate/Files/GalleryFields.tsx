import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import FilesRow from './FilesRow';
import FileWrapper from './FileWrapper';
import ImageSlider from './ImageSlider';

interface IGalleryFieldsProps {
  required?: boolean;
}

export default function GalleryFields({ required }: IGalleryFieldsProps) {
  const translate = useTranslate();

  return (
    <>
      <FilesRow gap={0} rowGap={0}>
        <div>
          <Title sizeName="s">
            {translate('Изображение с неограниченной высотой*')}
          </Title>
          <Description sizeName="s" color="gray">
            {translate('Файлы .jpg .png, размер не более 20 МБ*')}
          </Description>
        </div>

        <FileWrapper sizeName="l" name="image_1" required maxSize={20} />
      </FilesRow>
      <FilesRow columns={2} rowGap={0} columnGap={24}>
        <div className="work-create__intro-holder">
          <Title sizeName="s">
            {translate('2 изображения с пропорциями 3:2*')}
          </Title>
          <Description sizeName="s" color="gray">
            {translate('Файлы .jpg .png, размер не более 5 МБ*')}
          </Description>
        </div>

        <FileWrapper sizeName="s" name="image_2" required maxSize={5} />
        <FileWrapper sizeName="s" name="image_3" required maxSize={5} />
      </FilesRow>
      <FilesRow gap={0} rowGap={0}>
        <Title sizeName="s">
          {translate('Изображение с пропорциями 16:9*')}
        </Title>
        <Description sizeName="s" color="gray">
          {translate('Файлы .jpg .png, размер не более 20 МБ*')}
        </Description>
        <FileWrapper sizeName="m" name="image_4" required maxSize={20} />
      </FilesRow>
      <ImageSlider
        required={required}
        // required={false}
      />
    </>
  );
}
