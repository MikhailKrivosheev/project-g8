import Select from 'Components/UI/Form/Select';
import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import useTranslate from 'Hooks/useTranslate';

export default function StatusSelect() {
  const { work_status } = useRecoilValue(dictionaryAtom);
  const translate = useTranslate();
  const options = useRef(
    Object.entries(work_status).map(([first, second]) => ({
      value: first,
      label: second,
    }))
  );
  const setFilterParameterts = useSetRecoilState(workFilterAtom);

  return (
    <Select
      name="status"
      placeholder={translate('Все этапы')}
      withEmptyOption
      isGray
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          status: value,
        }));
      }}
      options={options.current}
    />
  );
}
