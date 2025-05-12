import Api from 'Api';
import Card from 'Components/UI/Card';
import useAPIError from 'Hooks/useAPIError';
import useGetParams from 'Hooks/useGetParams';
import useResize from 'Hooks/useResize';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import useObserver from 'Hooks/useIntersectionObserver';
import seasonAtom, { ISeason } from 'Recoil/Atoms/Season';

interface IWork {
  gallery_with_url: string;
  preview_url: string;
  company: string;
  name: string;
  season: ISeason;
  brand: string;
  id: number;
  is_liked: boolean;
  likes_count: number;
}

export default function WorksCards() {
  const { isDesktop } = useResize();
  const abortController = useRef(Api.generateAbortController());
  const setFilterParams = useSetRecoilState(workFilterAtom);
  const [works, setWorks] = useState<IWork[]>([]);
  const filter = useGetParams();
  const { handleAPIError } = useAPIError();
  const [searchParams] = useSearchParams();
  const workContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const season = useRecoilValue(seasonAtom);

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
    if (workContainerRef.current && hasMorePages) {
      const { current } = workContainerRef;
      const node = current.children[current.childElementCount - 1];
      setObservable(node);
    }
  }, [works]);

  useEffect(() => {
    setFilterParams(Object.fromEntries(searchParams));
  }, []);

  useEffect(() => {
    setPage(1);
    const fetchWorks = async () => {
      try {
        const response = await Api.get(Api.routes.api.works(), {
          per_page: 9,
          season_id: season?.id,
          page: 1,
          ...filter,
        });

        if (!response?.meta?.has_more_pages) {
          setHasMorePages(false);
        } else {
          setHasMorePages(true);
        }
        setWorks(response.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchWorks();
    return () => {
      abortController.current.abort();
    };
  }, [filter]);

  function isWide(index: number, cardSeason: string) {
    if (cardSeason && parseInt(cardSeason, 10) <= 2021) return false;
    return isDesktop ? (index + 1) % 9 === 0 : (index + 1) % 5 === 0;
  }

  useEffect(() => {
    if (page > 1) {
      abortController.current.abort();
      abortController.current = Api.generateAbortController();
      const fetchWorks = async () => {
        try {
          const response = await Api.get(Api.routes.api.works(), {
            per_page: 9,
            season_id: season?.id,
            page,
            ...filter,
          });
          if (!response?.meta?.has_more_pages) {
            setHasMorePages(false);
          }
          setWorks((prev) => [...prev, ...response.results]);
        } catch (error: any) {
          handleAPIError(error);
        }
      };

      fetchWorks();
    }

    return () => {
      abortController.current.abort();
    };
  }, [page]);

  return works?.length > 0 ? (
    <div className="works-page__cards" ref={workContainerRef}>
      {works.map(
        (
          {
            id,
            preview_url: previewUrl,
            company: companyRu,
            name: nameRu,
            likes_count: likesCount,
            season: cardSeason,
            is_liked: isLiked,
          },
          index
        ) => (
          <Card
            key={id}
            id={id}
            isWide={isWide(index, cardSeason?.year)}
            className="work-page__card"
            image={previewUrl}
            company={companyRu}
            title={nameRu}
            isLiked={isLiked}
            likes={likesCount}
          />
        )
      )}
    </div>
  ) : null;
}
