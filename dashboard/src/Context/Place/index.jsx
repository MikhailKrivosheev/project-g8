import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PlaceContext = createContext();

export const PlaceContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { placeId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.place(placeId));
      setState(response.results);
    };

    if (placeId) {
      fetchEntity();
    }
  }, [placeId]);

  return (
    <PlaceContext.Provider value={[state, setState]}>
      {children}
    </PlaceContext.Provider>
  );
};
