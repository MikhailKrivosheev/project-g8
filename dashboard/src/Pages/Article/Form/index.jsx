import { DevTool } from '@hookform/devtools';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import Checkbox from 'Components/Form/Checkbox';
import Date from 'Components/Form/DateTime';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import { ArticleContext } from 'Context/Article';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Slider from './Slider';
import { setDefaultValues } from './helpers';

export default function ArticleForm() {
  const [article, setArticle] = useContext(ArticleContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(article),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateArticle = async (values) => {
    try {
      const response = await Api.put(Api.routes.article(article.id), values);
      setArticle(response.results);
      enqueueSnackbar(
        `Журнал "${response.results.title_ru}" успешно обновлен`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createArticle = async (values) => {
    try {
      const response = await Api.post(Api.routes.articles(), values);
      // reset(setDefaultValues(response.results));
      setArticle(response.results);
      enqueueSnackbar(`Журнал "${response.results.title_ru}" успешно создан`, {
        variant: 'success',
      });
      history.push(routes.article(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    const sendValues = { ...values, slider: values?.slider_url };
    if (article?.id) {
      updateArticle(sendValues);
    } else {
      createArticle(sendValues);
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
            {article && (
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
                  redirectLink={routes.articlePage()}
                  deleteUrl={Api.routes.article(article.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <SimpleFormField
          variant="outlined"
          name="title_ru"
          label="Заголовок"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="title_en"
          label="Title"
          required
        />
        <File
          name="thumbnail"
          label="Изображение"
          accept={['.png', '.jpg', '.jpeg', '.gif']}
        />
        <EditorField name="content_ru" label="Контент" />
        <EditorField name="content_en" label="Content" />
        <Checkbox name="is_fixed" label="Закреплено" />
        <Checkbox name="published" label="Статус видимости" />
        <Slider />
        <Date name="date_publish" label="Дата публикации" />
        <SimpleFormField variant="outlined" name="source" label="Источник" />
        <SimpleFormField
          variant="outlined"
          name="soundcloud_link"
          label="Ссылка на soundcloud"
        />
        <SimpleFormField
          variant="outlined"
          name="video_link"
          label="Ссылка на видео Vimeo/VK"
        />
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
