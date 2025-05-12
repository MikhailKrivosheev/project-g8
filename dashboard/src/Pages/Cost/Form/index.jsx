import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import Checkbox from 'Components/Form/Checkbox';
import EditorField from 'Components/Form/Editor';
import { CostContext } from 'Context/Cost';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { setDefaultValues } from './helpers';
import TypeSelect from './TypeSelect';
import WidgetType from './WidgetType';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    marginBottom: '15px',
  },
});

const createNewValues = (values) => {
  return values?.type === 'submit_job'
    ? {
        ...values,
        widget_type: null,
        data_tc_token: null,
        data_tc_event: null,
        timepad_event_id: null,
        timepad_customized_id: null,
      }
    : values;
};

export default function CostForm() {
  const [cost, setCost] = useContext(CostContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(cost),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    watch,
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const typeWatcher = watch('type');

  const { handleError } = useAPIError(setError);

  const updateCost = async (values) => {
    const newValues = createNewValues(values);

    try {
      const response = await Api.put(Api.routes.cost(cost.id), newValues);
      setCost(response.results);
      enqueueSnackbar(
        `Стоимость "${response.results.title_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createCost = async (values) => {
    const newValues = createNewValues(values);

    try {
      const response = await Api.post(Api.routes.costs(), newValues);
      // reset(setDefaultValues(response.results));
      setCost(response.results);
      enqueueSnackbar(
        `Стоимость "${response.results.title_ru}" успешно создана`,
        {
          variant: 'success',
        }
      );
      history.push(routes.costPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (cost?.id) {
      updateCost(values);
    } else {
      createCost(values);
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
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          className={classes.buttons}
        >
          <Grid item>
            {cost && (
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
                  redirectLink={routes.costs()}
                  deleteUrl={Api.routes.cost(cost.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <TypeSelect name="type" label="Тип блока" />
        {typeWatcher === 'buy_ticket' && (
          <WidgetType name="widget_type" label="Тип виджета оплаты" />
        )}
        <SimpleFormField
          variant="outlined"
          name="title_ru"
          label="Наименование на русском"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="title_en"
          label="Наименование на английском"
          required
        />
        <EditorField name="description_ru" label="Описание на русском" />
        <EditorField name="description_en" label="Описание на английском" />
        <SimpleFormField
          variant="outlined"
          name="button_text_ru"
          label="Текст кнопки"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="button_text_en"
          label="Текст кнопки (англ)"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="price"
          label="Стоимость"
          type="number"
          required
        />
        {typeWatcher === 'buy_ticket' && (
          <>
            <SimpleFormField
              variant="outlined"
              name="data_tc_event"
              label="Идентификатор мероприятия на ticketscloud"
            />
            <SimpleFormField
              variant="outlined"
              name="data_tc_token"
              label="Токен мероприятия на ticketscloud"
            />
            <SimpleFormField
              variant="outlined"
              name="timepad_event_id"
              label="Идентификатор мероприятия на timepad"
            />
            <SimpleFormField
              variant="outlined"
              name="timepad_customized_id"
              label="Идентификатор кастомизации на timepad"
            />
          </>
        )}
        <Checkbox name="published" label="Статус видимости" />
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
