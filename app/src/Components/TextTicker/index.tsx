import React, { Fragment, useEffect, useRef, useState } from 'react';
import Ticker from 'Components/Ticker';
import Section from 'Components/UI/Section';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import ArrowsLeft from './ArrowsLeft';
import ArrowsRight from './ArrowsRight';

export default function StatusTicker() {
  const season = useRecoilValue(seasonAtom);
  const [isVisible, setVisible] = useState(true);
  const firstMount = useRef(true);

  useEffect(() => {
    if (!firstMount.current) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
      }, 200);
    }
  }, [season]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  if (!season?.running_line || !isVisible) return null;

  return (
    <Section fullWidth>
      <Ticker className="text-ticker">
        {season?.running_line.map(({ name, url }, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {index % 2 === 0 ? <ArrowsRight /> : <ArrowsLeft />}
              {url ? <a href={url}>{name}</a> : <span>{name}</span>}
              {index % 2 === 0 ? <ArrowsLeft /> : <ArrowsRight />}
            </Fragment>
          );
        })}
      </Ticker>
    </Section>
  );
}
