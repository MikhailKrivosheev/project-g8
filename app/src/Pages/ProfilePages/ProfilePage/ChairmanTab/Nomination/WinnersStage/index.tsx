import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import CustomTable from 'Components/UI/Table/CustomTable';
import Title from 'Components/UI/Title';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import ArrowIcon from 'Icons/ArrowIcon';
import Api from 'Api';
import routes from 'Api/routes';
import useObserver from 'Hooks/useIntersectionObserver';
import useRoutes from 'Hooks/useRoutes';
import { INomination } from 'Types';
import useAPIError from 'Hooks/useAPIError';
import { useRecoilValue } from 'recoil';
import resizeAtom from 'Recoil/Atoms/Resize';
import LazyLoad from 'Components/LazyLoad';
import ResetVoteTooltip from '../../../ResetVoteTooltip';
import AwardButton from '../../AwardButton';
import WinnersMobileNominations from './MobileNomination';
import JuryTooltip from '../JuryTooltip';

// todo: fix ts bugs

export interface INominationWorks {
  activeNomination: [];
  setActiveNomination: Dispatch<null>;
}

export default function WinnersNomination({
  activeNomination,
  setActiveNomination,
}: INominationWorks) {
  const [nomination, setNomination] = useState<INomination[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const { isDesktop } = useRecoilValue(resizeAtom);
  const nominationContainerRef = useRef<HTMLDivElement | null>(null);
  const ROUTES = useRoutes();

  const { handleAPIError } = useAPIError();

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
      try {
        const response = await Api.get(routes.api.workJury(), {
          nomination_id: activeNomination?.id,
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
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchData();
  }, [page]);

  const { current: TableCells } = useRef([
    ({ preview_url: previewUrl }: any) => (
      <LazyLoad className="works-preview__image" src={previewUrl} alt="" />
    ),
    ({ name, id }: INomination) => <a href={ROUTES.work(`${id}`)}>{name}</a>,
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
    (data: any) => (
      <ResetVoteTooltip activeNomination={activeNomination} {...data} />
    ),
    ({ id, is_awarded: isAwarded }: any) => (
      <AwardButton
        id={id}
        isAwarded={isAwarded}
        nominationId={activeNomination?.id}
      />
    ),
  ]);

  return (
    <Section className="works-nomination" fullWidth>
      <div className="works-nomination__wrapper-title">
        <button
          type="button"
          className="works-nomination__button"
          onClick={() => {
            setActiveNomination(null);
          }}
        >
          <ArrowIcon color="black" className="works-nomination__icon" />
        </button>
        <Title sizeName="m">{activeNomination?.name}</Title>
      </div>
      <Description
        className="works-nomination__description"
        dangerHTML={activeNomination?.description}
      />
      {isDesktop ? (
        <CustomTable
          className="works-nomination__table"
          ref={nominationContainerRef}
          headers={['', '', 'Голоса Жюри', 'Ваша оценка', 'Победитель']}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cells={TableCells}
          data={nomination}
        />
      ) : (
        <WinnersMobileNominations
          data={nomination}
          activeNominationId={activeNomination?.id}
          ref={nominationContainerRef}
        />
      )}
    </Section>
  );
}
