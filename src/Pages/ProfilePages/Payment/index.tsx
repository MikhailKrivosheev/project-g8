import Api from 'Api';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import CustomLink from 'Components/UI/Link';
import Section from 'Components/UI/Section';
import Table from 'Components/UI/Table/Table';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTranslate from 'Hooks/useTranslate';
import AccountBackground from '../Background';

export default function Payment() {
  const { id } = useParams();
  const translate = useTranslate();
  const [isDisabled, setDisabled] = useState(false);
  const ROUTES = useRoutes();

  const [work, setWork] = useState<any>(null);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await Api.get(Api.routes.api.work(id));
        setWork(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchWork();
  }, []);

  async function sendPayment(type: string, paymentId: number | string) {
    try {
      const response = await Api.put(Api.routes.api.payment(paymentId), {
        type,
      });
      if (response?.results?.redirect_url)
        window.location = response?.results?.redirect_url;
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  const TableCells = useMemo(() => {
    return [
      (data: any) => (
        <div className="payment-table__cell">
          <Description className="payment__title" color="gray">
            Категория
          </Description>
          <Description>{data?.nominations?.[0]?.contest?.name}</Description>
        </div>
      ),
      ({ nominations }: any) => (
        <div className="payment-table__cell">
          <Description className="payment__title" color="gray">
            Номинации
          </Description>
          <div className="payment__button-holder">
            {nominations?.map(({ name, id: nominationId }: any) => (
              <div key={nominationId} className="contest__nomination">
                {name}
              </div>
            ))}
          </div>
        </div>
      ),
      ({ payment }: any) => (
        <div className="payment-table__cell">
          <Description className="payment__title" color="gray">
            Стоимость
          </Description>
          <Description>{payment?.amount} ₽</Description>
          <div />
        </div>
      ),
    ];
  }, []);

  if (!work) return null;

  return (
    <>
      <AccountBackground />
      <Section className="payment works-user">
        <CustomLink
          direction="left"
          href={ROUTES.workUpdate(id)}
          className="payment__link"
        >
          {translate('Вернуться к редактированию работы')}
        </CustomLink>
        <Title>Оплата</Title>
        <Table className="payment__table" data={[work]} cells={TableCells} />
        {work?.payment?.amount && (
          <Title sizeName="m">
            Стоимость подачи работы: {work?.payment?.amount} ₽
          </Title>
        )}
        <div className="payment__buttons">
          <Button
            disabled={isDisabled}
            onClick={() => {
              setDisabled(true);
              sendPayment('individuals', work?.payment?.id);
            }}
          >
            Оплата для физических лиц
          </Button>
          <Button
            disabled={isDisabled}
            link={ROUTES.paymentLegal(work?.payment?.id)}
          >
            Оплата для юридических лиц
          </Button>
          <Button disabled={isDisabled} link={ROUTES.work(id)}>
            Предпросмотр страницы
          </Button>
        </div>
      </Section>
    </>
  );
}
