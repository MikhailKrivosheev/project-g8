import React, { useEffect, useState, useMemo, useContext } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function DistrictSelect({ name, label, filter }) {
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const { contestId } = useParams();
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
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
      });
      if (filter[name]) {
        const defaultSeason = results.find(({ id }) => id === filter[name]);
        setDefaultValue({
          value: defaultSeason.id,
          label: defaultSeason.year,
        });
      }
      setOptions(
        results.map((season) => ({
          value: season.id,
          label: season.year,
          ...season,
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
