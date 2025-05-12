/* eslint-disable no-unsafe-optional-chaining */
import ContestNomination from 'Components/ContestNomination';
import ContestSpeakers from 'Components/ContestSpeakers';
import ContestBillet from 'Components/ContestType';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import ArrowIcon from 'Icons/Arrow';
import PlusIcon from 'Icons/PlusIcon';
import StarIcon from 'Icons/StarIcon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { INomination, ISpeaker, TContestType } from 'Types';
import Sponsor from './Sponsor';

export interface IContest {
  id: number;
  type: TContestType;
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
  index: number;
}

export default function ContestCard({ data, index }: IContestCard) {
  const ROUTES = useRoutes();

  return (
    <div className="contest__wrap">
      {data?.type && (
        <ContestBillet
          type={data?.type}
          color={data?.type === 'creative_advertising' ? 'dark-blue' : 'gray'}
          className="contest__contest-type"
        />
      )}

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
        <ArrowIcon className="contest__arrow" color="var(--secondary-color)" />
      </div>

      <div className="contest__content-bottom">
        {data?.nominations?.length > 0 && (
          <div className="contest__nominations">
            {index % 2 === 0 ? (
              <StarIcon className="contest__nominations-icon" color="black" />
            ) : (
              <PlusIcon
                className="contest__nominations-icon"
                color="var(--secondary-color)"
              />
            )}
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
        <ContestSpeakers
          curators={data?.curators}
          judges={data?.judges_by_season_status}
        />
      </div>
    </div>
  );
}
