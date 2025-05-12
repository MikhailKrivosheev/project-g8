import Button from 'Components/UI/Button';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import ConferenceFilter from './Filter';
import Reports from './Reports';
import Ticker from './Ticker';

export default function Conference() {
  const translate = useTranslate();
  const ROUTES = useRoutes();
  const { conference: conferenceContent } = useRecoilValue(settingsAtom);

  if (!conferenceContent) return null;

  return (
    <>
      <Section className="conference-page__section">
        <Title tag="h1">{translate('Конференция')}</Title>
        <img
          className="conference-page__info-image"
          src={conferenceContent.banner}
          alt="Conference stone"
        />
        <div className="conference-page__info">
          <QuillText
            dangerHTML={conferenceContent.text}
            className="conference-info__text"
          />

          <QuillText dangerHTML={conferenceContent.date} />
          <Button color="gray" sizeName="m" icon="plus" link={ROUTES.price()}>
            Купить билет
          </Button>
        </div>
      </Section>
      <Ticker />
      <ConferenceFilter />
      <Reports />
    </>
  );
}
