import Api from 'Api';
import classNames from 'classnames';
import Button from 'Components/UI/Button';
import ModalComponent from 'Components/UI/Modal';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import React, { useState } from 'react';
import useTranslate from 'Hooks/useTranslate';

export default function DeleteItem({
  id,
  name,
  status,
  setWorksUser,
}: {
  id: number;
  name: string;
  status: string;
  // eslint-disable-next-line no-unused-vars
  setWorksUser: (array: any) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const translate = useTranslate();

  const { handleAPIError } = useAPIError();

  const svgClassNames = classNames('work-user__delete-svg', {
    'work-user__delete-svg--disabled': status !== 'draft',
  });

  async function deleteWork() {
    try {
      await Api.deleteRequest(Api.routes.api.work(id), {});
      setWorksUser((prev: any) => [
        ...prev.filter((user: any) => user.id !== id),
      ]);
      setOpen(false);
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  return (
    <>
      <div className="work-user__work-delete">
        <svg
          onClick={() => {
            if (status === 'draft') setOpen(true);
          }}
          className={svgClassNames}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 110.61 122.88"
        >
          <path d="M39.27 58.64a4.74 4.74 0 1 1 9.47 0v35.08a4.74 4.74 0 1 1-9.47 0V58.64Zm63.6-19.86L98 103a22.29 22.29 0 0 1-6.33 14.1 19.41 19.41 0 0 1-13.88 5.78h-45a19.4 19.4 0 0 1-13.86-5.78 22.31 22.31 0 0 1-6.34-14.1L7.74 38.78H0V25c0-3.32 1.63-4.58 4.84-4.58h22.74v-9.63A10.82 10.82 0 0 1 38.37 0h33.87A10.82 10.82 0 0 1 83 10.79v9.62h23.35a6.19 6.19 0 0 1 1 .06 3.86 3.86 0 0 1 3.24 3.53V38.78Zm-9.5.17H17.24L22 102.3a12.82 12.82 0 0 0 3.57 8.1 10 10 0 0 0 7.19 3h45a10.06 10.06 0 0 0 7.19-3 12.8 12.8 0 0 0 3.59-8.1L93.37 39ZM71 20.41v-8.36H39.64v8.36Zm-9.13 38.23a4.74 4.74 0 1 1 9.47 0v35.08a4.74 4.74 0 1 1-9.47 0V58.64Z" />
        </svg>
      </div>
      <ModalComponent contentClassName="account-modal" state={[open, setOpen]}>
        <Title sizeName="m" align="center">
          {translate('Вы уверены, что хотите удалить работу')} «{name}»
        </Title>
        <div className="work-user__modal-buttons">
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              deleteWork();
            }}
            fullWidth
            align="center"
            color="gray"
          >
            Да
          </Button>
          <Button
            disabled={disabled}
            onClick={() => setOpen(false)}
            fullWidth
            align="center"
            color="gray"
          >
            Нет
          </Button>
        </div>
      </ModalComponent>
    </>
  );
}
