import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SponsorTypeContext = createContext();

export const SponsorTypeContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { sponsorTypeId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.sponsorType(sponsorTypeId));
      setState(response.results);
    };

    if (sponsorTypeId) {
      fetchEntity();
    }
  }, [sponsorTypeId]);

  return (
    <SponsorTypeContext.Provider value={[state, setState]}>
      {children}
    </SponsorTypeContext.Provider>
  );
};
