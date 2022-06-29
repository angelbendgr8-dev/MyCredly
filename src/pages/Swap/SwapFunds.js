import {} from 'react-native';
import React from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {SwapTab} from './Tabs/SwapTab';
import Text from '../../Components/Text';

const SwapFunds = () => {
  return (
    <Container style={{paddingTop: 0}}>
      {/* <Header leftIcon={'true'} text={''} /> */}
      <Text variant={'bold'} marginLeft="m" marginTop={'l'}>
        Fund Wallet
      </Text>
      <SwapTab />
    </Container>
  );
};

export default SwapFunds;
