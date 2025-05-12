import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  fabButton: {
    position: 'fixed',
    bottom: '20px',
    right: '30px',
  },
  fabButtonMargin: {
    minHeight: '70px',
  },
});

export default function CreateNewEntity({ link, disableLink }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.fabButtonMargin} />
      <Link to={link}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fabButton}
          disabled={disableLink}
        >
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
}
