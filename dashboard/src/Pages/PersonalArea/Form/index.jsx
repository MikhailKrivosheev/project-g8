import { Button, CircularProgress } from '@material-ui/core';
import Api from 'Api';
import Form from 'Components/Form';
import File from 'Components/Form/File';
import { SettingsContext } from 'Context/Settings';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { setDefaultValues } from './helpers';

export default function PersonalAreaForm() {
  const [banner, setBanner] = useContext(SettingsContext);
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(banner),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const onSubmit = async (values) => {
    try {
      const response = await Api.put(Api.routes.settings(), values);
      setBanner(response.results);
      enqueueSnackbar(`Баннер успешно обновлен`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="form personal-area__form"
      >
        <h3>Баннер</h3>
        <File
          name="lk.banner"
          label="Баннер в лк пользователя (300х982)"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
          required
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
    </FormProvider>
  );
}
