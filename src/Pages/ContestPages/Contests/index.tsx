import ContestsGroup from 'Components/Contests';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function Contests() {
  const { awards: awardsContent } = useRecoilValue(settingsAtom);

  if (!awardsContent) return null;

  return (
    <>
      <Section overflow="hidden" className="contests-hero">
        <h1 className="title">G8 Creative Awards</h1>
        <img
          className="contests-hero__image"
          src={awardsContent.banner}
          alt="hero"
        />
        <QuillText
          dangerHTML={awardsContent.text}
          className="contests-hero__description"
          size="big"
        />
      </Section>
      <ContestsGroup />
    </>
  );
}
