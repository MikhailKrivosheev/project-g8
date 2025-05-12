import AsyncSelect from 'Components/Form/SelectAsync';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { UserContext } from 'Context/User';
import { DictionaryContext } from 'Context/Dictionaries';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Box } from '@material-ui/core';

const REQUIRED_MESSAGE = 'Required field';

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

export default function CutomSelect({ name, label, required }) {
  const [options, setOptions] = useState([]);
  const { control, errors } = useFormContext();
  const [user] = useContext(UserContext);
  const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const defaultValue = useMemo(() => {
    if (dictionary && user) {
      return Object.keys(dictionary.account_role)
        .filter((key) =>
          user.roles.some(({ name: roleName }) => roleName === key)
        )
        .map((value) => ({
          value,
          label: dictionary.account_role[value],
        }));
    }

    return [];
  }, [dictionary]);

  const fetchTerms = async () => {
    setOptions(
      Object.entries(dictionary.account_role).map(([key, dictionaryLabel]) => ({
        value: key,
        label: dictionaryLabel,
      }))
    );
  };

  return (
    <Box className={classes.container}>
      <AsyncSelect
        name={name}
        multiple
        label={label}
        defaultValue={defaultValue}
        options={options}
        asyncCallback={fetchTerms}
        required={required}
      />
      <Tooltip
        className={classes.tooltipConteiner}
        title={
          <div style={{ fontSize: '14px' }} className={classes.tooltip}>
            Роли: <br />
            <p>От роли пользователя зависят доступы и функционал на сайте</p>
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
