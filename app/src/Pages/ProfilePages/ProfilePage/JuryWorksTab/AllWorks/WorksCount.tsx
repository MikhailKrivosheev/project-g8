import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import ShortlistButton from './Shortlist/ShortlistButton';
import LonglistButton from './Longlist/LonglistButton';
import ExecutiveCounter from './Counter/ExecutiveCounter';
import UsualCounter from './Counter/UsualCounter';

export default function WorksCount({
  judgeType,
}: {
  judgeType: 'executive' | 'greateight';
}) {
  const workCount = useRecoilValue(workCounterAtom);
  const season = useRecoilValue(seasonAtom);

  if (
    season?.contest_stage_code !== 'shortlist_start' &&
    season?.contest_stage_code !== 'longlist_start'
  ) {
    return null;
  }

  if (!workCount) return null;

  return (
    <div className="works-jury__status">
      {judgeType === 'executive' ? <ExecutiveCounter /> : <UsualCounter />}
      {season?.contest_stage_code === 'shortlist_start' ? (
        <ShortlistButton workCount={workCount} />
      ) : (
        <LonglistButton workCount={workCount} />
      )}
    </div>
  );
}
