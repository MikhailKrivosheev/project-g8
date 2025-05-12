import Description from 'Components/UI/Description';
import FieldArray from 'Components/UI/Form/FieldArray';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FilesRow from '../FilesRow';
import FileWrapper from '../FileWrapper';

export default function ImageSlider({
  required,
}: {
  required: boolean | undefined;
}) {
  const { setValue, getValues } = useFormContext();
  const translate = useTranslate();

  useEffect(() => {
    if (!getValues('slider_images'))
      setValue('slider_images', [
        { image: '' },
        { image: '' },
        { image: '' },
        { image: '' },
      ]);
  }, []);

  return (
    <FilesRow rowGap={0}>
      <Title sizeName="s">
        {translate('Слайдер изображений с пропорциями 3:2')}
      </Title>
      <Description sizeName="s" color="gray">
        {translate(
          'Файлы .jpg .png, размер каждого изображения не более 2 МБ. Максимальное кол-во 10.'
        )}
        {required && '*'}
      </Description>
      <div className="work-create__fields-array">
        <FieldArray
          name="slider_images"
          component={FileWrapper}
          componentProps={{ sizeName: 's', required, maxSize: 2 }}
          required={required}
          requiredItems={3}
        />
      </div>
    </FilesRow>
  );
}
