import cn from 'classnames';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const OPTIONS = [
  { label: 'Creative Industries', value: 'creative_industries' },
  { label: 'Creative Advertising', value: 'creative_advertising' },
];

export default function ContestTypeRadio({ defaultValue }) {
  const { register, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || OPTIONS[0]?.value || ''
  );
  const getOptionClasses = (value) => {
    const isActive = selectedValue === value;

    return cn('contest-form__type-option', {
      'contest-form__type-option--industries': value === 'creative_industries',
      'contest-form__type-option--advertising':
        value === 'creative_advertising',
      'contest-form__type-option--selected': isActive,
      'contest-form__type-option--not-selected': !isActive,
    });
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    setValue('type', newValue);
  };

  return (
    <div className="contest-form__type-toggle">
      {OPTIONS.map((option) => (
        <div key={option.value} className={getOptionClasses(option.value)}>
          <input
            type="radio"
            hidden
            id={option.value}
            {...register('type')}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
          <label
            htmlFor={option.value}
            className="contest-form__radio-option-label"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
