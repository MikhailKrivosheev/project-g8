import React, { useState } from 'react';
import cn from 'classnames';
import Button from 'Components/UI/Button';
import useUserActions from 'Hooks/useUserActions';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import userRoleSelector from 'Recoil/Selectors/UserRole';
import seasonStageSelector from 'Recoil/Selectors/SeasonStage';
import useTranslate from 'Hooks/useTranslate';
import ErrorBoundary from 'Components/ErrorBoundary';
import UserWorksTab from './UserWorksTab';
import JuryWorksTab from './JuryWorksTab';
import AccountTab from './AccountTab';
import Background from '../Background';
import ChairmanTab from './ChairmanTab';
import AllWorks from './JuryWorksTab/AllWorks';

function SecondTab() {
  const { isJudge, isChairman, isG8Judge, isExecutive } =
    useRecoilValue(userRoleSelector);
  const { isFinalStage } = useRecoilValue(seasonStageSelector);

  if (isFinalStage) {
    if (isChairman) return <ChairmanTab />;
    if (isG8Judge) return <JuryWorksTab />;
    if (isExecutive) return <AllWorks />;
    return <UserWorksTab />;
  }
  if (isJudge) return <JuryWorksTab />;
  return <UserWorksTab />;
}

export default function AccountPage() {
  const user = useRecoilValue(userAtom);
  const [activeTab, setActiveTab] = useState('accountTab');
  const { isFinalStage } = useRecoilValue(seasonStageSelector);
  const { isJudge, isChairman } = useRecoilValue(userRoleSelector);
  const { signOut } = useUserActions();
  const translate = useTranslate();

  const accountTabClassName = cn('account__tab', {
    'account__tab--active': activeTab === 'accountTab',
  });
  const projectsTabClassName = cn('account__tab', {
    'account__tab--active': activeTab === 'projectsTab',
  });

  if (!user?.roles) {
    return null;
  }

  return (
    <>
      <Button
        onClick={signOut}
        className="account__sign-out-button"
        color="gray"
        sizeName="s"
      >
        Выйти
      </Button>
      <div className="account__tabs">
        <button
          type="button"
          className={accountTabClassName}
          onClick={() => {
            setActiveTab('accountTab');
          }}
        >
          {translate('Профиль')}
        </button>
        <button
          type="button"
          className={projectsTabClassName}
          onClick={() => {
            setActiveTab('projectsTab');
          }}
        >
          {isJudge || (isChairman && isFinalStage)
            ? translate('Работы на оценку')
            : translate('Мои работы')}
        </button>
      </div>
      <Background />
      <ErrorBoundary>
        {activeTab === 'accountTab' ? <AccountTab /> : <SecondTab />}
      </ErrorBoundary>
    </>
  );
}
