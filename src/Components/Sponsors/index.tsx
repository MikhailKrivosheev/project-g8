/* eslint-disable react/no-array-index-key */
import Api from 'Api';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useResize from 'Hooks/useResize';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';
import Group from './Group';
import { IGroup } from './types';

export default function Sponsors() {
  const [data, setData] = useState<IGroup[] | null>(null);
  const { isDesktop } = useResize();
  const { handleAPIError } = useAPIError();
  const current = useRecoilValue(seasonAtom);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await Api.get(Api.routes.api.sponsors(), {
          season_id: current?.id,
        });
        setData(response.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchContent();
  }, []);

  if (!data) return null;

  const shouldRender = data.find(
    ({ sponsors_published: sponsors }) => sponsors?.length > 0
  );

  if (!shouldRender) return null;

  return (
    <Section fullWidth={!isDesktop}>
      <Title sizeName="m" className="sponsors__title">
        Спонсоры и партнеры
      </Title>
      <div>
        <ScrollContainer className="scroll-container sponsors">
          <div className="sponsors__row">
            {data.map(
              (group: IGroup) =>
                group.block_type === 'high' && (
                  <Group key={group?.id} {...group} />
                )
            )}
          </div>
          <div className="sponsors__row">
            {data.map(
              (group: IGroup) =>
                group.block_type !== 'high' && (
                  <Group key={group?.id} {...group} />
                )
            )}
          </div>
        </ScrollContainer>
      </div>
    </Section>
  );
}
