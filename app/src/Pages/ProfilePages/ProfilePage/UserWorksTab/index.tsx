import Api from 'Api';
import ContestBillet from 'Components/ContestType';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import WorkCard from './WorkCard';
import { IWorksUser } from './types';

export default function UserWorksTab() {
  const [advertisingWorks, setAdvertisingWorks] = useState<IWorksUser[] | null>(
    null
  );
  const [industriesWorks, setIndustriesWorks] = useState<IWorksUser[] | null>(
    null
  );
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.workAccount(), {
          count: 0,
        });

        setAdvertisingWorks(response.results['Creative Advertising']);
        setIndustriesWorks(response.results['Creative Industries']);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  if (!advertisingWorks && !industriesWorks) {
    return null;
  }

  return (
    <Section className="works-user" fullWidth>
      {advertisingWorks && advertisingWorks.length > 0 && (
        <ul className="works-user__list">
          <ContestBillet
            type="creative_advertising"
            className="works-user__contest-type"
            color="dark-blue"
            isUpperCase
          />
          {advertisingWorks.map((work: IWorksUser) => {
            return (
              <WorkCard
                {...work}
                deleteCallBack={setAdvertisingWorks}
                key={work.id}
              />
            );
          })}
        </ul>
      )}

      {industriesWorks && industriesWorks.length > 0 && (
        <ul className="works-user__list">
          <ContestBillet
            type="creative_industries"
            isUpperCase
            color="gray"
            className="works-user__contest-type"
          />
          {industriesWorks.map((work: IWorksUser) => {
            return (
              <WorkCard
                {...work}
                deleteCallBack={setIndustriesWorks}
                key={work.id}
              />
            );
          })}
        </ul>
      )}
    </Section>
  );
}
