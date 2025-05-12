import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SeasonContext = createContext();

export const SeasonContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { seasonId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.season(seasonId));
      setState(response.results);
    };

    if (seasonId) {
      fetchEntity();
    }
  }, [seasonId]);

  return (
    <SeasonContext.Provider value={[state, setState]}>
      {children}
    </SeasonContext.Provider>
  );
};
