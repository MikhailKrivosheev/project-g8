import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { roomId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.room(roomId));
      setState(response.results);
    };

    if (roomId) {
      fetchEntity();
    }
  }, [roomId]);

  return (
    <RoomContext.Provider value={[state, setState]}>
      {children}
    </RoomContext.Provider>
  );
};
