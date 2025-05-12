import Api from 'Api';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useState } from 'react';
import cn from 'classnames';
import Title from 'Components/UI/Title';

export default function ContestStageButton({ contestId }) {
  const ROUTES = useRoutes();
  const [isModalActive, setModalActive] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const { handleAPIError } = useAPIError();

  async function changeContestStage() {
    try {
      const { success } = await Api.put(Api.routes.api.contest(contestId), {
        stage_code: 'grand_prix',
      });
      if (success) {
        window.location = `${window.location.origin}${ROUTES.account()}`;
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  const modalClassNames = cn('sure-modal', {
    'sure-modal--active': isModalActive,
  });

  return (
    <>
      <Button
        onClick={() => {
          setModalActive(true);
        }}
        disabled={disabled}
        fullWidth
        icon="star"
        color="transparent"
      >
        Перейти в Grand-Prix
      </Button>

      <div className={modalClassNames}>
        <Title sizeName="m" className="sure-modal__main-text">
          Вы уверены, что хотите продолжить?
        </Title>
        <span className="sure-modal__secondary-text">
          Вы завершаете выбор победителей в номинациях и переходите к этапу
          Grand Prix.
        </span>
        <Button
          className="sure-modal__button"
          onClick={() => {
            setModalActive(false);
            setDisabled(true);
            changeContestStage();
          }}
        >
          Я уверен/а
        </Button>
      </div>
    </>
  );
}
