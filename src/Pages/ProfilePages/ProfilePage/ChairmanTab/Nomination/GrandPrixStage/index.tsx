import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import CustomTable from 'Components/UI/Table/CustomTable';
import Title from 'Components/UI/Title';
import useResize from 'Hooks/useResize';
import React, { Dispatch, useEffect, useMemo, useRef, useState } from 'react';
import Api from 'Api';
import routes from 'Api/routes';
import useObserver from 'Hooks/useIntersectionObserver';
import useRoutes from 'Hooks/useRoutes';
import { INomination } from 'Types';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import GreetingsText from 'Pages/ProfilePages/ProfilePage/GreetingsText';
import LazyLoad from 'Components/LazyLoad';
import GrandPrixMobileNominations from './MobileNomination';
import JuryTooltip from '../JuryTooltip';
import AwardButton from '../../AwardButton';
import ResetVotingButton from '../../Nominations/ResetVotingButton';
import ContestStageButton from '../../Nominations/ContestStageButton';
// todo: fix ts bugs

export interface INominationWorks {
  activeNomination: [];
}

export default function GrandPrixNomination({
  activeNomination,
}: INominationWorks) {
  const [nomination, setNomination] = useState<INomination[] | null>(null);
  const { contestId, is_finished, contestName } = useRecoilValue(
    contestSeasonSelector
  );
  const [isContestAwarded, setContestAwarded] = useState(Boolean(is_finished));
  const [page, setPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const { isDesktop } = useResize();
  const nominationContainerRef = useRef<HTMLDivElement | null>(null);
  const ROUTES = useRoutes();

  const onScrollEnd = ([entry]) => {
    if (entry.isIntersecting && hasMorePages) {
      setPage((prev) => prev + 1);
    }
  };

  const { setObservable } = useObserver({
    triggerOnce: true,
    callback: onScrollEnd,
  });

  useEffect(() => {
    if (nominationContainerRef.current && hasMorePages) {
      const { current } = nominationContainerRef;
      const node = current.children[current.childElementCount - 1];
      setObservable(node);
    }
  }, [nomination]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get(routes.api.workJury(), {
        contest_id: contestId,
        page,
      });

      if (!response.meta.has_more_pages) {
        setHasMorePages(false);
      }

      if (!nomination) {
        setNomination(response.results);
      } else {
        setNomination((prev) => [...prev, ...response.results]);
      }
    };

    fetchData();
  }, [page]);

  const TableCells = useMemo(() => {
    return [
      ({ preview_url: previewUrl }: INomination) => (
        <LazyLoad className="works-preview__image" src={previewUrl} alt="" />
      ),
      ({ name, id }: INomination) => <a href={ROUTES.work(id)}>{name}</a>,
      ({ nominations }: INomination) => nominations[0]?.name,
      ({
        work_votes_approved_count: workVotesApprovedCount,
        work_votes_count: workVotesCount,
        account_work_votes: accountWorkVotes,
      }: any) => {
        return (
          <JuryTooltip
            jury={accountWorkVotes}
            workVotesCount={workVotesCount}
            workVotesApprovedCount={workVotesApprovedCount}
          />
        );
      },
      ({ id, is_awarded: isAwarded }: any) => (
        <AwardButton
          id={id}
          setContestAwarded={setContestAwarded}
          isContestAwarded={isContestAwarded}
          isAwarded={isAwarded}
          nominationId={contestId}
        />
      ),
    ];
  }, [isContestAwarded]);

  return (
    <Section className="works-nomination" fullWidth>
      <GreetingsText
        contestName={contestName}
        description="Выберите победителя путем голосования и наградите его"
      />
      {isDesktop ? (
        <CustomTable
          className="works-nomination__table"
          ref={nominationContainerRef}
          headers={['', '', 'Номинация', 'Голоса Жюри', 'Победитель']}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cells={TableCells}
          data={nomination}
        />
      ) : (
        <GrandPrixMobileNominations
          data={nomination}
          ref={nominationContainerRef}
        />
      )}
      <ResetVotingButton id={contestId} />
    </Section>
  );
}
