import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const WorkContext = createContext();

export const WorkContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { workId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.work(workId));
      setState(response.results);
    };

    if (workId) {
      fetchEntity();
    }
  }, [workId]);

  return (
    <WorkContext.Provider value={[state, setState]}>
      {children}
    </WorkContext.Provider>
  );
};
