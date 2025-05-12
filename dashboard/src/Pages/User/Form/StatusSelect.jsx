import Select from 'Components/Form/Common/Select';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { UserContext } from 'Context/User';
import { DictionaryContext } from 'Context/Dictionaries';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box } from '@material-ui/core';

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

export default function CutomSelect({ name, label }) {
  const [options, setOptions] = useState([]);
  const { control, errors } = useFormContext();
  const [user] = useContext(UserContext);
  const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const defaultValue = useMemo(() => {
    if (dictionary && user) {
      const typeKey = Object.keys(dictionary.account_status).find(
        (key) => user.status === key
      );
      return {
        value: typeKey,
        label: dictionary.account_status[typeKey],
      };
    }

    return [];
  }, [dictionary]);

  useEffect(() => {
    if (dictionary) {
      setOptions(
        Object.entries(dictionary.account_status).map(
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
        render={({ field }) => {
          return (
            <Select
              name={field.name}
              defaultValue={defaultValue}
              disableClearable
              errors={errors}
              textFieldProps={{
                margin: 'dense',
              }}
              label={label}
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
            />
          );
        }}
      />
      <Tooltip
        className={classes.tooltipConteiner}
        title={
          <div style={{ fontSize: '14px' }} className={classes.tooltip}>
            Статусы: <br />
            <p>Активна ли учетная запись пользователи или нет</p>
          </div>
        }
        placement="right"
      >
        <IconButton aria-label="delete">
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
