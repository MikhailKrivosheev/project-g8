import { DevTool } from '@hookform/devtools';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import Utilities from 'Utilities';
import ContestSelect from './ContestSelect';
import NomintaionSelect from './NominationSelect';
import NominationStageSelect from './NominationStageSelect';
import SeasonSelect from './SeasonSelect';

export default function Filter() {
  const [filterParameters, setFilterParameterts] =
    useRecoilState(workFilterAtom);
  const { id: currentYear } = useRecoilValue(seasonAtom);
  const navigate = useNavigate();
  const firstMount = useRef(true);
  const ROUTES = useRoutes();

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!firstMount.current) {
      navigate(
        `${ROUTES.works()}${Utilities.params.toString(filterParameters)}`,
        {
          replace: true,
        }
      );
      methods.reset({
        season_id: currentYear,
        ...filterParameters,
      });
    }
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
            setFilterParameterts(data)
          )}
        >
          <SeasonSelect />
          <ContestSelect />
          <NomintaionSelect />
          <NominationStageSelect />
          <DevTool control={methods.control} />
        </form>
      </FormProvider>
    </div>
  );
}
