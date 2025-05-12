import cn from 'classnames';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useResize from 'Hooks/useResize';
import useTranslate from 'Hooks/useTranslate';
import StarIcon from 'Icons/StarIcon';
import ConferenceTicker from 'Pages/Home/ConferenceTicker';
import React, { useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import seasonAtom from 'Recoil/Atoms/Season';

export default function Ticker() {
  const { isDesktop } = useResize();
  const [mouseOver, setMouseOver] = useState(false);
  const translate = useTranslate();
  const notificationClassName = cn('conference-page__ticker-notification', {
    'conference-page__ticker-notification--active': mouseOver,
  });
  // const season = useRecoilValue(seasonAtom);

  return (
    <Section noMargin fullWidth>
      <Title className="conference-page__ticker-title">
        {translate('Программа')}
        <StarIcon />
        <div
          role="button"
          tabIndex={0}
          onClick={() => setMouseOver((prev) => !prev)}
          onKeyDown={(e) => e.key === 'Enter' && setMouseOver((prev) => !prev)}
          onMouseOver={() => isDesktop && setMouseOver(true)}
          onMouseOut={() => isDesktop && setMouseOver(false)}
          onFocus={() => isDesktop && setMouseOver(true)}
          onBlur={() => isDesktop && setMouseOver(false)}
        >
          <u>pdf</u>
        </div>
        <div className={notificationClassName}>Программа в разработке</div>
        {/* <a href={season?.program_url || ''} target="_blank" rel="noreferrer">
          pdf
        </a> */}
      </Title>

      <ConferenceTicker className="conference__ticker" />
    </Section>
  );
}
