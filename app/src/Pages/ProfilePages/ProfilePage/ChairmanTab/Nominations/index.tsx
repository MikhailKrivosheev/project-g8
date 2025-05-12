import Api from 'Api';
import routes from 'Api/routes';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import CustomTable from 'Components/UI/Table/CustomTable';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import { INomination } from 'Pages/ContestPages/Nominations/types';
import ProfileSection from 'Pages/ProfilePages/ProfileSection';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import ContestStageButton from './ContestStageButton';
import ResetVotingButton from './ResetVotingButton';

export default function ChairmanNominations({
  setActiveNomination,
}: {
  setActiveNomination: (state: INomination) => void;
}) {
  const abortController = useRef(Api.generateAbortController());
  const user = useRecoilValue(userAtom);
  const [nominations, setNominations] = useState<INomination[]>([]);
  const translate = useTranslate();

  const { current: TableCells } = useRef([
    (nomination: INomination) => (
      <Button
        onClick={() => setActiveNomination(nomination)}
        sizeName="s"
        fullWidth
        color="gray"
      >
        {nomination?.name}
      </Button>
    ),
    (nomination: INomination) => <ResetVotingButton id={nomination?.id} />,
  ]);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();
    const fetchNominations = async () => {
      try {
        const response = await Api.get(
          routes.api.nominationsByAccount(),
          {
            count: 0,
          },
          {
            signal: abortController.current.signal,
          }
        );

        if (!nominations) {
          setNominations(response.results);
        } else {
          setNominations((prev: INomination[]) => [
            ...prev,
            ...response.results,
          ]);
        }
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    fetchNominations();

    return () => {
      abortController.current.abort();
    };
  }, []);

  if (!nominations?.length) return null;

  return (
    <ProfileSection>
      <Title sizeName="m" className="works-jury__title">
        Добрый день, {user?.first_name}!
      </Title>
      <Description>
        Пожалуйста, перейдите в определенную номинацию для голосования. Если вы
        хотите обнулить голосования нажмите кнопку «Обнулить голосование. Если
        победитель в каждой номинации выбран, можете переходить в этап
        Grand-Prix
      </Description>
      <Title sizeName="semi-s" marginSizeName="s">
        Категория: {nominations[0]?.contest?.name}
      </Title>
      <CustomTable
        className="chairman-table"
        headers={[translate('Номинация'), '']}
        cells={TableCells}
        data={nominations}
      />
      <ContestStageButton contestId={nominations[0]?.contest?.id} />
    </ProfileSection>
  );
}
