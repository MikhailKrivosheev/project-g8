import LazyLoad from 'Components/LazyLoad';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';

export default function PopularVote() {
  const { home: homeContent } = useRecoilValue(settingsAtom);
  const translate = useTranslate();

  if (!homeContent) return null;
  return (
    <Section>
      <div className="container popular-vote__container">
        <div className="popular-vote__block popular-vote__content">
          <Title tag="h1" className="popular-vote__title">
            {translate('Народное голосование')}
          </Title>
          <QuillText dangerHTML={homeContent.vote_text} />
        </div>

        <div className="popular-vote__block popular-vote__image">
          <LazyLoad src={homeContent.vote_banner} alt="popular-vote-banner" />
        </div>
      </div>
    </Section>
  );
}
