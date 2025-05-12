import useUserActions from 'Hooks/useUserActions';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';

export default function UserEffect() {
  const user = useRecoilValue(userAtom);

  const { fetchUser, fetchCsrf } = useUserActions();

  useEffect(() => {
    if (!user.logged) {
      fetchCsrf();
    } else {
      fetchUser();
    }
  }, []);

  return null;
}
