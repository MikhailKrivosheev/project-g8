import Button from 'Components/UI/Button';
import Link from 'Components/UI/Link';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';

export default function Conference() {
  const ROUTES = useRoutes();
  const translate = useTranslate();
  const { home: homeContent, conference: conferenceContent } =
    useRecoilValue(settingsAtom);

  if (!homeContent) return null;

  return (
    <>
      <Section>
        <Title sizeName="l">{translate('Конференция')}</Title>
        <div className="conference-info">
          <QuillText
            dangerHTML={homeContent.conference_text}
            className="conference-info__text"
          />
          <QuillText dangerHTML={conferenceContent.location}>
            {conferenceContent.date}
          </QuillText>
          <Button
            color="gray"
            arrowColor="black"
            fullWidth
            icon="plus"
            align="center"
            link={ROUTES.price()}
          >
            {translate('Купить билет')}
          </Button>
        </div>
      </Section>
      {/* <Section noMargin fullWidth>
        <ConferenceTicker className="conference__ticker" />
      </Section> */}
      <Section noMargin isWide>
        <Link href={ROUTES.conference()}>{translate('Конференция')}</Link>
      </Section>
    </>
  );
}
