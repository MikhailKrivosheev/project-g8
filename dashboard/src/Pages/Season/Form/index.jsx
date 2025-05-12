import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import Api from 'Api';
import Form from 'Components/Form';
import FormField from 'Components/Form/Field';
import FileNative from 'Components/Form/FileNative';
import Radio from 'Components/Form/Radio';
import TextInput from 'Components/Form/TextInput';
import ToggleCheckbox from 'Components/Form/ToggleCheckbox';
import Button from 'Components/UI/Button';
import { SeasonContext } from 'Context/Season';
import { SeasonsContext } from 'Context/Seasons';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { VALIDATION_SCHEMA } from './constants';
import DatePicker from './Fields/DatePicker';
import Payment from './Fields/Payment';
import RunningLine from './Fields/RunningLine';
import StageSelectField from './Fields/StageSelect';
import { setDefaultValues } from './helpers';

const hiddenOption = {
  label: 'Скрыто',
  value: 'hidden',
  caption: 'Сезон виден только в админке',
};

const activeOption = {
  label: 'Активно',
  value: 'active',
  caption:
    'Сезон виден в админке и на странице G8, активный сезон может быть только один. После сохранения активный сезон нельзя скрыть',
};

const finishedOption = {
  label: 'Завершено',
  value: 'finished',
  caption:
    'Сезон уходит в архив. После сохранения завершенный сезон нельзя скрыть',
};

const getStatusOptions = (status, id) => {
  if (!id) {
    return [hiddenOption, activeOption, finishedOption];
  }

  if (status !== 'hidden') {
    return [activeOption, finishedOption];
  }

  return [hiddenOption, activeOption, finishedOption];
};

