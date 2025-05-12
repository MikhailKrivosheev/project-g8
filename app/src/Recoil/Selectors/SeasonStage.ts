import { selector } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';

const seasonStageSelector = selector({
  key: 'seasonStageSelector',
  get: ({ get }) => {
    const season = get(seasonAtom);

    return {
      isWinnersStage: season?.contest_stage_code?.includes('winners'),
      isGrandPrixStage: season?.contest_stage_code?.includes('grand_prix'),
      isFinalStage:
        season?.contest_stage_code?.includes('winners') ||
        season?.contest_stage_code?.includes('grand_prix'),
    };
  },
});

export default seasonStageSelector;
