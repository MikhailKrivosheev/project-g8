import { validationRules } from 'Components/Form/validationRules';
import * as yup from 'yup';

export const FIELD_NAMES = {
  nameRu: 'name_ru',
  sponsorLogo: 'sponsor_logo',
  image: 'image',
};

export const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_NAMES.nameRu]: validationRules.maxLength(50, true),
  [FIELD_NAMES.sponsorLogo]: validationRules.logo(),
  [FIELD_NAMES.image]: validationRules.image(true),
});
