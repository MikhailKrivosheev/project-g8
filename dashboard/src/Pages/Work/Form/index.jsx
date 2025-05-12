import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import Checkbox from 'Components/Form/Checkbox';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import { WorkContext } from 'Context/Work';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GalleryFiles from './Gallery';
import GalleryVideo from './GalleryVideo';
import { setDefaultValues } from './helpers';
import StatusSelectField from './StatusSelect';

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

export default function WorkForm() {
  const [work, setWork] = useContext(WorkContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(work),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting },
  } = methods;
  const statusWatcher = watch('status');

  const { handleError } = useAPIError(setError);

  const updateWork = async (values) => {
    try {
      const response = await Api.put(Api.routes.work(work.id), values);
      setWork(response.results);
      enqueueSnackbar(
        `Работа "${response.results.name_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    const sendValues = { ...values, gallery: values?.gallery_with_url };
    if (work?.id) {
      updateWork(sendValues);
    }
  }

  const onApproveClick = async () => {
    const status = 'confirmed';
    try {
      await Api.put(Api.routes.updateStatusWork(work.id), {
        status,
      });
      setWork((prevState) => ({ ...prevState, status }));
      enqueueSnackbar(`Работа "${work.name_ru}" одобрена`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  const onUpdateClick = async () => {
    try {
      await Api.put(Api.routes.updatePaymentWork(work?.id));
      enqueueSnackbar(`Работа "${work.name_ru}" успешно оплачена`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

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
        {work?.id && (
          <h2>
            Работу подал:{' '}
            <a
              href={routes.profile(work?.account?.id)}
              target="_blank"
              rel="noreferrer"
            >
              {work?.account?.first_name_ru} {work?.account?.last_name_ru}
            </a>
          </h2>
        )}

        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          className={classes.buttons}
        >
          <Grid item>
            {work && (
              <>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={onButtonDeleteClick}
                  style={{ marginRight: '20px' }}
                >
                  Удалить
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={onUpdateClick}
                  disabled={work?.is_paid}
                >
                  Работа оплачена
                </Button>
                <ModalDelete
                  open={openConfirmModal}
                  setOpen={setOpenConfirmModal}
                  redirectLink={routes.works()}
                  deleteUrl={Api.routes.work(work.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <StatusSelectField name="status" label="Статус работы" />
        <SimpleFormField
          variant="outlined"
          name="name_ru"
          label="Наименование работы на русском"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="name_en"
          label="Наименование работы на английском"
        />
        <SimpleFormField
          variant="outlined"
          name="brand_ru"
          label="Наименование бренда на русском"
        />
        <SimpleFormField
          variant="outlined"
          name="brand_en"
          label="Наименование бренда на английском"
        />
        <SimpleFormField
          variant="outlined"
          name="client_name_ru"
          label="Наименование автора на русском"
        />
        <SimpleFormField
          variant="outlined"
          name="client_name_en"
          label="Наименование автора на английском"
        />
        <EditorField
          variant="outlined"
          name="targets_and_goals_ru"
          label="Цели и задачи работы на русском"
        />
        <EditorField
          variant="outlined"
          name="targets_and_goals_en"
          label="Цели и задачи работы на английском"
        />
        <EditorField
          variant="outlined"
          name="ideas_and_solutions_ru"
          label="Идеи и решения на русском"
        />
        <EditorField
          variant="outlined"
          name="ideas_and_solutions_en"
          label="Идеи и решения на английском"
        />
        <SimpleFormField
          variant="outlined"
          name="company_ru"
          label="Компания, подающая работу (RU)"
        />
        <SimpleFormField
          variant="outlined"
          name="company_en"
          label="Компания, подающая работу (EN)"
        />
        <SimpleFormField
          variant="outlined"
          name="vimeo_link"
          label="Ссылка на Vimeo/VK video"
        />
        <SimpleFormField
          variant="outlined"
          name="soundcloud_link"
          label="Ссылка на soundcloud"
        />
        <SimpleFormField
          variant="outlined"
          name="project_link"
          label="Ссылка на проект"
        />
        <File
          name="preview"
          label="Превью работы"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <File
          name="video_preview"
          label="Превью для видео работы"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <File
          name="image_1"
          label="Изображение 1 (большое изображение)"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <File
          name="image_2"
          label="Изображение 2 (левое из двух изображений)"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <File
          name="image_3"
          label="Изображение 3 (правое из двух изображений)"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <File
          name="image_4"
          label="Изображение 4"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
        />
        <GalleryFiles />
        <GalleryVideo />
        <Checkbox name="is_featured" label="Попадет ли работа в feature" />
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
        {work?.status === 'moderation' && (
          <Button
            onClick={onApproveClick}
            type="button"
            variant="contained"
            color="primary"
            style={{ margin: '16px auto 0px 5px' }}
          >
            Одобрить
          </Button>
        )}
      </Form>
      {work.status === 'confirmed' ? (
        <a
          className="work__url"
          href={work.work_url}
          target="_blank"
          rel="noreferrer"
        >
          Смотреть работу
        </a>
      ) : (
        work.status !== 'declined' &&
        work.status !== 'deleted' && (
          <a
            className="work__url work__url--preview"
            href={work.work_preview_url}
            target="_blank"
            rel="noreferrer"
          >
            Смотреть превью работы
          </a>
        )
      )}
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
