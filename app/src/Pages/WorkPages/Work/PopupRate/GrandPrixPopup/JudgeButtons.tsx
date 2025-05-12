import Button from 'Components/UI/Button';
import React, { useState } from 'react';

interface IJudgeButtons {
  sendVote: (vote: boolean) => Promise<void>;
}

export default function JudgeButtons({ sendVote }: IJudgeButtons) {
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

  const onVoteButtonClick = async (voteStatus: boolean) => {
    setButtonDisabled(true);
    sendVote(voteStatus).then(() => setButtonDisabled(false));
  };

  return (
    <>
      <Button
        sizeName="s"
        className="popup-rate__button"
        disabled={isButtonDisabled}
        onClick={() => {
          onVoteButtonClick(true);
        }}
      >
        Да
      </Button>
      <Button
        sizeName="s"
        className="popup-rate__button"
        disabled={isButtonDisabled}
        onClick={() => {
          onVoteButtonClick(false);
        }}
      >
        Нет
      </Button>
    </>
  );
}
