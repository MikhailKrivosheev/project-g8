/* eslint-disable no-console */
import cn from 'classnames';
import Typography from 'Components/UI/Typography';
import FileIcon from 'Icons/File';
import Info from 'Icons/Info';
import TrashBox from 'Icons/TrashBox';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import getBlobFromFetchedString from 'Utilities/getBlobFromFetchedString';

export default function FileNative({ name, heading, caption, accept }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const isImage = (fileValue) => {
    if (!fileValue) return false;
    const type = typeof fileValue === 'string' ? fileValue : fileValue.type;
    return type.includes('image');
  };

  const inputHolderClasses = cn('file-field__input-holder', {
    'file-field__input-holder--filled': file,
  });

  const hasError = !!errors[name];

  const fileFieldClasses = cn('file-field', {
    'file-field--error': hasError,
  });

  useEffect(() => {
    const defaultFile = getValues(name);
    if (
      defaultFile &&
      typeof defaultFile === 'string' &&
      defaultFile.startsWith('http')
    ) {
      getBlobFromFetchedString(defaultFile).then((fetchedFile) => {
        if (fetchedFile) {
          setFile(fetchedFile);
          setValue(name, fetchedFile);
        }
      });
    } else if (defaultFile instanceof File) {
      setFile(defaultFile);
      setValue(name, defaultFile);
    }
  }, [name]);

  const handleFileChange = (event, onChange) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  const handleRemoveFile = (onChange) => {
    setFile(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={fileFieldClasses}>
      {heading && (
        <Typography
          className="file-field__heading"
          type="caption"
          color={hasError ? 'red' : 'gray'}
        >
          {heading}
        </Typography>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, name: fieldName } }) => (
          <div
            role="button"
            tabIndex={0}
            className={inputHolderClasses}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') &&
              fileInputRef.current?.click()
            }
          >
            {!file ? (
              <span className="file-field__plus-icon">+</span>
            ) : (
              <>
                <div className="file-field__preview">
                  {isImage(file) ? (
                    <img
                      src={
                        typeof file === 'string'
                          ? file
                          : URL.createObjectURL(file)
                      }
                      alt="Загруженное изображение"
                      className="file-field__preview-img"
                    />
                  ) : (
                    <div className="file-field__details">
                      <span className="file-field__icon">
                        <FileIcon />
                      </span>
                      <Typography
                        type="caption"
                        className="file-field__name"
                        color={errors[name] ? 'red' : 'gray'}
                      >
                        {typeof file === 'string'
                          ? file.split('/').pop()
                          : file.name}
                      </Typography>
                      <Typography
                        type="caption"
                        className="file-field__size"
                        color={errors[name] ? 'red' : 'gray'}
                      >
                        {typeof file === 'string'
                          ? ''
                          : `${(file.size / (1024 * 1024)).toFixed(1)} Мб`}
                      </Typography>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="file-field__delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(onChange);
                  }}
                >
                  <TrashBox />
                </button>
              </>
            )}
            <input
              ref={fileInputRef}
              className="file-field__input"
              id={`hidden-file-input-${fieldName}`}
              name={fieldName}
              type="file"
              accept={accept?.join(',')}
              onChange={(e) => handleFileChange(e, onChange)}
            />
          </div>
        )}
      />

      {caption && !hasError && (
        <Typography type="caption" color="gray" className="file-field__caption">
          {caption}
        </Typography>
      )}

      {hasError && (
        <div className="file-field__error-message">
          <Info />
          <Typography type="caption" color="red">
            {errors[name]?.message}
          </Typography>
        </div>
      )}
    </div>
  );
}
