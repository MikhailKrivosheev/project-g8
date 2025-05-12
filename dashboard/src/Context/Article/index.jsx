import Api from 'Api';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    const fetchEntity = async () => {
      const response = await Api.get(Api.routes.article(articleId));
      setState(response.results);
    };

    if (articleId) {
      fetchEntity();
    }
  }, [articleId]);

  return (
    <ArticleContext.Provider value={[state, setState]}>
      {children}
    </ArticleContext.Provider>
  );
};
