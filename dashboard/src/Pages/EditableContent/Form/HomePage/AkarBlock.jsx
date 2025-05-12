import Grid from '@material-ui/core/Grid';
import SimpleFormField from 'Components/Form/Simple';
import useStyles from '../useStyles';

export default function AkarBlock({ parentName }) {
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.container}>
        <h2>Блок - АКАР</h2>

        <Grid item xs={12} className={classes.container}>
          <h3>Контент блока (ru)</h3>
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.title_ru`}
            label="Заголовок"
            maxLength={26}
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.description_ru`}
            label="Описание"
            maxLength={114}
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.guidebook_link_ru`}
            label="Ссылка на гайдбук"
            type="url"
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.video_vk_link_ru`}
            label="Ссылка на VK видео"
            type="url"
          />
        </Grid>

        <Grid item xs={12} className={classes.container}>
          <h3>Контент блока (en)</h3>
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.title_en`}
            label="Заголовок"
            maxLength={26}
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.description_en`}
            label="Описание"
            maxLength={114}
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.guidebook_link_en`}
            label="Ссылка на гайдбук"
            type="url"
          />
          <SimpleFormField
            variant="outlined"
            name={`${parentName}.video_vk_link_en`}
            label="Ссылка на VK видео"
            type="url"
          />
        </Grid>
      </Grid>
    </>
  );
}
