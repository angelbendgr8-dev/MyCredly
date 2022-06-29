import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectCurrentUser,
  selectPics,
  selectPushToken,
  selectToken,
} from '../reducers/userAuth';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const pics = useSelector(selectPics);
  const push_token = useSelector(selectPushToken);

  return useMemo(
    () => ({user, token, pics, push_token}),
    [user, token, pics, push_token],
  );
};
