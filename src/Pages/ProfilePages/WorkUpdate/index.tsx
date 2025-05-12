import Api from 'Api';
import useAPIError from 'Hooks/useAPIError';
import { IWorkInfo } from 'Pages/WorkPages/Work';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkCreate from '../WorkCreate';

export default function WorkUpdate() {
  const { id } = useParams();
  const [work, setWork] = useState<IWorkInfo | null>(null);
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await Api.get(Api.routes.api.work(id), {});
        setWork(response.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchWork();
  }, []);

  if (!work) return null;

  return <WorkCreate data={work} />;
}
