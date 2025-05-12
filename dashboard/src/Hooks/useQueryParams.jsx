import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Utilities from 'Utilities';

export default function useQueryParams() {
  const { search } = useLocation();
  const { seasonId, contestId, nominationId } = useParams();

  const {
    season_name: seasonName,
    contest_name: contestName,
    nomination_name: nominationName,
    sort_by_published: nominationPublished,
    ...otherParams
  } = useMemo(() => Utilities.params.toObject(search), [search]);

  return {
    seasonId,
    contestId,
    nominationId,
    seasonName,
    contestName,
    nominationName,
    nominationPublished,
    otherParams,
  };
}
