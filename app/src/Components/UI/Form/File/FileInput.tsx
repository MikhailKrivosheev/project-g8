/* eslint-disable no-alert */
import classNames from 'classnames';
import useTranslate from 'Hooks/useTranslate';
import { nanoid } from 'nanoid';
import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: any) => void;
  name: string;
  text?: string;
  maxSize?: number; // в мегабайтах
}

function FileInput(
  {
    required,
    id,
    accept = '.jpg, .png, .webp',
    onChange,
    name,
    text,
    className,
    maxSize,
  }: IInput,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const translate = useTranslate();

  const watcher = watch(name);

  const validateFileSize = (file: File) => {
    if (!maxSize) return true;
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB <= maxSize;
  };

  const validateFileType = (file: File) => {
    if (!accept) return true;

    const allowedExtensions = accept
      .split(',')
      .map((ext) => ext.trim().toLowerCase());

    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

    return allowedExtensions.includes(fileExtension);
  };

  useEffect(() => {
    async function convertToBlob() {
      const file = await fetch(watcher).then((response) => response.blob());
      setValue(name, file);
    }
    if (watcher && typeof watcher === 'string') {
      convertToBlob();
    }
  }, [watcher]);

  const componentId = useRef(id || `form-field-${nanoid()}`);

  const wrapperClassName = classNames('file__wrapper', {
    'file__wrapper--error': errors[name],
  });

  const inputClassName = classNames('file', className, {
    'file--filled': watcher,
  });

  const fileUrl = useMemo(() => {
    if (typeof watcher === 'object' && watcher !== null)
      return URL.createObjectURL(watcher);
    return watcher;
  }, [watcher]);

  return (
    <div className={wrapperClassName}>
      <input
        ref={ref}
        accept={accept}
        id={componentId.current}
        // required={required}
        className={inputClassName}
        type="file"
        data-text={translate(text as string)}
        onChange={(event) => {
          const { files } = event.target;
          if (!files || files.length === 0) return;

          const selectedFile = files[0];

          if (!validateFileType(selectedFile)) {
            setValue(name, null);
            alert(
              translate(
                `Неподдерживаемый формат файла. Разрешенные форматы: ${accept}`
              )
            );
            return;
          }

          if (!validateFileSize(selectedFile)) {
            setValue(name, null);
            alert(
              translate(
                `Файл слишком большой. Максимальный размер: ${maxSize} МБ`
              )
            );
            return;
          }

          if (onChange) {
            onChange(selectedFile);
          }
        }}
        name={name}
      />
      {watcher && (
        <button
          type="button"
          className="file__remove"
          onClick={() => {
            setValue(name, null);
          }}
        >
          <img className="file__preview" src={fileUrl || ''} alt="file" />
          <span className="file__cross" />
        </button>
      )}
      {errors[name] && (
        <span className="form__error-text">{errors[name]?.message}</span>
      )}
    </div>
  );
}

export default forwardRef<HTMLInputElement, IInput>(FileInput);
