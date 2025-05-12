import React, { createContext, useEffect, useState } from 'react';
import Api from 'Api';
import { useParams } from 'react-router-dom';
import useTableFilter from 'Hooks/useTableFilter';

export const OrganaizersContext = createContext();

export const OrganaizersContextProvider = ({ children }) => {
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();
  const { contestId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.sponsorTypes(), {
          ...filter,
          contest_id: contestId,
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
    <OrganaizersContext.Provider
      value={[{ ...state, filter }, setState, setPage]}
    >
      {children}
    </OrganaizersContext.Provider>
  );
};
