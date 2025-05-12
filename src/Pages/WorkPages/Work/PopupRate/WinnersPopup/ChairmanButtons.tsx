import Button from 'Components/UI/Button';
import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import useResize from 'Hooks/useResize';
import { INomination } from 'Types';

interface IChairmanButtons {
  sendVote: (vote: boolean) => Promise<void>;
  nextWorkId: string | null;
  state: [boolean | null, Dispatch<SetStateAction<boolean | null>>];
  stage: [number, Dispatch<SetStateAction<number>>];
  nominationStage: INomination;
}

export default function ChairmanButtons({
  sendVote,
  nextWorkId,
  state,
  stage,
  nominationStage,
}: IChairmanButtons) {
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const { isPhone } = useResize();
  const [, setNextStage] = stage;
  const [vote, setVote] = state;

  const firstVote = nominationStage?.work_votes[0]?.approved;
  const votes = [vote, firstVote];
  const hasVote = votes.some((value) => typeof value === 'boolean');

  const onVoteButtonClick = (voteStatus: boolean) => {
    setVote(hasVote ? null : voteStatus);
    sendVote(voteStatus);

    if (typeof firstVote === 'boolean') {
      setNextStage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Button
        sizeName="s"
        className="popup-rate__button"
        disabled={votes.includes(false)}
        onClick={() => onVoteButtonClick(true)}
      >
        Да
        {votes.includes(true) && <span>+1</span>}
      </Button>
      <Button
        sizeName="s"
        className="popup-rate__button"
        disabled={votes.includes(true)}
        onClick={() => onVoteButtonClick(false)}
      >
        Нет
        {votes.includes(false) && <span>+1</span>}
      </Button>
      {hasVote && (
        <Button
          sizeName="s"
          className="popup-rate__button"
          color="transparent"
          sizeGrid={isPhone ? 'm' : 'l'}
          onClick={() => {
            if (nextWorkId && !nominationStage) {
              navigate(ROUTES.work(nextWorkId));
            } else {
              setNextStage((prev) => prev + 1);
              setVote(null);
            }
          }}
        >
          Далее
        </Button>
      )}
    </>
  );
}
