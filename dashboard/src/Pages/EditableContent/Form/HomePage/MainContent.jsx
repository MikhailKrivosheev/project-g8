import { Grid } from '@material-ui/core';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import useStyles from '../useStyles';

export default function MainContent({ parentName }) {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.container}>
        <h3>Текст и баннер (ru)</h3>
        <EditorField
          maxLength={900}
          name={`${parentName}.text_ru`}
          label="Текст"
          required
        />
        <File
          name={`${parentName}.banner`}
          label="Баннер"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
          reccomendedSize="948x1580"
        />
        <h3>Текст (en)</h3>
        <EditorField
          maxLength={900}
          name={`${parentName}.text_en`}
          label="Текст"
          required
        />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <h3>Блок 1 - Видео</h3>
        <File
          name={`${parentName}.first_video`}
          label="Видео"
          accept={['.mp4', '.webm', '.avi', '.mov']}
        />
        <File
          name={`${parentName}.first_video_preview`}
          label="Превью"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
          reccomendedSize="2400x770"
        />
      </Grid>
      <Grid item xs={12} className={classes.container}>
        <h3>Блок 2 - Видео</h3>
        <File
          name={`${parentName}.second_video`}
          label="Видео"
          accept={[
            '.mp4',
            '.webm',
            '.ogg',
            '.avi',
            '.mov',
            '.wmv',
            '.flv',
            '.mkv',
            '.m4v',
          ]}
        />
        <File
          name={`${parentName}.second_video_preview`}
          label="Превью"
          accept={['.png', '.jpg', '.jpeg', '.webp']}
          reccomendedSize="2400x770"
        />
      </Grid>
    </>
  );
}
