import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const NominationContext = createContext();

export const NominationContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { nominationId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.nomination(nominationId));
      setState(response.results);
    };

    if (nominationId) {
      fetchEntity();
    }
  }, [nominationId]);

  return (
    <NominationContext.Provider value={[state, setState]}>
      {children}
    </NominationContext.Provider>
  );
};
