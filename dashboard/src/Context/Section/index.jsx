import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SectionContext = createContext();

export const SectionContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { sectionId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.section(sectionId));
      setState(response.results);
    };

    if (sectionId) {
      fetchEntity();
    }
  }, [sectionId]);

  return (
    <SectionContext.Provider value={[state, setState]}>
      {children}
    </SectionContext.Provider>
  );
};
