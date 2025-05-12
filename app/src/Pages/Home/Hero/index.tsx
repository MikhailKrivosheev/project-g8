import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import HeroButton from './HeroButton';

export default function Hero() {
  const { home: homeContent } = useRecoilValue(settingsAtom);

  if (!homeContent) return null;

  return (
    <Section>
      <div className="hero">
        <div className="hero__content">
          <QuillText dangerHTML={homeContent.text} />
          <HeroButton />
        </div>
        <div className="hero__banner">
          <div className="hero__image-holder">
            <img src={homeContent.banner} alt="hero-banner" />
          </div>
        </div>
      </div>
    </Section>
  );
}
