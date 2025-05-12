import Section from 'Components/UI/Section';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';

export default function AkarBlock() {
  const { akar: akarData } = useRecoilValue(settingsAtom);

  const translate = useTranslate();

  if (!akarData?.title) {
    return null;
  }

  return (
    <Section>
      <div className="akar__content">
        <h1 className="akar__title">{akarData?.title}</h1>
        <p className="akar__description">{akarData?.description}</p>
      </div>
      <div className="akar__actions">
        <a
          href={akarData?.guidebook_link}
          target="_blank"
          rel="noreferrer"
          className="akar__button"
        >
          {translate('Гайдбук')}
        </a>
        <a
          href={akarData?.video_vk_link}
          target="_blank"
          rel="noreferrer"
          className="akar__button"
        >
          {translate('Выступления')}
        </a>
      </div>
    </Section>
  );
}
