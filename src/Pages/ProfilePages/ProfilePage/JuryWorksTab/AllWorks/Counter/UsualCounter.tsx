import React from 'react';
import { useRecoilValue } from 'recoil';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import CounterBlock from './CounterBlock';

export default function UsualCounter() {
  const workCount = useRecoilValue(workCounterAtom);

  let myVotesCounter;
  let allCounter;
  if (workCount) {
    myVotesCounter = workCount?.work_shortlist_voting_count;
    allCounter = workCount?.work_shortlist_count;
  }
  return (
    <CounterBlock
      title="Счетчик"
      description="вы уже оценили работ"
      descriptionAdditional="всего работ в моей категории прошло в Shortlist"
      myVotesCount={myVotesCounter}
      allCount={allCounter}
      backgroundColor="gray"
      counterType="mutual"
    />
  );
}
