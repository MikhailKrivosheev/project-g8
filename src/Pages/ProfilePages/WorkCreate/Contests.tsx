import Api from 'Api';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import RadioButtons from 'Pages/ProfilePages/WorkCreate/RadioButtons';
import React, { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import activeContestAtom from 'Recoil/Atoms/ActiveContest';
import activeContestRulesAtom from 'Recoil/Atoms/ActiveContestRules';
import ContestsAtom from 'Recoil/Atoms/ContestsAtom';
import seasonAtom from 'Recoil/Atoms/Season';
import { TNomination } from 'Types';
import NominationTab from './Nomination';

export default function Contests({ nominationsState }: any) {
  const [contestsOptions, setOptions] = useRecoilState(ContestsAtom);
  const translate = useTranslate();
  const [activeContest, setActiveContest] =
    useRecoilState<any>(activeContestAtom);
  const setActiveContestRules = useSetRecoilState<any>(activeContestRulesAtom);
  const firstMount = useRef(true);
  const contestRef = useRef<HTMLDivElement>(null);
  const [activeNominations, setActiveNominations] = nominationsState;
  const season = useRecoilValue(seasonAtom);
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const contestWatcher = watch('contests');

  useEffect(() => {
    if (!firstMount.current) setActiveNominations([]);
  }, [contestWatcher]);

  useEffect(() => {
    if (contestsOptions && contestWatcher) {
      setActiveContest(
        contestsOptions?.find(
          ({ value }: any) => value.toString() === contestWatcher.toString()
        )
      );
    } else {
      setActiveContest(null);
    }
  }, [contestsOptions, contestWatcher]);

  useEffect(() => {
    const fetchRules = async () => {
      if (activeContest) {
        try {
          const response = await Api.get(
            Api.routes.api.contestRules(activeContest.value)
          );

          setActiveContestRules(response?.results?.rules);
        } catch (error) {
          console.log('ERROR!!!!');
        }
      }
    };

    fetchRules();
  }, [activeContest]);

  const { handleAPIError } = useAPIError();

  const workCost = useMemo(() => {
    if (!activeContest) return 0;

    const contestCost = parseInt(activeContest.amount, 10);

    if (!activeNominations || activeNominations?.length <= 0) {
      return contestCost;
    }

    const workCostResult = activeNominations?.reduce(
      (acc: number, element: TNomination) => {
        const amount =
          element.amount === null ? contestCost : parseFloat(element.amount);

        return acc + amount;
      },
      0
    );

    return workCostResult;
  }, [activeNominations, activeContest]);

  useEffect(() => {
    firstMount.current = false;

    const fetchOptions = async () => {
      try {
        const response = await Api.get(Api.routes.api.contests(), {
          season_id: season?.id,
        });
        setOptions(
          response?.results?.map(
            ({ name, id, ...rest }: any, index: number) => ({
              value: id,
              label: name,
              index,
              ...rest,
            })
          )
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (errors?.nomination_ids && contestRef && contestRef?.current) {
      contestRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [errors]);

  if (!contestsOptions) return null;
  return (
    <div ref={contestRef}>
      {contestsOptions && (
        <RadioButtons
          data={activeNominations}
          setActiveNominations={setActiveNominations}
          name="contests"
          options={contestsOptions}
        />
      )}
      {activeContest?.label && (
        <Title sizeName="m">
          {translate('Номинации')} «{activeContest?.label}»
        </Title>
      )}
      {errors?.nomination_ids && (
        <p className="form__error-text">{errors?.nomination_ids?.message}</p>
      )}
      <div className="work-create__nominations">
        {activeContest?.nominations?.map((nomination: any) => (
          <NominationTab
            key={nomination?.id}
            activeNominations={activeNominations}
            setActiveNominations={setActiveNominations}
            data={{ amount: activeContest?.amount, ...nomination }}
          />
        ))}
      </div>
      <div className="work-create__tabs-info">
        <span>
          {translate('Номинации')}: {activeNominations?.length}
        </span>
        <span>
          {translate('Стоимость подачи работы составит')}: {workCost} ₽
        </span>
      </div>
    </div>
  );
}
