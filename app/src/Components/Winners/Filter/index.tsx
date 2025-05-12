import { DevTool } from '@hookform/devtools';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import { IOption } from 'Types';
import Utilities from 'Utilities';
import ContestSelect from './ContestSelect';
import SeasonSelect from './SeasonSelect';

export default function Filter({
  first,
  options,
}: {
  first: number;
  options: IOption[];
}) {
  const [filterParameters, setFilterParameterts] =
    useRecoilState(workFilterAtom);
  const navigate = useNavigate();
  const firstMount = useRef(true);
  const ROUTES = useRoutes();

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    navigate(`${ROUTES.home()}${Utilities.params.toString(filterParameters)}`, {
      replace: true,
    });
    methods.reset({
      season_id: first,
      ...filterParameters,
    });
  }, [filterParameters]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <div className="works-page__filter">
      <FormProvider {...methods}>
        <form
          className="form works-page__form"
          onSubmit={methods.handleSubmit((data: any) =>
            // Participants who reached the winners stage have the grand_prix value.
            // Participants who reached the grand_prix stage have the is_winner value.
            setFilterParameterts({ ...data, nomination_stage: 'grand_prix' })
          )}
        >
          <SeasonSelect options={options} />
          <ContestSelect />
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </div>
  );
}
