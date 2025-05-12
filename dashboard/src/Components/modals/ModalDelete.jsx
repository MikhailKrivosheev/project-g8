import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Api from 'Api';
import CustomTypography from 'Components/UI/Typography';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

export default function ModalDelete({
  open,
  setOpen,
  redirectLink = null,
  reloadPage,
  deleteUrl,
  questionText = 'Вы уверены, что хотите удалить запись?',
  description = 'Восстановить ее будет невозможно',
}) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const deleteItem = async () => {
    try {
      await Api.delete(deleteUrl);
      enqueueSnackbar(`Запись удалена`, {
        variant: 'success',
      });
      if (redirectLink) {
        history.push(redirectLink);
        setOpen(false);
      } else if (reloadPage) {
        window.location.reload();
      }
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };

  return (
    <Dialog className={classes.modal} onClose={handleClose} open={open}>
      <DialogTitle className={classes.modalTitle}>
        <CustomTypography tag="h2">{questionText}</CustomTypography>

        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.modalContent}>
        <CustomTypography type="body" color="gray">
          {description}
        </CustomTypography>
        <div className={classes.modalFooter}>
          <button
            type="button"
            onClick={handleClose}
            className={classes.rejectButton}
          >
            Оставить
          </button>
          <button
            type="button"
            onClick={deleteItem}
            className={classes.acceptButton}
          >
            Удалить
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
