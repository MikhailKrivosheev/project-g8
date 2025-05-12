import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.settings());
      setState(response.results);
    };

    fetchEntity();
  }, []);

  return (
    <SettingsContext.Provider value={[state, setState]}>
      {children}
    </SettingsContext.Provider>
  );
};
