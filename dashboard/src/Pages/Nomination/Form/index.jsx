import Api from 'Api';
import Form from 'Components/Form';
import { NominationContext } from 'Context/Nomination';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import StatusSelectField from './StatusSelect';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyInput from 'Components/Form/CurrencyInput';
import DeleteEntity from 'Components/Form/DeleteEntityNew';
import FormField from 'Components/Form/Field';
import Radio from 'Components/Form/Radio';
import TextArea from 'Components/Form/TextArea';
import TextInput from 'Components/Form/TextInput';
import ToggleCheckbox from 'Components/Form/ToggleCheckbox';
import Button from 'Components/UI/Button';
import useQueryParams from 'Hooks/useQueryParams';
import { VALIDATION_SCHEMA } from './constants';
import { setDefaultValues } from './helpers';

const notPublished = {
  label: 'Не опубликовано',
  value: 'false',
  caption: 'Страница не видна на сайте G8',
};

const published = {
  label: 'Опубликовано',
  value: 'true',
  caption: 'Страница видна всем пользователям G8',
};

export default function NominationForm() {
  const [nomination, setNomination] = useContext(NominationContext);
  const { seasonName, seasonId, contestId } = useQueryParams();
  const history = useHistory();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(nomination),
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateNomination = async (values) => {
    try {
      const response = await Api.put(Api.routes.nomination(nomination.id), {
        ...values,
        contest_id: contestId,
      });
      setNomination(response.results);
      enqueueSnackbar(
        `Номинация "${response.results.name_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createNomination = async (values) => {
    try {
      const response = await Api.post(Api.routes.nominations(), {
        ...values,
        contest_id: contestId,
      });
      setNomination(response.results);
      enqueueSnackbar(
        `Номинация "${response.results.name_ru}" успешно создана`,
        {
          variant: 'success',
        }
      );
      history.push(
        `${routes.nominationPage(
          seasonId,
          contestId,
          response.results.id
        )}?season_name=${seasonName}&contest_name=${
          response.results.contest?.name_ru
        }&nomination_name=${response.results?.name_ru}`
      );
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (nomination?.id) {
      updateNomination(values);
    } else {
      createNomination(values);
    }
  }

  return (
    <section className="form-section nomination">
      <FormProvider {...methods}>
        <Form
          className="form-section__content nomination-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-section__fields-block nomination-form__fields-block">
            <FormField
              fieldLabel="Публикация"
              labelClassName="nomination-form__radio-label"
              name="status"
            >
              <Radio
                name="published"
                defaultValue={nomination?.published}
                options={[notPublished, published]}
                isCaptions
              />
            </FormField>
          </div>

          <div className="form-section__fields-block nomination-form__fields-block">
            <FormField
              fieldLabel="Название номинации (RU)"
              required
              name="name_ru"
            >
              <TextInput
                variant="outlined"
                name="name_ru"
                label="Введите название"
              />
            </FormField>
            <FormField fieldLabel="Название номинации (EN)" name="name_en">
              <TextInput
                variant="outlined"
                name="name_en"
                label="Введите название"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block nomination-form__fields-block">
            <FormField fieldLabel="Стоимость" name="amount">
              <CurrencyInput
                name="amount"
                label="Введите стоимость"
                currencySuffix="₽"
                groupSeparator=" "
                className="nomination-form__amount"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block nomination-form__fields-block">
            <FormField
              fieldLabel="Описание (RU)"
              name="description_ru"
              fieldClassName="form-field--textarea"
            >
              <TextArea
                name="description_ru"
                label="Опишите номинацию"
                placeHolder="Опишите номинацию"
              />
            </FormField>
            <FormField
              fieldLabel="Описание (EN)"
              name="description_en"
              fieldClassName="form-field--textarea"
            >
              <TextArea
                name="description_en"
                label="Опишите номинацию"
                placeHolder="Опишите номинацию (EN)"
              />
            </FormField>
          </div>

          <FormField name="is_young">
            <ToggleCheckbox name="is_young" heading="Номинация Young" />
          </FormField>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="nomination-form__submit-button"
          >
            Сохранить
          </Button>

          {nomination?.id && (
            <DeleteEntity
              buttonText="Удалить номинацию"
              deleteUrl={Api.routes.nomination}
              id={nomination?.id}
              questionText="Вы точно хотите удалить номинацию?"
              description="Удаленную номинацию нельзя будет вернуть"
              redirect={`${routes.nominations(
                seasonId,
                contestId
              )}?season_name=${seasonName}&contest_name=${
                nomination.contest?.name_ru
              }`}
            />
          )}
        </Form>
        <DevTool />
      </FormProvider>
    </section>
  );
}
