import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress } from '@material-ui/core';
import Api from 'Api';
import Form from 'Components/Form';
import { SettingsContext } from 'Context/Settings';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formatData } from 'Utilities/formatData';
import Fields from './Fields';
import { setDefaultValues } from './helpers';

export default function MainForm() {
  const [settingsData, setSettingsData] = useContext(SettingsContext);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(settingsData),
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const { handleError } = useAPIError(setError);

  const onSubmit = async (values) => {
    try {
      const formattedData = formatData(values, settingsData);

      const response = await Api.put(Api.routes.settings(), formattedData);
      if (response?.results) {
        // setSettingsData(response.results);
        window.location.reload();
      }

      enqueueSnackbar(`Сохранено успешно`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Fields />
          <Button
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={
              isSubmitting && <CircularProgress color="secondary" size={20} />
            }
          >
            Сохранить
          </Button>
          {/* {Object.keys(errors).length > 0 && <ErrorsHandler errors={errors} />} */}
          <DevTool />
        </Form>
      </FormProvider>
    </>
  );
}
