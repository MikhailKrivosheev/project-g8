import React from 'react';

export default function ShortlistCounter({ workCount }: any) {
  return (
    <>
      <span className="popup-rate__number-rated">
        {workCount?.work_shortlist_voting_count}
      </span>
      /{workCount?.work_shortlist_count}
    </>
  );
}
