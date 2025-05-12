import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';

export default function GreetingsText({ description, contestName }) {
  const { first_name: firstName } = useRecoilValue(userAtom);
  const translate = useTranslate();
  return (
    <>
      <Title sizeName="m" className="works-jury__title">
        {translate('Добрый день')}, {firstName}!
      </Title>
      <Description dangerHTML={description} />
      {contestName && (
        <Title sizeName="semi-s" marginSizeName="s">
          Категория: {contestName}
        </Title>
      )}
    </>
  );
}
