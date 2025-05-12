import { validationRules } from 'Components/Form/validationRules';
import * as yup from 'yup';

export const FIELD_NAMES = {
  nameRu: 'name_ru',
  nameEn: 'name_en',
};

export const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_NAMES.nameRu]: validationRules.maxLength(50, true),
  [FIELD_NAMES.nameEn]: validationRules.maxLength(50, true),
});
