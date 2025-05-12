import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tabs: {
    display: 'flex',
    marginBottom: '30px',
  },
  tab: {
    '&:not(:first-child)': {
      marginLeft: '10px',
    },
  },
  container: {
    position: 'relative',
    borderTop: '1px solid rgba(0, 0, 0, 0.23)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.23)',
    margin: '10px 0 30px',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: 'rgb(0 0 0 / 12%) 0px 2px 10px, rgb(0 0 0 / 16%) 0px 2px 5px',
  },
  annotation: {
    fontSize: '12px',
    color: 'grey',
    marginBottom: '20px',
    display: 'block',
  },
  textButton: {
    textTransform: 'none',
    padding: 0,
    minWidth: 'auto',
    color: 'inherit',
    fontSize: 'inherit',
  },
  errorsHolder: {
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    width: '300px',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  },
  errorsBlock: {
    padding: '8px',
    border: '1px solid #ccc',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5px',
    marginBottom: '10px',
  },
  errorsField: { marginLeft: '5px', color: 'red' },
});

export default useStyles;
