import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function PageTabs({ name, options, children, errorName }) {
  const [value, setValue] = useState(0);
  const {
    formState: { errors },
  } = useFormContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Child = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      value,
    });
  });

  return (
    <>
      <Grid container>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
        >
          {Object.entries(options).map(([key, label], index) => {
            return <Tab label={label} key={key} {...a11yProps(index)} />;
          })}
        </Tabs>

        {Child}
      </Grid>

      {Object.entries(options).map(([key, label], index) => (
        <ErrorMessage
          error={errors}
          name={errorName?.(name, index) || `${name}.${index}`}
          key={key}
          render={() => (
            <p style={{ color: 'red', display: 'block' }}>
              Поле {label} не заполнено
            </p>
          )}
        />
      ))}
    </>
  );
}