export default function SeasonForm() {
  const [season, setSeason] = useContext(SeasonContext);
  const [seasons, ,] = useContext(SeasonsContext);
  const history = useHistory();
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(season),
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid },
    watch,
  } = methods;

  const copyContestsWatcher = watch('copy_contests');

  const { handleError } = useAPIError(setError);
  const isActiveSeasonExists = !!seasons?.results?.find(
    ({ status }) => status === 'active'
  );

  const updateSeason = async (values) => {
    const {
      running_line_ru_name: runningLineRuName,
      running_line_ru_url: runningLineRuUrl,
      running_line_en_name: runningLineEnName,
      running_line_en_url: runningLineEnUrl,
      ...restValues
    } = values;

    const newValues = {
      ...restValues,
      popup_form: 'not_show_popups',
      running_line_ru: [{ name: runningLineRuName, url: runningLineRuUrl }],
      running_line_en: [{ name: runningLineEnName, url: runningLineEnUrl }],
    };

    try {
      const response = await Api.put(Api.routes.season(season.id), newValues);
      setSeason(response.results);
      enqueueSnackbar(`Сезон "${response.results.id}" успешно обновлено`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  const createSeason = async (values) => {
    const {
      running_line_ru_name: runningLineRuName,
      running_line_ru_url: runningLineRuUrl,
      running_line_en_name: runningLineEnName,
      running_line_en_url: runningLineEnUrl,
      ...restValues
    } = values;

    const newValues = {
      ...restValues,
      running_line_ru: [{ name: runningLineRuName, url: runningLineRuUrl }],
      running_line_en: [{ name: runningLineEnName, url: runningLineEnUrl }],
    };

    try {
      const response = await Api.post(Api.routes.seasons(), newValues);
      // reset(setDefaultValues(response.results));
      setSeason(response.results);
      enqueueSnackbar(`Мероприятие "${response.results.id}" успешно создано`, {
        variant: 'success',
      });
      history.push(routes.seasonPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (season?.id) {
      updateSeason(values);
    } else {
      createSeason(values);
    }
  }

  function onError(errors) {
    const firstErrorField = Object.keys(errors)[0];

    if (firstErrorField) {
      const firstInput = document.querySelector(`[name="${firstErrorField}"]`);

      if (firstInput) {
        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInput.focus();
      }
    }
  }

  return (
    <section className="form-section season">
      <FormProvider {...methods}>
        <Form
          className="form-section__content season-form"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="form-section__fields-block season-form__fields-block">
            <FormField
              fieldLabel="Состояние сезона"
              labelClassName="season-form__radio-label"
              name="status"
            >
              <Radio
                name="status"
                defaultValue={season?.status}
                options={getStatusOptions(season?.status, season?.id)}
                isCaptions
                isActiveSeasonExists={isActiveSeasonExists}
              />
            </FormField>
          </div>

          <div className="form-section__fields-block season-form__fields-block">
            <FormField fieldLabel="Название сезона" required name="year">
              <TextInput
                variant="outlined"
                name="year"
                label="Введите название"
              />
            </FormField>
            {season?.status !== 'finished' && (
              <FormField
                fieldLabel="Этапы сезона"
                required
                name="contest_stage_code"
              >
                <StageSelectField
                  name="contest_stage_code"
                  label="Этапы сезона"
                />
              </FormField>
            )}

            <FormField fieldLabel="Дата начала и окончания сезона">
              <div className="form-section__fields-block season-form__date-holder">
                <DatePicker
                  name="start_date"
                  label="Выберите дату"
                  caption="Дата начала"
                />
                <DatePicker
                  name="end_date"
                  label="Выберите дату"
                  caption="Дата окончания"
                />
              </div>
            </FormField>
          </div>

          <div className="form-section__fields-block season-form__fields-block">
            <FormField fieldLabel="Тип платежной системы для подачи работ">
              <Payment name="payment_system" />
            </FormField>
          </div>

          <div className="form-section__fields-block season-form__fields-block">
            <FormField
              fieldLabel="Файл гайдбука"
              name={['guidebook_ru', 'guidebook_en']}
              isWithErrorMessage={false}
            >
              <div className="form-section__fields-block season-form__files-holder">
                <FileNative
                  name="guidebook_ru"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="ru"
                  caption="PDF, не более 12 Мб"
                />
                <FileNative
                  name="guidebook_en"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="en"
                  caption="PDF, не более 12 Мб"
                />
              </div>
            </FormField>
            <FormField
              fieldLabel="Файл правил"
              name={['rules_ru', 'rules_en']}
              isWithErrorMessage={false}
            >
              <div className="form-section__fields-block season-form__files-holder">
                <FileNative
                  name="rules_ru"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="ru"
                  caption="PDF, не более 12 Мб"
                />
                <FileNative
                  name="rules_en"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="en"
                  caption="PDF, не более 12 Мб"
                />
              </div>
            </FormField>
            <FormField
              fieldLabel="Файл программы"
              name={['program_ru', 'program_en']}
              isWithErrorMessage={false}
            >
              <div className="form-section__fields-block season-form__files-holder">
                <FileNative
                  name="program_ru"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="ru"
                  caption="PDF, не более 12 Мб"
                />
                <FileNative
                  name="program_en"
                  accept={['.pdf', '.txt', '.docx']}
                  heading="en"
                  caption="PDF, не более 12 Мб"
                />
              </div>
            </FormField>
          </div>

          <div className="form-section__fields-block season-form__fields-block">
            <FormField
              fieldLabel="Бегущая строка (RU)"
              name="running_line_ru_name"
            >
              <RunningLine name="running_line_ru_name" />
            </FormField>
            <FormField fieldLabel="Ссылка" name="running_line_ru_url">
              <TextInput
                variant="outlined"
                name="running_line_ru_url"
                label="Ссылка"
              />
            </FormField>
            <FormField
              fieldLabel="Бегущая строка (EN)"
              name="running_line_en_name"
            >
              <RunningLine name="running_line_en_name" variant="en" />
            </FormField>
            <FormField fieldLabel="Ссылка" name="running_line_en_url">
              <TextInput
                variant="outlined"
                name="running_line_en_url"
                label="Ссылка"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block season-form__fields-block">
            <FormField
              fieldLabel="Другое"
              name=""
              fieldClassName="form-field--checkboxes"
            >
              <div className="season-form__checkboxes">
                <ToggleCheckbox
                  name="copy_contests"
                  heading="Перенести категории с прошлого сезона"
                  caption="После нажатия на «Сохранить» отключить этот параметр будет нельзя"
                />
                {copyContestsWatcher && (
                  <ToggleCheckbox
                    name="copy_juries"
                    heading="Перенести жюри с прошлого сезона"
                    caption="После нажатия на «Сохранить» отключить этот параметр будет нельзя"
                  />
                )}

                <ToggleCheckbox
                  name="copy_sponsors"
                  heading="Перенести спонсоров с прошлого сезона"
                  caption="После нажатия на «Сохранить» отключить этот параметр будет нельзя"
                />
                <ToggleCheckbox
                  name="show_request_work_button"
                  heading="Показывать кнопку «подать работу»"
                />
                <ToggleCheckbox
                  name="show_buy_ticket_button"
                  heading="Показывать кнопку «купить билет»"
                />
              </div>
            </FormField>
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="season-form__submit-button"
          >
            Сохранить
          </Button>
        </Form>
        <DevTool control={methods.control} />
      </FormProvider>
    </section>
  );
}
