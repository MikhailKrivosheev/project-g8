import Api from 'Api';
import Sponsor from 'Components/Contests/Sponsor';
import ContestSlider from 'Components/ContestSlider';
import ContestBillet from 'Components/ContestType';
import TickerJury from 'Components/JuryTicker';
import LazyLoad from 'Components/LazyLoad';
import Ticker from 'Components/Ticker';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import { TContestType } from 'Types';
import Nominations from '../Nominations/index';

interface ICurator {
  first_name: string;
  last_name: string;
  id: string;
  image_url: string;
}

interface IAnalog {
  id: number;
  name: string;
}

interface IContest {
  name: string;
  type: TContestType;
  description: string;
  image_url: string;
  analog_contests: IAnalog[];
  curators: ICurator[];
  sponsor_name_ru: string;
  sponsor_logo_url: string;
  sponsor_link: string;
}

export default function Contest() {
  const [data, setData] = useState<IContest | null>(null);
  const params = useParams();
  const season = useRecoilValue(seasonAtom);
  const ROUTES = useRoutes();
  const { handleAPIError } = useAPIError();
  const translate = useTranslate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.contest(params.id), {
          season_id: season?.id,
        });
        setData({ ...response.results });
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  if (!data) return null;

  return (
    <>
      <Section overflow="hidden" className="contests">
        <img
          className="contests-hero__image"
          src={data?.image_url}
          alt="hero"
        />
        <ContestBillet
          type={data?.type}
          className="contests__contest-type"
          color={data?.type === 'creative_advertising' ? 'dark-blue' : 'gray'}
        />
        <Title className="contests__title">{data?.name}</Title>
        {(data?.sponsor_logo_url || data?.sponsor_name_ru) && (
          <Ticker className="sponsor-ticker">
            <Sponsor
              title={data?.sponsor_name_ru}
              logoUrl={data?.sponsor_logo_url}
              sponsorLink={data?.sponsor_link}
            />
          </Ticker>
        )}

        <Description sizeName="l" dangerHTML={data?.description} />
        {data?.curators.length > 0 && (
          <Link to={ROUTES.profile(data?.curators[0].id)} className="curator">
            <LazyLoad
              className="curator__image"
              src={data?.curators[0].image_url}
              alt="curator"
            />
            <div className="curator__info">
              <p>{translate('Куратор')}</p>
              <p>
                {data?.curators[0].first_name} {data?.curators[0].last_name}
              </p>
            </div>
          </Link>
        )}
      </Section>
      <Nominations contestId={params.id} />
      <TickerJury />
      {data?.analog_contests?.[0]?.id && (
        <ContestSlider
          id={data?.analog_contests?.[0]?.id}
          title={`Работы прошлых лет конкурса ${data?.analog_contests?.[0]?.name}`}
        />
      )}
    </>
  );
}
