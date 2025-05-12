import Description from 'Components/UI/Description';
import FieldArray from 'Components/UI/Form/FieldArray';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import VideoField from './VideoField';

export default function VideoSlider({ required }: { required: boolean }) {
  const translate = useTranslate();

  return (
    <>
      <Title sizeName="s">
        {translate(`Видео слайдер${required ? '*' : ''}`)}
      </Title>
      <Description sizeName="s" color="gray">
        {translate(
          `Больше видео: покажите дополнительные видео-материалы о проекте, если это необходимо`
        )}
        {required ? '*' : ''}
      </Description>
      <Title sizeName="s">
        {translate(`Миниатюра видео`)}
        {required ? '*' : ''}
      </Title>
      <Description sizeName="s" color="gray">
        {translate(`Изображение в пропорции 3:2, размер не более 2 МБ`)}
        {required ? '*' : ''}
      </Description>
      <div className="work-create__fields-array">
        <FieldArray
          name="slider_videos"
          component={VideoField}
          componentProps={{
            sizeName: 's',
            required,
            maxSize: 2,
            isWithTitle: false,
            isWithDescription: false,
          }}
          required={required}
          requiredItems={3}
        />
      </div>
    </>
  );
}
