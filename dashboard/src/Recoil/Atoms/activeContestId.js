import { atom } from 'recoil';

const activeContestId = atom({
  key: 'activeContestId',
  default: null,
});

export default activeContestId;
