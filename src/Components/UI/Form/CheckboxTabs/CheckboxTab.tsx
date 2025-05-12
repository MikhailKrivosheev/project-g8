import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { IOption } from 'Types';

interface IChechboxTab {
  option: IOption;
  isChecked: boolean;
  updateTabs: (arg1: string, arg2: boolean) => void;
}

export default function CheckboxTab({
  option,
  updateTabs,
  isChecked,
}: IChechboxTab) {
  const id = useRef(nanoid());

  return (
    <div>
      <input
        hidden
        id={id.current}
        onChange={({ target }) => {
          updateTabs(option?.value?.toString(), target?.checked);
        }}
        checked={isChecked}
        type="checkbox"
      />
      <label className="form__checkbox-tab" htmlFor={id.current}>
        {option?.label}
      </label>
    </div>
  );
}
