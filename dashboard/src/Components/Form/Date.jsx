import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Utilities from 'Utilities';

const REQUIRED_MESSAGE = 'Поле обязательно для заполнения';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, 'LLLL', { locale: this.locale });
  }
}

export default function DateComponent({ name, label, required }) {
  const classes = useStyles();
  const { control, setValue } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });

  const requiredOption = useMemo(() => {
    if (required) {
      if (typeof required === 'string') return required;
      return REQUIRED_MESSAGE;
    }
    return false;
  }, [required]);

  return (
    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredOption }}
        render={({ field, fieldState: { invalid, error } }) => (
          <KeyboardDatePicker
            required={required}
            error={invalid}
            helperText={error?.message}
            margin="dense"
            name={name}
            className={classes.root}
            variant="inline"
            label={label}
            value={field.value ? new Date(field.value) : null}
            invalidDateMessage="Неверный формат даты"
            format="yyyy-MM-d"
            keyboard="true"
            InputProps={{
              endAdornment: watcher[name] && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation();
                      setValue(name, null);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(date) => {
              field.onChange(
                Utilities.date.parseToDate(date, {
                  formatString: 'yyyy-MM-dd',
                })
              );
            }}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
}
