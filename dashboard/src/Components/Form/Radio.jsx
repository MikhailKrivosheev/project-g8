import cn from 'classnames';
import Typography from 'Components/UI/Typography';
import Info from 'Icons/Info';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const OptionCaption = ({ options, selectedValue, icon: Icon }) => {
  const selectedOption = options?.find(({ value }) => value === selectedValue);

  if (!selectedOption) return null;

  return selectedOption.caption ? (
    <div className="radio-button__option-caption">
      <Icon />
      <Typography type="caption" size="large" color="gray">
        {selectedOption.caption}
      </Typography>
    </div>
  ) : null;
};

export default function Radio({
  options = [],
  defaultValue = '',
  holderClassName,
  optionLabelClassName,
  isCaptions,
  captionIcon = Info,
  name,
  isActiveSeasonExists,
}) {
  const { register, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState(
    String(defaultValue) || options[0]?.value || ''
  );

  const getOptionClasses = (value) => {
    const isActive = selectedValue === String(value);

    return cn('radio-button__option', {
      'radio-button__option--selected': isActive,
    });
  };

  const holderClasses = cn('radio-button', holderClassName);
  const optionLabelClasses = cn(
    'radio-button__option-label',
    optionLabelClassName
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    setValue(name, newValue);
  };

  return (
    <div className={holderClasses}>
      <div className="radio-button__toggle">
        {options.map((option) => (
          <div key={option.value} className={getOptionClasses(option.value)}>
            <input
              type="radio"
              hidden
              id={option.value}
              {...register(name)}
              value={option.value}
              checked={selectedValue === String(option.value)}
              onChange={handleChange}
              disabled={
                isActiveSeasonExists &&
                option.value === 'active' &&
                defaultValue !== 'active'
              }
            />
            <label htmlFor={option.value} className={optionLabelClasses}>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {isCaptions && (
        <OptionCaption
          options={options}
          selectedValue={selectedValue}
          icon={captionIcon}
        />
      )}
    </div>
  );
}
