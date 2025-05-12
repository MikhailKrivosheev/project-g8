import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';

export default function YearSelect({ name, label, isRegistrationSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchSeasons = async (value) => {
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
        count: 0,
      });

      const optionsToSet = results.map((season) => ({
        value: isRegistrationSelect ? season.year : season.id,
        label: season.year,
      }));

      setOptions(optionsToSet);
    };

    fetchSeasons();
  }, []);

  if (options.length <= 0) return null;

  return <Select name={name} label={label} options={options} />;
}
