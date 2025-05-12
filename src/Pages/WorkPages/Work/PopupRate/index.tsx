import React from 'react';
import StarIcon from 'Icons/StarIcon';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import useResize from 'Hooks/useResize';
import seasonStageSelector from 'Recoil/Selectors/SeasonStage';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import cn from 'classnames';
import userAtom from 'Recoil/Atoms/User';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import RateCounter from './PopupRateCounter';
import RateShortList from './ShortlistPopup/RateShortList';
import RateLongList from './LonglistPopup/RateLongList';
import RateWinners from './WinnersPopup/RateWinners';
import RateGranPrix from './GrandPrixPopup/RateGrandPrix';

const RateStage = ({ stage }: { stage?: string }): JSX.Element | null => {
  const { isWinnersStage } = useRecoilValue(contestSeasonSelector);

  const rateStageVariants: { [key: string]: JSX.Element } = {
    shortlist_start: <RateShortList />,
    longlist_start: <RateLongList />,
    winners_start: isWinnersStage ? <RateWinners /> : <RateGranPrix />,
    grand_prix_start: isWinnersStage ? <RateWinners /> : <RateGranPrix />,
  };

  return stage ? rateStageVariants[stage] : null;
};

export default function RatePopup() {
  const season = useRecoilValue(seasonAtom);
  const { judge_type: judgeType } = useRecoilValue(userAtom);
  const { isDesktop } = useResize();
  const { isChairman, isG8Judge } = useRecoilValue(userRoleSelector);
  const { isFinalStage } = useRecoilValue(seasonStageSelector);

  if (
    season?.contest_stage_code !== 'shortlist_start' &&
    season?.contest_stage_code !== 'longlist_start' &&
    isFinalStage &&
    !isG8Judge
  ) {
    return null;
  }

  if (
    judgeType === 'executive' &&
    season?.contest_stage_code === 'shortlist_start'
  ) {
    return null;
  }

  const popupClassName = cn('popup-rate', {
    'popup-rate--shortlist': season?.contest_stage_code === 'shortlist_start',
    'popup-rate--winners': season?.contest_stage_code === 'winners_start',
    'popup-rate--chairman': isChairman && isG8Judge,
  });

  return (
    <div className={popupClassName}>
      <RateCounter />
      {season?.contest_stage_code === 'shortlist_start' && !isDesktop ? null : (
        <StarIcon className="popup-rate__icon" />
      )}
      <RateStage stage={season?.contest_stage_code} />
    </div>
  );
}
