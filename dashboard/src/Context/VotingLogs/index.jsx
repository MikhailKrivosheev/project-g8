import React, { createContext, useEffect, useState } from 'react';
import Api from 'Api';
import { useParams } from 'react-router-dom';
import useTableFilter from 'Hooks/useTableFilter';

export const VotingLogsContext = createContext();

export const VotingLogsContextProvider = ({ children, currentSeason }) => {
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.votingLogs(), {
          season_id: currentSeason,
          ...filter,
          page,
        });
        setState(response);
      } catch (error) {
        console.error(error, 'error !!!!');
      }
    };

    fetchData();
  }, [filter, page, currentSeason]);

  return (
    <VotingLogsContext.Provider
      value={[
        { ...state, filter: { season_id: currentSeason, ...filter } },
        setState,
        setPage,
      ]}
    >
      {children}
    </VotingLogsContext.Provider>
  );
};
