import Api from 'Api';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import Slider from 'rc-slider';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { useRecoilState } from 'recoil';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';

export default function RateShortList() {
  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const { handleAPIError } = useAPIError();
  const [rate, setRate] = useState<number | string>(0);
  const [stage, setStage] = useState(0);
  const [nextWork, setNextWork] = useState();
  const firstMount = useRef(true);
  const [nominations, setNominations] = useState([]);
  const [workCount, setWorkCount] = useRecoilState(workCounterAtom);
  const params = useParams();
  const translate = useTranslate();

  const invalidKeys = [69, 107, 109, 188, 190]; // +-e,.

  const onlyNumbers = (e: any) => {
    if (invalidKeys.includes(e.which)) e.preventDefault();
  };

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await Api.get(Api.routes.api.nominationsByAccount(), {
          work_id: params?.id,
        });

        setNominations(
          response?.results.filter(({ is_rated: isRated }: any) => !isRated)
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchNominations();
    if (!firstMount.current) setStage(0);
  }, [params.id]);

  const onChange = (number: number | string) => {
    setRate(number);
  };

  const postVote = async () => {
    try {
      const response = await Api.post(Api.routes.api.voting(), {
        work_id: params?.id,
        nomination_id: nominations[stage]?.id,
        rating: rate,
      });

      setStage((prev) => prev + 1);
      setWorkCount((prev: any) => ({
        ...prev,
        work_shortlist_voting_count: workCount?.work_shortlist_voting_count + 1,
      }));

      if (response?.results?.next_work_id === null) {
        navigate(ROUTES.account());
      } else {
        setNextWork(response?.results?.next_work_id);
      }

      if (response?.results?.next_work_id) setRate(0);
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  const skipWork = async () => {
    try {
      const response = await Api.post(Api.routes.api.votingSkip(), {
        work_id: params?.id,
      });
      if (response?.results?.next_work_id === null) {
        navigate(ROUTES.account());
      } else {
        setNextWork(response?.results?.next_work_id);
      }

      setRate(0);
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  useEffect(() => {
    if (
      (nextWork && nominations.length === 1) ||
      (stage === nominations.length && nextWork)
    ) {
      navigate(ROUTES.work(nextWork));
    }
  }, [stage, nextWork]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <div
      className={`popup-rate__form ${
        !nominations[stage] && 'popup-rate__form--rated'
      }`}
    >
      <div className="popup-rate__text">
        {nominations[stage]
          ? `${translate('Номинация')}: ${nominations[stage]?.name}`
          : translate(
              'Вы отсудили эту работу. Для продолжение судейства перейдите в личный кабинет'
            )}
      </div>
      {nominations[stage] && (
        <>
          <Slider
            min={0}
            max={100}
            value={parseInt(rate, 10)}
            onChange={onChange}
            className="popup-rate__slider"
          />
          <input
            className="popup-rate__input"
            type="number"
            name="rate"
            value={rate}
            min={0}
            onKeyDown={(e) => {
              onlyNumbers(e);
            }}
            onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
              if (target?.value?.length) {
                onChange(`${0}`);
              }
              if (parseInt(target.value, 10) > 100) {
                onChange(100);
              } else if (
                target?.value?.length > 1 &&
                `${target?.value}` !== '00'
              ) {
                onChange(target.value.replace(/^0+/, ''));
              } else {
                onChange(`${0}`);
              }
            }}
          />
        </>
      )}

      {!nominations[stage] ? (
        <Button
          sizeName="s"
          className="popup-rate__button popup-rate__button--single"
          link={ROUTES.account()}
        >
          Личный кабинет
        </Button>
      ) : (
        <>
          <Button
            type="submit"
            sizeName="s"
            className="popup-rate__button"
            onClick={postVote}
          >
            Оценить
          </Button>
          <Button
            type="submit"
            sizeName="s"
            className="popup-rate__button"
            onClick={skipWork}
            disabled
          >
            Пропустить
          </Button>
        </>
      )}
    </div>
  );
}
