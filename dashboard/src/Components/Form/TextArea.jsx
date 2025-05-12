import { TextareaAutosize } from '@material-ui/core';
import cn from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

export default function TextArea({ name, placeHolder, className }) {
  const { control } = useFormContext();

  const textAreaClasses = cn('mui-textarea', className);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mui-textarea__holder">
          <TextareaAutosize
            {...field}
            minRows={3}
            className={textAreaClasses}
            placeholder={placeHolder}
          />
        </div>
      )}
    />
  );
}
