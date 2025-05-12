import Api from 'Api';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import { INomination } from 'Types';

export default function ResetVotingButton({ id }: Pick<INomination, 'id'>) {
  const [isDisabled, setDisabled] = useState(false);
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);

  const { handleAPIError } = useAPIError();

  async function onClick() {
    try {
      if (isGrandPrixStage) {
        await Api.post(Api.routes.api.votingReset(), {
          contest_id: id,
        });
      } else {
        await Api.post(Api.routes.api.votingReset(), {
          nomination_id: id,
        });
      }
      setDisabled(false);
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  return (
    <Button
      onClick={() => {
        setDisabled(true);
        onClick();
      }}
      disabled={isDisabled}
      fullWidth
      icon={isGrandPrixStage && 'star'}
      sizeName={isGrandPrixStage ? 'm' : 's'}
      color="transparent"
    >
      Обнулить голосование
    </Button>
  );
}
