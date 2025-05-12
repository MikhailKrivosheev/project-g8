import { atom } from 'recoil';

export type runningLine = {
  name: string;
  url: string;
};

export interface ISeason {
  end_date: string;
  contest_stage_code: string;
  guidebook_url?: string;
  short_guidebook_url?: string;
  id: number;
  payment_system: string;
  popup_form: string;
  program_url: string;
  rules_url?: string;
  short_rules_url?: string;
  running_line: Array<runningLine> | null;
  show_buy_ticket_button: boolean;
  show_request_work_button: boolean;
  start_date: string;
  year: string;
  status: 'finished' | 'active' | 'hidden';
}

type TSeasonAtom = null | ISeason;

const seasonAtom = atom({
  key: 'seasonAtom',
  default: null as TSeasonAtom,
});

export default seasonAtom;
