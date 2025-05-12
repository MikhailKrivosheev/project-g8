import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import JuryCards from './Cards';

export default function Jury() {
  const data = useRecoilValue(settingsAtom);
  const season = useRecoilValue(seasonAtom);

  return (
    <Section className="jury-page">
      <Title sizeName="l">Жюри</Title>
      <img className="jury-page__image" src={data.jury?.banner} alt="hero" />
      {data?.jury?.text && (
        <QuillText
          dangerHTML={data.jury.text}
          className="jury-page__description"
          size="big"
        />
      )}
      {/* <JuryFilter /> */}
      {season?.status !== 'finished' && <JuryCards />}
    </Section>
  );
}
