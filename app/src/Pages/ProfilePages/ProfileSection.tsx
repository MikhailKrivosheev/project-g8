import classNames from 'classnames';
import Section from 'Components/UI/Section';
import React from 'react';
import AccountBackground from './Background';

export default function ProfileSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const secionClassNames = classNames('works-nomination', className);

  return (
    <>
      <AccountBackground />
      <Section className={secionClassNames} fullWidth>
        {children}
      </Section>
    </>
  );
}
