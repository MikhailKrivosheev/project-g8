import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import { SponsorTypeContext } from 'Context/SponsorType';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import ImageBig from '../../../../public/images/sponsor-big.png';
import { setDefaultValues } from './helpers';
import SponsorTypeSelect from './SponsorTypeSelect';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: '12px',
    '& p': {
      margin: '10px 0 0',
    },
    '& img': {
      width: '100%',
      objectFit: 'cover',
    },
  },
  tooltipConteiner: {
    marginLeft: '10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function SponsorTypeForm() {
  const [sponsorType, setSponsorType] = useContext(SponsorTypeContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(sponsorType),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateSponsorType = async (values) => {
    try {
      const response = await Api.put(
        Api.routes.sponsorType(sponsorType.id),
        values
      );
      setSponsorType(response.results);
      enqueueSnackbar(
        `Тип спонсора "${response.results.title_ru}" успешно обновлен`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createSponsorType = async (values) => {
    try {
      const response = await Api.post(Api.routes.sponsorTypes(), values);
      // reset(setDefaultValues(response.results));
      setSponsorType(response.results);
      enqueueSnackbar(
        `Тип спонсора "${response.results.title_ru}" успешно создан`,
        {
          variant: 'success',
        }
      );
      history.push(routes.sponsorType(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (sponsorType?.id) {
      updateSponsorType(values);
    } else {
      createSponsorType(values);
    }
  }

  function onError(errors) {
    const errorField = Object.values(errors).find((obj) => obj.ref.name);
    if (!errorField) return;
    const { name } = errorField.ref;
    const input = document.querySelector(`input[name=${name}]`);
    try {
      input.focus();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const onButtonDeleteClick = () => {
    setOpenConfirmModal(true);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item>
            {sponsorType && (
              <>
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
                  redirectLink={routes.sponsorTypePage()}
                  deleteUrl={Api.routes.sponsorType(sponsorType.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <SimpleFormField
          variant="outlined"
          name="title_ru"
          label="Наименования типа спонсора, например, Организатор"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="title_en"
          label="Наименования типа спонсора (на английском)"
        />
        <Box className={classes.container}>
          <SponsorTypeSelect name="block_type" label="Размер типа спонсора" />
          <Tooltip
            className={classes.tooltipConteiner}
            title={
              <div style={{ fontSize: '14px' }} className={classes.tooltip}>
                Размеры: <br />
                <p>Пример большой иконки спонсора</p>
                <br />
                <img src="/dashboard/images/sponsor-big.png" alt="Big" />
                <p>Пример маленькой иконки спонсора</p>
                <br />
                <img src="/dashboard/images/sponsor-small.png" alt="Small" />
                <br />
              </div>
            }
            placement="right"
          >
            <IconButton aria-label="delete">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={
            isSubmitting && <CircularProgress color="secondary" size={20} />
          }
        >
          Сохранить
        </Button>
      </Form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
