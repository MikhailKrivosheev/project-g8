/* eslint-disable no-nested-ternary */
import Box from '@material-ui/core/Box';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginGetFile from 'filepond-plugin-get-file';
import FilePondPluginImageOverlay from 'filepond-plugin-image-overlay';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useEffect, useMemo, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { Controller, useFormContext } from 'react-hook-form';

registerPlugin(
  FilePondPluginImagePreview,
  FileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginGetFile,
  FilePondPluginImageOverlay
);

export default function File({
  name,
  label,
  accept = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'],
  multiple,
  reorder,
  preview = true,
  required,
  grid,
  unregisterOnUnmount,
  disableSize,
  reccomendedSize,
  maxFileSize = '70MB',
}) {
  const { control, getValues, unregister } = useFormContext();
  const [imageNaturalSize, setImageNaturalSize] = useState({
    width: '',
    height: '',
  });
  const initialImages = useMemo(() => {
    return getValues(name);
  }, []);
  const [files, setFiles] = useState(
    initialImages
      ? Array.isArray(initialImages)
        ? initialImages.map((value) => ({ source: value }))
        : [{ source: initialImages }]
      : []
  );

  useEffect(() => {
    return () => {
      if (unregisterOnUnmount) unregister(name);
    };
  }, []);

  return (
    <Box my={2} width={1}>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field, fieldState: { error } }) => (
          <>
            <FilePond
              allowFileSizeValidation
              allowDownloadByUrl
              maxFileSize={maxFileSize}
              labelMaxFileSizeExceeded="Файл слишком большой"
              labelMaxFileSize="Максимальный размер файла - 70 мегабайт"
              allowImagePreview={preview}
              imagePreviewMaxHeight={150}
              className={grid ? 'filepond-is-grid' : null}
              files={files}
              styleItemPanelAspectRatio={grid ? 1 : null}
              credits={null}
              name={field.name}
              allowMultiple={multiple}
              onupdatefiles={(fileItems) => {
                if (fileItems?.length) {
                  if (!disableSize) {
                    if (fileItems?.[0]?.file?.lastModifiedDate) {
                      const img = new Image();
                      img.src = window.URL.createObjectURL(
                        fileItems?.[0]?.file
                      );
                      img.addEventListener('load', () => {
                        setImageNaturalSize({
                          width: img?.naturalWidth,
                          height: img?.naturalHeight,
                        });
                      });
                    }
                  }
                  field.onChange(
                    multiple
                      ? fileItems.map((fileItem) => fileItem.file)
                      : fileItems[0].file
                  );
                } else {
                  field.onChange(null);
                  setImageNaturalSize({
                    width: '',
                    height: '',
                  });
                }
                setFiles(fileItems);
              }}
              acceptedFileTypes={accept}
              allowReorder={reorder}
              labelFileTypeNotAllowed="Неподходящий формат"
              onreorderfiles={(fileItems) => {
                field.onChange(fileItems.map((fileItem) => fileItem.file));
                setFiles(fileItems);
              }}
              fileValidateTypeDetectType={(source) => {
                let fileType = '';
                const index = source.name.lastIndexOf('.');
                if (index > 0) {
                  fileType = source.name.substr(index).toLowerCase();
                }
                return Promise.resolve(fileType);
              }}
              labelIdle={
                label ||
                'Перетяните файл или <span class="filepond--label-action">выберите</span>'
              }
            />
            {error?.message && <span>{error.message}</span>}
            {error?.type === 'required' && (
              <span style={{ color: 'red' }}>Приложите файл</span>
            )}
          </>
        )}
      />
      {reccomendedSize && (
        <p style={{ color: 'gray' }}>
          Рекомендуемое разрешение файла: {reccomendedSize}
        </p>
      )}
      {!disableSize && imageNaturalSize?.height && imageNaturalSize?.width ? (
        <p>
          Текущее разрешение файла: {imageNaturalSize?.width}px x{' '}
          {imageNaturalSize?.height}px
        </p>
      ) : (
        ''
      )}
    </Box>
  );
}
