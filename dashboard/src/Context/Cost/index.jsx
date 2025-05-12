import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CostContext = createContext();

export const CostContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { costId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.cost(costId));
      setState(response.results);
    };

    if (costId) {
      fetchEntity();
    }
  }, [costId]);

  return (
    <CostContext.Provider value={[state, setState]}>
      {children}
    </CostContext.Provider>
  );
};
