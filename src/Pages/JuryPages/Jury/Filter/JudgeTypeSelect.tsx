import Select from 'Components/UI/Form/Select';
import React, { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import juryFilterAtom from 'Recoil/Atoms/JuryFilter';
import useTranslate from 'Hooks/useTranslate';

export default function JudgeTypeSelect() {
  const dictionary = useRecoilValue(dictionaryAtom);
  const setFilterParameterts = useSetRecoilState(juryFilterAtom);
  const translate = useTranslate();

  const { current: options } = useRef(
    Object.entries(dictionary?.judge_type || {}).map(([first, second]) => ({
      value: first,
      label: second,
    }))
  );

  return (
    <Select
      name="judge_type"
      placeholder={translate('Все жюри')}
      isGray
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          judge_type: value,
        }));
      }}
      withEmptyOption
      options={options}
    />
  );
}
