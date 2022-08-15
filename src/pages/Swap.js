import {StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import {SwapTab} from './Swap/Tabs/SwapTab';
import Text from '../Components/Text';
const data = ['BTC', 'ETH', 'DOGE', 'LTE', 'CELO', 'USDT', 'CUSD'];

const Swap = () => {
  return (
    <Container paddingTop={'my4'}>
      {/* <Header leftIcon={'true'} text={''} /> */}
      <Text variant={'bold'} marginLeft="m" marginTop={'m'}>
        Swap
      </Text>
      <SwapTab />
    </Container>
  );
};

export default Swap;

const styles = StyleSheet.create({});
