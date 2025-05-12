import Api from 'Api';
import cn from 'classnames';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import workCounterAtom, { IWorkCounterAtom } from 'Recoil/Atoms/WorksCounter';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import { IError } from 'Types';
import ChairmanButtons from './ChairmanButtons';
import JudgeButtons from './JudgeButtons';

interface IContest {
  id: number;
  is_voted: boolean;
  is_chairman_voted: boolean;
  nominations: {
    work_votes: { approved: boolean }[];
  }[];
}

interface IPopupButtons {
  sendVote: (vote: boolean) => Promise<void>;
  nextWorkId: string | null;
  state: [boolean | null, Dispatch<SetStateAction<boolean | null>>];
  stage: [number, Dispatch<SetStateAction<number>>];
  contestStage: IContest;
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

export default function RateGranPrix() {
  const { handleAPIError } = useAPIError();
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const [stage, setStage] = useState(0);
  const [nextWork, setNextWork] = useState<string | null>(null);
  const [contests, setContests] = useState<IContest[]>([]);
  const [voteValue, setVoteValue] = useState<boolean | null>(null);
  const firstMount = useRef(true);
  const params = useParams();
  const [workCount, setWorkCount] = useRecoilState(workCounterAtom);
  const workWinnersCount = workCount?.work_grandprix_voting_count;
  const { isChairman, isG8Judge } = useRecoilValue(userRoleSelector);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await Api.get(Api.routes.api.contestsByAccount(), {
          work_id: params?.id,
        });
        if (isChairman && isG8Judge) {
          setContests(
            response?.results.filter(
              ({ is_chairman_voted: isChairmanVote }: IRoleRespone) =>
                !isChairmanVote
            )
          );
        } else {
          setContests(
            response?.results.filter(
              ({ is_voted: isG8JudgeVote }: IRoleRespone) => !isG8JudgeVote
            )
          );
        }
      } catch (error: unknown) {
        handleAPIError(error as IError);
      }
    };

    fetchContests();

    if (!firstMount.current) {
      setStage(0);
      setVoteValue(null);
    }
  }, [params.id]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  const sendVote = async (vote: boolean) => {
    try {
      const response = await Api.post(Api.routes.api.voting(), {
        work_id: params?.id,
        contest_id: contests[stage]?.id,
        approved: vote,
      });
      if (voteValue !== null || !isChairman) {
        setStage((prev) => prev + 1);
      }
      if (!isChairman && isG8Judge) {
        setWorkCount(
          (prevValue): IWorkCounterAtom => ({
            ...prevValue,
            work_grandprix_voting_count:
              workWinnersCount && workWinnersCount + 1,
          })
        );
      }
      if (response?.results?.next_work_id) {
        setNextWork(response?.results?.next_work_id);
      }
    } catch (error: unknown) {
      handleAPIError(error as IError);
    }
  };

  useEffect(() => {
    if ((nextWork && !isChairman) || (stage === contests.length && nextWork)) {
      navigate(ROUTES.work(nextWork));
    }
  }, [stage, nextWork]);

  const popupClassName = cn('popup-rate__form', {
    'popup-rate__form--rated': !contests[stage],
    'popup-rate__form--chairman': isChairman && isG8Judge,
  });

  return (
    <div className={popupClassName}>
      <div className="popup-rate__text">
        {!contests[stage]
          ? 'Ой, эту работу вы уже отсудили.'
          : `Достойна ли эта работа стать победителем на этапе Grand-Prix?`}
      </div>
      {contests[stage] ? (
        <PopupButtons
          sendVote={sendVote}
          nextWorkId={nextWork}
          state={[voteValue, setVoteValue]}
          stage={[stage, setStage]}
          contestStage={contests[stage]}
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
