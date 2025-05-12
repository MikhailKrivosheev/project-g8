// type contestType = { id: number; name: string };
export type workType = {
  id: number;
  preview_url: string;
};

export interface INomination {
  // contest_id: number;
  id: number;
  is_voted?: boolean;
  is_rated?: boolean;
  name: string;
  preview_url: string;
  description: string;
  submission_materials: string;
  // contest: contestType;
  works: Array<workType>;
}

export type NominationInfoType = Pick<
  INomination,
  'submission_materials' | 'description'
>;
