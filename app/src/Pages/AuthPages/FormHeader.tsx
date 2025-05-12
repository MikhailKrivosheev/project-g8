import Button from 'Components/UI/Button';
import Title from 'Components/UI/Title';
import React from 'react';

interface IFormHeader {
  title: string;
  link: string;
  linkText: string;
}

export default function FormHeader({ title, link, linkText }: IFormHeader) {
  return (
    <div className="auth-form__header">
      <Title>{title}</Title>
      <Button
        sizeName="s"
        strached
        className="auth-form__link"
        color="gray"
        link={link}
      >
        {linkText}
      </Button>
    </div>
  );
}
