import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import CustomTable from 'Components/UI/Table/CustomTable';
import Title from 'Components/UI/Title';
import useResize from 'Hooks/useResize';
import React, { Dispatch, useEffect, useMemo, useRef, useState } from 'react';
import ArrowIcon from 'Icons/ArrowIcon';
import Api from 'Api';
import routes from 'Api/routes';
import useObserver from 'Hooks/useIntersectionObserver';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import userAtom from 'Recoil/Atoms/User';
import LazyLoad from 'Components/LazyLoad';
import NominationWorksMobile from './NominationWorksMobile';
import { INominationData } from './types';
import ResetVoteTooltip from '../../ResetVoteTooltip';
import GreetingsText from '../../GreetingsText';

// todo: fix ts bugs

interface INominationWorks {
  activeNomination: [];
  setActiveNomination: Dispatch<null>;
}

export default function NominationWorks({
  activeNomination,
  setActiveNomination,
}: INominationWorks) {
  const [nomination, setNomination] = useState<INominationData[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const { first_name } = useRecoilValue(userAtom);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const { isDesktop } = useResize();
  const { isGrandPrixStage, contestId, contestName } = useRecoilValue(
    contestSeasonSelector
  );
  const nominationContainerRef = useRef<HTMLDivElement | null>(null);
  const ROUTES = useRoutes();
  const translate = useTranslate();

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
      let response;
      if (isGrandPrixStage) {
        response = await Api.get(routes.api.workJury(), {
          contest_id: contestId,
          page,
        });
      } else {
        response = await Api.get(routes.api.workJury(), {
          nomination_id: activeNomination?.id,
          page,
        });
      }

      if (!response.meta.has_more_pages) {
        setHasMorePages(false);
      }

      if (!nomination) {
        setNomination(response.results);
      } else {
        setNomination((prev) => [...prev, ...response?.results]);
      }
    };

    fetchData();
  }, [page]);

  const TableCells = useMemo(() => {
    return [
      ({ preview_url: previewUrl }: Pick<INominationData, 'preview_url'>) => (
        <LazyLoad className="works-preview__image" src={previewUrl} alt="" />
      ),
      ({ name, id }: Pick<INominationData, 'name' | 'id'>) => (
        <a href={ROUTES.work(id)}>{name}</a>
      ),
      ({ account }: Pick<INominationData, 'account'>) => account?.first_name,
      ({ client_name: clientName }: Pick<INominationData, 'client_name'>) =>
        clientName,
      (data: any) => (
        <ResetVoteTooltip activeNomination={activeNomination} {...data} />
      ),
    ];
  }, []);

  return (
    <Section className="works-nomination" fullWidth>
      {isGrandPrixStage ? (
        <GreetingsText
          contestName={contestName}
          description="Пожалуйста, выберите победителя"
        />
      ) : (
        <>
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
        </>
      )}
      {isDesktop ? (
        <CustomTable
          className="works-nomination__table"
          ref={nominationContainerRef}
          headers={[
            '',
            '',
            translate('Автор'),
            translate('Клиент'),
            translate('Ваша оценка'),
          ]}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          cells={TableCells}
          data={nomination}
        />
      ) : (
        <NominationWorksMobile
          activeNomination={activeNomination}
          data={nomination}
          ref={nominationContainerRef}
        />
      )}
    </Section>
  );
}
