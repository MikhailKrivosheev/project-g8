import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ContestContext = createContext();

export const ContestContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { contestId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.contest(contestId));
      setState(response.results);
    };

    if (contestId) {
      fetchEntity();
    }
  }, [contestId]);

  return (
    <ContestContext.Provider value={[state, setState]}>
      {children}
    </ContestContext.Provider>
  );
};
