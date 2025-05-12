import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import DeleteButton from '../DeleteButton';

export default function RadioButton({
  id,
  name,
  value,
  onChange,
  data,
  setActiveNominations,
  label,
}) {
  const { watch } = useFormContext();
  const watcher = watch(name);
  const count = useMemo(() => {
    return data.filter(
      ({ contest_id: contestId }) => value?.toString() === contestId?.toString()
    ).length;
  }, [data]);

  return (
    <label className="contests-radio__button">
      <input
        className="contests-radio__input"
        type="radio"
        checked={watcher?.toString() === value?.toString()}
        onChange={onChange}
        id={id}
        name={name}
        value={value}
      />
      <span className="contests-radio__checkmark">
        {label}
        {Boolean(count) && (
          <>
            <span className="contests-readio__count">{count}</span>
            <DeleteButton
              onClick={() => {
                setActiveNominations((prev) => {
                  return prev.filter(
                    ({ contest_id }) =>
                      value?.toString() !== contest_id?.toString()
                  );
                });
              }}
            />
          </>
        )}
      </span>
    </label>
  );
}
