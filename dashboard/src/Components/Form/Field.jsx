import cn from 'classnames';
import Typography from 'Components/UI/Typography';
import Info from 'Icons/Info';
import { useFormContext } from 'react-hook-form';

export default function FormField({
  fieldLabel,
  children,
  labelClassName,
  fieldClassName,
  required = false,
  isWithErrorMessage = true,
  name,
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = Array.isArray(name)
    ? name.some((field) => errors[field])
    : !!errors[name];

  const errorMessage = Array.isArray(name)
    ? name.map((field) => errors[field]?.message).find(Boolean)
    : errors[name]?.message;

  const labelClasses = cn('form-field__label', labelClassName);
  const fieldClasses = cn('form-field', fieldClassName, {
    'form-field--error': hasError,
  });

  return (
    <div className={fieldClasses}>
      {fieldLabel && (
        <label className={labelClasses}>
          <Typography type="body" color="gray">
            {fieldLabel}
            {required && '*'}
          </Typography>
        </label>
      )}

      <div className="form-field__item">
        {children}
        {hasError && isWithErrorMessage && (
          <div className="form-field__error-block">
            <Info />
            <Typography type="caption" color="red">
              {errorMessage}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
