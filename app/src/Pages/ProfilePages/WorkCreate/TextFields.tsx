import Description from 'Components/UI/Description';
import EditorField from 'Components/UI/Form/EditorField';
import GrayField from 'Components/UI/Form/GrayInput';
import Title from 'Components/UI/Title';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import activeContestAtom from 'Recoil/Atoms/ActiveContest';

type TRules = {
  rules: {
    brand: { required: boolean };
    vimeo_link: {
      required: boolean;
    };
    slider_images: {
      required: boolean;
    };
    slider_videos: {
      required: boolean;
    };
    company: {
      required: boolean;
    };
  };
};

function TextFields({ rules }: TRules) {
  const activeContest = useRecoilValue(activeContestAtom);
  const translate = useTranslate();

  return (
    <div className="account__info work-create__info">
      <Title sizeName="s">Название работы*</Title>
      <GrayField
        maxLength={65}
        label={translate('На русском')}
        name="name_ru"
        required
      />
      <GrayField required maxLength={65} label="На английском" name="name_en" />
      {!activeContest?.label?.toLowerCase().includes('музыка') &&
        !activeContest?.label?.toLowerCase().includes('архитектура') &&
        !activeContest?.label?.toLowerCase().includes('music') &&
        !activeContest?.label?.toLowerCase().includes('architecture') && (
          <>
            <Title sizeName="s">
              {`Рекламируемый бренд${rules?.brand?.required ? '*' : ''}`}
            </Title>
            <GrayField
              required={rules?.brand?.required}
              maxLength={65}
              label="На русском"
              name="brand_ru"
            />
            <GrayField
              required={rules?.brand?.required}
              maxLength={65}
              label="На английском"
              name="brand_en"
            />
          </>
        )}
      <Title sizeName="s">Автор*</Title>
      <GrayField
        maxLength={65}
        label="На русском"
        name="client_name_ru"
        required
      />
      <GrayField
        required
        maxLength={65}
        label="На английском"
        name="client_name_en"
      />
      <Title sizeName="s">
        {`Компания, подающая работу${rules?.company?.required ? '*' : ''}`}
      </Title>
      <Description sizeName="s" color="gray">
        {translate(
          `Данное название компании будет фигурировать в дипломе победителя. Если нет компании, продублируйте автора. ${
            rules?.company?.required ? '*' : ''
          }`
        )}
      </Description>
      <GrayField
        maxLength={65}
        label={translate('На русском')}
        name="company_ru"
        required={rules?.company?.required}
      />
      <GrayField
        maxLength={65}
        label="На английском"
        name="company_en"
        required={rules?.company?.required}
      />
      <Title sizeName="s">Цели и задачи проекта*</Title>
      <Description sizeName="s" color="gray">
        {translate(
          'Чего вы хотели достичь этой работой (цели) и какие шаги для этого предприняли (задачи).*'
        )}
      </Description>
      <EditorField
        maxLength={600}
        label={translate('На русском')}
        name="targets_and_goals_ru"
        required
      />
      <EditorField
        maxLength={600}
        label="На английском"
        name="targets_and_goals_en"
        required
      />
      <Title sizeName="s">Идеи и решения*</Title>
      <Description color="gray" sizeName="s">
        {translate(
          'Какая история стоит за вашим проектом — расскажите про подход, идею, опишите контекст и результаты. Если нужно, добавьте ссылки.*'
        )}
      </Description>
      <EditorField
        maxLength={1000}
        label={translate('На русском')}
        name="ideas_and_solutions_ru"
        required
      />
      <EditorField
        maxLength={1000}
        label="На английском"
        name="ideas_and_solutions_en"
        required
      />
      <Title sizeName="s">{translate('Ссылка на проект*')}</Title>
      <GrayField
        closeButton
        label={translate('Ссылка на проект')}
        name="project_link"
        required
      />
      <Title sizeName="s">{translate('Ссылка на проект в СМИ')}</Title>
      <Description color="gray" sizeName="s">
        {translate(
          'Если о вашем проекте писали медиа, добавьте ссылку на публикацию. Пункт необязательный, но полезный для жюри.'
        )}
      </Description>
      <GrayField
        closeButton
        label={translate('Ссылка на проект в СМИ')}
        name="media_link"
      />
    </div>
  );
}

export default React.memo(TextFields);
