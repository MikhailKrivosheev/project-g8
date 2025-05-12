import Api from 'Api';
import Button from 'Components/UI/Button';
import Title from 'Components/UI/Title';
import React, { useEffect, useState } from 'react';
import useRoutes from 'Hooks/useRoutes';
import { FormProvider, useForm } from 'react-hook-form';
import Field from 'Components/UI/Form/Field';
import Select from 'Components/UI/Form/Select';
import Popup from 'Components/Popup';
import useAPIError from 'Hooks/useAPIError';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import workFormAtom from 'Recoil/Atoms/WorkForm';
import LangAtom from 'Recoil/Atoms/Lang';
import seasonAtom from 'Recoil/Atoms/Season';
import activeContestAtom from 'Recoil/Atoms/ActiveContest';
import useTranslate from 'Hooks/useTranslate';
import userAtom from 'Recoil/Atoms/User';

export default function SubmissionWorkPopup() {
  const ROUTES = useRoutes();
  const setActiveContest = useSetRecoilState(activeContestAtom);
  const season = useRecoilValue(seasonAtom);
  const lang = useRecoilValue(LangAtom);
  const [formValue, setFormValue] = useRecoilState(workFormAtom);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(true);
  const [options, setOptions] = useState(null);
  const { handleAPIError } = useAPIError();
  const translate = useTranslate();
  const user = useRecoilValue(userAtom);

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: formValue,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await Api.get(Api.routes.api.contests(), {
          season_id: season?.id,
        });
        setOptions(
          response?.results?.map(({ name, id }: any) => ({
            value: id,
            label: name,
          }))
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchOptions();
  }, []);

  if (!options) return null;

  function onSubmit(values: object) {
    setFormValue((prev) => ({ ...prev, ...values }));
    if (values?.contests) {
      setActiveContest(
        options?.find(
          ({ value }: any) => value.toString() === values?.contests.toString()
        )
      );
    }

    if (user?.logged) {
      navigate(ROUTES.workCreate());
    } else {
      navigate(ROUTES.signUp());
    }
  }

  return (
    <Popup className="auth-popup" state={[isModalOpen, setModalOpen]}>
      <Title sizeName="semi-m">Подать работу</Title>
      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Field
            name={`name_${lang}`}
            placeholder={translate('Название работы')}
          />
          <Select
            name="contests"
            placeholder={translate('Категория работы')}
            options={options}
          />
          <Button
            color="white"
            arrowColor="black"
            fullWidth
            icon="star"
            className="auth-popup__button"
            type="submit"
          >
            Подать работу
          </Button>
        </form>
        {/* <DevTool /> */}
      </FormProvider>
    </Popup>
  );
}
