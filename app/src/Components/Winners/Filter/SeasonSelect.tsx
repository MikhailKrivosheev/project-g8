import Select from 'Components/UI/Form/Select';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import { IOption } from 'Types';

export default function SeasonSelect({ options }: { options: IOption[] }) {
  const setFilterParameterts = useSetRecoilState(workFilterAtom);
  const { reset, watch } = useFormContext();
  const seasonWatcher = watch('season_id');

  if (!seasonWatcher) return null;

  return (
    <Select
      name="season_id"
      onChange={(value) => {
        reset({ season_id: value });
        setFilterParameterts({
          season_id: value,
          nomination_stage: 'grand_prix',
        });
      }}
      isGray
      options={options}
    />
  );
}
