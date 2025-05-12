import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ModalDelete from 'Components/modals/ModalDelete';
import { useState } from 'react';

export default function DeleteEntity({ gap = 2, entity, deleteUrl, redirect }) {
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
        deleteUrl={deleteUrl(entity.id)}
      />
    </Box>
  );
}
