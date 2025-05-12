import { atom } from 'recoil';

interface ISettingsAtom {
  home: {
    banner: string;
    text: string;
    first_video: string;
    first_video_preview: string;
    second_video: string;
    second_video_preview: string;
    vote_text: string;
    vote_banner: string;
    conference_text: string;
  };
  akar: {
    title: string;
    description: string;
    guidebook_link: string;
    video_vk_link: string;
  };
  awards: {
    banner: string;
    text: string;
  };
  works: {
    text: string;
    banner: string;
  };
  conference: {
    banner: string;
    text: string;
    date: string;
  };
  jury: {
    text: string;
    banner: string;
  };
  price: {
    text: string;
    banner: string;
  };
  lk: {
    banner: string;
  };
}

const settingsAtom = atom({
  key: 'settingsAtom',
  default: {} as ISettingsAtom,
});

export default settingsAtom;
