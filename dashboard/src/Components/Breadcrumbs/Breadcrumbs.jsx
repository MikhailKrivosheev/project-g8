/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { getCrumbLink, getCrumbText } from 'Dictionaries/crumbs';

const useStyles = makeStyles({
  breadcrumb: {
    display: 'flex',
    marginTop: '0',
    marginBottom: '30px',
    padding: '0',
    fontWeight: 'bold',
    fontSize: '14px',
    fontStyle: 'italic',
    listStyle: 'none',
  },
  breadcrumbsLink: {
    textDecoration: 'none',
    color: '#a3a3a3',
  },
});

const BreadcrumbsComponent = ({ exact = {} }) => {
  const classes = useStyles();
  const location = useLocation();
  const firstMount = useRef(true);
  const [path, setPath] = useState(location.pathname.split('/').slice(1));

  useEffect(() => {
    if (!firstMount.current) {
      setPath(location.pathname.split('/').slice(1));
    }
  }, [location]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Breadcrumbs className={classes.breadcrumb}>
      {path.map((item, index) => {
        return (
          <Link
            component={RouterLink}
            key={item}
            className={classes.breadcrumbsLink}
            to={getCrumbLink(path, index)}
          >
            {exact[item] || getCrumbText(item) || item}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
