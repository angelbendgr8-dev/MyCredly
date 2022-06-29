import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import TransactionItem from '../../Components/TransactionItem';
const Box = createBox();

const Transactions = () => {
  return (
    <Box flex={1} backgroundColor={'background'}>
      <ScrollView>
        <TransactionItem />
        <TransactionItem />
      </ScrollView>
    </Box>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
