/* eslint-disable camelcase */
import Api from 'Api';
import useTableFilter from 'Hooks/useTableFilter';
import React, { createContext, useEffect, useState } from 'react';

export const SectionsContext = createContext();

export const SectionsContextProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchSections = async () => {
      const response = await Api.get(Api.routes.sections(), {
        ...filter,
        page,
      });
      setState(response);
    };

    fetchSections();
  }, [filter, page]);

  return (
    <SectionsContext.Provider value={[{ ...state }, setState, setPage]}>
      {children}
    </SectionsContext.Provider>
  );
};
