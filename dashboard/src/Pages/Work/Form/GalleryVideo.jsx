import React, { useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FileField from 'Components/Form/File';
import SimpleFormField from 'Components/Form/Simple';

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
  const { control } = useFormContext();
  const classes = useStyles();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'slider_videos',
  });

  return (
    <>
      <h3>Слайдер видео</h3>
      {fields.map((field, index) => {
        return (
          <Grid key={field?.id} item xs={12} className={classes.container}>
            <FileField
              name={`slider_videos.${index}.image`}
              label="Превью к видео"
              accept={['.png', '.jpg', '.jpeg', '.svg', '.webp']}
            />
            <SimpleFormField
              variant="outlined"
              name={`slider_videos.${index}.video`}
              label="Ссылка на видео для слайдера"
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
            image: '',
            video: '',
          });
        }}
      >
        Добавить файл
      </Button>
    </>
  );
}
