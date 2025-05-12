import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import Api from 'Api';
import Form from 'Components/Form';
import CurrencyInput from 'Components/Form/CurrencyInput';
import DeleteEntity from 'Components/Form/DeleteEntityNew';
import FormField from 'Components/Form/Field';
import FileNative from 'Components/Form/FileNative';
import Radio from 'Components/Form/Radio';
import TextArea from 'Components/Form/TextArea';
import TextInput from 'Components/Form/TextInput';
import ToggleCheckbox from 'Components/Form/ToggleCheckbox';
import Button from 'Components/UI/Button';
import { ContestContext } from 'Context/Contest';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { VALIDATION_SCHEMA } from './constants';
import ContestTypeRadio from './ContestTypeRadio';
import CuratorSelect from './CuratorSelect';
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

export default function ContestForm() {
  const [contest, setContest] = useContext(ContestContext);
  const { seasonId } = useParams();

  const history = useHistory();
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(contest),
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateContest = async (values) => {
    try {
      const response = await Api.put(Api.routes.contest(contest.id), {
        ...values,
        season_id: seasonId,
      });
      setContest(response.results);
      enqueueSnackbar(
        `Конкурс "${response.results.name_ru}" успешно обновлен`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createContest = async (values) => {
    try {
      const response = await Api.post(Api.routes.contests(), {
        ...values,
        season_id: seasonId,
      });
      setContest(response.results);
      enqueueSnackbar(`Конкурс "${response.results.name_ru}" успешно создан`, {
        variant: 'success',
      });

      history.push(
        `${routes.contestPage(
          response.results.season?.id,
          response.results.id
        )}?season_name=${response.results.season?.year}&contest_name=${
          response.results.name_ru
        }`
      );
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (contest?.id) {
      updateContest(values);
    } else {
      createContest(values);
    }
  }

  return (
    <section className="form-section contest">
      <FormProvider {...methods}>
        <Form
          className="form-section__content contest-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-section__fields-block contest-form__fields-block">
            <FormField
              fieldLabel="Публикация"
              labelClassName="contest-form__radio-label"
              name="published"
            >
              <Radio
                name="published"
                defaultValue={contest?.published}
                options={[notPublished, published]}
                isCaptions
              />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField
              fieldLabel="Название категории (RU)"
              required
              name="name_ru"
            >
              <TextInput
                variant="outlined"
                name="name_ru"
                label="Введите название"
              />
            </FormField>
            <FormField fieldLabel="Название категории (EN)" name="name_en">
              <TextInput
                variant="outlined"
                name="name_en"
                label="Введите название"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField fieldLabel="Стоимость" name="amount">
              <CurrencyInput
                name="amount"
                label="Введите стоимость"
                currencySuffix="₽"
                groupSeparator=" "
                className="contest-form__amount"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField fieldLabel="Блок конкурса" name="type">
              <ContestTypeRadio defaultValue={contest?.type} />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField fieldLabel="Куратор" name="curator_ids">
              <CuratorSelect name="curator_ids" label="Выберите куратора" />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField
              fieldLabel="Спонсор"
              fieldClassName="contest-form__sponsor-names"
              name={['sponsor_name_ru', 'sponsor_name_en']}
            >
              <TextInput
                variant="outlined"
                name="sponsor_name_ru"
                label="Введите название (RU)"
              />
              <TextInput
                variant="outlined"
                name="sponsor_name_en"
                label="Введите название (EN)"
              />
            </FormField>
            <FormField fieldLabel="Ссылка" name="sponsor_link">
              <TextInput
                variant="outlined"
                name="sponsor_link"
                label="Ссылка"
              />
            </FormField>
          </div>

          <div className="form-section__fields-block form-section__files-block contest-form__fields-block">
            <FormField
              fieldLabel="Логотип спонсора"
              name="sponsor_logo"
              fieldClassName="contest-form__sponsor-logo"
              isWithErrorMessage={false}
            >
              <FileNative
                name="sponsor_logo"
                caption="PNG, SVG 150x150px, не более 5 Мб"
                accept={['.png', '.svg']}
              />
            </FormField>
            <FormField
              fieldLabel="Картинка для первого экрана"
              name="image"
              fieldClassName="contest-form__banner"
              isWithErrorMessage={false}
              required
            >
              <FileNative
                name="image"
                required
                caption="PNG, 1680x530px, не более 12 Мб"
                accept={['.png']}
              />
            </FormField>
          </div>

          <div className="form-section__fields-block contest-form__fields-block">
            <FormField
              fieldLabel="Описание (RU)"
              name="description_ru"
              fieldClassName="form-field--textarea"
            >
              <TextArea
                name="description_ru"
                label="Опишите категорию"
                placeHolder="Опишите категорию"
              />
            </FormField>
            <FormField
              fieldLabel="Описание (EN)"
              name="description_en"
              fieldClassName="form-field--textarea"
            >
              <TextArea
                name="description_en"
                label="Опишите категорию"
                placeHolder="Опишите категорию (EN)"
              />
            </FormField>
          </div>

          <FormField
            fieldLabel="Поля, обязательные для заполения"
            fieldClassName="form-field--checkboxes"
            name="validation_rules"
          >
            <div className="form-section__fields-block contest-form__fields-block">
              <ToggleCheckbox
                name="validation_rules.brand.required"
                heading="Рекламируемый бренд (RU/EN)"
              />
              <ToggleCheckbox
                name="validation_rules.slider_videos.required"
                heading="Слайдер видео"
              />
              <ToggleCheckbox
                name="validation_rules.slider_images.required"
                heading="Слайдер изображений"
              />
              <ToggleCheckbox
                name="validation_rules.vimeo_link.required"
                heading="Vimeo/Vk video"
              />
            </div>
          </FormField>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="contest-form__submit-button"
          >
            Сохранить
          </Button>

          <DeleteEntity
            buttonText="Удалить категорию"
            deleteUrl={Api.routes.contest}
            id={contest?.id}
            questionText="Вы точно хотите удалить категорию?"
            description="Удаленную категорию нельзя будет вернуть"
            redirect={routes.seasons()}
          />
        </Form>
        <DevTool />
      </FormProvider>
    </section>
  );
}
