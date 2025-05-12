import { atom } from 'recoil';

interface IDictionaryAtom {
  account_role: {
    administrator: string;
    curator: string;
    judge: string;
    speaker: string;
    user: string;
  };
  account_status: {
    active: string;
    archived: string;
  };
  album_type: {
    photo: string;
    video: string;
  };
  cost_type: {
    buy_ticker: string;
    submit_job: string;
  };
  judge_type: {
    executive: string;
    greateight: string;
  };
  payment_product: {
    created: string;
    decline: string;
    error: string;
    started: string;
    success: string;
  };
  season_contest_stage_code: {
    accept_requests_start: string;
    accept_requests_stop: string;
    disable: string;
    longlist_start: string;
    longlist_stop: string;
    moderation_start: string;
    moderation_stop: string;
    shortlist_start: string;
    shortlist_stop: string;
    winners_start: string;
    winners_stop: string;
  };
  nomination_work_stage: {
    shortlist: string;
    longlist: string;
    winners: string;
  };
  season_payment_system: {
    yookassa: string;
  };
  sponsor_type_block_type: {
    high: string;
    short: string;
  };
  work_status: {
    confirmed: string;
    declined: string;
    deleted: string;
    draft: string;
    moderation: string;
    unpaid: string;
  };
}

const dictionaryAtom = atom({
  key: 'dictionaryAtom',
  default: null as IDictionaryAtom | null,
});

export default dictionaryAtom;
