import Api from 'Api';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import useTranslate from 'Hooks/useTranslate';
import Nomination from './Nomination';
import { INomination } from './types';

export default function Nominations({ contestId }: any) {
  const [nominations, setNominations] = useState([]);
  const { handleAPIError } = useAPIError();
  const translate = useTranslate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(
          // todo: remove params object
          Api.routes.api.nomination(),
          {
            per_page: 30,
            contest_id: contestId,
          }
        );
        setNominations(response.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  if (nominations?.length <= 0) return null;

  return (
    <Section>
      <Title tag="h2" sizeName="s">
        {translate('Номинации')}
      </Title>
      {nominations?.map((item: INomination) => {
        return <Nomination key={item.id} {...item} />;
      })}
    </Section>
  );
}
