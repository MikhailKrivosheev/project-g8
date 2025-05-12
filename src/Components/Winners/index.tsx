import React, { useEffect, useRef, useState } from 'react';
import Card from 'Components/UI/Card';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import { IWork } from 'Types/index';
import Slider from 'Components/UI/Slider';
import useResize from 'Hooks/useResize';
import Link from 'Components/UI/Link';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import { useSetRecoilState } from 'recoil';
import Filter from 'Components/Winners/Filter';
import WorksCards from 'Components/Winners/Cards';
import Api from 'Api';
import useGetParams from 'Hooks/useGetParams';
import useAPIError from 'Hooks/useAPIError';
import { useSearchParams } from 'react-router-dom';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';

interface ISlide {
  data: IWork;
}

interface IOption {
  value: number;
  label: string;
}

function Slide({ data }: ISlide) {
  return (
    <Card
      key={data.id}
      id={data.id}
      className="work-page__card"
      image={data.preview_url}
      company={data.company}
      title={data.name}
      isLiked={data.is_liked}
      likes={data.likes_count}
    />
  );
}

export default function Winners() {
  const [works, setWorks] = useState<IWork[]>([]);
  const [worksAmount, setWorksAmount] = useState<number>();
  const [options, setOptions] = useState<IOption[]>([]);
  const filter = useGetParams();
  const ROUTES = useRoutes();
  const setFilterParams = useSetRecoilState(workFilterAtom);
  const [searchParams] = useSearchParams();
  const translate = useTranslate();
  const { handleAPIError } = useAPIError();
  const abortController = useRef(Api.generateAbortController());
  const { isDesktop } = useResize();

  useEffect(() => {
    setFilterParams(Object.fromEntries(searchParams));
  }, []);

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();
    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.season(),
          {
            count: 0,
            has_winners: 1,
          },
          {
            signal: abortController.current.signal,
          }
        );
        setOptions(
          response?.results?.map(({ year, id }: any) => ({
            value: id,
            label: year,
          }))
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchOptions();
    return () => {
      abortController.current.abort();
    };
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        if (options) {
          const response = await Api.get(Api.routes.api.works(), {
            per_page: 6,
            season_id: options[0].value,
            page: 1,
            ...filter,
            nomination_stage: 'grand_prix',
          });
          setWorks(response.results);
          setWorksAmount(response.meta.total_without_params);
        }
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchWorks();
    return () => {
      abortController.current.abort();
    };
  }, [filter, options]);

  return (
    <>
      <Section fullWidth={!isDesktop} className="winners">
        <Title color="black" className="title winners__title" sizeName="l">
          {translate('Победители всех лет')}
        </Title>
        {isDesktop && options.length > 0 && (
          <Filter options={options} first={options[0].value} />
        )}
        {works.length === 0 && (
          <p className="winners__placeholder">
            {translate('В этом сезоне/категории нет победителей.')}
          </p>
        )}
        {works.length > 0 &&
          (isDesktop ? (
            <WorksCards works={works} />
          ) : (
            <Slider
              className="winners__slider"
              elements={works}
              slide={Slide}
              pagination
              spaceBetween={16}
            />
          ))}
      </Section>
      <Section noMargin isWide>
        <Link href={ROUTES.works()}>
          <span>{translate('Все работы')}</span>
          {worksAmount && <span>{worksAmount}</span>}
        </Link>
      </Section>
    </>
  );
}
