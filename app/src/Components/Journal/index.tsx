import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import React, { useEffect, useState } from 'react';
import Api from 'Api';
import routes from 'Api/routes';
import { IMeta, IArticle } from 'Types';
import CustomLink from 'Components/UI/Link';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import useRoutes from 'Hooks/useRoutes';
import Article from './Article';

interface IState {
  results: IArticle[];
  meta: IMeta;
}

export default function Journal() {
  const [journal, setJournal] = useState<IState | null>(null);
  const translate = useTranslate();
  const { handleAPIError } = useAPIError();
  const ROUTES = useRoutes();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await Api.get(routes.api.articles());
        setJournal(response);
      } catch (error: any) {
        handleAPIError(error);
      }
    };
    fetchJournal();
  }, []);

  if (!journal || journal?.results?.length <= 0) return null;

  return (
    <>
      <Section>
        <Title color="black" sizeName="m">
          Журнал
        </Title>
        {journal.results.map((article) => (
          <Article key={article?.id} {...article} />
        ))}
      </Section>
      <Section noMargin isWide>
        <CustomLink href={ROUTES.articles()}>
          <span>{translate('Все новости')}</span>
          <span>{journal?.meta?.total}</span>
        </CustomLink>
      </Section>
    </>
  );
}
