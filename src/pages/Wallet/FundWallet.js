import {} from 'react-native';
import React from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {FundTab} from './Tabs/FundTab';
import Text from '../../Components/Text';

const FundWallet = () => {
  return (
    <Container style={{paddingTop: 0}}>
      <Header leftIcon={'true'} text={''} />
      <Text variant={'bold'} marginLeft="m" marginTop={'s'}>
        Fund Wallet
      </Text>
      <FundTab />
    </Container>
  );
};

export default FundWallet;
