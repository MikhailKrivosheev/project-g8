import Api from 'Api';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import useAPIError from 'Hooks/useAPIError';
import useUserActions from 'Hooks/useUserActions';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import resizeAtom from 'Recoil/Atoms/Resize';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';

interface IAwardProps {
  id: number;
  isAwarded?: boolean;
  nominationId?: number;
}

export default function AwardButton({
  id,
  nominationId,
  isContestAwarded,
  setContestAwarded,
  isAwarded = false,
}: IAwardProps) {
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);
  const [disabled, setDisabled] = useState(false);
  const [awarded, setAwarded] = useState<boolean>(isAwarded);
  const { isDesktop } = useRecoilValue(resizeAtom);
  const { handleAPIError } = useAPIError();
  const { fetchUser } = useUserActions();

  async function onAward() {
    try {
      if (isGrandPrixStage) {
        const { success } = await Api.post(Api.routes.api.rewarding(), {
          contest_id: nominationId,
          work_id: id,
        });
        if (success) {
          setAwarded(true);
          setContestAwarded(true);
          fetchUser();
        }
      } else {
        const { success } = await Api.post(Api.routes.api.rewarding(), {
          nomination_id: nominationId,
          work_id: id,
        });
        if (success) setAwarded(true);
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  if (isContestAwarded && !awarded) {
    return <Description>Победитель определен</Description>;
  }

  return awarded ? (
    <Description>Работа победила</Description>
  ) : (
    <Button
      onClick={() => {
        setDisabled(true);
        onAward();
      }}
      disabled={disabled}
      color="gray"
      strached={isDesktop}
      fullWidth={!isDesktop}
      sizeName="s"
      // className="works-preview__link"
    >
      Наградить
    </Button>
  );
}
