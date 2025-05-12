import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EditorField from 'Components/Form/Editor';
import activeEditableTab from 'Recoil/Atoms/activeEditableTab';
import { useSetRecoilState } from 'recoil';
import useStyles from '../useStyles';

export default function ConferenceBlock({ parentName }) {
  const classes = useStyles();
  const setActiveTab = useSetRecoilState(activeEditableTab);

  return (
    <Grid item className={classes.container}>
      <h2>Блок - Конференция</h2>
      <span className={classes.annotation}>
        <Button
          className={classes.textButton}
          variant="text"
          disableRipple
          onClick={() => setActiveTab('conference')}
        >
          *<u>Дата и место проведения</u>
        </Button>
        &nbsp;указываются в разделе Конференция
      </span>

      <Grid item xs={12} className={classes.container}>
        <h3>Текст (ru)</h3>
        <EditorField
          variant="outlined"
          name={`${parentName}.conference_text_ru`}
          label="Текст"
          maxLength={650}
        />
        <h3>Текст (en)</h3>
        <EditorField
          variant="outlined"
          name={`${parentName}.conference_text_en`}
          label="Текст"
          maxLength={650}
        />
      </Grid>
    </Grid>
  );
}
