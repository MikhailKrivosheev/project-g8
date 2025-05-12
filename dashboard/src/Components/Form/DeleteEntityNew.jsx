import ModalDelete from 'Components/modals/ModalDelete';
import Button from 'Components/UI/Button';
import TrashBox from 'Icons/TrashBox';
import { useState } from 'react';

export default function DeleteEntity({
  id,
  deleteUrl,
  buttonText,
  questionText,
  reloadPage,
  description,
  redirect,
}) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onButtonDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmModal(true);
  };

  if (!id) {
    return null;
  }

  return (
    <div className="delete-entity">
      <Button
        type="button"
        variant="third"
        onClick={onButtonDeleteClick}
        className="delete-entity__button"
      >
        <TrashBox /> {buttonText}
      </Button>
      <ModalDelete
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        deleteUrl={deleteUrl(id)}
        questionText={questionText}
        reloadPage={reloadPage}
        redirectLink={redirect}
        description={description}
      />
    </div>
  );
}
