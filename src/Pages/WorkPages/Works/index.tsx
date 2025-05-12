import ErrorBoundary from 'Components/ErrorBoundary';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import WorksCards from './Cards';
import Filter from './Filter';

export default function WorksPage() {
  const data = useRecoilValue(settingsAtom);

  return (
    <ErrorBoundary>
      <Section className="works-page">
        <Title>Работы</Title>
        <img
          className="works-page__image"
          src={data.works?.banner}
          alt="hero"
        />
        {data?.works?.text && (
          <QuillText
            dangerHTML={data.works.text}
            className="works-page__description"
            size="big"
          />
        )}

        <Filter />
        <WorksCards />
      </Section>
    </ErrorBoundary>
  );
}
