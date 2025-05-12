/* eslint-disable camelcase */
import Api from 'Api';
import useTableFilter from 'Hooks/useTableFilter';
import React, { createContext, useEffect, useState } from 'react';

export const SponsorsContext = createContext();

export const SponsorsContextProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchSponsors = async () => {
      const response = await Api.get(Api.routes.sponsors(), {
        ...filter,
        page,
      });
      setState(response);
    };

    fetchSponsors();
  }, [filter, page]);

  return (
    <SponsorsContext.Provider value={[{ ...state, filter }, setState, setPage]}>
      {children}
    </SponsorsContext.Provider>
  );
};
