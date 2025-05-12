import Description from 'Components/UI/Description';
import { nanoid } from 'nanoid';
import React, { HTMLProps, useRef } from 'react';
import { IControllerField, IOption } from 'Types';

interface IRadioButtons extends HTMLProps<HTMLButtonElement> {
  option: IOption;
  field: IControllerField;
}

export default function RadioButton({
  option,
  field,
  onChange,
}: IRadioButtons) {
  const id = useRef(nanoid());

  return (
    <label className="radio-button">
      <input
        className="radio-button__input"
        type="radio"
        checked={option.value?.toString() === field?.value?.toString()}
        onChange={(value: React.ChangeEvent) => {
          if (onChange) onChange(value.target.value);
          field?.onChange(value);
        }}
        id={id.current}
        name={field.name}
        value={option.value}
      />
      <span className="radio-button__checkmark">
        <Description className="radio-button__text">{option.label}</Description>
      </span>
    </label>
  );
}
