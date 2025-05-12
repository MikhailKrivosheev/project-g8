import Ticker from 'Components/Ticker';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import Api from 'Api';
import ConferenceList from './ConferenceList';

interface IConference extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export default function ConferenceTicker(props: IConference) {
  const { className } = props;
  const [users, setUser] = useState([]);
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get(Api.routes.api.account(), {
          count: 0,
          in_conference: true,
        });
        setUser(response.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchUsers();
  }, []);

  if (users.length <= 0) return null;

  return (
    <Ticker fullWidth className={className}>
      <ConferenceList data={users} />
    </Ticker>
  );
}
