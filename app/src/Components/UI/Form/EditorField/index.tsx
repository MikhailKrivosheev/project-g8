import cn from 'classnames';
import React, { useMemo } from 'react';
import { Controller, useFormContext, FieldError } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useTranslate from 'Hooks/useTranslate';

interface IEditor extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  rules?: object;
  name: string;
  fullWidth?: boolean;
  maxLength?: number;
  shouldUnregister?: boolean;
  label?: string;
  value?: string;
  error?: FieldError | undefined;
}

export default function EditorField({
  name,
  rules,
  maxLength = 0,
  required,
  label,
  fullWidth = false,
  shouldUnregister = true,
}: IEditor) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const watcher = watch(name);
  const translate = useTranslate();

  const rowClassName = cn('form__row', 'form__gray-row', {
    'form__gray-row--full-width': fullWidth,
  });

  const valueLength = useMemo(() => {
    return watcher.replace(/(<([^>]+)>)/gi, '')?.length;
  }, [watcher]);

  return (
    <div className={rowClassName}>
      <div className="gray-input__label">
        {`${translate(label as string) || label}${required ? '*' : ''}`}
      </div>

      {maxLength && name && (
        <span className="gray-input__count">
          {valueLength} / {maxLength}
        </span>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Обязательное поле' : false,
          validate: (value) => {
            const valueWithoutTags = value.replace(/(<([^>]+)>)/gi, '');
            return valueWithoutTags.length > maxLength
              ? 'Превышено максимальное количество символов'
              : true;
          },
          ...rules,
        }}
        shouldUnregister={shouldUnregister}
        render={({ field, fieldState }) => (
          <ReactQuill
            className="editor-input"
            theme="snow"
            value={field.value}
            {...fieldState}
            onChange={(values) => {
              if (values === '<p><br></p>') field.onChange('');
              else {
                field.onChange(values);
              }
            }}
            modules={{
              toolbar: {
                container: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link'],
                  ['clean'],
                ],
              },
              clipboard: { matchVisual: false },
            }}
          />
        )}
      />
      {errors[name] && (
        <span className="form__error-text">{errors[name]?.message}</span>
      )}
    </div>
  );
}
