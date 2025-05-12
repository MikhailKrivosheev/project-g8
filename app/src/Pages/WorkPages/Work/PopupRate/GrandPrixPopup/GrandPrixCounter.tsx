import React from 'react';

export default function GrandPrixCounter({ workCount }: any) {
  return (
    <>
      <span className="popup-rate__number-rated">
        {workCount?.work_grandprix_voting_count}
      </span>
      /{workCount?.work_grandprix_count}
    </>
  );
}
