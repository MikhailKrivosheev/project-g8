import { Grid } from '@material-ui/core';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import SimpleFormField from 'Components/Form/Simple';
import useStyles from '../useStyles';

export default function TextBanner({ parentName, isWithDate = false }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.container}>
      <h3>Текст (ru)</h3>
      <EditorField
        variant="outlined"
        name={`${parentName}.text_ru`}
        label="Текст"
        maxLength={830}
      />
      <File
        name={`${parentName}.banner`}
        label="Баннер"
        accept={['.png', '.jpg', '.jpeg', '.webp']}
        reccomendedSize="2240x640"
      />
      {isWithDate && (
        <SimpleFormField
          variant="outlined"
          name={`${parentName}.date_ru`}
          label="Дата и место проведения"
        />
      )}
      <h3>Текст (en)</h3>
      <EditorField
        variant="outlined"
        name={`${parentName}.text_en`}
        label="Текст"
        maxLength={830}
      />
      {isWithDate && (
        <SimpleFormField
          variant="outlined"
          name={`${parentName}.date_en`}
          label="Дата и место проведения"
        />
      )}
    </Grid>
  );
}
