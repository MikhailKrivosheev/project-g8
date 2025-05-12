import React, { createContext, useEffect, useState } from 'react';
import Api from 'Api';
import useTableFilter from 'Hooks/useTableFilter';

export const WorksContext = createContext();

export const WorksContextProvider = ({ children }) => {
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.works(), {
          ...filter,
          page,
        });
        setState(response);
      } catch (error) {
        console.error(error, 'error !!!!');
      }
    };

    fetchData();
  }, [filter, page]);

  return (
    <WorksContext.Provider value={[{ ...state, filter }, setState, setPage]}>
      {children}
    </WorksContext.Provider>
  );
};
