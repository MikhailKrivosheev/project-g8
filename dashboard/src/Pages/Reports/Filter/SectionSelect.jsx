import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function SectionSelect({ name, label, filter }) {
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
      const { results } = await Api.get(Api.routes.sections(), {
        name_ru: value,
        count: 0,
      });
      if (filter[name]) {
        const defaultSection = results.find(({ id }) => id === +filter[name]);
        setDefaultValue({
          value: defaultSection.id,
          label: defaultSection.name_ru,
        });
      }
      setOptions(
        results.map((section) => ({
          value: section.id,
          label: section.name_ru,
          ...section,
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
