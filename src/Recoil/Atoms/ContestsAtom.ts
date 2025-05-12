import { atom } from 'recoil';

interface IContest {
  value: string;
  label: string;
  type: string;
  sponsor_logo_url: string;
  sponsor_link: string;
}

const ContestsAtom = atom<IContest[]>({
  key: 'contestsAtom',
  default: [],
});

export default ContestsAtom;
