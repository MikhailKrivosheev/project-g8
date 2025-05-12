import { atom } from 'recoil';

export interface IWorkCounterAtom {
  id?: number;
  image_2_url: string | null;
  work_longlist_count?: number;
  work_longlist_voting_count?: number;
  work_longlist_available_count: number;
  work_shortlist_count?: number;
  work_shortlist_voting_count?: number;
  work_winners_count?: number;
  work_winners_voting_count?: number;
  work_grandprix_count?: number;
  work_grandprix_voting_count?: number;
}

const workCounterAtom = atom({
  key: 'workCounterAtom',
  default: null as IWorkCounterAtom | null,
});

export default workCounterAtom;
