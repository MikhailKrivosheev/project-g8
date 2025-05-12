import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SponsorContext = createContext();

export const SponsorContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { sponsorId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.sponsor(sponsorId));
      setState(response.results);
    };

    if (sponsorId) {
      fetchEntity();
    }
  }, [sponsorId]);

  return (
    <SponsorContext.Provider value={[state, setState]}>
      {children}
    </SponsorContext.Provider>
  );
};
