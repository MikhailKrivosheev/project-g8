import { atom } from 'recoil';

type TActiveContestAtom = null | {
  index?: number;
  value: string;
  label: string;
  type: string;
  sponsor_logo_url: string;
  sponsor_link: string;
};

const activeContestAtom = atom({
  key: 'activeContestAtom',
  default: null as TActiveContestAtom,
});

export default activeContestAtom;
