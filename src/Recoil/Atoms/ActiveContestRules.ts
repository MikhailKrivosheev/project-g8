import { atom } from 'recoil';

type TContestRules = {
  brand: { required: boolean };
  vimeo_link: {
    required: boolean;
  };
  slider_images: {
    required: boolean;
  };
  slider_videos: {
    required: boolean;
  };
};

const activeContestRulesAtom = atom({
  key: 'activeContestRulesAtom',
  default: {} as TContestRules,
});

export default activeContestRulesAtom;
