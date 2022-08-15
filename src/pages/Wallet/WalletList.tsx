import {} from 'react-native';
import React from 'react';
import Container from '../../Components/Container';
import Text from '../../Components/Text';
import {WalletListTab} from './Tabs/WalletListTab';

// const WalletItem () => (

// )

const WalletList = () => {
  return (
    <Container paddingTop={'my4'}>
      <Text variant={'bold'} marginLeft="m" marginTop={'m'}>
        Wallet
      </Text>
      <WalletListTab />
    </Container>
  );
};

export default WalletList;
