import React, { useCallback, useState } from 'react';
import LikeIcon from 'Icons/LikeIcon';
import Api from 'Api';
import routes from 'Api/routes';
import classNames from 'classnames';
import useAPIError from 'Hooks/useAPIError';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import { useNavigate } from 'react-router-dom';
import useRoutes from 'Hooks/useRoutes';

interface ILike {
  count: number;
  workId?: number;
  isLiked?: boolean;
}

type TLikeState = number;

export default function Like({ count, workId, isLiked }: ILike) {
  const { logged } = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const [disabled, setDisabled] = useState(false);
  const [likeCount, setLikeCount] = useState<TLikeState>(count);
  const [isActive, setActive] = useState(isLiked);

  const buttonClassNames = classNames('card__likes', {
    'card__likes--active': isActive,
  });

  const { handleAPIError } = useAPIError();

  async function setLike() {
    try {
      await Api.deleteRequest(routes.api.removeLike(workId), {});
      setLikeCount((prev) => prev - 1);
      setDisabled(false);
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  async function removeLike() {
    try {
      await Api.post(routes.api.setLike(), {
        work_id: workId,
      });
      setLikeCount((prev) => prev + 1);
      setDisabled(false);
    } catch (error: any) {
      handleAPIError(error);
    }
  }

  const onLike = useCallback(async () => {
    if (isActive) {
      await setLike();
    } else {
      await removeLike();
    }
    setActive((prev) => !prev);
  }, [isActive]);

  return (
    <button
      onClick={() => {
        if (logged) {
          setDisabled(true);
          onLike();
        } else {
          navigate(ROUTES.signIn());
        }
      }}
      type="button"
      className={buttonClassNames}
      disabled
    >
      <LikeIcon />
      {likeCount || ''}
    </button>
  );
}
