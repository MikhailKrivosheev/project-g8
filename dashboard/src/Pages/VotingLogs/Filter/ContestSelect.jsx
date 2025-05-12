import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function ContestSelect({ name, label, filter }) {
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const { control } = useFormContext();
  const fieldWatcher = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!fieldWatcher) setDefaultValue({});
  }, [fieldWatcher]);

  useEffect(() => {
    const fetchCategories = async (value) => {
      const { results } = await Api.get(Api.routes.contests(), {
        contest_id: value,
        count: 0,
      });
      if (filter[name]) {
        const defaultNomination = results.find(
          ({ id }) => id === +filter[name]
        );
        setDefaultValue({
          value: defaultNomination.contest_id,
          label: defaultNomination.name_ru,
        });
      }
      setOptions(
        results.map((contest) => ({
          value: contest.id,
          label: contest.name_ru,
          ...contest,
        }))
      );
    };
    fetchCategories();
  }, []);
  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      label={label}
      options={options}
    />
  );
}
