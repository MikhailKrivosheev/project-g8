import React from 'react';
import { useRecoilValue } from 'recoil';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import CounterBlock from './CounterBlock';

export default function ExecutiveCounter() {
  const workCount = useRecoilValue(workCounterAtom);

  let myVotesCounter;
  let availableCounter;
  let allCounter;
  if (workCount) {
    myVotesCounter = workCount?.work_longlist_voting_count;
    availableCounter = workCount?.work_longlist_available_count;
    allCounter = workCount?.work_longlist_count;
  }

  return (
    <div className="works-jury__counters-holder">
      <CounterBlock
        title="Личный счетчик"
        description="вы уже оценили работ"
        myVotesCount={myVotesCounter}
        backgroundColor="green"
        counterType="personal"
      />
      <CounterBlock
        title="Общий счетчик"
        description="всего доступно к оценке"
        backgroundColor="gray"
        counterType="general"
        availableCount={availableCounter}
        allCount={allCounter}
      />
    </div>
  );
}
