import { selector } from 'recoil';
import userAtom from 'Recoil/Atoms/User';

const contestSeasonSelector = selector({
  key: 'contestSeasonSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return {
      isWinnersStage: user?.contests?.[0]?.stage_code?.includes('winners'),
      isGrandPrixStage: user?.contests?.[0]?.stage_code?.includes('grand_prix'),
      contestId: user?.contests?.[0]?.id,
      contestName: user?.contests?.[0]?.name,
      is_finished: user?.contests?.[0]?.is_finished,
    };
  },
});

export default contestSeasonSelector;
