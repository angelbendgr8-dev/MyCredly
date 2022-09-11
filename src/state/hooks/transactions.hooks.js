import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectBuying,
  selectDeposits,
  selectListings,
  selectMyListings,
  selectSelling,
  selectTrading,
  selectWithdrawals,
} from '../reducers/transactions.reducer';

export const useTransactions = () => {
  const deposits = useSelector(selectDeposits);
  const withdrawals = useSelector(selectWithdrawals);
  const listings = useSelector(selectListings);
  const mylisting = useSelector(selectMyListings);
  const buy = useSelector(selectBuying);
  const sell = useSelector(selectSelling);
  const tradings = useSelector(selectTrading);

  return useMemo(
    () => ({deposits, withdrawals, listings, mylisting, buy, sell, tradings}),
    [deposits, withdrawals, listings, mylisting, buy, sell, tradings],
  );
};
