import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import { NominationInfoType } from './types';

export default function NominationInfo(props: NominationInfoType) {
  const { description } = props;
  const season = useRecoilValue(seasonAtom);
  const ROUTES = useRoutes();

  return (
    <div className="nomination-info">
      <div className="nomination-info__container">
        <Title className="nomination-info__title" tag="h3" sizeName="semi-m">
          Описание
        </Title>
        <Description
          className="nomination-info__description"
          dangerHTML={description}
        />
      </div>
      {season?.show_request_work_button && season?.status !== 'finished' && (
        <Button
          link={ROUTES.workCreate()}
          icon="star"
          className="nominations-info__button"
        >
          Подать работу
        </Button>
      )}
    </div>
  );
}
