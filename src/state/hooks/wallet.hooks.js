import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  selectCrypto,
  selectFiats,
  selectWallets,
} from '../reducers/wallet.reducer';

export const useWallet = () => {
  const wallets = useSelector(selectWallets);
  const fiats = useSelector(selectFiats);
  const cryptos = useSelector(selectCrypto);

  return useMemo(() => ({wallets, fiats, cryptos}), [wallets, fiats, cryptos]);
};
