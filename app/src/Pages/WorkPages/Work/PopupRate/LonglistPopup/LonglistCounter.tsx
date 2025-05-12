import React from 'react';

export default function LonglistCounter({ workCount }: any) {
  return (
    <>
      <span className="popup-rate__number-rated">
        {workCount?.work_longlist_voting_count}
      </span>
      /{workCount?.work_longlist_count}
    </>
  );
}
