import Typography from 'Components/UI/Typography';
import ArrowRight from 'Icons/ArrowRight';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const getPlug = (language) => {
  return language === 'ru'
    ? 'Впишите текст бегущей строки (ru)'
    : 'Enter the text of the running line (en)';
};

export default function RunningLine({ name, variant = 'ru' }) {
  const { control, getValues } = useFormContext();
  const [value, setValue] = useState('');
  const spanRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const defaultValue = getValues(name) || '';
    setValue(defaultValue);
  }, [name]);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const newWidth = spanRef.current.offsetWidth + 2;
      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [value]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState }) => (
        <div className="running-line">
          <Typography
            type="body"
            size="big"
            color="gray"
            className="running-line__text running-line__text--left"
          >
            {value.length > 0 ? value : getPlug(variant)}
          </Typography>
          <div className="running-line__arrows-block">
            <ArrowRight />
            <ArrowRight />
          </div>
          <div className="running-line__input-wrapper">
            <input
              ref={inputRef}
              value={value}
              className="running-line__input"
              id={`hidden-file-input-${name}`}
              placeholder={getPlug(variant)}
              name={name}
              type="text"
              onChange={(e) => {
                const newValue = e?.target?.value;
                onChange(newValue);
                setValue(newValue);
              }}
            />
          </div>

          <div className="running-line__arrows-block">
            <ArrowRight />
            <ArrowRight />
          </div>
          <Typography
            type="body"
            size="big"
            color="gray"
            className="running-line__text running-line__text--right"
          >
            {value.length > 0 ? value : getPlug(variant)}
          </Typography>

          <span ref={spanRef} className="running-line__hidden-span">
            {value || 'Впишите текст бегущей строки (ru)'}
          </span>
        </div>
      )}
    />
  );
}
