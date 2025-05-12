/* eslint-disable react/no-array-index-key */
import Api from 'Api';
import routes from 'Api/routes';
import ContestBillet from 'Components/ContestType';
import LazyLoad from 'Components/LazyLoad';
import Like from 'Components/Like';
import Socials from 'Components/Share';
import Ticker from 'Components/Ticker/index';
import Description from 'Components/UI/Description';
import Section from 'Components/UI/Section';
import Slider from 'Components/UI/Slider';
import Title from 'Components/UI/Title';
import Vimeo from 'Components/Video/Vimeo';
import useAPIError from 'Hooks/useAPIError';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import ArrowIcon from 'Icons/ArrowIcon';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import { INomination } from 'Types';
import WorkMedia from './Media';
import PopupRate from './PopupRate';

interface ISlide {
  image?: string;
  video?: string;
}
interface ISlider {
  data: ISlide;
}

function Slide({ data }: ISlider) {
  if (data?.video && data?.video !== '') {
    return (
      <Vimeo className="vimeo__slide" src={data.video} preview={data.image} />
    );
  }
  return (
    <LazyLoad className="work__slider-image" src={data?.image} alt="slide" />
  );
}

interface INavLink {
  id: string;
  name: string;
}

interface IWorkInfo {
  id: number;
  name: string;
  preview_url: string;
  client_name: string;
  company: string;
  company_icon: string;
  likes_count: number;
  categories: string[];
  nominations: INomination[];
  creator: string;
  brand: string;
  project_link: string;
  targets_and_goals: string;
  ideas_and_solutions: string;
  soundcloud_link: string;
  slider_images_with_url: ISlide[];
  slider_videos_with_url: ISlide[];
  vimeo_link: string;
  video_preview_url: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  image_4_url: string;
  is_liked: boolean;
  next_work: INavLink;
  prev_work: INavLink;
}

