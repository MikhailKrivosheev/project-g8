import useResize from 'Hooks/useResize';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

export default function FieldArray({
  component: Component,
  componentProps,
  maxCount = 10,
  name,
  required,
  requiredItems,
}) {
  const { isDesktop } = useResize();
  const { current: startCount } = useRef(isDesktop ? 3 : 4);
  const firstMount = useRef(true);
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const watchers = watch(fields?.map((_, index) => `${name}.${index}.image`));

  const emptyFields = useMemo(() => {
    return Object.values(watchers).reduce((acc, item) => {
      if (!item) return acc + 1;
      return acc;
    }, 0);
  }, [watchers]);

  useEffect(() => {
    if (emptyFields <= 0 && watchers?.length < maxCount) append({ image: '' });
  }, [watchers]);

  const callback = useCallback(
    (id: number) => {
      if (emptyFields > 1 && watchers?.length > startCount) remove(id);
    },
    [watchers]
  );

  const isRequired = (index: number) => {
    if (required && !requiredItems) {
      return 'Обязательное поле';
    }
    if (requiredItems && !required) {
      return false;
    }
    if (required && requiredItems && index < requiredItems) {
      return 'Обязательное поле';
    }
    return false;
  };

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <>
      {fields.map((item, index) => (
        <Fragment key={item.id}>
          <Controller
            control={control}
            name={`${name}.${index}.image`}
            rules={{ required: isRequired(index) }}
            render={({ field, fieldState }) => (
              <Component
                callback={callback}
                indexToRemove={index}
                name={`${name}.${index}.image`}
                error={fieldState.error}
                {...componentProps}
                required={isRequired(index)}
              />
            )}
          />
        </Fragment>
      ))}
    </>
  );
}
