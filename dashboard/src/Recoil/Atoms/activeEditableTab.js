import { atom } from 'recoil';

const activeEditableTab = atom({
  key: 'activeEditableTab',
  default: 'home',
});

export default activeEditableTab;
