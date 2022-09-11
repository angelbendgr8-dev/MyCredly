import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBox} from '@shopify/restyle';
import {useTransactions} from '../../state/hooks/transactions.hooks';
import {AppContext} from '../../state/AppContext';
import WithdrawalItem from '../../Components/WithdrawalItem';
import Text from '../../Components/Text';
import _ from 'lodash';
const Box = createBox();

const CWithdrawalHistory = () => {
  const {withdrawals} = useTransactions();
  const {cwallet} = useContext(AppContext);
  const [walletWithdrawal, setWalletWithdrawal] = useState([]);

  useEffect(() => {
    if (_.size(withdrawals) > 0) {
      const temp = _.filter(withdrawals, item => item.wallet_id === cwallet.id);
      setWalletWithdrawal(temp);
    }
  }, [withdrawals, cwallet]);
  return (
    <Box flex={1} backgroundColor={'background'}>
      {walletWithdrawal && !_.isEmpty(walletWithdrawal) ? (
        <ScrollView>
          {walletWithdrawal.map(item => (
            <WithdrawalItem key={item.id} withdrawal={item} wallet={cwallet} />
          ))}
        </ScrollView>
      ) : (
        <Box flex={1} justifyContent={'center'} alignItems="center">
          <Text variant={'medium'}>No Withdrawal Available</Text>
        </Box>
      )}
    </Box>
  );
};

export default CWithdrawalHistory;

const styles = StyleSheet.create({});
