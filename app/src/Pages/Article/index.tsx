import Section from 'Components/UI/Section';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Api from 'Api';
import Title from 'Components/UI/Title';
import { parseToDate } from 'Utilities/date';
import Description from 'Components/UI/Description';
import Slider from 'Components/UI/Slider';
import Video from 'Components/Video/Vimeo';
import Ticker from 'Components/Ticker/index';
import ArrowIcon from 'Icons/ArrowIcon';
import useRoutes from 'Hooks/useRoutes';
import Soundcloud from 'Pages/WorkPages/Work/Media/Soundcloud';
import LazyLoad from 'Components/LazyLoad';
import Share from 'Components/Share';

interface ISlide {
  image?: string;
  video?: string;
}
interface ISlider {
  data: ISlide;
}

interface INavLink {
  id: string;
  title: string;
}

interface IArticle {
  title: string;
  subtitle: string;
  date_publish: string;
  thumbnail_url: string;
  content: string;
  video_link: string;
  soundcloud_link: string;
  slider_url: ISlide[];
  next_article: INavLink;
  prev_article: INavLink;
}

function Slide({ data }: ISlider) {
  if (data?.video && data?.video !== '') {
    return <Video src={data?.video} preview={data?.image} />;
  }
  return (
    <LazyLoad className="work__slider-image" src={data?.image} alt="slide" />
  );
}

export default function Article() {
  const [data, setData] = useState<IArticle | null>(null);
  const params = useParams();
  const ROUTES = useRoutes();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.article(params.id), {});
        setData({ ...response.results });
      } catch (error) {
        console.log(error, 'error');
      }
    };

    fetchContent();
  }, []);

  if (!data) return null;
  return (
    <>
      <Section className="article__section">
        <Title tag="h1" className="article__title">
          {data?.title}
        </Title>
        <p className="article__date">{parseToDate(data?.date_publish)}</p>
      </Section>
      <Section className="article__section">
        <LazyLoad
          className="article__image-holder"
          src={data?.thumbnail_url}
          alt="curator"
        />
      </Section>
      <Section className="article__section">
        <Description sizeName="l" className="article__thumbnail">
          {data?.subtitle}
        </Description>

        <div className="article__content">
          <Description
            sizeName="s"
            dangerHTML={data?.content}
            className="article__description"
          />
        </div>
      </Section>
      <Section className="article__section">
        {data?.soundcloud_link && (
          <Soundcloud
            name={data.title || 'soundcloud'}
            link={data.soundcloud_link}
          />
        )}
        {data?.video_link && <Video src={data?.video_link} />}
      </Section>
      <Section className="article__section" overflow="hidden">
        {data?.slider_url && data?.slider_url.length > 0 && (
          <Slider
            overflow="visible"
            spaceBetween={16}
            className="article__slider"
            elements={data?.slider_url}
            slide={Slide}
            pagination
          />
        )}
      </Section>
      <Share title={data?.title} link={ROUTES.article(params?.id)} />
      {data?.next_article && data?.prev_article && (
        <Section fullWidth>
          <Link to={ROUTES.article(data?.next_article?.id)}>
            <Ticker className="work__ticker">
              <Description>
                <ArrowIcon className="work__ticker-arrow" color="green" />
                <ArrowIcon className="work__ticker-arrow" color="green" />
                {data?.next_article?.title}
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                Следующая новость
              </Description>
            </Ticker>
          </Link>
          <Link to={ROUTES.article(data?.prev_article?.id)}>
            <Ticker
              className="work__ticker work__ticker--prev"
              direction="toRight"
            >
              <Description>
                <ArrowIcon className="work__ticker-arrow" color="green" />
                <ArrowIcon className="work__ticker-arrow" color="green" />
                {data?.prev_article?.title}
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                <ArrowIcon
                  className="work__ticker-arrow work__ticker-arrow--revert"
                  color="green"
                />
                Предыдущая новость
              </Description>
            </Ticker>
          </Link>
        </Section>
      )}
    </>
  );
}
