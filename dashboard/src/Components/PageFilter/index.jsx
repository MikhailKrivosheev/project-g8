import Api from 'Api';
import { DevTool } from '@hookform/devtools';
import { Box, CircularProgress, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Form from 'Components/Form';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import utilities from 'Utilities';
import SplitButton from 'Components/SplitButton';

export default function PageTableFilter({
  sortOptions,
  filter,
  data,
  children,
  id,
  exportBtn,
  findButton = true,
}) {
  const [isDisabled, setDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const [isExportToggle, setExportToggle] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: filter,
  });

  const history = useHistory();
  const { handleSubmit, reset } = methods;

  const onSubmit = (values) => {
    history.push({
      ...history.location,
      search: utilities.params.toString(values),
    });
  };

  const resetFilter = () => {
    reset({});
    history.push({
      ...history.location,
      search: '',
    });
  };

  useEffect(() => {
    setDisabled(false);
  }, [filter]);

  useEffect(() => {
    if (exportBtn) {
      if (file) {
        const link = document.createElement('a');
        link.href = file;
        link.tagret = '_blank';
        link.click();
      }
    }
  }, [isExportToggle, file]);

  const onDownload = () => {
    const fetchFile = async () => {
      const response = await Api.get(Api.routes.workFile(), filter);
      setFile(response?.results?.file_url);
    };

    fetchFile();
  };

  return (
    <Box mb={2}>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            alignContent="flex-end"
            xs={12}
            item
            spacing={2}
            direction="row"
            wrap="wrap"
          >
            {children}
          </Grid>
          <Grid
            item
            container
            direction="row"
            xs={12}
            spacing={2}
            justifyContent="flex-end"
            component={(gridProps) => <Box {...gridProps} />}
          >
            {exportBtn && (
              <Tooltip
                title={isDisabled ? 'Вы уже скачали этот файл' : ''}
                placement="top"
              >
                <Grid item>
                  <Button
                    style={{ marginRight: '16px' }}
                    variant="contained"
                    color="primary"
                    disabled={isDisabled}
                    onClick={() => {
                      setDisabled(true);
                      setExportToggle(!isExportToggle);
                      onDownload();
                    }}
                  >
                    Экспорт
                  </Button>
                </Grid>
              </Tooltip>
            )}

            <Grid item>
              {Object.keys(filter)?.length > 0 && (
                <Button
                  style={{ marginRight: '20px' }}
                  type="reset"
                  onClick={resetFilter}
                  variant="contained"
                  color="primary"
                >
                  Очистить
                </Button>
              )}
            </Grid>
            {findButton && (
              <Grid item>
                {sortOptions ? (
                  <SplitButton
                    options={sortOptions}
                    text="Сортировать"
                    // onSubmit={onSplitSubmit}
                  />
                ) : (
                  <Button
                    disabled={data.status === 'pending'}
                    variant="contained"
                    type="submit"
                    color="primary"
                    style={{ marginTop: '0' }}
                    startIcon={
                      data.status === 'pending' && (
                        <CircularProgress color="secondary" size={20} />
                      )
                    }
                  >
                    Найти
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        </Form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Box>
  );
}
