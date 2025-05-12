import React, { createContext, useEffect, useState } from 'react';
import Api from 'Api';
import { useParams } from 'react-router-dom';
import useTableFilter from 'Hooks/useTableFilter';

export const PlacesContext = createContext();

export const PlacesContextProvider = ({ children, id }) => {
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.places(), {
          ...filter,
          place_id: id,
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
    <PlacesContext.Provider value={[{ ...state, filter }, setState, setPage]}>
      {children}
    </PlacesContext.Provider>
  );
};
