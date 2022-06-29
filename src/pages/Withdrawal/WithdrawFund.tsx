import {} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {WithdrawTab} from './Tabs/WithdrawTab';
import Text from '../../Components/Text';
const Box = createBox();

const WithdrawFund = () => {
  return (
    <Container style={{paddingTop: 0}}>
      <Header leftIcon={true} />
      <Text variant={'bold'} marginLeft={'m'} marginTop={'s'}>
        Withdraw
      </Text>
      <WithdrawTab />
    </Container>
  );
};

export default WithdrawFund;
