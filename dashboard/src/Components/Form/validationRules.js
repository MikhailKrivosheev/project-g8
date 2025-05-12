import * as yup from 'yup';

export const FileValidationTypes = [
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/pdf', // .pdf
  'text/plain', // .txt
];

export const videoValidationTypes = [
  'video/mp4',
  'video/x-msvideo', // avi
  'video/webm',
  'video/quicktime', // mov
];

export const imageValidationTypes = ['image/png', 'image/svg+xml'];

export const validationMessages = {
  isEmpty: 'Обязательное поле',
  isFull: 'Превышено максимально допустимое количество символов',
  isUrl: 'Поле должно быть ссылкой',
  isEmptyFile: 'Необходимо прикрепить файл',
  lessThanSize12: 'Вес файла превышает 12 Мб',
  lessThanSize5: 'Вес файла превышает 5 Мб',
  lessThanSize70: 'Вес видеофайла превышает 70 Мб',
  isCorrectVideoType: 'Можно загрузить только видеофайлы: mp4, avi, webm, mov',
  isCorrectType: 'Можно загрузить только файлы типа: pdf, docx, doc, txt',
  isCorrectImageType: 'Можно загрузить только файлы типа: png, svg',
};

export const validationRules = {
  required: yup.string().trim().required(validationMessages.isEmpty),

  maxLength: (maxLength = 250, required = false) => {
    let schema = yup.string().trim().max(maxLength, validationMessages.isFull);

    if (required) {
      schema = schema.required(validationMessages.isEmpty);
    }

    return schema;
  },

  file: (required = false) => {
    let schema = yup
      .mixed()
      .nullable()
      .test('resume_file', validationMessages.file, (file) => {
        if (!file) return true;
        return true;
      })
      .test('file_size', validationMessages.lessThanSize12, (file) => {
        if (!file) return true;
        return file.size <= 12 * 1024 * 1024; // 12 MB
      })
      .test('file_type', validationMessages.isCorrectType, (file) => {
        if (!file) return true;
        return FileValidationTypes.includes(file.type);
      });

    if (required) {
      schema = schema.required(validationMessages.isEmpty);
    }

    return schema;
  },

  video: (required = false) => {
    let schema = yup
      .mixed()
      .nullable()
      .test('video_size', validationMessages.lessThanSize70, (file) => {
        if (!file) return true;
        return file.size <= 20 * 1024 * 1024; // 70 MB
      })
      .test('video_type', validationMessages.isCorrectVideoType, (file) => {
        if (!file) return true;
        return videoValidationTypes.includes(file.type);
      });

    if (required) {
      schema = schema.required(validationMessages.isEmpty);
    }

    return schema;
  },

  logo: (required = false) => {
    const schema = yup
      .mixed()
      .nullable()
      .test('is_required', validationMessages.isEmptyFile, (file) => {
        if (required) return !!file;
        return true;
      })
      .test('image_size', validationMessages.lessThanSize5, (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5 MB
      })
      .test('image_type', validationMessages.isCorrectImageType, (file) => {
        if (!file) return true;
        return imageValidationTypes.includes(file.type);
      });

    return schema;
  },

  image: (required = false) => {
    const schema = yup
      .mixed()
      .nullable()
      .test('is_required', validationMessages.isEmptyFile, (file) => {
        if (required) return !!file;
        return true;
      })
      .test('image_size', validationMessages.lessThanSize12, (file) => {
        if (!file) return true;
        return file.size <= 12 * 1024 * 1024; // 12 MB
      })
      .test('image_type', validationMessages.isCorrectImageType, (file) => {
        if (!file) return true;
        return imageValidationTypes.includes(file.type);
      });

    return schema;
  },

  url: (required = false) => {
    let schema = yup
      .string()
      .transform((value) => (value === '' ? null : value))
      .nullable()
      .url(validationMessages.isUrl);

    if (required) {
      schema = schema.required(validationMessages.isEmpty);
    }

    return schema;
  },
};
