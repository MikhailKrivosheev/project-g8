import ClearIcon from '@material-ui/icons/Clear';
import cn from 'classnames';
import Input from 'react-currency-input-field';
import { Controller, useFormContext } from 'react-hook-form';

export default function CurrencyInput({
  name,
  label,
  required,
  className,
  currencySuffix,
  groupSeparator,
}) {
  const { control, setValue } = useFormContext();

  const classes = cn('currency-input__holder', className);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'Обязательное поле' : false }}
      render={({ field }) => (
        <div className={classes}>
          <Input
            value={field.value}
            name={name}
            placeholder={label}
            decimalsLimit={2}
            onValueChange={field.onChange}
            groupSeparator={groupSeparator}
            suffix={currencySuffix}
          />
          {field.value && (
            <button
              type="button"
              aria-label="Очистить поле"
              onClick={() => setValue(name, '')}
              className="clear-button"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      )}
    />
  );
}
