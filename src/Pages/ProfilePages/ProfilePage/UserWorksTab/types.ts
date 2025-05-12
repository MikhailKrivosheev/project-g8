type NominationType = {
  id: number;
  name_ru: string;
};

type SeasonType = {
  year: string;
};

export interface IWorksUser {
  id: number;
  preview_url: string;
  name: string;
  nominations: NominationType;
  season: SeasonType;
  status: string;
}

export type TWorkCard = {
  deleteCallBack: React.Dispatch<React.SetStateAction<IWorksUser[] | null>>;
};
