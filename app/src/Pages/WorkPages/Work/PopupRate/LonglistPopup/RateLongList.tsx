import Api from 'Api';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import useTranslate from 'Hooks/useTranslate';

export default function RateLongList() {
  const { handleAPIError } = useAPIError();
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const [stage, setStage] = useState(0);
  const [nextWork, setNextWork] = useState(null);
  const [nominations, setNominations] = useState([]);
  const firstMount = useRef(true);
  const params = useParams();
  const [workCount, setWorkCount] = useRecoilState(workCounterAtom);
  const translate = useTranslate();
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await Api.get(Api.routes.api.nominationsByAccount(), {
          work_id: params?.id,
        });
        setNominations(
          response?.results.filter(
            ({ is_voted: isVoted, is_allowed_vote: isAllowed }: any) =>
              !isVoted && isAllowed
          )
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchNominations();

    if (!firstMount.current) setStage(0);
  }, [params.id]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  const postVote = async (vote: boolean) => {
    setPending(true);
    try {
      const response = await Api.post(Api.routes.api.voting(), {
        work_id: params?.id,
        nomination_id: nominations[stage]?.id,
        approved: vote,
      });
      setStage((prev) => prev + 1);
      setWorkCount((prev: any) => ({
        ...prev,
        work_longlist_voting_count: workCount?.work_longlist_voting_count,
      }));
      setNextWork(response?.results?.next_work_id);
      setPending(false);
    } catch (error: any) {
      handleAPIError(error);
      setPending(false);
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

  return (
    <div
      className={`popup-rate__form popup-rate__form--long-list ${
        !nominations[stage] && 'popup-rate__form--rated'
      }`}
    >
      <div className="popup-rate__text">
        {!nominations[stage]
          ? translate(
              'Ой, эту работу вы уже отсудили или она попала в лонг-лист.'
            )
          : `${translate(
              'Достойна ли эта работа пройти в лонг-лист конкурса в номинации'
            )} ${nominations[stage]?.name}`}
      </div>
      {nominations[stage] ? (
        <>
          <Button
            sizeName="s"
            className="popup-rate__button"
            onClick={() => {
              postVote(true);
            }}
            disabled={pending}
          >
            {translate('Да')}
          </Button>
          <Button
            sizeName="s"
            className="popup-rate__button"
            onClick={() => {
              postVote(false);
            }}
            disabled={pending}
          >
            {translate('Нет')}
          </Button>
        </>
      ) : (
        <Button
          sizeName="s"
          className="popup-rate__button popup-rate__button--single"
          link={ROUTES.account()}
        >
          {translate('Личный кабинет')}
        </Button>
      )}
    </div>
  );
}
