import { Grid } from '@material-ui/core';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import useStyles from '../useStyles';

export default function AwardsPage({ parentName }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.container}>
      <h3>Текст и баннер (ru)</h3>
      <EditorField
        maxLength={830}
        name={`${parentName}.text_ru`}
        label="Текст"
        required
      />
      <File
        name={`${parentName}.banner`}
        label="Баннер"
        accept={['.png', '.jpg', '.jpeg', '.webp']}
        reccomendedSize="1200x360"
      />
      <h3>Текст (en)</h3>
      <EditorField
        maxLength={830}
        name={`${parentName}.text_en`}
        label="Текст"
      />
    </Grid>
  );
}
