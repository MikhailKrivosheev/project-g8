import { validationRules } from 'Components/Form/validationRules';
import * as yup from 'yup';

export const FIELD_NAMES = {
  year: 'year',
  contestStageCode: 'contest_stage_code',
  runningLineRuUrl: 'running_line_ru_url',
  runningLineEnUrl: 'running_line_en_url',
  guidebookRu: 'guidebook_ru',
  guidebookEn: 'guidebook_en',
  rulesRu: 'rules_ru',
  rulesEn: 'rules_en',
  programRu: 'program_ru',
  programEn: 'program_en',
};

export const VALIDATION_SCHEMA = yup.object().shape({
  [FIELD_NAMES.year]: validationRules.maxLength(50, true),
  [FIELD_NAMES.contestStageCode]: validationRules.required,
  [FIELD_NAMES.runningLineRuUrl]: validationRules.url(),
  [FIELD_NAMES.runningLineEnUrl]: validationRules.url(),
  ...[
    'guidebookRu',
    'guidebookEn',
    'rulesRu',
    'rulesEn',
    'programRu',
    'programEn',
  ].reduce((acc, key) => {
    acc[FIELD_NAMES[key]] = validationRules.file();
    return acc;
  }, {}),
});
