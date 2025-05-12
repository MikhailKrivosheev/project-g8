import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    '&& .MuiPaper-root': {
      padding: '40px',
      borderRadius: '16px',

      [theme.breakpoints.down('sm')]: {
        margin: 'auto 8px',
        width: '100%',
        padding: '32px 24px 24px',
      },
    },
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  modalTitle: {
    marginBottom: '20px',
    paddingBottom: 0,

    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  modalSubTitle: {
    fontSize: 16,
    // color: PALETTE.darkGray,
  },

  modalContent: {
    paddingTop: 0,

    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  modalFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 33,

    '& button': {
      all: 'unset',
      cursor: 'pointer',
      padding: '17px 62px',
      display: 'flex',
      borderRadius: '100px',
      justifyContent: 'center',
      '&:first-child': {
        marginRight: 20,
        color: '#282828',
        backgroundColor: '#FFFFFF',
        border: '1.5px solid #282828',
      },
      '&:nth-child(2)': {
        color: '#FFFFFF',
        backgroundColor: '#282828',
      },
    },
  },
}));

export default useStyles;
