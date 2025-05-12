import { atom } from 'recoil';

const workFormAtom = atom({
  key: 'workFormAtom',
  default: {
    name_ru: '',
    name_en: '',
    contests: '',
  },
});

export default workFormAtom;
