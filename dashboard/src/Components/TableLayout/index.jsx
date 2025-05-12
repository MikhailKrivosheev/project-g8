import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from 'Components/Breadcrumbs';
import SearchInput from 'Components/Form/SearchInput';
import Typography from 'Components/UI/Typography';
import CreateNewEntity from './CreateNewEntity';

const useStyles = makeStyles({
  titleHolder: {
    display: 'flex',
    marginBottom: '40px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleButton: {
    all: 'unset',
    padding: '15px 25px',
    color: 'white',
    backgroundColor: '#282828',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: '0.2s',
    '& p': {
      color: 'white',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: '14px',
    },
    '&:hover': {
      backgroundColor: '#464646',
    },
  },
});

export default function TableLayout({
  children,
  title,
  createLink,
  disableLink,
  exact,
  condition,
  withBreadcrumbs = true,
  withSearch = false,
  searchParamName,
  searchInputPlaceholder,
  isTitleButton,
  onButtonClick,
  buttonText,
}) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.titleHolder}>
        {title && <Typography tag="h1">{title}</Typography>}

        {withSearch && (
          <SearchInput
            paramName={searchParamName}
            placeholder={searchInputPlaceholder}
          />
        )}

        {isTitleButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className={classes.titleButton}
          >
            <Typography type="body">{buttonText}</Typography>
          </button>
        )}
      </div>

      {withBreadcrumbs && <BreadCrumbs condition={condition} exact={exact} />}
      {children}
      {createLink && (
        <CreateNewEntity link={createLink} disableLink={disableLink} />
      )}
    </>
  );
}
