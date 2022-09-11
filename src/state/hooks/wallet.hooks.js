import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectBank,
  selectCrypto,
  selectFiats,
  selectWallets,
} from '../reducers/wallet.reducer';

export const useWallet = () => {
  const wallets = useSelector(selectWallets);
  const fiats = useSelector(selectFiats);
  const cryptos = useSelector(selectCrypto);
  const banks = useSelector(selectBank);

  return useMemo(
    () => ({wallets, fiats, cryptos, banks}),
    [wallets, fiats, cryptos, banks],
  );
};
