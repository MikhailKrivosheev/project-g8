import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'Components/Form/Common/Select';
import { DictionaryContext } from 'Context/Dictionaries';
import { SeasonContext } from 'Context/Season';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: '12px',
    '& p': {
      margin: '10px 0 0',
    },
  },
  tooltipConteiner: {
    marginLeft: '10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function StageSelectField({ name, label, required, rules }) {
  const [options, setOptions] = useState([]);
  const { control, errors } = useFormContext();
  const [season] = useContext(SeasonContext);
  const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const defaultValue = useMemo(() => {
    if (dictionary && season) {
      const typeKey = Object.keys(dictionary.season_contest_stage_code).find(
        (key) => season.contest_stage_code === key
      );
      return {
        value: typeKey,
        label: dictionary.season_contest_stage_code[typeKey],
      };
    }

    return [];
  }, [dictionary]);

  const requiredOption = useMemo(() => {
    if (required) {
      return 'Обязательное поле';
    }
    return false;
  }, [required]);

  useEffect(() => {
    if (dictionary) {
      setOptions(
        Object.entries(dictionary.season_contest_stage_code).map(
          ([key, dictionaryLabel]) => ({
            value: key,
            label: dictionaryLabel,
          })
        )
      );
    }
  }, [dictionary]);

  return (
    <Box className={classes.container}>
      <Controller
        control={control}
        name={name}
        rules={{ ...rules, required: requiredOption }}
        render={({ field }) => {
          return (
            <Select
              name={field.name}
              defaultValue={defaultValue}
              required={required}
              disableClearable
              errors={errors}
              textFieldProps={{
                margin: 'dense',
              }}
              label={!field.value ? label : ''}
              fullWidth
              inputRef={field?.ref}
              getOptionLabel={(option) => option.label}
              getOptionSelected={
                (option, value) => option.value === value.value
                // eslint-disable-next-line react/jsx-curly-newline
              }
              options={options}
              onChange={(value) => {
                field.onChange(value.value);
              }}
              inputLabelProps={{
                shrink: false,
              }}
            />
          );
        }}
      />
    </Box>
  );
}
