import React, { useMemo } from 'react';
import { ISponsor } from 'Types';
import cn from 'classnames';
import LazyLoad from 'Components/LazyLoad';

interface IData {
  data: ISponsor;
  size?: string;
}

interface ObjectStyles {
  [key: string]: string;
}

const SIZES = {
  0: '80px',
  1: '115px',
  2: '150px',
  3: '250px',
};

export default function Sponsor({ data, size }: IData) {
  const sponsorClassname = cn('sponsor', {
    [`sponsor--${size}`]: size,
    'sponsor--full-width': data?.accented,
  });

  const imageClassName = cn('sponsor__image', {
    'sponsor__image--full-width': data?.accented,
  });

  const linkStyles = useMemo(() => {
    const colorLogo = data?.background_color_logo;
    let flexValue;
    if (size === 'high') {
      flexValue = Math.floor(Math.random() * (4 - 1) + 1);
    } else {
      flexValue = Math.floor(Math.random() * 4);
    }

    const styles: ObjectStyles = {
      flex: `${flexValue} 1 auto`,
    };
    if (colorLogo) {
      styles.backgroundColor = colorLogo;
    }
    if (size && size !== 'high') {
      styles.minWidth = SIZES[flexValue as keyof typeof SIZES];
    }
    return styles;
  }, []);

  return (
    <a
      href={data.link}
      target="_blank"
      className={sponsorClassname}
      style={linkStyles}
      rel="noreferrer"
    >
      <LazyLoad className={imageClassName} src={data.logo_url} alt="icon" />
    </a>
  );
}
