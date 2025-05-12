import useResize from 'Hooks/useResize';
import React from 'react';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import userAtom from 'Recoil/Atoms/User';
import AuthPopup from './AuthPopup';
import SubmissionWorkPopup from './SubmissionWorkPopup';

const popups = {
  request_work: <SubmissionWorkPopup />,
  register: <AuthPopup />,
};

type popupsKeys = keyof typeof popups;

export default function Popups() {
  const { isDesktop } = useResize();
  const user = useRecoilValue(userAtom);
  const { contents } = useRecoilValueLoadable(seasonAtom);
  const popupForm = contents?.popup_form;

  if (!isDesktop || (user.logged && popupForm === 'register')) return null;

  if (popupForm && popups[popupForm as popupsKeys]) {
    return isDesktop && popups[popupForm as popupsKeys];
  }

  return null;
}
