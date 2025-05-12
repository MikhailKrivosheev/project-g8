import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { reportId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.report(reportId));
      setState(response.results);
    };

    if (reportId) {
      fetchEntity();
    }
  }, [reportId]);

  return (
    <ReportContext.Provider value={[state, setState]}>
      {children}
    </ReportContext.Provider>
  );
};
