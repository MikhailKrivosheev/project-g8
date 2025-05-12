import React, { useEffect, useState, useMemo, useContext } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function PlaceSelect({ name, label, filter }) {
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
      const { results } = await Api.get(Api.routes.places(), {
        name_ru: value,
        count: 0,
      });
      if (filter[name]) {
        const defaultPlace = results.find(({ id }) => id === +filter[name]);
        setDefaultValue({
          value: defaultPlace.id,
          label: defaultPlace.name_ru,
        });
      }
      setOptions(
        results.map((place) => ({
          value: place.id,
          label: place.name_ru,
          ...place,
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
