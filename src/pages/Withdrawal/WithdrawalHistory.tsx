import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import TransactionItem from '../../Components/TransactionItem';
const Box = createBox();

const WithdrawalHistory = () => {
  return (
    <Box flex={1} backgroundColor={'background'}>
      <ScrollView>
        <TransactionItem />
        <TransactionItem />
      </ScrollView>
    </Box>
  );
};

export default WithdrawalHistory;

const styles = StyleSheet.create({});
