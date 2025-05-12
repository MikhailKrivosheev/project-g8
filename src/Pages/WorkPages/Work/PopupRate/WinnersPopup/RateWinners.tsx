import Api from 'Api';
import cn from 'classnames';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import workCounterAtom, { IWorkCounterAtom } from 'Recoil/Atoms/WorksCounter';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import { IError, INomination } from 'Types';
import ChairmanButtons from './ChairmanButtons';
import JudgeButtons from './JudgeButtons';

interface IPopupButtons {
  sendVote: (vote: boolean) => Promise<void>;
  nextWorkId: string | null;
  state: [boolean | null, Dispatch<SetStateAction<boolean | null>>];
  stage: [number, Dispatch<SetStateAction<number>>];
  nominationStage: INomination;
}

interface IRoleRespone {
  is_chairman_voted: boolean;
  is_voted: boolean;
}

function PopupButtons({
  sendVote,
  ...rest
}: IPopupButtons): JSX.Element | null {
  const { isChairman, isG8Judge } = useRecoilValue(userRoleSelector);
  if (isG8Judge && !isChairman) return <JudgeButtons sendVote={sendVote} />;
  if (isChairman && isG8Judge)
    return <ChairmanButtons sendVote={sendVote} {...rest} />;
  return null;
}

export default function RateWinners() {
  const { handleAPIError } = useAPIError();
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const [stage, setStage] = useState<number>(0);
  const [nextWork, setNextWork] = useState<string | null>(null);
  const [nominations, setNominations] = useState<INomination[]>([]);
  const [voteValue, setVote] = useState<boolean | null>(null);
  const firstMount = useRef(true);
  const params = useParams();
  const [workCount, setWorkCount] = useRecoilState(workCounterAtom);
  const workWinnersCount = workCount?.work_winners_voting_count;
  const { isChairman, isG8Judge } = useRecoilValue(userRoleSelector);

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const response = await Api.get(Api.routes.api.nominationsByAccount(), {
          work_id: params?.id,
        });
        if (isChairman) {
          setNominations(
            response?.results.filter(
              ({ is_chairman_voted: isChairmanVote }: IRoleRespone) =>
                !isChairmanVote
            )
          );
        } else if (isG8Judge) {
          setNominations(
            response?.results.filter(
              ({ is_voted: isVoted }: IRoleRespone) => !isVoted
            )
          );
        } else {
          setNominations(
            response?.results.filter(
              ({ is_voted: isVoted }: IRoleRespone) => !isVoted
            )
          );
        }
      } catch (error: unknown) {
        handleAPIError(error as IError);
      }
    };

    fetchNominations();

    if (!firstMount.current) {
      setStage(0);
      setVote(null);
    }
  }, [params.id]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  const sendVote = async (vote: boolean) => {
    try {
      const response = await Api.post(Api.routes.api.voting(), {
        work_id: params?.id,
        nomination_id: nominations[stage]?.id,
        approved: vote,
      });
      if (voteValue !== null || !isChairman) {
        setStage((prev) => prev + 1);
      }
      setWorkCount(
        (prevValue): IWorkCounterAtom => ({
          ...prevValue,
          work_winners_voting_count: workWinnersCount && workWinnersCount + 1,
        })
      );
      if (response?.results?.next_work_id) {
        setNextWork(response?.results?.next_work_id);
      }
    } catch (error: unknown) {
      handleAPIError(error as IError);
    }
  };

  useEffect(() => {
    if (
      (nextWork && nominations.length === 1 && !isChairman) ||
      (stage === nominations.length && nextWork)
    ) {
      navigate(ROUTES.work(nextWork));
    }
  }, [stage, nextWork]);

  const popupClassName = cn('popup-rate__form', {
    'popup-rate__form--rated': !nominations[stage],
    'popup-rate__form--chairman': isChairman && isG8Judge,
  });

  return (
    <div className={popupClassName}>
      <div className="popup-rate__text">
        {nominations[stage]
          ? `Достойна ли эта работа стать победителем этапа Winners в номинации ${nominations[stage]?.name}`
          : 'Ой, эту работу вы уже отсудили'}
      </div>
      {nominations[stage] ? (
        <PopupButtons
          sendVote={sendVote}
          nextWorkId={nextWork}
          state={[voteValue, setVote]}
          stage={[stage, setStage]}
          nominationStage={nominations[stage]}
        />
      ) : (
        <Button
          sizeName="s"
          className="popup-rate__button popup-rate__button--single"
          link={ROUTES.account()}
        >
          Личный кабинет
        </Button>
      )}
    </div>
  );
}
