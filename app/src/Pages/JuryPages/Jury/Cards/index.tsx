import Api from 'Api';
import LazyLoad from 'Components/LazyLoad';
import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import Star from 'Icons/StarIcon';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface IJury {
  judge_type: string;
  status: string;
  image_url: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  contests: [];
  id: number;
}

interface IJuryTypes {
  greateight: IJury[];
  executive: IJury[];
}

export default function JuryCards() {
  const [data, setData] = useState<IJuryTypes | null>(null);
  const [searchParams] = useSearchParams();
  const abortController = useRef(Api.generateAbortController());
  const ROUTES = useRoutes();
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();
    const fetchContent = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.account(),
          {
            role: 'judge',
            count: 0,
            ...Object.fromEntries(searchParams),
          },
          {
            signal: abortController.current.signal,
          }
        );
        setData(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
    return () => {
      abortController.current.abort();
    };
  }, [searchParams]);

  if (!data || data?.length <= 0) return null;

  return (
    <>
      <div className="jury__title">
        <Title sizeName="m">G8</Title>
        <Star />
      </div>
      <div className="jury__group">
        {data?.map((jury: IJury) => (
          <div className="jury__card" key={jury?.id}>
            <div className="jury__image-holder">
              <LazyLoad
                className="jury__image"
                src={jury?.image_url}
                alt="juryImage"
              />
            </div>
            <div className="jury__info">
              <Description sizeName="s" className="jury__name">
                {jury?.first_name} {jury?.last_name}
              </Description>
              <Description className="jury__job">
                {jury.job_title}, {jury?.company}
              </Description>
              {jury?.contests && (
                <div className="jury__tags">
                  <Description className="jury__tag">G8</Description>
                  {jury?.contests?.map((contest: any) => {
                    return (
                      <Description key={contest?.id} className="jury__tag">
                        {contest?.name}
                      </Description>
                    );
                  })}
                </div>
              )}
            </div>
            <Link to={ROUTES.profile(`${jury?.id}`)} className="jury__link" />
          </div>
        ))}
      </div>
    </>
  );
}
