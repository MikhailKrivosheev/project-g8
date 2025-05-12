import { DevTool } from '@hookform/devtools';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import juryFilterAtom from 'Recoil/Atoms/JuryFilter';
import Utilities from 'Utilities';
import ContestSelect from './ContestSelect';
import JudgeTypeSelect from './JudgeTypeSelect';

export default function JuryFilter() {
  const filterParameters = useRecoilValue(juryFilterAtom);
  const [searchParams] = useSearchParams();

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: Object.fromEntries(searchParams),
  });

  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      navigate(
        `${ROUTES.jury()}${Utilities.params.toString(filterParameters)}`,
        {
          replace: true,
        }
      );
    }
  }, [filterParameters]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <form className="form works-page__form">
        <JudgeTypeSelect />
        {filterParameters.judge_type === 'greateight' && <ContestSelect />}
        <DevTool control={methods.control} />
      </form>
    </FormProvider>
  );
}
