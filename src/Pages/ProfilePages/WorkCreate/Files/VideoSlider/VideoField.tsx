import GrayField from 'Components/UI/Form/GrayInput';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import FileWrapper from '../FileWrapper';

export default function VideoField({
  indexToRemove,
  name,
  required,
  isWithTitle = true,
  isWithDescription = true,
  ...props
}: {
  indexToRemove?: number;
  name: string;
  required?: boolean;
  isWithTitle?: boolean;
  isWithDescription?: boolean;
}) {
  const translate = useTranslate();

  return (
    <div className="work-create__video-slider-item">
      <FileWrapper
        name={name}
        title={isWithTitle && translate('Миниатюра видео')}
        description={
          isWithDescription &&
          translate('Файлы .jpg .png, размер не более 2 МБ')
        }
        indexToRemove={indexToRemove}
        required={required}
        {...props}
      />
      <GrayField
        fullWidth
        closeButton
        required={required}
        label={translate('Ссылка на видео Vimeo/VK')}
        name={`slider_videos.${indexToRemove}.video`}
      />
    </div>
  );
}
