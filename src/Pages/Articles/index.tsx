import Api from 'Api';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import ArrowIcon from 'Icons/ArrowIcon';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import useObserver from 'Hooks/useIntersectionObserver';
import { IArticle, IError } from 'Types';
import Button from 'Components/UI/Button';
import useResize from 'Hooks/useResize';
import { Link } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';
import { parseToDate } from 'Utilities/date';
import Article from 'Components/Journal/Article';

export default function Articles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const articlesContainerRef = useRef<HTMLDivElement | null>(null);
  const { isDesktop } = useResize();
  const { handleAPIError } = useAPIError();
  const ROUTES = useRoutes();

  const onScrollEnd = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasMorePages) {
      setPage((prev) => prev + 1);
    }
  };

  const { setObservable } = useObserver({
    triggerOnce: true,
    callback: onScrollEnd,
  });

  useEffect(() => {
    if (!isDesktop) {
      return;
    }
    if (articlesContainerRef.current && hasMorePages) {
      const { current } = articlesContainerRef;
      const node = current.children[current.childElementCount - 1];
      setObservable(node);
    }
  }, [articles]);

  useEffect(() => {
    setLoading(true);
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.articles(), {
          per_page: 5,
          page,
        });
        if (response.meta) {
          setTotal(response.meta.total);
        }
        if (!response.meta.has_more_pages) {
          setHasMorePages(false);
        }
        if (!articles.length) {
          setArticles(response.results);
        } else {
          setArticles((prev) => [...prev, ...response.results]);
        }
        setLoading(false);
      } catch (error: unknown) {
        handleAPIError(error as IError);
        setLoading(false);
      }
    };

    fetchContent();
  }, [page]);

  const remainingNumber = useMemo<number | ''>(() => {
    if (total - page * 5 <= 0) return '';
    if (total - page * 5 >= 5) return 5;
    return total - page * 5;
  }, [page, total]);

  const buttonVisible = useMemo(() => {
    if (loading && !isDesktop) return true;
    return !isDesktop && hasMorePages && typeof remainingNumber === 'number';
  }, [loading]);

  if (!articles.length) {
    return null;
  }

  return (
    <Section className="articles__section" ref={articlesContainerRef}>
      {articles.map((article: IArticle) => {
        const { title, is_fixed: isFixed, id, date_publish: date } = article;

        if (isFixed) {
          return (
            <div key={id} className="articles-fixed">
              <Title tag="h1" sizeName="l" className="articles-fixed__title">
                {title}
              </Title>
              <Link to={ROUTES.article(id)} className="articles__link">
                Link to article
              </Link>
              <ArrowIcon className="articles-fixed__icon" />
              <span className="articles-fixed__date">{parseToDate(date)}</span>
            </div>
          );
        }

        return <Article {...article} />;
      })}
      {buttonVisible && (
        <Button
          color="white"
          className="articles__button"
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          Eще {remainingNumber}
        </Button>
      )}
    </Section>
  );
}
