import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Api from 'Api';
import { AsyncPaginate } from 'react-select-async-paginate';
import DropDownArrow from '../DropDownArrow';

export default function AsyncSelect({
  selectName,
  label,
  currentSeason,
  currentContest,
  currentNomination,
  onChangeSelect,
}) {
  const { control } = useFormContext();
  const [season, setSeason] = useState(null);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    setSeason(currentSeason);
  }, [currentSeason]);

  useEffect(() => {
    setContest(currentContest);
  }, [currentContest]);

  const loadOptions = async (search, loadedOptions, { page }) => {
    const response = await Api.get(Api.routes.nominations(), {
      season_id: season,
      contest_id: contest,
      page,
      name_ru: search,
    });

    const fetchOptions = response?.results?.map(({ name, id }) => ({
      value: id,
      label: name,
    }));

    const hasMorePages = response?.meta?.has_more_pages;

    return {
      options: fetchOptions,
      hasMore: hasMorePages,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <Controller
      control={control}
      name={selectName}
      render={({ field }) => {
        return (
          <AsyncPaginate
            unstyled
            key={JSON.stringify(contest + season)}
            isClearable
            value={currentNomination || ''}
            loadOptions={loadOptions}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            components={{ DropdownIndicator: () => <DropDownArrow /> }}
            onChange={(option) => {
              field.onChange(option?.value);
              onChangeSelect(option);
            }}
            placeholder={label}
            className="async-filter"
            classNamePrefix="async-filter"
            additional={{ page: 1 }}
          />
        );
      }}
    />
  );
}
