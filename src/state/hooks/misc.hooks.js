import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectAdminAccount} from '../reducers/misc.reducer';

export const useMisc = () => {
  const adminaccount = useSelector(selectAdminAccount);

  return useMemo(() => ({adminaccount}), [adminaccount]);
};
