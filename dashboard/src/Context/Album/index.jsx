import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AlbumContext = createContext();

export const AlbumContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { albumId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.album(albumId));
      setState(response.results);
    };

    if (albumId) {
      fetchEntity();
    }
  }, [albumId]);

  return (
    <AlbumContext.Provider value={[state, setState]}>
      {children}
    </AlbumContext.Provider>
  );
};
