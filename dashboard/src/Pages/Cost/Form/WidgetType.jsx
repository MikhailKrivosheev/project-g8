import { DictionaryContext } from 'Context/Dictionaries';
import React, { useContext, useMemo } from 'react';
import Select from 'Components/Form/Select';
import { CostContext } from 'Context/Cost';

export default function WidgetType({ name, label }) {
  const { cost_widget_type: options } = useContext(DictionaryContext);
  const [cost] = useContext(CostContext);

  const memoizedOptions = useMemo(() => {
    const returningOptions = Object.entries(options).map(([value, key]) => ({
      label: key,
      value,
    }));
    return returningOptions;
  }, []);

  const defaultValue = useMemo(() => {
    const option = memoizedOptions.find(
      ({ value }) => value === cost?.widget_type
    );
    return option;
  }, []);

  return (
    <Select
      name={name}
      label={label}
      options={memoizedOptions}
      defaultValue={defaultValue}
    />
  );
}
