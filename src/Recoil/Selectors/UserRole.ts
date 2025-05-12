import { selector } from 'recoil';
import userAtom from 'Recoil/Atoms/User';

const userRoleSelector = selector({
  key: 'userRoleSelector',
  get: ({ get }) => {
    const { roles, judge_type: judgeType } = get(userAtom);
    const rolesArray = roles?.map(({ name }) => name);

    return {
      isJudge: rolesArray?.includes('judge'),
      isUser: rolesArray?.includes('user'),
      isChairman: rolesArray?.includes('chairman'),
      isG8Judge: rolesArray?.includes('judge') && judgeType === 'greateight',
      isExecutive: judgeType === 'executive',
    };
  },
});

export default userRoleSelector;
