/* eslint-disable no-unsafe-optional-chaining */
import ContestNomination from 'Components/ContestNomination';
import Title from 'Components/UI/Title';
import React from 'react';
import { INomination, ISpeaker } from 'Types';
import ArrowIcon from 'Icons/Arrow';
import { NavLink } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import Sponsor from '../Sponsor';
import MTSContestSpeakers from './MTSContestSpeakers';

export interface IContest {
  id: number;
  name: string;
  sponsor_name_ru: string;
  sponsor_logo_url: string;
  sponsor_link: string;
  nominations: INomination[];
  curators: ISpeaker[];
  judges_by_season_status: ISpeaker[];
  is_custom?: boolean;
}

interface IContestCard {
  data: IContest;
}

export default function MTSContestCard({ data }: IContestCard) {
  const ROUTES = useRoutes();

  return (
    <div className="contest__wrap contest__wrap--mts">
      <NavLink
        to={ROUTES.contest(data?.id.toString())}
        className="contest__link"
      />
      <div className="contest__content-top">
        <div className="contest__content-top-holder">
          <Title>{data?.name}</Title>
          <Sponsor
            title={data?.sponsor_name_ru}
            logoUrl={data?.sponsor_logo_url}
            sponsorLink={data?.sponsor_link}
            bordered
          />
        </div>
        <ArrowIcon className="contest__arrow" color="#fff" />
      </div>

      <div className="contest__content-bottom">
        {data?.nominations?.length > 0 && (
          <div className="contest__nominations">
            {data?.nominations?.map((nomination: INomination) => (
              // eslint-disable-next-line react/no-array-index-key
              <ContestNomination
                link={{
                  pathname: ROUTES.contest(data?.id.toString()),
                  hash: nomination?.id?.toString(),
                }}
                key={nomination?.id}
                data={nomination}
              />
            ))}
          </div>
        )}
        <MTSContestSpeakers
          curators={data?.curators}
          judges={data?.judges_by_season_status}
        />
      </div>
    </div>
  );
}
