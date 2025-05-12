import Select from 'Components/Form/Common/Select';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { WorkContext } from 'Context/Work';
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
  const [work] = useContext(WorkContext);
  const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const defaultValue = useMemo(() => {
    if (dictionary && work) {
      const typeKey = Object.keys(dictionary.work_status).find(
        (key) => work.status === key
      );
      return {
        value: typeKey,
        label: dictionary.work_status[typeKey],
      };
    }

    return [];
  }, [dictionary, work]);

  useEffect(() => {
    if (dictionary) {
      setOptions(
        Object.entries(dictionary.work_status).map(
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
            {/* <p>
              <b>Создано</b> - конкурс создан в админ панели, но не анонсирован
            </p>
            <br />
            <p>
              <b>Не пропусти!</b> - конкурс анонсирован, подавать работы нельзя
            </p>
            <br />
            <p>
              <b>Началось</b> - можно подавать работы, можно ставить лайки и
              голосовать
            </p>
            <br />
            <p>
              <b>Завершено</b> - нельзя подавать работы и голосовать, можно
              ставить лайки
            </p> */}
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
