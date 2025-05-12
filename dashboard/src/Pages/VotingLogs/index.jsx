import TableLayout from 'Components/TableLayout';
import Api from 'Api';
import {
  VotingLogsContext,
  VotingLogsContextProvider,
} from 'Context/VotingLogs';
import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import VotingLogsInfo from './VotingLogsInfo';

export default function VotingLogs() {
  const [currentSeason, setCurrentSeason] = useState(null);

  useEffect(() => {
    const fetchCurrentSeason = async () => {
      try {
        const { results } = await Api.get(Api.routes.seasonCurrent(), {});
        setCurrentSeason(results?.id);
      } catch (error) {
        console.log(error, 'error');
      }
    };

    fetchCurrentSeason();
  }, []);

  if (!currentSeason) return null;

  return (
    <TableLayout title="Таблица голосов">
      <VotingLogsContextProvider currentSeason={currentSeason}>
        <Filter context={VotingLogsContext} />
        <VotingLogsInfo />
      </VotingLogsContextProvider>
    </TableLayout>
  );
}
