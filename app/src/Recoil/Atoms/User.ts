import { atom } from 'recoil';
import Utilities from 'Utilities';

interface IRole {
  name: string;
}

export interface IUser {
  image_url: string;
  logged: boolean;
  roles?: IRole[];
  judge_type?: string;
  id?: number;
  email?: string;
  status?: string;
  first_name?: string;
  first_name_ru?: string;
  first_name_en?: string;
  last_name_ru?: null;
  last_name_en?: null;
  company_ru?: string;
  job_title_ru?: string;
  biography_ru?: string;
  phone?: string;
  image?: string;
  facebook?: string;
  telegram?: string;
  instagram?: string;
  vkontakte?: string;
  site?: string;
  created_at?: string;
  updated_at?: string;
}

const userAtom = atom({
  key: 'user',
  default: {
    logged: Utilities.apiTokenStorage.get(),
  } as IUser,
});

export default userAtom;
