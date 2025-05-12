import Typography from 'Components/UI/Typography';
import { Controller, useFormContext } from 'react-hook-form';

export default function ToggleCheckbox({ name, heading, caption }) {
  const { control } = useFormContext();

  return (
    <div className="toggle-checkbox">
      <div className="toggle-checkbox__description">
        {heading && <Typography type="body">{heading}</Typography>}
        {caption && (
          <Typography type="caption" color="gray">
            {caption}
          </Typography>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <label>
            <input
              type="checkbox"
              checked={field.value}
              onChange={() => {
                field.onChange(!field.value);
              }}
            />
            <span className="toggle-checkbox__slider" />
          </label>
        )}
      />
    </div>
  );
}
