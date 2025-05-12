import Api from 'Api';
import routes from 'Api/routes';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import CustomTable from 'Components/UI/Table/CustomTable';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useObserver from 'Hooks/useIntersectionObserver';
import useResize from 'Hooks/useResize';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import useTranslate from 'Hooks/useTranslate';
import LangAtom from 'Recoil/Atoms/Lang';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import seasonAtom from 'Recoil/Atoms/Season';
import AllWorksMobile from './AllWorksMobile';
import { INominationWork } from './types';
import WorkCount from './WorksCount';

interface IAllWorks {
  setActiveNomination?: INominationWork;
}

const invalidSeasons = ['disable', 'accept_requests_start', 'moderation_start'];

const isJudgeCanNotVote = (season: string, judgeType: string) => {
  switch (true) {
    case invalidSeasons.includes(season):
      return true;

    case judgeType === 'executive' && season !== 'longlist_start':
      return true;

    case judgeType !== 'executive' && season === 'longlist_start':
      return true;

    default:
      return false;
  }
};

export default function AllWorks({ setActiveNomination }: IAllWorks) {
  const lang = useRecoilValue(LangAtom);
  const {
    first_name: firstName,
    first_name_en: firstNameEn,
    judge_type: judgeType,
  } = useRecoilValue(userAtom);
  const [nominations, setNominations] = useState<any | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const { handleAPIError } = useAPIError();
  const { isDesktop } = useResize();
  const translate = useTranslate();
  const setWorkCounter = useSetRecoilState(workCounterAtom);
  const listWorksRef = useRef<HTMLDivElement | null>(null);
  const season = useRecoilValue(seasonAtom);
  const { isJudge } = useRecoilValue(userRoleSelector);

  const onScrollEnd = ([entry]: any) => {
    if (entry.isIntersecting && hasMorePages) {
      setPage((prev) => prev + 1);
    }
  };

  const { setObservable } = useObserver({
    triggerOnce: true,
    callback: onScrollEnd,
  });

  useEffect(() => {
    async function fetchWorkCounter() {
      try {
        const { results } = await Api.get(routes.api.votingState());
        setWorkCounter(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    if (isJudge) {
      fetchWorkCounter();
    }
  }, []);

  useEffect(() => {
    if (listWorksRef.current && hasMorePages) {
      const { current } = listWorksRef;
      const node = current.children[current.childElementCount - 1];
      setObservable(node);
    }
  }, [nominations]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(routes.api.nominationsByAccount(), {
          page,
        });

        if (!response.meta.has_more_pages) {
          setHasMorePages(false);
        }

        if (!nominations) {
          setNominations(response.results);
        } else {
          setNominations((prev: any) => [...prev, ...response.results]);
        }
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchData();
  }, [page]);

  const TableCells = useMemo(() => {
    return [
      ({ contest }: Pick<INominationWork, 'contest'>) => contest?.name,
      (nominationsCell: INominationWork) => (
        <Button
          strached
          sizeName="s"
          color="gray"
          onClick={() => {
            setActiveNomination(nominationsCell);
          }}
          className="works-jury__button"
        >
          {nominationsCell?.name}
        </Button>
      ),
      ({
        work_count: workCount,
        work_voting_count: workVotingCount,
      }: Pick<INominationWork, 'work_count' | 'work_voting_count'>) => {
        return workCount - workVotingCount;
      },
    ];
  }, []);

  const userName = useMemo(() => {
    if (lang === 'en' && firstNameEn) {
      return firstNameEn;
    }
    return firstName;
  }, [lang]);

  return (
    <Section className="works-jury" fullWidth>
      <Title sizeName="m">
        {translate('Добрый день')}, {userName}!
      </Title>
      {isJudgeCanNotVote(season?.contest_stage_code, judgeType) ? (
        <Description
          marginSizeName="s"
          className="works-jury__vote-description"
        >
          {translate('На текущем этапе голосование вам недоступно.')}
        </Description>
      ) : (
        <>
          <Description marginSizeName="s">
            {translate(
              'Вы можете оценивать работы в случайном порядке, для этого нажмите на кнопку “Оценить работы”. Либо выбрать конкретную номинацию, для этого перейдите к таблице ниже и нажмите на эту номинацию.'
            )}
          </Description>
          <WorkCount judgeType={judgeType} />
          {isDesktop ? (
            <CustomTable
              className="works-jury__table"
              ref={listWorksRef}
              headers={[
                translate('Категория'),
                translate('Номинация'),
                translate('Осталось работ'),
              ]}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              cells={TableCells}
              data={nominations}
            />
          ) : (
            <AllWorksMobile
              data={nominations}
              setActiveNomination={setActiveNomination}
              ref={listWorksRef}
            />
          )}
        </>
      )}
    </Section>
  );
}
