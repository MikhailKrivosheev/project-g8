import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import seasonStageSelector from 'Recoil/Selectors/SeasonStage';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import useTranslate from 'Hooks/useTranslate';
import LonglistCounter from './LonglistPopup/LonglistCounter';
import ShortlistCounter from './ShortlistPopup/ShortlistCounter';
import WinnersCounter from './WinnersPopup/WinnersCounter';
import GrandPrixCounter from './GrandPrixPopup/GrandPrixCounter';

export default function PopupRateCounter() {
  const workCount = useRecoilValue(workCounterAtom);
  const season = useRecoilValue(seasonAtom);
  const { isChairman, isG8Judge, isExecutive } =
    useRecoilValue(userRoleSelector);
  const { isFinalStage } = useRecoilValue(seasonStageSelector);
  const translate = useTranslate();

  const RateStage = {
    shortlist_start: <ShortlistCounter workCount={workCount} />,
    longlist_start: <LonglistCounter workCount={workCount} />,
    winners_start: <WinnersCounter workCount={workCount} />,
    grand_prix_start: <GrandPrixCounter workCount={workCount} />,
  };

  if (
    season?.contest_stage_code !== 'shortlist_start' &&
    season?.contest_stage_code !== 'longlist_start' &&
    isFinalStage &&
    !isG8Judge
  ) {
    return null;
  }

  return (
    <div className="popup-rate__status">
      {season?.contest_stage_code === 'longlist_start'
        ? translate(
            `${
              isExecutive ? 'Executive отсудили уже' : 'Greateight отсудили уже'
            }`
          )
        : translate('Оцененно работ')}
      <div className="popup-rate__count-works">
        {RateStage[season?.contest_stage_code]}
      </div>
    </div>
  );
}
