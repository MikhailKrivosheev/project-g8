/* eslint-disable camelcase */
import Api from 'Api';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const SeasonsContext = createContext();

export const SeasonsContextProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const location = useLocation();

  const urlParams = new URLSearchParams(location?.search);
  const initialYear = urlParams?.get('year') || '';

  useEffect(() => {
    const fetchSeasons = async () => {
      const response = await Api.get(Api.routes.seasons(), {
        year: initialYear || '',
        per_page: 8,
        page,
      });
      setState(response);
    };

    fetchSeasons();
  }, [page, initialYear]);

  return (
    <SeasonsContext.Provider value={[{ ...state }, setState, setPage]}>
      {children}
    </SeasonsContext.Provider>
  );
};
