import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import useTranslate from 'Hooks/useTranslate';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import { TelegramShareButton, VKShareButton } from 'react-share';

const SHARINGS = [
  { component: TelegramShareButton, label: 'Тг' },
  { component: VKShareButton, label: 'Вк' },
];

const SHARE_TITLE = 'Фестиваль креативных индустрий';

interface IShare extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  link?: string;
}

export default function Share({ className, title, link }: IShare) {
  const shareClassNames = classNames('share', className);
  const translate = useTranslate();

  return (
    <Section>
      <div className="work__share">
        <Description>{translate('Поделиться')}</Description>
        <ul className={shareClassNames}>
          {SHARINGS.map(({ component: Component, label }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="share__link-wrapper" key={index}>
              <Component
                className="share__link"
                resetButtonStyle
                url={
                  link ? `${window.origin}${link}` : 'https://ggggggggfest.com'
                }
                title={title || SHARE_TITLE}
              >
                {label}
              </Component>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
