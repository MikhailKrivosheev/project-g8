import Button from '@material-ui/core/Button';
import ModalDelete from 'Components/modals/ModalDelete';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';

export default function DeleteUser({
  gap = 2,
  entity,
  deleteUrl,
  redirect,
  reloadPage,
}) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onButtonDeleteClick = () => {
    setOpenConfirmModal(true);
  };

  if (!entity) {
    return null;
  }

  return (
    <Box mb={gap}>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={onButtonDeleteClick}
      >
        Удалить
      </Button>
      <ModalDelete
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        redirectLink={redirect}
        reloadPage={reloadPage}
        deleteUrl={deleteUrl(entity)}
      />
    </Box>
  );
}
