import { HTMLProps } from 'react';
import { ISeason } from 'Recoil/Atoms/Season';

export interface ISponsor {
  link: string;
  logo_url: string;
  id: number;
  background_color_logo?: string;
  accented: boolean;
}

export type TContestType = 'creative_industries' | 'creative_advertising';

export interface IContest {
  name: string;
  type: TContestType;
}
export interface INomination {
  id: number;
  name: string;
  link: string;
  contest: IContest;
  work_votes: Array<{ approved?: boolean }> | [];
}

export interface IAccount {
  id: number;
  role: string;
  email?: string;
  name_ru?: string;
  name_en?: string;
  company_ru?: string;
  company_en?: string;
  job_title_ru?: string;
  job_title_en?: string;
  biography_ru?: string;
  biography_en?: string;
  phone?: string;
  image?: string;
  facebook?: string;
  telegram?: string;
  instagram?: string;
  vkontakte?: string;
}
export interface ISpeaker {
  id: number;
  image: string;
  link: string;
  image_url?: string;
}
export interface ICardData {
  id?: string | number;
  category: string;
  nominations: INomination[];
  speakers: ISpeaker[];
  description_ru?: string;
  link: string;
  judges_by_season_status: ISpeaker[];
}

export type TValue = string | number;

export interface IOption {
  label?: string;
  value?: TValue;
}

interface IErrorData {
  error?: string;
  details?: { message?: string; type: string };
}
export interface IError {
  abortError?: object;
  status?: number;
  data?: IErrorData;
  message?: string;
}

export interface IMeta {
  from: number;
  to: number;
  per_page: number;
  current_page: number;
  has_more_pages: boolean;
  total: number;
}

export interface IArticle {
  id: string;
  title: string;
  content: string;
  published: boolean;
  source: string;
  date_publish: string;
  is_fixed: boolean;
  created_at: string;
  updated_at: string;
  thumbnail_url: string;
  slider_url: {
    image: string;
  }[];
}

export interface IWork {
  gallery_with_url: string;
  preview_url: string;
  company: string;
  name: string;
  season: ISeason;
  brand: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
}

export type TNomination = {
  amount: null | string;
  contest_id: number;
  description: string | null;
  id: number;
  is_young: boolean;
  name: string;
  name_en: string;
  name_ru: string;
  submission_materials: null | string;
};

export type IControllerField = HTMLProps<HTMLInputElement>;

export type ICallback<T> = (arg: T) => void;
// export interface ICallback<T> {
//   onChange: (arg: T) => void;
// }
