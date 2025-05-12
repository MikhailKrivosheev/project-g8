import { atom } from 'recoil';
import getLang from 'Utilities/lang';

const LangAtom = atom({
  key: 'langAtom',
  default: getLang(),
});

export default LangAtom;
