import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import Api from 'Api';
import Form from 'Components/Form';
import Select from 'Components/Form/Select';
import IndependentSelect from 'Pages/Works/Filter/IndependentSelect';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import SimpleFormField from 'Components/Form/Simple';
import SortSelect from './SortSelect';
import YearSelect from './YearSelect';
import WorkContest from './WorkContest';
import WorkNomination from './WorkNomination';

const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
};

export default function UsersExportForm() {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = (values) => {
    if (!validateEmail(values.email)) {
      setError('email', {
        type: 'manual',
        message: 'Введен некорректный email',
      });
    } else {
      const fetchFile = async () => {
        const response = await Api.get(Api.routes.usersFile(), values);

        if (response?.success) {
          enqueueSnackbar(`Файл отправлен на указанную почту`, {
            variant: 'success',
          });
        } else {
          enqueueSnackbar(`Что-то пошло не так. Попробуйте позже.`, {
            variant: 'error',
          });
        }
      };

      fetchFile();
    }
  };

  return (
    <>
      <span className="users-export">Выгрузка пользователей</span>
      <Box mb={10}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              alignContent="flex-end"
              xs={12}
              item
              spacing={2}
              direction="row"
              wrap="wrap"
            >
              <Grid item xs={4}>
                <SortSelect name="role" label="Тип пользователя" />
              </Grid>
              <Grid item xs={4}>
                <YearSelect
                  name="register_year"
                  label="Год регистрации"
                  isRegistrationSelect
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  name="work_exists"
                  label="Подавал работу"
                  options={[
                    { label: 'Да', value: true },
                    { label: 'Нет', value: false },
                  ]}
                />
              </Grid>
              <Grid item xs={4}>
                <YearSelect
                  name="work_season_id"
                  label="Сезон подачи работы"
                  isRegistrationSelect={false}
                />
              </Grid>

              <WorkContest
                seasonName="work_season_id"
                asyncSelectName="work_contest_id"
              />

              <WorkNomination
                seasonName="work_season_id"
                contestName="work_contest_id"
                asyncSelectName="work_nomination_id"
              />
              <Grid item xs={4}>
                <IndependentSelect
                  name="nomination_work_stage"
                  label="Этап поданной работы"
                  filterType="nomination_work_stage"
                />
              </Grid>
            </Grid>

            <div className="users-export__button-wrapper">
              <SimpleFormField
                fullWidth={false}
                variant="outlined"
                name="email"
                label="Введите e-mail"
                type="text"
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: '8px 0 8px 20px', height: 'fit-content' }}
              >
                Экспорт
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Box>
    </>
  );
}
