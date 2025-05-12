import classNames from 'classnames';
import Description from 'Components/UI/Description';
import File from 'Components/UI/Form/File';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface IFileWrapper {
  description?: string;
  title?: string;
  name: string;
  sizeName?: 's' | 'm' | 'l';
  className?: string;
  // eslint-disable-next-line no-unused-vars
  callback?: any;
  indexToRemove?: number;
  required?: boolean;
  maxSize?: number;
}

export default function FileWrapper({
  description,
  title,
  name,
  sizeName,
  callback,
  className,
  indexToRemove,
  required,
  error,
  maxSize,
}: IFileWrapper) {
  const { watch } = useFormContext();
  const watcher = watch(name);
  const firstMount = useRef(true);
  const translate = useTranslate();

  useEffect(() => {
    if (indexToRemove || indexToRemove === 0) {
      if (!firstMount.current && !watcher) {
        callback(indexToRemove);
      }
    }
  }, [watcher]);

  const fileWrapperClassNames = classNames(
    'work-create__file-wrapper',
    className,
    {
      [`work-create__file-wrapper--${sizeName}`]: sizeName,
    }
  );

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return title || description ? (
    <div className="work-create__file-wrapper--with-intro">
      {title && <Title sizeName="s">{`${title}${required ? '*' : ''}`}</Title>}
      {description && (
        <Description
          sizeName="s"
          color="gray"
          dangerHTML={`${description}${required ? '*' : ''}`}
        />
      )}
      <div className={fileWrapperClassNames}>
        <File
          className="work-create__file"
          name={name}
          required={required}
          text={translate('Перетащите файл сюда или добавьте')}
          maxSize={maxSize}
        />
      </div>
    </div>
  ) : (
    <div className={fileWrapperClassNames}>
      <File
        className="work-create__file"
        name={name}
        required={required}
        text={translate('Перетащите файл сюда или добавьте')}
        maxSize={maxSize}
      />
      {error && <span className="form__error-text">{error?.message}</span>}
    </div>
  );
}