export default function WorkPage() {
  const [data, setData] = useState<IWorkInfo | null>(null);
  const params = useParams();
  const ROUTES = useRoutes();
  const { handleAPIError } = useAPIError();
  const { pathname } = useLocation();
  const { isDesktop } = useResize();
  const { isJudge } = useRecoilValue(userRoleSelector);
  const translate = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [workCounter, setWorkCounter] = useRecoilState(workCounterAtom);

  useEffect(() => {
    async function fetchWorkCounter() {
      try {
        const { results } = await Api.get(routes.api.votingState());
        setWorkCounter(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    fetchWorkCounter();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(Api.routes.api.work(params.id), {});
        setData({ ...response.results });
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchData();
  }, [params.id]);

  const сategoriesMemoized = useMemo(() => {
    const categories: { name: string; type: string }[] = [];
    if (data?.nominations) {
      data.nominations.forEach((nomination: INomination) => {
        const existingCategory = categories.find(
          ({ name }) => name === nomination.contest?.name
        );
        if (!existingCategory) {
          categories.push({
            name: nomination.contest?.name,
            type: nomination.contest?.type,
          });
        }
      });
    } else return null;
    return categories;
  }, [data]);

  if (!data) return null;

  return (
    <>
      <Section>
        <div className="work__hero">
          <LazyLoad
            className="work__image"
            src={data.preview_url}
            alt="preview"
          />
          <div className="work-hero__info">
            <div className="work-hero__client">
              <Description>{data.company}</Description>
            </div>
            {data.name && (
              <Title sizeName="m" className="work__title-main">
                {data.name}
              </Title>
            )}
            {data && (
              <Like
                workId={data.id}
                count={data.likes_count}
                isLiked={data.is_liked}
              />
            )}
          </div>
        </div>
        {data.name && (
          <Title
            sizeName="m"
            className="work__title-main work__title-main--mobile"
          >
            {data.name}
          </Title>
        )}
      </Section>
      <Section className="work__info" overflow="hidden">
        {сategoriesMemoized && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Категория')}
            </Description>
            {сategoriesMemoized.length > 0 &&
              сategoriesMemoized.map(({ name, type }, index) => {
                return (
                  <Fragment key={index}>
                    <Description className="work-info__category">
                      {name}
                    </Description>
                    <ContestBillet
                      type={type}
                      className="work-info__contest-type"
                      color={
                        type === 'creative_advertising' ? 'dark-blue' : 'gray'
                      }
                    />
                  </Fragment>
                );
              })}
          </div>
        )}
        {data.nominations && isDesktop && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Номинации')}
            </Description>
            {data.nominations.length > 0 &&
              data.nominations.map((nomination, index) => {
                return (
                  <Description
                    className="work__nomination work__page"
                    key={index}
                  >
                    {nomination.name}
                  </Description>
                );
              })}
          </div>
        )}
        {data.nominations && !isDesktop && (
          <>
            <Description className="work-info__nomination-title">
              {translate('Номинации')}
            </Description>
            <div className="work-info__item work-info__item--nominations">
              <div className="work-info__nominations">
                {data.nominations.length > 0 &&
                  data.nominations.map((nomination, index) => {
                    return (
                      <Description
                        className="work__nomination work__page"
                        key={index}
                      >
                        {nomination.name}
                      </Description>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {data.client_name && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Автор')}
            </Description>
            <Description>{data.client_name}</Description>
          </div>
        )}
        {data.company && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Компания')}
            </Description>
            <Description>{data.company}</Description>
          </div>
        )}
        {data.brand && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Бренд')}
            </Description>
            <Description>{data.brand}</Description>
          </div>
        )}
        {data.project_link && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Проект')}
            </Description>
            <a
              href={data.project_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.project_link.replace(/(^\w+:|^)\/\//, '')}
            </a>
          </div>
        )}
        {data.targets_and_goals && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Задача')}
            </Description>
            <Description dangerHTML={data.targets_and_goals} />
          </div>
        )}
        {data.ideas_and_solutions && (
          <div className="work-info__item">
            <Description className="work-info__item-headline">
              {translate('Идеи и решения')}
            </Description>
            <Description dangerHTML={data.ideas_and_solutions} />
          </div>
        )}
      </Section>
      <WorkMedia data={data} />
      {!data.soundcloud_link ? (
        <>
          {data.image_4_url && (
            <Section className="work__media">
              <div className="work__image-container">
                <LazyLoad src={data.image_4_url} alt="preview" />
                <img src={data.image_4_url} alt="" />
              </div>
            </Section>
          )}
          {data.slider_images_with_url?.length > 0 && (
            <Section className="work__slider-section" overflow="hidden">
              <Slider
                className="work__slider"
                elements={data.slider_images_with_url}
                slide={Slide}
                pagination
              />
            </Section>
          )}
          {data.vimeo_link && (
            <Section className="work__media">
              <Vimeo src={data.vimeo_link} preview={data.video_preview_url} />
            </Section>
          )}
          {data.slider_videos_with_url?.length > 0 && (
            <Section className="work__slider-section" overflow="hidden">
              <Slider
                className="work__slider"
                elements={data.slider_videos_with_url}
                slide={Slide}
                pagination
              />
            </Section>
          )}
        </>
      ) : (
        data.slider_videos_with_url?.length > 0 && (
          <Section className="work__slider-section" overflow="hidden">
            <Slider
              className="work__slider"
              elements={data.slider_videos_with_url}
              slide={Slide}
              pagination
            />
          </Section>
        )
      )}
      <Socials title={data.name} link={ROUTES.work(params?.id)} />

      {data.next_work && data.prev_work && (
        <Section fullWidth>
          <Link to={ROUTES.work(data.next_work.id)}>
            <Ticker className="work__ticker">
              <Description>
                <ArrowIcon className="work__ticker-arrow" color="green" />
                <ArrowIcon className="work__ticker-arrow" color="green" />
                {data.next_work.name}
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                {translate('Следующая работа')}
              </Description>
            </Ticker>
          </Link>
          <Link to={ROUTES.work(data.prev_work.id)}>
            <Ticker
              className="work__ticker work__ticker--prev"
              direction="toRight"
            >
              <Description>
                <ArrowIcon className="work__ticker-arrow" color="green" />
                <ArrowIcon className="work__ticker-arrow" color="green" />
                {data.prev_work.name}
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                {translate('Предыдущая работа')}
              </Description>
            </Ticker>
          </Link>
        </Section>
      )}

      {workCounter && workCounter?.work_winners_count !== 0 && isJudge && (
        <PopupRate />
      )}
    </>
  );
}
