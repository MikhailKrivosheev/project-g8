import classNames from 'classnames';
import Button from 'Components/UI/Button';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DeleteButton from './DeleteButton';

// interface INominationTab {
//   setActiveNominations: () => void;
//   activeNominations:
// }

export default function NominationTab({
  setActiveNominations,
  activeNominations,
  data,
}: any) {
  const firstMount = useRef(true);
  const { clearErrors } = useFormContext();
  const [isActiveState, setActiveState] = useState(
    activeNominations.some((nomination: any) => nomination?.id === data?.id)
  );
  const buttonClassNames = classNames('work-create__nomination-button', {
    'work-create__nomination-button--active': isActiveState,
  });

  useEffect(() => {
    if (!firstMount.current) {
      clearErrors('nomination_ids');
      setActiveState(
        activeNominations.some((nomination: any) => nomination?.id === data?.id)
      );
    }
  }, [activeNominations]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <Button
      className={buttonClassNames}
      onClick={() => {
        setActiveState((prev: any) => !prev);
        setActiveNominations((nominations: any) => {
          if (isActiveState) {
            return nominations.filter(
              (nomination: any) => nomination?.id !== data?.id
            );
          }
          return [...nominations, data];
        });
      }}
      color="gray"
    >
      {data?.name}
      {isActiveState && <DeleteButton />}
    </Button>
  );
}
