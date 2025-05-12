import Api from 'Api';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import QuillText from 'Components/UI/QuillText';
import Section from 'Components/UI/Section';
import Table from 'Components/UI/Table/Table';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import useScript from 'Hooks/useScript';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import workFormAtom from 'Recoil/Atoms/WorkForm';
import { TTicket } from './types';

interface IPrice {
  title: string;
  type: string;
  widget_type: 'ticketscloud' | 'timepad';
  description: string;
  price: string;
  data_tc_event: string;
  data_tc_token: string;
  timepad_event_id: string;
  timepad_customized_id: string;
  id: string | number;
}

const BuyTicketButton = ({
  type,
  widget_type: widgetType,
  data_tc_token: dataTcToken,
  data_tc_event: dataTcEvent,
  timepad_event_id: timepadEventId,
  timepad_customized_id: timepadCustomizationId,
  id,
}: Partial<IPrice>) => {
  const setWorkValue = useSetRecoilState(workFormAtom);
  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const { isDesktop } = useResize();

  const getDataAttributes = () => {
    return widgetType === 'ticketscloud'
      ? {
          'data-tc-event': dataTcEvent,
          'data-tc-token': dataTcToken,
        }
      : {
          'timepad-event-id': timepadEventId,
          'timepad-customized-id': timepadCustomizationId,
        };
  };

  if (type === 'buy_ticket')
    return (
      <Button
        id={
          widgetType === 'timepad'
            ? `timepad_twf_register_${timepadEventId || '2858325'}`
            : ''
        }
        className="price-table__button"
        icon="star"
        color="gray"
        link="#"
        fullWidth={!isDesktop}
        dataAttributes={getDataAttributes()}
      >
        Купить билет
      </Button>
    );
  return (
    <Button
      className="price-table__button"
      icon="star"
      color="gray"
      fullWidth={!isDesktop}
      onClick={() => {
        if (id) {
          setWorkValue((prev) => ({ ...prev, contests: id.toString() }));
          navigate(ROUTES.workCreate());
        }
      }}
    >
      Подать работу
    </Button>
  );
};

export default function Price() {
  const [data, setData] = useState<IPrice[]>();
  const { handleAPIError } = useAPIError();
  const seasonCurrent = useRecoilValue(seasonAtom);
  const { price: priceSettings } = useRecoilValue(settingsAtom);

  const { current: tableCells } = useRef([
    ({ title, description }: Partial<IPrice>) => {
      return (
        <>
          <Description sizeName="l" className="price-table__title">
            {title}
          </Description>
          <Description
            sizeName="m"
            className="price-table__description"
            dangerHTML={description}
          />
        </>
      );
    },
    ({ price }: Partial<IPrice>) => {
      return (
        <Description sizeName="l" className="price-table__price">
          {price} ₽
        </Description>
      );
    },
    (props: Partial<IPrice>) => <BuyTicketButton {...props} />,
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.price(), {});
        setData(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  const { initScript } = useScript(data as TTicket);

  useEffect(() => {
    if (data) {
      initScript();
    }
  }, [data]);

  if (!data) return null;

  return (
    <Section overflow="hidden">
      <Title sizeName="l">Стоимость</Title>
      <img
        className="price-hero__image"
        src={priceSettings?.banner}
        alt="hero"
      />
      <QuillText
        dangerHTML={priceSettings?.text}
        className="price-info__text"
      />
      <Table className="price-table" data={data} cells={tableCells} />
    </Section>
  );
}
