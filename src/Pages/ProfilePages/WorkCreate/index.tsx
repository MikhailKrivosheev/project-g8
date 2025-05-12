import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import { IContest } from 'Components/Contests/ContestCard';
import Sponsor from 'Components/Contests/Sponsor';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import ModalComponent from 'Components/UI/Modal';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import activeContestAtom from 'Recoil/Atoms/ActiveContest';
import activeContestRulesAtom from 'Recoil/Atoms/ActiveContestRules';
import ContestsAtom from 'Recoil/Atoms/ContestsAtom';
import seasonAtom from 'Recoil/Atoms/Season';
import workFormAtom from 'Recoil/Atoms/WorkForm';
import AccountBackground from '../Background';
import Contests from './Contests';
import WorkCreateFiles from './Files';
import setDefaultValues from './helper';
import TextFields from './TextFields';

interface IWorkForm {
  name_ru: string;
  name_en: string;
  contests: string;
  brand_ru: string;
  brand_en: string;
  client_name_ru: string;
  client_name_en: string;
  targets_and_goals_ru: string;
  targets_and_goals_en: string;
  ideas_and_solutions_ru: string;
  ideas_and_solutions_en: string;
  nomination_ids: string[];
  slider_images: any[];
  slider_videos: any[];
}

export default function WorkCreate({ data }: { data?: any }) {
  const [activeNominations, setActiveNominations] = useState(
    data?.nominations || []
  );
  const [open, setOpen] = useState(false);
  const contests = useRecoilValue(ContestsAtom);
  const activeContest = useRecoilValue(activeContestAtom);
  const SeasonCurrent = useRecoilValue(seasonAtom);

  const isMusicContest = useMemo(() => {
    return (
      activeContest?.label?.toLowerCase()?.includes('музыка') ||
      activeContest?.label?.toLowerCase()?.includes('music')
    );
  }, [activeContest]);

  const [sponsor, setSponsor] = useState<IContest>();

  const workModalValues = useRecoilValue(workFormAtom);
  const resetWorkModalValues = useResetRecoilState(workFormAtom);
  const activeContestRules = useRecoilValue(activeContestRulesAtom);

  const { isDesktop } = useResize();
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const translate = useTranslate();
  const methods = useForm<IWorkForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(data, workModalValues, isDesktop),
  });

  const { handleAPIError, apiError } = useAPIError<keyof IWorkForm>({
    setError: methods.setError,
  });

  const watcher = methods.watch('contests');

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    const changedSponsor = contests?.find(({ value }) => value == watcher);
    setSponsor(changedSponsor);
  }, [watcher]);

  const { isSubmitting } = methods.formState;

  function formatArrayFiles(array: any) {
    return array?.filter((item: any) => item?.image);
  }

  const onSubmit = async (values: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { personalData, isRecentWork, isYoung, ...newValues } = values;

    let dataToSend = {
      ...newValues,
      nomination_ids: activeNominations?.map(
        (nominations: any) => nominations?.id
      ),
    };

    if (isMusicContest) {
      delete dataToSend?.slider_videos;
      delete dataToSend?.slider_images;
      delete dataToSend?.short_video_link;
      delete dataToSend?.vimeo_link;
      delete dataToSend?.video_preview;
    } else {
      dataToSend = {
        ...dataToSend,
        slider_images: formatArrayFiles(newValues.slider_images),
        slider_videos: newValues?.slider_videos?.filter(
          (item: any) => item?.video
        ),
      };
    }

    if (!dataToSend?.nomination_ids?.length) {
      methods.setError('nomination_ids', {
        type: 'custom',
        message: 'Выберите номинацию',
      });
      return;
    }
    try {
      let response;
      if (data) {
        response = await Api.put(Api.routes.api.work(data?.id), dataToSend);
      } else {
        response = await Api.post(Api.routes.api.works(), dataToSend);
      }
      if (response?.success) {
        resetWorkModalValues();
        if (data?.status === 'moderation') {
          setOpen(true);
        } else {
          navigate(ROUTES.payment(response?.results?.id));
        }
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  const isCompanyFieldRequired = useMemo(() => {
    const nominationWithRequiredCompany = activeNominations?.find(
      ({ company_required: companyRequired }: { company_required: boolean }) =>
        companyRequired === true
    );

    return !!nominationWithRequiredCompany;
  }, [activeNominations]);

  const rules = useMemo(() => {
    return {
      ...activeContestRules,
      company: { required: isCompanyFieldRequired },
    };
  }, [activeContestRules, isCompanyFieldRequired]);

  return (
    <>
      <AccountBackground />
      <Section className="work-create">
        <Title>{translate('Подать работу')}</Title>
        <Description className="work-create__submission-rules" sizeName="s">
          {translate('При подаче работы обязательно ознакомьтесь')}{' '}
          <a href={SeasonCurrent?.rules_url} target="_blank" rel="noreferrer">
            {translate('правилами подачи')}
          </a>
        </Description>
        <div className="work-create__title-wrapper">
          <Title sizeName="m">{translate('Категории')}</Title>
          <Sponsor
            logoUrl={sponsor?.sponsor_logo_url}
            sponsorLink={sponsor?.sponsor_link}
            bordered
          />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Contests
              nominationsState={[activeNominations, setActiveNominations]}
            />
            <Title sizeName="m" className="work-create__main-title">
              О проекте
            </Title>
            <Description sizeName="s" color="gray">
              {translate('Поля, помеченные *, обязательны к заполнению.')}
            </Description>

            <TextFields rules={rules} />
            <WorkCreateFiles
              rules={rules}
              activeNominations={activeNominations}
            />
            {data?.status === 'draft' || data?.status === 'unpaid' ? (
              <Button
                fullWidth={!isDesktop}
                color="black"
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Далее
              </Button>
            ) : (
              <Button
                fullWidth={!isDesktop}
                color="black"
                type="submit"
                disabled={
                  isSubmitting || (data && data?.status !== 'moderation')
                }
                loading={isSubmitting}
              >
                Сохранить
              </Button>
            )}
            {apiError && <p className="form__error-text">{apiError}</p>}
          </form>
          <DevTool control={methods.control} />
        </FormProvider>
        <ModalComponent
          className="work__modal-content"
          contentClassName="account-modal"
          state={[open, setOpen]}
        >
          <Title sizeName="m" align="center">
            {apiError || 'Изменения сохранены'}
          </Title>
          <div className="work__modal-buttons">
            <Button
              link={ROUTES.account()}
              align="center"
              color="gray"
              sizeName="s"
            >
              Перейти в личный кабинет
            </Button>

            <Button
              link={ROUTES.work(data?.id)}
              align="center"
              color="gray"
              sizeName="s"
            >
              Перейти в предпросмотр
            </Button>
          </div>
        </ModalComponent>
      </Section>
    </>
  );
}
