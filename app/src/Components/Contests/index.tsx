import Api from 'Api';
import routes from 'Api/routes';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import ContestCard, { IContest } from './ContestCard';
import MTSContestCard from './MTSContestCard/MTSContestCard';

export default function Contests() {
  const [contests, setContests] = useState<IContest[]>([]);
  const { handleAPIError } = useAPIError();
  const season = useRecoilValue(seasonAtom);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await Api.get(routes.api.contests(), {
          season_id: season?.id,
        });
        setContests(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };
    fetchContests();
  }, []);

  if (contests?.length <= 0) return null;

  if (season?.status === 'finished') return null;

  return (
    <Section isWide className="contest-cards">
      {contests?.map((contest: IContest, index) => {
        return !contest.is_custom ? (
          // eslint-disable-next-line react/no-array-index-key
          <ContestCard key={index} data={contest} index={index} />
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <MTSContestCard key={index} data={contest} />
        );
      })}
    </Section>
  );
}
