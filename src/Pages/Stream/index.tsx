import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import React from 'react';
import LeftSideHuman from './Images/LeftSideHuman';
import RightSideHuman from './Images/RightSideHuman';

export default function Stream() {
  return (
    <Section className="stream">
      <div className="stream__plug">
        <div className="stream__image--left">
          <LeftSideHuman />
        </div>

        <Description className="stream__plug-description">
          Здесь 13 сентября будет онлайн-трансляция, приобрести доступ можно тут
        </Description>
        <div className="stream__image--right">
          <RightSideHuman />
        </div>
      </div>
    </Section>
  );
}
