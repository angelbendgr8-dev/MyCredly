import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectAdminAccount} from '../reducers/misc.reducer';

export const useWallet = () => {
  const adminaccount = useSelector(selectAdminAccount);

  return useMemo(() => ({adminaccount}), [adminaccount]);
};
