import { Button, CssBaseline, makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Layout from 'Components/Layout';
import Main from 'Components/Main';
import { DictionaryContextProvider } from 'Context/Dictionaries';
import { UserProvider } from 'Context/global/UserContext';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import { createRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

const defaultTheme = createTheme();

const theme = createTheme({
  ...defaultTheme,
  palette: {
    primary: {
      main: '#201F1E',
    },
    grey: {
      main: '#f1f1f1',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        '&[type="submit"]': {
          margin: defaultTheme.spacing(2, 'auto', 0, 0),
        },
      },
    },
  },
  typography: {
    fontFamily: '"Helvetica", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.3rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.2rem',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 'bold',
      padding: '8px 22px',
    },
    h5: {
      fontSize: '0.9rem',
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',

    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
}));

export default function App() {
  const classes = useStyles();
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => <Button onClick={onClickDismiss(key)}>Ok</Button>}
          >
            <ConfirmProvider
              defaultOptions={{
                confirmationText: 'Да',
                cancellationText: 'Нет',
                confirmationButtonProps: {
                  variant: 'contained',
                  color: 'primary',
                },
                cancellationButtonProps: {
                  variant: 'contained',
                  color: 'primary',
                },
              }}
            >
              <DictionaryContextProvider>
                <div className={classes.root}>
                  <CssBaseline />
                  <Layout>
                    <Main />
                  </Layout>
                </div>
              </DictionaryContextProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
