import React, { useContext, useMemo, useRef } from 'react';
import Select from 'Components/Form/Select';
import { SponsorTypeContext } from 'Context/SponsorType';

const OPTIONS = [
  { value: 'high', label: 'Большой' },
  { value: 'short', label: 'Маленький' },
];

export default function StatusSelect({ name, label }) {
  const [sponsorType] = useContext(SponsorTypeContext);

  const defaultValue = useMemo(() => {
    const option = OPTIONS.find(
      ({ value }) => value === sponsorType?.block_type
    );
    return option;
  }, []);

  const generateOptions = () => {
    if (sponsorType?.block_type !== 'short') {
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
