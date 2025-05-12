type ContestType = {
  name: string;
};

export interface INominationWork {
  contest: ContestType;
  name: string;
  id: number;
  work_count: number;
  work_voting_count: number;
}

export type TWorkCountObject = {
  id?: number;
  image_2_url: string | null;

  work_longlist_count?: number;
  work_longlist_voting_count?: number;
  work_longlist_common_count?: number;
  work_longlist_voting_common_count?: number;

  work_shortlist_count?: number;
  work_shortlist_voting_count?: number;
  work_shortlist_common_count?: number;
  work_shortlist_voting_common_count?: number;

  work_winners_count?: number;
  work_winners_voting_count?: number;
  work_grandprix_count?: number;
  work_grandprix_voting_count?: number;
};

export type TCounter = {
  workCount: TWorkCountObject;
  isPersonal?: boolean;
};
