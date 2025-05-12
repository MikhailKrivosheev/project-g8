import Api from 'Api';
import Tooltip from 'Components/Tooltip';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import userRoleSelector from 'Recoil/Selectors/UserRole';

export default function ResetVoteTooltip({
  id,
  is_voted: isVoted,
  has_vote: hasVote,
  is_rated: isRated,
  activeNomination,
  work_votes: workVotes,
  work_ratings: workRatings,
  noButton = false,
}) {
  const [disabled, setDisabled] = useState(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const ROUTES = useRoutes();
  const { isChairman, isJudge } = useRecoilValue(userRoleSelector);
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);
  const season = useRecoilValue(seasonAtom);
  const translate = useTranslate();

  const { handleAPIError } = useAPIError();

  async function onVoteClick() {
    try {
      const { success } = await Api.deleteRequest(Api.routes.api.voteDelete(), {
        work_id: id,
        nomination_id: activeNomination?.id,
      });
      setDisabled(false);
      if (success) {
        setIsReset(true);
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  async function onRaitingClick() {
    try {
      const { success } = await Api.deleteRequest(
        Api.routes.api.ratingDelete(),
        {
          work_id: id,
          nomination_id: activeNomination?.id,
        }
      );
      setDisabled(false);
      if (success) {
        setIsReset(true);
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  async function onResetVoteGrandPrixClick() {
    try {
      const { success } = await Api.deleteRequest(Api.routes.api.voteDelete(), {
        work_id: id,
        nomination_id: workVotes[0]?.nomination_id,
      });
      setDisabled(false);
      if (success) {
        setIsReset(true);
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  const nominationVote = useMemo(() => {
    return workVotes?.find(
      (vote) => vote.nomination_id === activeNomination?.id
    );
  }, [workVotes, activeNomination]);

  if (isGrandPrixStage && !isReset && isVoted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {workVotes[0]?.approved ? translate('Да') : translate('Нет')}
        {season?.contest_stage_code === 'longlist_start' && !hasVote && (
          <Tooltip type="black">
            {translate('Вы можете')}
            {` `}
            <Button
              className="reset-vote-button"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                onResetVoteGrandPrixClick();
              }}
            >
              {translate('обнулить свой голос')}
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }

  if (!isReset && nominationVote && isVoted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {nominationVote?.approved ? translate('Да') : translate('Нет')}
        {season?.contest_stage_code === 'longlist_start' && !hasVote && (
          <Tooltip type="black">
            {translate('Вы можете')}
            {` `}
            <Button
              className="reset-vote-button"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                onVoteClick();
              }}
            >
              {translate('обнулить свой голос')}
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }

  if (!isReset && isRated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {workRatings?.[0]?.rating ? workRatings?.[0]?.rating : 0}
        {season?.contest_stage_code === 'longlist_start' && !hasVote && (
          <Tooltip type="black">
            {translate('Вы можете')}
            {` `}
            <Button
              className="reset-vote-button"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                onRaitingClick();
              }}
            >
              {translate('обнулить свой голос')}
            </Button>
          </Tooltip>
        )}
      </div>
    );
  }

  if (isChairman && !isJudge) {
    return '-';
  }

  if (noButton) return null;

  return (
    <Button
      link={ROUTES.work(`${id}`)}
      color="gray"
      strached
      sizeName="s"
      className="works-jury__button"
    >
      Оценить
    </Button>
  );
}
