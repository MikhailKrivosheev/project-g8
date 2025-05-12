import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.user(userId));
      setState(response.results);
    };

    if (userId) {
      fetchEntity();
    }
  }, [userId]);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
