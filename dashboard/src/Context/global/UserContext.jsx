import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import utilities from 'Utilities';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState({
    logged: utilities.apiTokenStorage.get(),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await Api.get(Api.routes.profile());
      setState((prev) => ({ ...prev, ...response.results }));
    };

    if (state.logged) {
      fetchProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
