import {} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import { CWithdrawTab } from './Tabs/CWithdrawTab';
const Box = createBox();

const WithdrawCrypto = () => {
  return (
    <Container style={{paddingTop: 0}}>
      <Header leftIcon={true} />
      <Text variant={'bold'} marginLeft={'m'} marginTop={'s'}>
        Withdraw
      </Text>
      <CWithdrawTab />
    </Container>
  );
};

export default WithdrawCrypto;
