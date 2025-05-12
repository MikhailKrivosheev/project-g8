import React, { useContext, useMemo, useRef } from 'react';
import Select from 'Components/Form/Select';
import { CostContext } from 'Context/Cost';

const OPTIONS = [
  { value: 'buy_ticket', label: 'Купить билет' },
  { value: 'submit_job', label: 'Подать работу' },
];

export default function StatusSelect({ name, label }) {
  const [cost] = useContext(CostContext);

  const defaultValue = useMemo(() => {
    const option = OPTIONS.find(({ value }) => value === cost?.type);
    return option;
  }, []);

  const generateOptions = () => {
    if (cost?.type !== 'buy_ticket') {
      return OPTIONS;
    }
    return OPTIONS;
  };

  const options = useRef(generateOptions());
  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      label={label}
      options={options.current}
    />
  );
}
