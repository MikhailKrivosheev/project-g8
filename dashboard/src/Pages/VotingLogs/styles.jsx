import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,

    '& button': {
      marginTop: '0 !important',

      '&:first-child': {
        marginRight: 20,
      },
    },
  },

  imagesArea: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',

    '& .MuiBox-root': {
      margin: '10px 0',
    },
  },

  headerSelect: {
    width: '100%',

    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
}));

export default useStyles;
