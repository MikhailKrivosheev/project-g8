import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import FileField from 'Components/Form/File';
import SimpleFormField from 'Components/Form/Simple';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    borderTop: '1px solid rgba(0, 0, 0, 0.23)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
    margin: '30px 0 10px',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: 'rgb(0 0 0 / 12%) 0px 2px 10px, rgb(0 0 0 / 16%) 0px 2px 5px',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
});

export default function GalleryVideo() {
  const classes = useStyles();

  const { control } = useFormContext();

  const name = 'gallery_video';
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    shouldUnregister: true,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Grid key={field?.id} item xs={12} className={classes.container}>
            <SimpleFormField
              name={`${name}.${index}.video_url`}
              label="Ссылка на видео"
            />
            <FileField
              name={`${name}.${index}.image`}
              label="Изображение галереи"
              accept={['.png', '.jpg', '.jpeg', '.svg']}
              required
            />

            <Tooltip title="Удалить файл" placement="left">
              <IconButton
                className={classes.close}
                size="small"
                color="primary"
                onClick={() => {
                  remove(index);
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      })}

      <Button
        fullWidth
        color="primary"
        style={{ margin: '16px 0 0' }}
        onClick={() => {
          append({
            video_url: '',
            image: '',
          });
        }}
      >
        Добавить видео
      </Button>
    </>
  );
}
