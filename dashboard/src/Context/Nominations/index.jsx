import Api from 'Api';
import useTableFilter from 'Hooks/useTableFilter';
import { createContext, useEffect, useState } from 'react';

export const NominationsContext = createContext();

export const NominationsContextProvider = ({
  children,
  id,
  seasonId,
  contestId,
}) => {
  const [state, setState] = useState({ results: null, meta: {} });
  const [page, setPage] = useState(1);
  const filter = useTableFilter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.nominations(), {
          ...filter,
          nomination_id: id,
          season_id: seasonId,
          contest_id: contestId,
          page,
        });
        setState(response);
      } catch (error) {
        console.error(error, 'error !!!!');
      }
    };

    fetchData();
  }, [filter, page]);

  return (
    <NominationsContext.Provider
      value={[{ ...state, filter }, setState, setPage]}
    >
      {children}
    </NominationsContext.Provider>
  );
};
