import Api from 'Api';
import routes from 'Api/routes';
import Ticker from 'Components/Ticker';
import Link from 'Components/UI/Link';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListJury from './ListJury';

export default function TickerJury() {
  const [judges, setJudges] = useState([]);
  const params = useParams();
  const ROUTES = useRoutes();

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const response = await Api.get(routes.api.account(), {
          role: 'judge',
          contest_id: params?.id,
        });
        setJudges(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchJudges();
  }, []);

  if (judges.length <= 0) return null;

  return (
    <>
      <Section fullWidth className="jury__ticker-section">
        <Title tag="h3" sizeName="m" className="jury__title">
          Жюри
        </Title>
        <Ticker className="jury__ticker" direction="toLeft">
          <ListJury data={judges} />
        </Ticker>
        <Ticker className="jury__ticker" direction="toRight" offset="100%">
          <ListJury data={judges} />
        </Ticker>
        <Ticker className="jury__ticker" direction="toLeft">
          <ListJury data={judges} />
        </Ticker>
        <Ticker className="jury__ticker" direction="toRight" offset="100%">
          <ListJury data={judges} />
        </Ticker>
      </Section>
      <Section isWide noMargin>
        <Link href={ROUTES.jury()} className="jury__button">
          Все члены жюри
        </Link>
      </Section>
    </>
  );
}
