import Grid from '@material-ui/core/Grid';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import useStyles from '../useStyles';

export default function PopularVoteBlock({ parentName }) {
  const classes = useStyles();
  return (
    <Grid item className={classes.container}>
      <h2>Блок - Народное голосование</h2>

      <Grid item xs={12} className={classes.container}>
        <h3>Контент блока (ru)</h3>
        <EditorField
          variant="outlined"
          name={`${parentName}.vote_text_ru`}
          label="Текст"
          maxLength={224}
        />
        <File
          name={`${parentName}.vote_banner`}
          label="Баннер"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
          reccomendedSize="1100x550"
        />
        <h3>Контент блока (en)</h3>
        <EditorField
          variant="outlined"
          name={`${parentName}.vote_text_en`}
          label="Текст"
          maxLength={224}
        />
      </Grid>
    </Grid>
  );
}
