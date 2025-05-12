import React from 'react';
import FilesRow from './FilesRow';
import FileWrapper from './FileWrapper';

export default function MusicFields() {
  // const translate = useTranslate();
  return (
    <>
      {/* <FilesRow gap={10}>
        <Tooltip title="Музыка">
          1.{' '}
          {translate(
            'перейдите на необходимый вам трэк, нажмите на кнопку Share'
          )}{' '}
          <br />
          <br />
          2.{' '}
          {translate(
            'перейдите во вкладку Embed и скопируйте текст из поля Code, вставьте.'
          )}
        </Tooltip>
        <GrayField
          closeButton
          label="Ссылка на Soundcloud"
          name="soundcloud_link"
          // required
        />
      </FilesRow> */}
      <FilesRow gap={10}>
        <FileWrapper
          title="Изображение"
          sizeName="l"
          description="Файл .jpg .png с неограниченной высотой"
          name="image_1"
        />
      </FilesRow>
    </>
  );
}
