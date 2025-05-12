import { ErrorMessage } from '@hookform/error-message';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import getNestedValue from 'Utilities/getNestedValue';

const Font = Quill.import('formats/size');
Font.whitelist = ['small', 'normal', 'large', 'huge']; // Разрешенные размеры
Quill.register(Font, true);

const useStyles = makeStyles(() => ({
  root: {
    '& .ql-editor': {
      minHeight: '95px',
      maxHeight: '350px',
    },
    '& .public-DraftStyleDefault-block': {
      margin: 0,
    },
    '& .ql-toolbar': {
      borderRadius: '2px 2px 0 0',
    },
    '& .ql-container': {
      borderRadius: '0 0 2px 2px',
    },
    '& .ql-tooltip': {
      top: '-9px !important',
      left: '0 !important',
    },
  },

  error: {
    '& .editorHolder': {
      border: '2px solid red',
    },
  },
}));

export default function EditorField({ name, required, label, maxLength }) {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box my={2} width={1} className={classes.root}>
      <FormLabel style={{ marginBottom: '5px', display: 'block' }}>
        {`${label}${required ? '*' : ''}`}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Обязательное поле' : false,
          ...(maxLength
            ? {
                validate: (value) => {
                  const plainText = value?.replace(/<\/?[^>]+(>|$)/g, '');
                  return (
                    plainText?.length <= maxLength ||
                    `Максимум ${maxLength} символов`
                  );
                },
              }
            : {}),
        }}
        render={({ field }) => (
          <>
            {maxLength && (
              <span className="text-length">
                {`${
                  field?.value?.replace(/<\/?[^>]+(>|$)/g, '')?.length
                } / ${maxLength}`}
              </span>
            )}

            <ReactQuill
              theme="snow"
              value={field.value}
              ref={field?.ref}
              onChange={(values) => {
                if (values === '<p><br></p>') field.onChange('');
                else {
                  field.onChange(values);
                }
              }}
              modules={{
                toolbar: {
                  container: [
                    [{ size: ['small', 'normal', 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean'],
                    ['image'],
                    ['video'],
                    ['code-block'],
                  ],
                },
                clipboard: { matchVisual: false },
              }}
              formats={[
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'link',
                'list',
                'bullet',
                'image',
                'video',
                'code-block',
              ]}
            />
          </>
        )}
      />

      <ErrorMessage
        error={errors}
        name={name}
        render={() => {
          const errorMessage =
            getNestedValue(errors, name)?.message ||
            'Ошибка при заполнении поля';
          return (
            <p style={{ color: 'red', display: 'block' }}>{errorMessage}</p>
          );
        }}
      />
    </Box>
  );
}
